---
'@fingerprint/azure-frontdoor-proxy': patch
---

Treat `region` query values that match object prototype keys, such as `toString`, as invalid and route them to the default `us` region
