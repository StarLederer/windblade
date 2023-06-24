export function encodeString(str: string) {
  return str.replace(/&/g, '&amp;')
    .trimStart()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/\n/g, '&#10;')
}

export * from './types'
