from fastapi import FastAPI
from src.utils import success_res

app = FastAPI()


@app.get("/")
def root():
    return success_res("Welcome back to the Interview Platform")


@app.get("/api")
def health():
    return success_res("Interview Platform Api is working fine")
