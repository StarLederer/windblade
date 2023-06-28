import type { DocumentationPage } from '@windblade/unocss-docs'

export function dropShadow() {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Drop shadows are removed for now because Tailwind\'s implementation is too limiting. Discussion in progress.</p>
    </page>
  `

  return { rules: [], docs }
}
