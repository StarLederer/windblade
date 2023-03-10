import type { DocumentationPage } from 'unocss-docs'

export const dropShadow = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Drop shadows are removed for now because Tailwind\'s implementation is too limiting. Discussion in progress.</p>
    </page>
  `

  return { rules: [], docs }
}
