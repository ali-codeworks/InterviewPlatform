from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.configs import Base, engine
from src.utils import success_res


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(lifespan=lifespan)


@app.get("/api")
def health():
    return success_res("Interview Platform Api is working fine")


app.mount("/", StaticFiles(directory="client/dist", html=True), name="static")
