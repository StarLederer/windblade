import type { Component } from 'solid-js'
import { Suspense } from 'solid-js'
import type { DocumentationPage } from 'unocss-docs'
import Error from './Error'
import Xml from './Xml'
import libs from '~/lib/external'

const Main: Component<{
  title?: string // unused atm
  page: DocumentationPage
}> = (props) => {
  return (
    <div class="size-b-full overflow-auto">
      <div class="p-m.2 flex flex-col gap-s">
        <Suspense fallback="Loading...">
          {(() => {
            const parser = libs.xml()
            if (!parser)
              return 'Error: Failed to load XML parser'

            let xml
            try {
              xml = parser.fromXml(props.page)
            }
            catch (err) {
              return <Error>Error parsing this page</Error>
            }

            if (xml)
              return <Xml>{xml.children}</Xml>

            return <Error>Error processing this page</Error>
          })()}
        </Suspense>
      </div>
    </div>
  )
}

export default Main
