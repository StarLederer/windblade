import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import Button from '@ui/primitives/Button'
import type { Props } from '../../Utils'

const main: Component<Props> = (props) => {
  const [val, setVal] = createSignal(1)

  const activate = () => {
    // props.onChange(`${val()}`)
  }

  createEffect(activate)

  const buttonClasses = 'size-b-m.2 p-i-s.6 self-stretch'

  return (
    <div class="rounded-s.4 overflow-hidden flex items-center">
      <Button style="secondary" class={buttonClasses} onClick={() => setVal(val() - 1)}>-</Button>
      <Button style="secondary" class={buttonClasses} onClick={activate}>{val}</Button>
      <Button style="secondary" class={buttonClasses} onClick={() => setVal(val() + 1)}>+</Button>
    </div>
  )
}

export default main
