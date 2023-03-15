import type { Component, JSXElement } from 'solid-js'
import { For } from 'solid-js'
import type { CompiledDocumentationTree } from '@windblade/unocss-docs'
import { LocalLink } from '~/lib/rotuer'
import Container from '~/lib/Container'
import docsStore from '~/stores/docsStore'

const styles = {
  header: {
    li: 'bg-normal-4 p-s p-b-s.6 rounded-m.2 border border-color-surface',
  },
  h2: 'text-fg-1 text-m.4 font-extrabold',
  h3: 'font-extrabold text-$($m.2+$s) text-fg-1',
  h4: 'font-bold text-m.2 text-fg-2',
  h5: 'font-semibold text-fg-2 p-s',
  p: 'leading-$($s+$s.2) max-size-i-[128ch]',
  pre: 'p-s overflow-auto last:flex-1',
}

const modules: {
  icon: JSXElement
  name: string
  description: string
  official?: boolean
  loadDocs: () => Promise<CompiledDocumentationTree>
}[] = [
  {
    icon: <div class="i-mdi-package" />,
    name: 'Complete',
    description: 'Normal Windblade. This is a temporary entry so we can switch back to it.',
    official: true,
    loadDocs: async () => (await import('unocss-preset-windblade')).docs.default,
  },
  {
    icon: <div class="i-mdi-palette" />,
    name: 'Color',
    description: 'Semantic color utils from Windblade.',
    official: true,
    loadDocs: async () => (await import('@windblade/unocss-preset-color')).docs.default,
  },
  {
    icon: <div class="i-mdi-dollar" />,
    name: 'Dollars',
    description: '$ syntax from Windblade.',
    official: true,
    loadDocs: async () => (await import('@windblade/unocss-preset-dollars')).docs.default,
  },
]

const Main: Component = () => {
  return (
    <div class="absolute size-i-full size-b-full overflow-auto">
      <section class="p-b-m font-semibold">
        <Container class="flex flex-col gap-s">
          <h2 class={styles.h2}>Modules</h2>
          <div class="text-$($s+$s.4) leading-$($s+$s.2) max-size-i-[48ch] text-fg-3">
            Windblade offers modules that are subsets of the complete experience as well as extesnions of it.
          </div>
        </Container>
      </section>

      <Container>
        <section>
          <ul class="list-none grid grid-fit-cols-m gap-s">
            <For each={modules}>
              {mdle => (
                <li>
                  <LocalLink style="none" class="size-b-full transition bg-accent-4 text-fg-3 border border-color-surface p-m.2 p-be-s gap-m.2 rounded-s flex flex-col justify-between" href="/docs"
                    onClick={async () => {
                      docsStore.setDocs(await mdle.loadDocs())
                    }}
                  >
                    <div class="text-m.2">{mdle.icon}</div>
                    <div class="flex flex-col gap-s">
                      <div class="flex flex-col gap-s.4">
                        <h3 class="text-m.2 font-bold text-fg-2">{mdle.name}</h3>
                        <p class="leading-$($s+$s.2)">{mdle.description}</p>
                      </div>
                      <div class="flex gap-s.4">
                        {mdle.official
                          ? <>
                            <div class="i-mdi-crown" />
                            Official
                          </>
                          : <>
                            <div class="i-mdi-account-group" />
                            Community
                          </>
                        }
                      </div>
                    </div>
                  </LocalLink>
                </li>
              )}
            </For>
          </ul>
        </section>
      </Container>
    </div>
  )
}

export default Main
