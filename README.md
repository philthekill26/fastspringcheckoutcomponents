# FastSpring Landing Page + Checkout Components Demo

A landing page that hands off to a Checkout Components checkout, backed by a
server-side Sessions API call.

- `/` — landing page
- `/checkout` — checkout (Checkout Components)
- `/components` — same page, alternate path
- `/health` — health check for Render

Stack: FastAPI + static HTML/CSS/ES modules. No build step.

---

## ⚠️ Read this first if components don't render

**Component checkouts restrict which domains may embed them.** If the origin
serving this app isn't on the allow list, the browser blocks the component
iframes with a `frame-ancestors` / CSP error and **nothing renders** — no card
fields, no pay button — while the rest of the page works normally.

**This is the most common cause of "the components stopped working", and it
happens the moment you deploy to a new URL** (a new Render service, a preview
URL, a custom domain, or localhost on a new port).

Fix it in the FastSpring app:

> Checkouts → Component Checkouts → *your checkout* → Implementation → Step 1
> → add your origin to the allow list → Save

Add every origin you use, for example:

```
https://your-service.onrender.com
http://localhost:8000
```

Then hard-refresh. To confirm this is the problem, open the browser console on
`/checkout` — a `frame-ancestors` or CSP message means it's the allow list.

While testing, set `debug: true` in `FastSpring.init()` (in
`static/fs-sdk.js`) to surface the SDK's built-in success/failure dialogs.

---

## Setup

### 1. Install

```bash
pip install -r requirements.txt
```

### 2. Configure

Copy `.env.example` to `.env` and fill it in:

```bash
cp .env.example .env
```

| Variable | Notes |
|---|---|
| `FASTSPRING_USERNAME` / `FASTSPRING_PASSWORD` | API credentials |
| `FASTSPRING_SESSION_URL` | `https://api.fastspring.com/v2/checkouts/<checkout-path>/sessions` |
| `FASTSPRING_STOREFRONT` | your storefront host + path |
| `FASTSPRING_PRODUCT_PATH` | defaults to `advanced-monthly` |
| `FASTSPRING_COUNTRY` | defaults to `GB` |
| `FASTSPRING_LIVE` | `false` for test mode |

`.env` is gitignored — never commit real credentials. On Render, set these as
environment variables in the service dashboard.

The `checkoutUrl` in `static/fs-sdk.js` also needs to point at your component
checkout. It's a client-side value, so it lives in the JS rather than the env.

### 3. Run locally

```bash
uvicorn app.main:app --reload
```

Then add `http://localhost:8000` to the allow list (see the warning above).

---

## Deploying to Render

- **Build command:** `pip install -r requirements.txt`
- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Health check path:** `/health`
- Set all the environment variables from the table above.
- **Add the Render URL to the component checkout's allow list.**

A `render.yaml` is included if you'd rather deploy as a blueprint. Environment
variables are marked `sync: false`, so Render will prompt for them rather than
reading them from the repo.

---

## How the checkout is wired

The order matters, and it follows the documented SDK sequence:

1. `fastspring-sdk.js` loads from the CDN (script tag in `<head>`)
2. `FastSpring.init(...)` — `static/fs-sdk.js`
3. Each component is created — `static/fs-components.js`
4. Each component is mounted to its `<div>`
5. The buyer submits the form → the server creates a session → returns a session id
6. `sdk.checkout(sessionId)` loads session data into the mounted components

Components are created and mounted **before** the session exists. That's
correct — the SDK reveals the card and pay button itself once the session is
confirmed open.

### Components mounted

| Component | Mount target |
|---|---|
| `fs-email` | `#email-element` |
| `fs-card` | `#card-element` |
| `fs-coupon` | `#coupon-element` (`presentation: "expanded"`) |
| `fs-pay-button` | `#pay-button-element` |
| `fs-disclosures` | `#disclosures-element` — **required** |

---

## Notes on this build

**Each component is created and mounted independently.** Previously all five
were created at module top level with no error handling, so a single failing
component threw at import time and took the whole module down — no components
mounted at all, and because `components-app.js` imports from `fs-components.js`,
its submit handler never attached either, so the "Load Payment Form" button did
nothing. Failures are now caught per component, logged by name, and surfaced in
the page's status line. Check the console for `[fs]` messages.

**The components are unlocked before `sdk.checkout()` is called**, not inside
its `onSuccess` callback. `onSuccess` is a valid callback, but if it never fires
(session error, blocked iframe) the wrapper would keep `pointer-events: none`
and the checkout would be silently dead to clicks with nothing on screen to
explain why.

**The disclosures component is never dimmed.** The "locked" state applies
`opacity` only to the interactive sections. `fs-disclosures` must stay legible —
no `display: none`, `visibility: hidden`, zero height/width, reduced opacity, or
off-screen positioning, on the component *or any parent*.

**`fs-email` may render as an empty box.** The server already sends
`customer.billToContact.email` from the form on the left, and with
`fields.email: "auto"` the component can render nothing when the session already
carries an email — while still occupying vertical space. If you don't need it,
remove the `fs-email` block from `static/fs-components.js` and the
`#email-element` section from `static/components.html`.

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| Nothing renders; console shows `frame-ancestors` / CSP | Origin not on the component checkout's allow list |
| Nothing renders; console shows `[fs] FAILED to create/mount ...` | That component's options are wrong — the name is in the error |
| "Load Payment Form" does nothing at all | A module failed to load — check the console for an import or syntax error |
| `sdk.checkout()` returns 404 / session not found | Session id invalid or expired; create it immediately before the call |
| Pay button stays disabled | Session hasn't loaded — confirm `onSuccess` fired without error |
| Components dimmed and unclickable after loading | Wrapper still has `checkout-locked` — the unlock didn't run |
