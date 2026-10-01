/**
 * Front Door caches the agent by the origin's s-maxage, but forwards Cache-Control as it is.
 * This copy without s-maxage is what browsers get, through the Front Door rule that overwrites Cache-Control with it.
 */
export function getBrowserCacheControl(headerValue: string): string {
  return headerValue
    .split(', ')
    .filter((directive) => directive.split('=')[0].trim().toLowerCase() !== 's-maxage')
    .join(', ')
}
