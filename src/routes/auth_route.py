from fastapi import APIRouter, Depends, Cookie
from sqlalchemy.ext.asyncio import AsyncSession
from src.controllers import auth_controller
from src.schemas import auth_schema
from src.configs import get_db
from src.utils import handle_exceptions

router = APIRouter(prefix="/auth", tags=["AUTH", "USERS"])


@router.get("")
@handle_exceptions
def get_root():
    return auth_controller.root()


@router.post("/register")
@handle_exceptions
async def post_register(
    body: auth_schema.RegisterSchema, db: AsyncSession = Depends(get_db)
):
    return await auth_controller.handle_register(body, db)


@router.post("/resend-otp")
@handle_exceptions
async def post_resend_otp(
    body: auth_schema.ResendOtpSchema, db: AsyncSession = Depends(get_db)
):
    return await auth_controller.handle_resend_otp(body, db)


@router.post("/verify-otp")
@handle_exceptions
async def post_verify_otp(
    body: auth_schema.VerifyOtpSchema, db: AsyncSession = Depends(get_db)
):
    return await auth_controller.handle_verify_otp(body, db)


@router.post("/login")
@handle_exceptions
async def post_login(body: auth_schema.LoginSchema, db: AsyncSession = Depends(get_db)):
    return await auth_controller.handle_login(body, db)


@router.post("/logout")
@handle_exceptions
async def post_logout():
    return await auth_controller.handle_logout()


@router.get("/me")
@handle_exceptions
async def get_me(
    access_token: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
):
    return await auth_controller.handle_me(access_token, db)


@router.post("/forget-password")
@handle_exceptions
async def post_forget_password(
    body: auth_schema.ForgetPassSchema, db: AsyncSession = Depends(get_db)
):
    return await auth_controller.handle_forget_password(body, db)


@router.post("/reset-password")
@handle_exceptions
async def post_reset_password(
    body: auth_schema.ResetPassSchema, db: AsyncSession = Depends(get_db)
):
    return await auth_controller.handle_reset_password(body, db)
