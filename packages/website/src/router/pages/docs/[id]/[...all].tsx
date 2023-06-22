import { useNavigate, useParams } from '@solidjs/router'
import Button from '@ui/primitives/Button'
import type { CompiledDocumentationTree } from '@windblade/unocss-docs/src'
import type { Component } from 'solid-js'
import { Page } from '~/lib/rotuer'
import docsStore from '~/stores/docsStore'

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

  const tryOpenFirstPage = async () => {
    const mdle = await docsStore.getModuleById(params.moduleId)

    if (!mdle.success)
      return

    const pageAddress = findFirstPage(mdle.value.docs)

    if (pageAddress)
      navigate(`/docs/${params.moduleId}/${pageAddress.join('/')}`)
  }

  return (
    <Page class="p-m.2 flex flex-col gap-s justify-center items-center text-center font-semibold">
      <h2 class="text-fg-3 text-s">Navigation error</h2>
      <p class="text-m.2 font-bold">
        The page you are looking for is now a whole chapter.
      </p>
      <p class="text-$($s+$s.2)">
        Use the navigation menu to open any page inside this chapter.
      </p>
      <Button style="half" onClick={tryOpenFirstPage}>
        Or find first page
      </Button>
    </Page>
  )
}

export default Main
