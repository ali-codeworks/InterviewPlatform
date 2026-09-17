from fastapi_mail import ConnectionConfig
from env import GMAIL_PASSWORD, GMAIL_USERNAME

conf_mail = ConnectionConfig(
    MAIL_USERNAME=GMAIL_USERNAME,
    MAIL_PASSWORD=GMAIL_PASSWORD,
    MAIL_FROM=GMAIL_USERNAME,
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)
