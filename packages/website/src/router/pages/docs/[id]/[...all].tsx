import { useNavigate, useParams } from '@solidjs/router'
import type { CompiledDocumentationTree } from '@windblade/unocss-docs/src'
import type { Component } from 'solid-js'
import { Page } from '~/lib/rotuer'
import docsStore from '~/stores/docsStore'

const Hint: Component = () => (
  <Page class="p-m.2 flex gap-s text-m.2 items-center font-bold">
    <div class="i-mdi-arrow-left" />
    Select something
  </Page>
)

const findFirstPage = (docs: CompiledDocumentationTree, prefix: string[] = []): string[] | undefined => {
  for (let i = 0; i < docs.length; ++i) {
    const pageOrChapter = docs[i].value
    if (typeof pageOrChapter === 'string')
      return [...prefix, docs[i].name]

    const inChildren = findFirstPage(pageOrChapter, [...prefix, docs[i].name])

    if (inChildren)
      return inChildren
  }

  // No pages in these docs
  return undefined
}

const Main: Component = () => {
  const params = useParams()
  const navigate = useNavigate()

  ;(async () => {
    const mdle = await docsStore.getModuleById(params.moduleId)

    if (!mdle.success)
      return

    const pageAddress = findFirstPage(mdle.value.docs)

    if (pageAddress)
      navigate(`/docs/${params.moduleId}/${pageAddress.join('/')}`)
  })()

  return (
    <Page class="p-m.2">
      Redirecting...
    </Page>
  )
}

export default Main
