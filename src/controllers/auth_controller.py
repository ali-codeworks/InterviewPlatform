from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas import auth_schema
from src.utils import success_res, error_res, mail_utils, auth_utils
from src.services import user_service
from datetime import datetime, timedelta, timezone


def root():
    return success_res("Auth Api is working fine")


async def handle_register(body: auth_schema.RegisterSchema, db: AsyncSession):
    existing_user = await user_service.get_user_by_email(db, body.email)

    if existing_user:
        return error_res(
            msg="An account with this email already exists",
            err="User Already Exists",
            status_code=409,
        )

    hashed_password = auth_utils.hash_password(body.password)
    otp = auth_utils.generate_otp()
    hashed_otp = auth_utils.hash_otp(otp)
    otp_expire = datetime.now(timezone.utc) + timedelta(minutes=10)
    profile_picture = auth_utils.get_default_avatar(body.first_name, body.last_name)

    new_user = await user_service.create_user(
        db,
        first_name=body.first_name,
        last_name=body.last_name,
        email=body.email,
        hashed_password=hashed_password,
        otp=hashed_otp,
        otp_expire=otp_expire,
        profile_picture=profile_picture,
    )

    await mail_utils.send_otp_mail(
        email=new_user.email, otp=otp, name=new_user.first_name
    )

    return success_res(
        msg="Registration successful. Please verify your email using the OTP sent to you.",
        status_code=201,
        user=new_user.to_dict(),
    )


async def handle_resend_otp(body: auth_schema.ResendOtpSchema, db: AsyncSession):
    user = await user_service.get_user_by_email(db, body.email)

    if not user:
        return error_res(
            msg="No account found with this email",
            err="User Not Found",
            status_code=404,
        )

    if user.is_verified:
        return error_res(
            msg="This account is already verified",
            err="Already Verified",
            status_code=400,
        )

    otp = auth_utils.generate_otp()
    hashed_otp = auth_utils.hash_otp(otp)
    otp_expire = datetime.now(timezone.utc) + timedelta(minutes=10)

    user = await user_service.set_new_otp(db, user, hashed_otp, otp_expire)

    await mail_utils.send_resend_otp_mail(
        email=user.email, otp=otp, name=user.first_name
    )

    return success_res(
        msg="A new OTP has been sent to your email",
        status_code=200,
    )


async def handle_verify_otp(body: auth_schema.VerifyOtpSchema, db: AsyncSession):
    user = await user_service.get_user_by_email(db, body.email)

    if not user:
        return error_res(
            msg="No account found with this email",
            err="User Not Found",
            status_code=404,
        )

    if user.is_verified:
        return error_res(
            msg="This account is already verified",
            err="Already Verified",
            status_code=400,
        )

    if not user.otp or not auth_utils.verify_otp(body.otp, user.otp):
        return error_res(
            msg="Invalid OTP",
            err="Invalid OTP",
            status_code=400,
        )

    if user.otp_expire < datetime.now(timezone.utc):
        return error_res(
            msg="OTP has expired. Please request a new one",
            err="OTP Expired",
            status_code=400,
        )

    user = await user_service.mark_user_verified(db, user)

    token = auth_utils.create_token(user)

    res = success_res(
        msg="Email verified successfully",
        status_code=200,
        user=user.to_dict(),
    )

    res.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=auth_utils.TOKEN_EXPIRE_MINUTES * 60,
    )

    return res


async def handle_login(body: auth_schema.LoginSchema, db: AsyncSession):
    user = await user_service.get_user_by_email(db, body.email)

    if not user:
        return error_res(
            msg="Invalid email or password",
            err="Invalid Credentials",
            status_code=401,
        )

    if not auth_utils.check_password(body.password, user.password):
        return error_res(
            msg="Invalid email or password",
            err="Invalid Credentials",
            status_code=401,
        )

    if not user.is_verified:
        return error_res(
            msg="Please verify your email before logging in",
            err="Not Verified",
            status_code=403,
        )

    token = auth_utils.create_token(user)

    res = success_res(
        msg="Login successful",
        status_code=200,
        user=user.to_dict(),
    )

    res.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=auth_utils.TOKEN_EXPIRE_MINUTES * 60,
    )

    return res


async def handle_logout():
    res = success_res(msg="Logout successful", status_code=200)

    res.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,
        samesite="lax",
    )

    return res


async def handle_me(access_token: str | None, db: AsyncSession):
    if not access_token:
        return error_res(
            msg="Not authenticated",
            err="Unauthorized",
            status_code=401,
        )

    payload = auth_utils.verify_token(access_token)

    if not payload:
        return error_res(
            msg="Session expired or invalid, please login again",
            err="Unauthorized",
            status_code=401,
        )

    user = await user_service.get_user_by_id(db, payload["id"])

    if not user:
        return error_res(
            msg="User no longer exists",
            err="Unauthorized",
            status_code=401,
        )

    return success_res(
        msg="User fetched successfully",
        status_code=200,
        user=user.to_dict(),
    )


async def handle_forget_password(body: auth_schema.ForgetPassSchema, db: AsyncSession):
    user = await user_service.get_user_by_email(db, body.email)

    if not user:
        return success_res(
            msg="If an account with this email exists, an OTP has been sent",
            status_code=200,
        )

    otp = auth_utils.generate_otp()
    hashed_otp = auth_utils.hash_otp(otp)
    otp_expire = datetime.now(timezone.utc) + timedelta(minutes=10)

    user = await user_service.set_new_otp(db, user, hashed_otp, otp_expire)

    await mail_utils.send_reset_otp_mail(
        email=user.email, otp=otp, name=user.first_name
    )

    return success_res(
        msg="If an account with this email exists, an OTP has been sent",
        status_code=200,
    )


async def handle_reset_password(body: auth_schema.ResetPassSchema, db: AsyncSession):
    user = await user_service.get_user_by_email(db, body.email)

    if not user:
        return error_res(
            msg="Invalid email or OTP",
            err="Invalid Request",
            status_code=400,
        )

    if not user.otp or not auth_utils.verify_otp(body.otp, user.otp):
        return error_res(
            msg="Invalid OTP",
            err="Invalid OTP",
            status_code=400,
        )

    if user.otp_expire < datetime.now(timezone.utc):
        return error_res(
            msg="OTP has expired. Please request a new one",
            err="OTP Expired",
            status_code=400,
        )

    hashed_password = auth_utils.hash_password(body.new_password)

    user = await user_service.reset_password(db, user, hashed_password)

    return success_res(
        msg="Password reset successful. Please login with your new password.",
        status_code=200,
    )
