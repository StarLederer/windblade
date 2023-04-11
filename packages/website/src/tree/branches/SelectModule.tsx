import type { Component } from 'solid-js'

import Container from '~/lib/Container'
import { Page } from '~/lib/rotuer'
import Modules from '~/components/MoludeList'

const Main: Component = () => {
  return (
    <Page>
      <Container class="p-b-m.2">
        <h2 class="text-fg-1 text-m.4 font-extrabold m-be-s">Docs</h2>
        <p class="text-$($s+$s.4) font-semibold m-be-m.2">Please select a Windblade module to see the documentation for.</p>
        <Modules />
      </Container>
    </Page>
  )
}

export default Main
