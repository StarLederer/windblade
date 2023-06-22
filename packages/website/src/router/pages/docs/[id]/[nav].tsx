import { Show, Suspense, createResource } from 'solid-js'
import type { Component } from 'solid-js'
import { useParams } from '@solidjs/router'
import type { DocumentationPage, DocumentationTree } from '@windblade/unocss-docs'

import type { ModuleId } from '~/api'
import docsStore from '~/stores/docsStore'
import XmlRoot from '~/lib/uno-xml/XmlRoot'
import Error from '~/lib/Error'
import libs from '~/lib/external'
import { Page } from '~/lib/rotuer'

const DocPage: Component<{
  title: string
  page: DocumentationPage
}> = (props) => {
  return (
    <Page class="p-m.2 [&>*]:m-be-s">
      <Suspense fallback="Loading...">
        {(() => {
          const parser = libs.xml()
          if (!parser)
            return 'Error: Failed to load XML parser'

          let xml
          try {
            xml = parser.fromXml(props.page)
          }
          catch (err: unknown) {
            return <Error>Error parsing this page: {err as string}</Error>
          }

          if (xml)
            return <XmlRoot {...xml} title={props.title} />

          return <Error>Error processing this page</Error>
        })()}
      </Suspense>
    </Page>
  )
}

const navigateDocTree = (docs: DocumentationTree, path: string[], i = 0): DocumentationPage | DocumentationTree | undefined => {
  const nav = path[i]

  if (!nav)
    return docs

  const child = docs.get(decodeURIComponent(nav))

  if (child instanceof Map)
    return navigateDocTree(child, path, ++i)

  return child
}

const Main: Component = () => {
  const params = useParams<{
    moduleId: ModuleId
    l1: string
    l2: string
    l3: string
    l4: string
    l5: string
    l6: string
  }>()
  const [mdle] = createResource(() => docsStore.getModuleById(params.moduleId))

  return (
    <Show
      when={!mdle.loading}
      fallback={<Page>Loading...</Page>}
    >
      <Show
        when={!mdle.error}
        fallback={<Page>Error</Page>}
      >
        <Show
          when={mdle()}
          fallback={<Page>No data</Page>}
          keyed
        >
          {(md) => {
            if (md.success) {
              const title = decodeURIComponent(params.l6 ?? params.l5 ?? params.l4 ?? params.l3 ?? params.l2 ?? params.l1)
              const value = navigateDocTree(md.value.docs, [params.l1, params.l2, params.l3, params.l4, params.l5, params.l6])

              if (typeof value !== 'string')
                return <Page>This page doesn't exist</Page>

              return <DocPage page={value} title={title} />
            }
            else {
              return <Page>Error</Page>
            }
          }}
        </Show>
      </Show>
    </Show>
  )
}

export default Main
