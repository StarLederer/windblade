export const encodeString = (str: string) => str.replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')
  .trimStart()

export * as compiler from './compiler'
export * from './types'
