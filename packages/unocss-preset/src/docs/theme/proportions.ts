import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { themes } from '@windblade/core'

const wb = themes.windblade.windblade

const styles = {
  tr: 'border border-0 border-b-px border-color-surface',
  th: 'p-b-s.4 p-ie-s font-bold text-fg-2',
  td: 'p-b-s.4 p-ie-s text-fg-3',
}

const example = `
const theme: Theme = {
  windblade: {
    proportions: {
      'half': 0.5,
      'full': 1,
      'double': 2,
    },
  },
};`

const main: DocumentationPage = `
  <page>
    <h1><title /></h1>
    <p>Proportions are used throughout the whole preset for size, duration, opacity, etc.</p>
    <p>Since windblade uses the same proportions for everything it is very easy to customize and is highly recommended that you change them to match your design system.</p>

    <h2>Default proportions</h2>
    <p>By default Windblade is configured with 10-unit-based proportions, however, Windblade also includes an option to use Tailwind and Material Design v3 proportions.</p>
    <example html="${encodeString(`
      <table class="border-collapse">
        <tr class="${styles.tr}">
          <th class="${styles.th}">Name</th>
          <th class="${styles.th}">Value</th>
          <th class="${styles.th}"></th>
        </tr>
        ${((): string => {
          const proportions = wb?.proportions
          if (typeof proportions === 'object') {
            return Object.entries(proportions as Record<string, number>).map(([name, value]) => `
              <tr class="${styles.tr}">
                <td class="${styles.td} font-semibold">${name}</td>
                <td class="${styles.td} text-fg-4">${value}</td>
                <td class="${styles.td}"><div class="bg-accent rounded-s.2 size-b-s size-i-${name}"></div></td>
              </tr>
            `).join('')
          }
          return ''
        })()}
      </table>
    `)}" />

    <h2>Custom proportions</h2>
    <p>Add custom proportions by adding numbers like the following:</p>
    <pre lang="ts" code="${encodeString(example)}" />

    <p>Proportions are converted to relevant units automatically. Rem is used for sizing, ms for timing, raw number for oapcity, etc.</p>
  </page>
`

export default main
