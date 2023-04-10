import type { Component, ParentComponent } from 'solid-js'
import { Outlet } from '@solidjs/router'
import { Transition } from 'solid-transition-group'

const style = 'animation-duration-m.4'

const Main: Component<{
  class?: string
  as?: ParentComponent<{
    class: string
  }>
}> = (props) => {
  const className = () => `${props.class} relative size-i-full size-b-full overflow-hidden`
  const Container = props.as ?? (props => <section class={className()}>{props.children}</section>)

  return (
    <Container class={className()}>
      <Transition enterActiveClass={`${style} animate-in`} exitActiveClass={`${style} animate-out`}>
        <Outlet />
      </Transition>
    </Container>
  )
}

export default Main
