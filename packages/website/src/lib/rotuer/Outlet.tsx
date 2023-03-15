import type { Component } from 'solid-js'
import { Outlet } from '@solidjs/router'
import { Transition } from 'solid-transition-group'

const style = 'animation-duration-m.4'

const Main: Component = () => (
  <section class="relative size-i-full size-b-full">
    <Transition appear enterActiveClass={`${style} animate-in`} exitActiveClass={`${style} animate-out`}>
      <Outlet />
    </Transition>
  </section>
)

export default Main
