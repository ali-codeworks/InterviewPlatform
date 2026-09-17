from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Date
from sqlalchemy.types import Integer, String, Boolean, Text
from src.configs import Base


def utc() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    bio = Column(Text, nullable=True)
    profile_picture = Column(String(500), nullable=False)
    gender = Column(String(20), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    is_verified = Column(Boolean, default=False, nullable=False)
    otp = Column(
        String(255), nullable=True
    )  # ab hashed otp store hoga, length badha di
    otp_expire = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc, nullable=False)
    updated_at = Column(
        DateTime(timezone=True), default=utc, onupdate=utc, nullable=False
    )

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "bio": self.bio,
            "profile_picture": self.profile_picture,
            "gender": self.gender,
            "date_of_birth": (
                self.date_of_birth.isoformat() if self.date_of_birth else None
            ),
            "is_verified": self.is_verified,
            "is_active": self.is_active,
            "last_login": self.last_login.isoformat() if self.last_login else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
