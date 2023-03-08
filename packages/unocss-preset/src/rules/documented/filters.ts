import type { DocumentationPage } from 'unocss-docs'

export const dropShadow = () => {
  const docs: DocumentationPage = {
    description: 'Drop shadows are removed for now because Tailwind\'s implementation is too limiting. Discussion in progress.',
    utilities: [],
  }

  return { rules: [], docs }
}
