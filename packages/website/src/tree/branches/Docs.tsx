import type { Component } from 'solid-js'
import { For, Show, createEffect, createSignal } from 'solid-js'
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
} from 'solid-headless'
import Button from '@ui/primitives/Button'
import type { CompiledDocumentationTree } from '@windblade/unocss-docs'
import { Route } from '@solidjs/router'
import Nav from './Docs/components/Nav'
import Page from './Docs/components/Page'
import { escapeString } from './Docs/escapeString'
import docsStore from '~/stores/docsStore'
import { Outlet } from '~/lib/rotuer'

const docs = (): CompiledDocumentationTree => docsStore.docs() ?? []

const DocumentationRoutes: Component<{
  tree: CompiledDocumentationTree
}> = props => (
  <For each={props.tree}>
    {({ name, value }) => {
      const path = escapeString(name)
      if (typeof value === 'string') {
        return <Route path={path} element={<Page page={value} title={name} />} />
      }
      else {
        return (
          <Route path={`${path}`}>
            <DocumentationRoutes tree={value} />
          </Route>
        )
      }
    }}
  </For>
)

const Layout: Component = () => {
  const [containerSize, setContainerSize] = createSignal(0)
  const [drawerSize, setDrawerSize] = createSignal(0)
  const [drawerOpen, setDrawerOpen] = createSignal(false)
  const [drawerFlat, setDrawerFlat] = createSignal(false)

  let container: HTMLDivElement | undefined
  let drawer: HTMLElement | undefined

  const containerResizeObserver = new ResizeObserver(([entry]) => {
    setContainerSize(entry.borderBoxSize[0].inlineSize)
  })
  const drawerResizeObserver = new ResizeObserver(([entry]) => {
    setDrawerSize(entry.borderBoxSize[0].inlineSize)
  })

  createEffect(async () => {
    containerResizeObserver.disconnect()
    if (!container)
      return
    containerResizeObserver.observe(container)
  })
  createEffect(async () => {
    drawerResizeObserver.disconnect()
    if (!drawer)
      return
    drawerResizeObserver.observe(drawer)
  })

  createEffect(() => {
    setDrawerFlat(containerSize() >= drawerSize() * 4)
  })

  const drawerVisible = () => drawerOpen() || drawerFlat()

  const nav = (
    <nav class="p-m.2 overflow-auto border-solid border-0 border-ie-px border-color-fg-5 size-i-max size-b-full" ref={drawer}>
      <Nav prefix={['docs']} tree={docs()} />
    </nav>
  )

  return (
    <div class="flex flex-col absolute size-i-full size-b-full" ref={container}>
      <Show when={!drawerFlat()}>
        <div class="relative flex gap-s items-center p-s.4 p-i-m.2 border-solid border-0 border-be-px border-color-fg-5">
          <Button onClick={() => setDrawerOpen(!drawerOpen())} class="p-s.6 rounded-full" style="half">
            <div class={`i-mdi-menu ${!drawerOpen() ? 'opacity-s' : 'opacity-zero'} transition`} />
            <div class={`i-mdi-backburger ${drawerOpen() ? 'opacity-s' : 'opacity-zero'} transition absolute`} />
          </Button>
          <div class="flex flex-wrap gap-s.4 text-fg-3">
            {/* <For each={router.route().current.at(-1)?.split('-')}>
              {(crumb, i) => <>
                <div class={`${i() === 0 ? '' : 'text-fg-1 font-semibold'}`}>{crumb}</div>
                {i() === 0 && <div class="i-mdi-chevron-right" />}
              </>}
            </For> */}
          </div>
        </div>
      </Show>

      <div class={`size-b-full flex relative ${drawerFlat() ? 'flex-row' : 'flex-col'}`}>
        <Show
          when={!drawerFlat()}
          fallback={<aside>{nav}</aside>}
        >
          <Dialog isOpen={drawerVisible()} onClose={() => setDrawerOpen(false)} style="z-index: 1;" unmount={false} title="Navigation drawer">
            <Show when={drawerOpen() && !drawerFlat()}>
              <DialogOverlay class="absolute inset-0" />
            </Show>
            <DialogPanel class={`bg-normal-3 transition-transform ease-out ${drawerFlat() ? 'relative' : 'absolute inset-b-0 inset-is-0'}`} style={`transform: translateX(${drawerVisible() ? '0' : '-100%'})`}>
              {nav}
            </DialogPanel>
          </Dialog>
        </Show>

        <main class={`relative flex-1 transition-all ${(drawerOpen() && !drawerFlat()) ? 'blur-s.2 opacity-s.4' : ''}`} onClick={() => setDrawerOpen(false)}>
          <Outlet />
          {/* <DocumentationRoutes tree={docs()}/> */}
        </main>
      </div>
    </div>
  )
}

const Main: Component = () => (
  <Route path="docs" component={Layout}>
    <DocumentationRoutes tree={docs()} />
    <Route
      path="/*"
      element={
        <div class="size-b-full p-m.2 flex gap-m.2 text-m.2 items-center font-bold">
          <div class="i-mdi-arrow-left" />
          Select something
        </div>
      }
    />
  </Route>
)

export default Main
