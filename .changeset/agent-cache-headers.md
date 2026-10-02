---
'@fingerprint/azure-frontdoor-proxy': patch
---

Pass the origin's `Cache-Control` for the agent as it is, so Front Door honors the origin's `s-maxage`, and add `X-Fpjs-Browser-Cache-Control` without `s-maxage` for a Front Door rule to send to browsers. Serve the agent with `Age: 0` and without the upstream `Cache-Tag`. Return upstream `304` responses instead of failing with `500`
