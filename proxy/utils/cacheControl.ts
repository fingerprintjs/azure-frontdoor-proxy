/**
 * Front Door caches the agent by the origin's s-maxage, but forwards Cache-Control as it is.
 * This copy without s-maxage is what browsers get, through the Front Door rule that overwrites Cache-Control with it.
 */
export function getBrowserCacheControl(headerValue: string): string {
  return splitDirectives(headerValue)
    .map((directive) => directive.trim())
    .filter((directive) => directive !== '' && directive.split('=')[0].trim().toLowerCase() !== 's-maxage')
    .join(', ')
}

// Splits on commas, except the ones inside quoted directive values
function splitDirectives(headerValue: string): string[] {
  const directives: string[] = []
  let directive = ''
  let isQuoted = false

  for (let i = 0; i < headerValue.length; i++) {
    const char = headerValue[i]

    if (isQuoted && char === '\\') {
      directive += char + (headerValue[i + 1] ?? '')
      i++
      continue
    }

    if (char === '"') {
      isQuoted = !isQuoted
    }

    if (char === ',' && !isQuoted) {
      directives.push(directive)
      directive = ''
      continue
    }

    directive += char
  }
  directives.push(directive)

  return directives
}
