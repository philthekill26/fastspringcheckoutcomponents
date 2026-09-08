# FastSpring Landing Page + Checkout Components Demo

A complete buyer-journey demo built with FastAPI and FastSpring Checkout Components.

## Experience

The application now has two customer-facing stages:

1. `/` — full responsive product landing page for **Advanced Monthly**
2. `/checkout` — customer details + FastSpring Checkout Components

The product card on the landing page sends the buyer into the checkout flow and
preserves the selected product name in browser session storage for presentation.

The FastSpring backend product remains controlled server-side with:

```env
FASTSPRING_PRODUCT_PATH=advanced-monthly
```

This avoids allowing a browser-provided product path to override the server-side
checkout configuration.

## FastSpring components

The checkout includes:

- `fs-card`
- `fs-coupon`
- `fs-pay-button`
- `fs-disclosures`

The Coupon Component is explicitly configured with:

```javascript
presentation: "expanded"
```

so the coupon field is visible inline on the demo checkout.

## Visual system

The landing page and checkout use the same family of:

- deep navy backgrounds
- white surfaces for payment inputs
- FastSpring-style blue actions
- Helvetica Neue / Helvetica / Arial typography
- matching rounded corners and focus states

## Local setup

Create a private `.env` file at the project root from `.env.example`.

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/
```

Checkout:

```text
http://127.0.0.1:8000/checkout
```

Health:

```text
http://127.0.0.1:8000/health
```

## Render

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Keep all real FastSpring credentials in Render Environment Variables. Do not commit
a real `.env` file.
