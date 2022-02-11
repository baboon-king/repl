export function debounce(fn: Function, n = 100) {
  let handle: any
  return (...args: any[]) => {
    if (handle) clearTimeout(handle)
    handle = setTimeout(() => {
      fn(...args)
    }, n)
  }
}

// prefer old unicode hacks for backward compatibility
// https://base64.guru/developers/javascript/examples/unicode-strings
export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)))
}

export function atou(base64: string): string {
  return decodeURIComponent(escape(atob(base64)))
}

/**
 * Found here: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 */
export function hashCode(str: string) {
  const len = str.length;
  const NINE = 9;
  let hash = NINE;

  for (let i = 0; i < len; ) {
    hash = Math.imul(hash ^ str.charCodeAt(i++), NINE ** NINE);
  }
  return hash ^ (hash >>> NINE);
}