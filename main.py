from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import FileResponse
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
app.mount("/assets", StaticFiles(directory="client/dist/assets"), name="assets")


@app.get("/")
def root():
    return FileResponse("client/dist/index.html")


@app.get("/api")
def health():
    return success_res("Interview Platform Api is working fine")
