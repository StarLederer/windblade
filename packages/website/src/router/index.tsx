import type { Component } from 'solid-js'
import { Show, createEffect, createSignal } from 'solid-js'
import { Route, Router, Routes } from '@solidjs/router'
import { Popover, PopoverButton, PopoverPanel } from 'solid-headless'
import logoWhite from '@windblade/brand/logo-white.svg'
import logoBlack from '@windblade/brand/logo-black.svg'
import Button from '@ui/primitives/Button'
import ButtonBase from '@ui/primitives/Button/Base'
import Link from '@ui/primitives/Button/Link'
import { RematchDynamic } from '@ui/solid-router'

import Index from './pages/index'
import DocsIndex from './pages/docs/index'
import DocsId from './pages/docs/[id]'
import DocsIdAll from './pages/docs/[id]/[...all]'
import DocsIdNav from './pages/docs/[id]/[nav]'

import themeStore from '~/stores/themeStore'
import { LocalLink, Outlet, spaIntegration } from '~/lib/rotuer'

const Layout: Component = () => {
  const [containerSize, setContainerSize] = createSignal(0)
  const [menuSize, setMenuSize] = createSignal(0)
  const [menuFlat, setMenuFlat] = createSignal(false)

  let container: HTMLDivElement | undefined
  let menu: HTMLDivElement | undefined

  const menuItems = () => <>
    <LocalLink href="/">Home</LocalLink>
    <LocalLink href="/docs">Docs</LocalLink>
    <Button onClick={themeStore.toggleScheme} class="p-s rounded-s relative">
      <div class="i-mdi-brightness-4 transition" style={`opacity: ${themeStore.enforceScheme() === undefined ? 1 : 0}`} />
      <div class="absolute i-mdi-brightness-7 transition" style={`opacity: ${themeStore.enforceScheme() === 'light' ? 1 : 0}`} />
      <div class="absolute i-mdi-brightness-2 transition" style={`opacity: ${themeStore.enforceScheme() === 'dark' ? 1 : 0}`} />
    </Button>
    <Link href="https://github.com/StarLederer/windblade"><div class="i-simple-icons-github" /></Link>
  </>

  const containerResizeObserver = new ResizeObserver(([entry]) => {
    setContainerSize(entry.borderBoxSize[0].inlineSize)
  })
  const menuResizeObserver = new ResizeObserver(([entry]) => {
    setMenuSize(entry.borderBoxSize[0].inlineSize)
  })

  createEffect(async () => {
    containerResizeObserver.disconnect()
    if (!container)
      return
    containerResizeObserver.observe(container)
  })
  createEffect(async () => {
    menuFlat()
    menuResizeObserver.disconnect()
    if (!menu)
      return
    menuResizeObserver.observe(menu)
  })

  createEffect(() => {
    setMenuFlat(containerSize() >= menuSize() * 1.2)
  })

  return (
    <div class="size-b-full grid" style="grid-template-rows: auto minmax(0, 1fr);">
      <header class="p-b-s.4 p-m.2 border border-color-transparent border-be-color-fg-5 flex items-center">
        <h1 class="font-bold text-fg-1 ">
          <LocalLink style="none" href="/" class="flex gap-s.4 items-center -m-i-s.4 p-s.4 p-ie-s rounded-full transition-all hover:bg-accent-4">
            <Show
              when={themeStore.scheme() === 'dark'}
              fallback={<img src={logoBlack} alt="Logo" class="size-b-m.2" />}
            >
              <img src={logoWhite} alt="Logo" class="size-b-m.2" />
            </Show>
            Windblade
          </LocalLink>
        </h1>

        <div ref={container} class="flex-1 flex justify-end">
          <div class={`flex gap-s.4 ${!menuFlat() ? 'invisible fixed' : ''}`} ref={menu} aria-hidden={!menuFlat()}>
            {menuItems}
          </div>

          <Popover defaultOpen={false} class={`${menuFlat() ? 'hidden' : ''}`} >
            {({ isOpen }) => <>
              <ButtonBase style="half" class="rounded-full p-s" as={baseProps => (
                <PopoverButton {...baseProps} />
              )}>
                <div class="i-mdi-dots-vertical" />
              </ButtonBase>
              <PopoverPanel unmount={false} class="relative">
                <div class={`flex flex-col gap-s.2 absolute inset-ie-0 inset-bs-0 bg-surface rounded-s m-b-s.8 p-s.2 border border-color-surface animation-duration-s animation-ease-linear backdrop-blur-s delay-m.2 ${isOpen() ? 'delay-zero animate-in' : 'animate-out invisible'}`} style={'z-index: 1'}>
                  {menuItems}
                </div>
              </PopoverPanel>
            </>}
          </Popover>
        </div>
      </header>

      <Outlet />
    </div>
  )
}

const Main: Component = () => {
  return (
    <Router source={spaIntegration()}>
      <Routes>
        <Route path="/" component={Layout} >
          <Route path="/" component={Index} />
          <Route path="/docs" element={<Outlet />}>
            <Route path="/" component={DocsIndex} />
            <Route path="/:moduleId" element={<RematchDynamic on={p => p.moduleId} component={DocsId}/>}>
              <Route path="/*" component={DocsIdAll} />
              <Route path="/:l1/:l2?/:l3?/:l4?/:l5?/:l6?" element={<RematchDynamic component={DocsIdNav} />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default Main
