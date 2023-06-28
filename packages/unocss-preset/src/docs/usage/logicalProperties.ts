import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'

const styles = {
  block: 'bg-surface p-s transition text-center rounded-s.4',
}

const example = `
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
</div>`

const main: DocumentationPage = `
  <page>
    <h1>Using logical properties</h1>
    <p>Windblade uses logical properties and values only.</p>

    <p>All properties that can be customized on multiple axis/edges/corenrs can be prepended with:</p>
    <ul>
      <li><code>-b</code> for block axis (e.g. <code>size-b</code>).</li>
      <li><code>-i</code> for inline axis (e.g. <code>size-i</code>).</li>
      <li><code>-bs</code> and <code>-be</code> for block start and end edges.</li>
      <li><code>-is</code> and <code>-ie</code> for inline start and end edges.</li>
      <li><code>-ss</code> <code>-se</code> <code>-es</code> <code>-ee</code> for corners (start start, start end, end start &amp; end end).</li>
    </ul>

    <example html="${encodeString(example)}" />

    <p>Windblade polyfills logical values so you can use this even where CSS does not support it yet (e.g. <code>background-position</code> with <code>bg-{corner}</code> utility).</p>
    <p>If you are new to logical properties try playing with <code>bg-gradient-to-{edge/corner}</code> and see which way the gradient goes.</p>
    <p>Please note that <code>width</code> and <code>height</code> are completely removed in favor of <code>size-{axis}</code>.</p>
  </page>
`

export default main
