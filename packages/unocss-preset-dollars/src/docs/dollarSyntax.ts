import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'

const colors: DocumentationPage = `
  <page>
    <h1>Using the $ syntax</h1>
    <p>You can grab proportions from your theme by prefixing their names with <code>$</code>. This is mainly useful inside brackets when you want to set custom values.</p>
    <example html="${encodeString(`
      <div class="grid grid-cols-[auto_$l_auto]"></div>
      <!-- This is a bad example because at the moment brackets have limited support and do not work in this case -->
    `)}" />

    <p>You can also use <code>$</code> to conveniently perform operations with your design tokens without breaking out of your design system or using <code>calc()</code>.</p>
    <example html="${encodeString(`
      <div class="p-s">
        Label
        <!-- Custom underline -->
        <div class="absolute size-i-full size-b-s.2 inset-bottom-$(($s-$s.2)/2)"></div>
      </div>
    `)}" />

    <p>Note that <code>$</code> is an UnoCSS <a href="https://github.com/unocss/unocss#custom-variants">variant</a> so it works with UnoCSS utilities that come from other presets too!</p>
  </page>
`

export default colors
