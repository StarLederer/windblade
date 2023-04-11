import type { Component } from 'solid-js'
import { Suspense } from 'solid-js'
import type { DocumentationPage } from 'unocss-docs'

import XmlRoot from './Page/XmlRoot'

import Error from '~/lib/Error'
import libs from '~/lib/external'
import { Page } from '~/lib/rotuer'

const Main: Component<{
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

export default Main
