import type { DocumentationPage } from 'unocss-docs'

const styles = {
  block: 'bg-surface p-s transition text-center rounded-s.4',
}

const colors: DocumentationPage
= `# Using logical properties

Windblade uses logical properties and values only.

All properties that can be customized on multiple axis/edges/corenrs can be prepended with:
- \`-b\` for block axis (e.g. \`size-b\`).
- \`-i\` for inline axis (e.g. \`size-i\`).
- \`-bs\` and \`-be\` for block start and end edges.
- \`-is\` and \`-ie\` for inline start and end edges.
- \`-ss\` \`-se\` \`-es\` \`-ee\` for corners (start start, start end, end start & end end)

\`\`\`uno-html
<div class="grid grid-cols-3 grid-auto-rows-m.2 gap-s.2 rounded-s overflow-hidden">
  <div class="${styles.block}">ss</div>
  <div class="${styles.block}">bs</div>
  <div class="${styles.block}">se</div>

  <div class="${styles.block}">is</div>
  <div class="${styles.block}">center</div>
  <div class="${styles.block}">ie</div>

  <div class="${styles.block}">es</div>
  <div class="${styles.block}">be</div>
  <div class="${styles.block}">ee</div>
</div>
\`\`\`

Windblade polyfills logical values so you can use this even where CSS does not support it yet (e.g. \`background-position\` with \`bg-{corner}\` utility).

If you are new to logical properties try playing with \`bg-gradient-to-{edge/corner}\` and see which way the gradient goes.

Please note that \`width\` and \`height\` are completely removed in favor of \`size-{axis}\`.
`

export default colors
