from datetime import datetime, timedelta, timezone, date
from env import SECRET_KEY
import random
import bcrypt
import jwt

TOKEN_EXPIRE_MINUTES = 60 * 24 * 7


def generate_otp() -> str:
    return str(random.randint(100000, 999999))


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def check_password(password: str, encryption: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), encryption.encode("utf-8"))


def _json_safe(value):
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    return value


def create_token(user, expires_minutes: int = TOKEN_EXPIRE_MINUTES) -> str:
    user_data = {k: _json_safe(v) for k, v in user.to_dict().items()}

    payload = {
        **user_data,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_minutes),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verify_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def get_default_avatar(first_name: str, last_name: str = "") -> str:
    initials = f"{first_name[:1]}{last_name[:1]}".upper()
    return f"https://ui-avatars.com/api/?name={initials}&background=2563eb&color=fff&bold=true"


def hash_otp(otp: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(otp.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_otp(plain_otp: str, hashed_otp: str) -> bool:
    return bcrypt.checkpw(plain_otp.encode("utf-8"), hashed_otp.encode("utf-8"))
