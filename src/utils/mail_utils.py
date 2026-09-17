from fastapi_mail import FastMail, MessageSchema, MessageType
from src.configs import conf_mail


async def send_otp_mail(email: str, otp: str, name: str = "") -> None:
    subject = "Verify Your Email - Interview Platform"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-bottom: 8px;">Verify Your Email</h2>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.5;">
            Hi{f" {name}" if name else ""},
        </p>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.5;">
            Use the OTP below to verify your email address and complete your registration on Interview Platform.
        </p>
        <div style="text-align: center; margin: 24px 0;">
            <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #2563eb; background: #f0f4ff; padding: 12px 24px; border-radius: 6px;">
                {otp}
            </span>
        </div>
        <p style="color: #4a4a4a; font-size: 14px; line-height: 1.5;">
            This OTP is valid for the next <strong>10 minutes</strong>. Please do not share this code with anyone.
        </p>
        <p style="color: #999999; font-size: 13px; margin-top: 24px;">
            If you did not request this, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
        <p style="color: #999999; font-size: 12px; text-align: center;">
            &copy; Interview Platform. All rights reserved.
        </p>
    </div>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[email],
        body=html_body,
        subtype=MessageType.html,
    )

    fm = FastMail(conf_mail)
    await fm.send_message(message)


async def send_resend_otp_mail(email: str, otp: str, name: str = "") -> None:
    subject = "Your New OTP - Interview Platform"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-bottom: 8px;">Your New OTP</h2>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.5;">
            Hi{f" {name}" if name else ""},
        </p>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.5;">
            Here is your new OTP to verify your email address on Interview Platform. Your previous OTP is no longer valid.
        </p>
        <div style="text-align: center; margin: 24px 0;">
            <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #2563eb; background: #f0f4ff; padding: 12px 24px; border-radius: 6px;">
                {otp}
            </span>
        </div>
        <p style="color: #4a4a4a; font-size: 14px; line-height: 1.5;">
            This OTP is valid for the next <strong>10 minutes</strong>. Please do not share this code with anyone.
        </p>
        <p style="color: #999999; font-size: 13px; margin-top: 24px;">
            If you did not request this, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
        <p style="color: #999999; font-size: 12px; text-align: center;">
            &copy; Interview Platform. All rights reserved.
        </p>
    </div>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[email],
        body=html_body,
        subtype=MessageType.html,
    )

    fm = FastMail(conf_mail)
    await fm.send_message(message)


async def send_reset_otp_mail(email: str, otp: str, name: str = "") -> None:
    subject = "Reset Your Password - Interview Platform"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-bottom: 8px;">Reset Your Password</h2>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.5;">
            Hi{f" {name}" if name else ""},
        </p>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.5;">
            Use the OTP below to reset your password on Interview Platform.
        </p>
        <div style="text-align: center; margin: 24px 0;">
            <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #2563eb; background: #f0f4ff; padding: 12px 24px; border-radius: 6px;">
                {otp}
            </span>
        </div>
        <p style="color: #4a4a4a; font-size: 14px; line-height: 1.5;">
            This OTP is valid for the next <strong>10 minutes</strong>. Please do not share this code with anyone.
        </p>
        <p style="color: #999999; font-size: 13px; margin-top: 24px;">
            If you did not request a password reset, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
        <p style="color: #999999; font-size: 12px; text-align: center;">
            &copy; Interview Platform. All rights reserved.
        </p>
    </div>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[email],
        body=html_body,
        subtype=MessageType.html,
    )

    fm = FastMail(conf_mail)
    await fm.send_message(message)
