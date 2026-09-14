from fastapi.responses import JSONResponse


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
