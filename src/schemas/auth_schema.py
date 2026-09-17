from pydantic import BaseModel, EmailStr, Field


class RegisterSchema(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=255)
    last_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=255)


class ResendOtpSchema(BaseModel):
    email: EmailStr


class VerifyOtpSchema(BaseModel):
    email: EmailStr
    otp: str = Field(..., min_length=4, max_length=10)


class LoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=255)


class ForgetPassSchema(BaseModel):
    email: EmailStr


class ResetPassSchema(BaseModel):
    email: EmailStr
    otp: str = Field(..., min_length=4, max_length=10)
    new_password: str = Field(..., min_length=8, max_length=255)
