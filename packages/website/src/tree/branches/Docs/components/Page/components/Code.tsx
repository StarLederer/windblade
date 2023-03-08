import type { Component } from 'solid-js'
import Error from '../components/Error'
import libs from '~/lib/external'

const { highlighter } = libs

const main: Component<{
  lang: string
  value: string
}> = (props) => {
  const style = `bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto ${props.lang ?? ''}`

  if (!props.lang)
    return <pre class={style}>{props.value}</pre>

  let highlighted = props.value
  try {
    highlighted = highlighter()?.highlight(props.value, { language: props.lang }).value ?? ''
  }
  catch (err: any) {
    return <Error>Failed highlighting code. {err.message}</Error>
  }

  return <pre class={style} innerHTML={highlighted} />
}

export default main
