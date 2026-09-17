from dotenv import load_dotenv
from os import getenv

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL")
GMAIL_USERNAME = "GMAIL_USERNAME"
GMAIL_PASSWORD = getenv("GMAIL_PASSWORD")
SECRET_KEY = getenv("SECRET_KEY")
