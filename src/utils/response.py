from fastapi.responses import JSONResponse
from functools import wraps
from inspect import iscoroutinefunction

def success_res(
    msg: str = "Your request was processed successfully",
    status_code: int = 200,
    **kwargs
):
    return JSONResponse(
        content={"message": msg, "success": True, **kwargs}, status_code=status_code
    )


def error_res(
    msg: str = "Something went wrong. Please try again.",
    err: str = "Internal Server Error",
    status_code: int = 500,
):
    return JSONResponse(
        content={"message": msg, "error": err, "success": False},
        status_code=status_code,
    )


def handle_exceptions(func):
    @wraps(func)
    async def async_wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except Exception as e:
            return error_res("Internal Server Error", str(e), 500)

    @wraps(func)
    def sync_wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            return error_res("Internal Server Error", str(e), 500)

    if iscoroutinefunction(func):
        return async_wrapper
    return sync_wrapper
