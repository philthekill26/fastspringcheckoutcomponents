# FastSpring Checkout Components + Coupon Demo

Standalone FastAPI demo for the FastSpring Checkout Components flow.

## Included

- Card component
- Coupon component integration based on **Coupon Component — PRD (Draft v0.1, 2026-04-28)**
- Pay Button component
- Disclosures component
- Existing Python Session API creation flow
- Post-purchase thank-you screen and local GIF

## Coupon identifier caveat

The draft PRD's technical rendering model uses:

```javascript
components.create("coupon", { ... })
```

The same PRD lists `fsc-coupon` as the proposed component identifier and marks the prefix **TBC**.
For that reason the demo uses one constant in `static/fs-components.js`:

```javascript
const COUPON_COMPONENT_TYPE = "coupon";
```

If the released SDK uses a different identifier, only change that constant.

## Coupon behavior

The demo deliberately does **not** implement seller-side coupon validation. Per the PRD, FastSpring's backend/session flow owns validation and the component reads from and writes to the session.

The following PRD coupon events are logged to DevTools when emitted:

- `component_coupon_apply_clicked`
- `component_coupon_applied`
- `component_coupon_rejected`
- `component_coupon_cleared`
- `component_coupon_prefilled`

The PRD doesn't define the final event payload shape, so the demo logs the raw event object rather than depending on undocumented fields.

The demo sets `presentation: "expanded"` so the new Coupon Component is immediately visible. Change it to `"collapsed"` to test the alternate PRD presentation.

## Local run

Copy `.env.example` to `.env` and fill in your real sandbox values locally.

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/components
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

Health check:

```text
/health
```

Keep real API credentials in Render Environment Variables, never in GitHub.
