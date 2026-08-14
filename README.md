# FastSpring Checkout Components Python Demo

Python/FastAPI demo for FastSpring Checkout Components.

## Components included

- Card
- Coupon
- Pay Button
- Disclosures
- Post-purchase success screen with local GIF

## Coupon Component — as-built implementation

The original Coupon Component PRD changed during implementation.

The shipped component is an iframe component. The seller page creates it with the
mount selector supplied directly to `components.create()`:

```javascript
sdk.components.create("coupon", {
  selector: "#coupon-element",
  presentation: "expanded",
  locale: "en",
  onEvent: (event) => {
    console.log(event);
  }
});
```

Do **not** call `.mount()` on the coupon component in this demo.

### Coupon apply / clear flow

The seller page does not manually update the session or validate the coupon.

The Coupon Component emits an intent and the FastSpring SDK performs the surgical
coupon request:

```text
POST /sessions/{id}/cart/coupon
```

Apply:

```json
{
  "code": "COUPON_CODE"
}
```

Clear:

```json
{
  "code": null
}
```

Missing or empty `code` is ignored and is not treated as a clear.

After the SDK request, FastSpring reloads the session and the coupon iframe reflects
the updated session state.

### Presentation

This technical demo uses:

```javascript
presentation: "expanded"
```

so the input is immediately visible.

To demonstrate the collapsed presentation, change it to:

```javascript
presentation: "collapsed"
```

## Coupon telemetry/events

The component specification includes:

- `component_coupon_apply_clicked`
- `component_coupon_applied`
- `component_coupon_rejected`
- `component_coupon_cleared`
- `component_coupon_prefilled`

The demo logs the raw event object to DevTools without assuming a fixed event payload
shape.

## Local setup

Copy `.env.example` to `.env` and populate the local `.env` with real sandbox values.

Do not commit the real `.env`.

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
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

Store real FastSpring credentials and configuration in Render Environment Variables.
