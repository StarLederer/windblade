import type { Component } from 'solid-js'
import { Page } from '~/lib/rotuer'

const Main: Component = () => (
  <Page class="p-m.2 flex gap-s text-m.2 items-center font-bold">
    <div class="i-mdi-arrow-left" />
    Select something
  </Page>
)

export default Main
