import os
from typing import Any

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr

load_dotenv()

app = FastAPI(title="FastSpring Checkout Components Python Demo")

FASTSPRING_USERNAME = os.getenv("FASTSPRING_USERNAME")
FASTSPRING_PASSWORD = os.getenv("FASTSPRING_PASSWORD")
FASTSPRING_SESSION_URL = os.getenv("FASTSPRING_SESSION_URL")
FASTSPRING_STOREFRONT = os.getenv("FASTSPRING_STOREFRONT")
FASTSPRING_LOCALE = os.getenv("FASTSPRING_LOCALE", "en")
FASTSPRING_COUNTRY = os.getenv("FASTSPRING_COUNTRY", "GB")
FASTSPRING_PRODUCT_PATH = os.getenv("FASTSPRING_PRODUCT_PATH", "advanced-monthly")
FASTSPRING_LIVE = os.getenv("FASTSPRING_LIVE", "false").lower() == "true"

required_env = {
    "FASTSPRING_USERNAME": FASTSPRING_USERNAME,
    "FASTSPRING_PASSWORD": FASTSPRING_PASSWORD,
    "FASTSPRING_SESSION_URL": FASTSPRING_SESSION_URL,
    "FASTSPRING_STOREFRONT": FASTSPRING_STOREFRONT,
}

missing_env = [key for key, value in required_env.items() if not value]
if missing_env:
    raise RuntimeError(
        f"Missing required environment variables: {', '.join(missing_env)}"
    )


class SessionForm(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def home() -> FileResponse:
    return FileResponse("static/components.html")


@app.get("/components")
def components_demo() -> FileResponse:
    return FileResponse("static/components.html")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/create-session")
def create_session(form: SessionForm) -> JSONResponse:
    payload: dict[str, Any] = {
        "locale": FASTSPRING_LOCALE,
        "customer": {
            "billToContact": {
                "email": form.email,
                "firstName": form.firstName.strip(),
                "lastName": form.lastName.strip(),
            },
            "billToAddress": {
                "country": FASTSPRING_COUNTRY,
            },
        },
        "cart": {
            "lineItems": [
                {
                    "productPath": FASTSPRING_PRODUCT_PATH,
                    "quantity": 1,
                }
            ]
        },
        "live": FASTSPRING_LIVE,
        "orderTags": {
            "Testing": "Checkout Components Demo"
        },
    }

    try:
        response = requests.post(
            FASTSPRING_SESSION_URL,
            auth=(FASTSPRING_USERNAME, FASTSPRING_PASSWORD),
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30,
        )
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Could not reach FastSpring: {exc}"
        ) from exc

    if not response.ok:
        try:
            error_body = response.json()
        except ValueError:
            error_body = response.text

        raise HTTPException(
            status_code=response.status_code,
            detail={
                "message": "FastSpring session creation failed",
                "fastspring_response": error_body,
            },
        )

    try:
        data = response.json()
    except ValueError as exc:
        raise HTTPException(
            status_code=502,
            detail="FastSpring returned a non-JSON response."
        ) from exc

    session_id = data.get("id")
    if not session_id:
        raise HTTPException(
            status_code=502,
            detail={
                "message": "FastSpring response did not include a session id.",
                "fastspring_response": data,
            },
        )

    return JSONResponse(
        content={
            "id": session_id,
            "raw": data
        }
    )
