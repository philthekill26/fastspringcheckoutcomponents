# FastSpring Landing Page + Checkout Components — Final Retest Build

This build keeps the landing page and uses the documented FastSpring Checkout
Components sequence:

1. Load `fastspring-sdk.js`
2. `FastSpring.init(...)`
3. Create each Checkout Component
4. Mount each component
5. Create the FastSpring Session
6. Call `sdk.checkout(sessionId)`

## Included components

- `fs-email`
- `fs-card`
- `fs-coupon`
- `fs-pay-button`
- `fs-disclosures`

The Coupon Component uses:

```javascript
presentation: "expanded"
```

so its input is visible inline.

## Important implementation detail

The component wrapper is never `display:none` before mounting. It is only visually
dimmed and has pointer events disabled until `sdk.checkout()` reports success.

That means the iframe-based mount targets retain real dimensions while FastSpring
initializes them.

## Routes

- `/` — landing page
- `/checkout` — checkout
- `/components` — checkout
- `/health` — health check

## Local run

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Real FastSpring credentials stay in `.env` locally and Render environment variables
in production. Do not commit the real `.env`.
