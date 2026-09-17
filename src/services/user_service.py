from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta, timezone
from src.models import User


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create_user(
    db: AsyncSession,
    first_name: str,
    last_name: str,
    email: str,
    hashed_password: str,
    otp: str,
    otp_expire: datetime,
    profile_picture: str,
) -> User:
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        otp=otp,
        otp_expire=otp_expire,
        profile_picture=profile_picture,
        is_verified=False,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def set_new_otp(
    db: AsyncSession, user: User, otp: str, otp_expire: datetime
) -> User:
    user.otp = otp
    user.otp_expire = otp_expire
    await db.commit()
    await db.refresh(user)
    return user


async def mark_user_verified(db: AsyncSession, user: User) -> User:
    user.is_verified = True
    user.otp = None
    user.otp_expire = None
    await db.commit()
    await db.refresh(user)
    return user


async def reset_password(db: AsyncSession, user: User, hashed_password: str) -> User:
    user.password = hashed_password
    user.otp = None
    user.otp_expire = None
    await db.commit()
    await db.refresh(user)
    return user
