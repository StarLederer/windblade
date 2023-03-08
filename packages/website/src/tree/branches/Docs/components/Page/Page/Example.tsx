import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import Viewport from './Viewport'
import uno from '~/unocss'

const main: Component<{
  html: string
}> = (props) => {
  const [css, setCss] = createSignal('')

  createEffect(async () => {
    setCss((await uno.generate(props.html)).css)
  })

  return <Viewport
    html={props.html}
    css={css()}
  />
}

export default main
