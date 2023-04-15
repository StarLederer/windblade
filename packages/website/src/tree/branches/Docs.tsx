import type { Component } from 'solid-js'
import { For, Show, createEffect, createResource, createSignal } from 'solid-js'
import { Dialog, DialogOverlay, DialogPanel } from 'solid-headless'
import Button from '@ui/primitives/Button'
import type { CompiledDocumentationTree } from '@windblade/unocss-docs'
import { Route, useLocation, useMatch, useParams } from '@solidjs/router'
import Progress from '@ui/primitives/Progress'

import Index from './Docs/Index'
import DocPage from './Docs/components/Page'

import Nav from '~/components/DocsNav'
import docsStore from '~/stores/docsStore'
import { LocalLink, Outlet, Page } from '~/lib/rotuer'
import type { Module, ModuleId } from '~/api'

const DocumentationRoutes: Component<{
  tree: CompiledDocumentationTree
}> = props => (
  <For each={props.tree}>
    {({ name, value }) => {
      if (typeof value === 'string') {
        return <Route path={name} element={<DocPage page={value} title={name} />} />
      }
      else {
        return (
          <Route path={name}>
            <DocumentationRoutes tree={value} />
          </Route>
        )
      }
    }}
  </For>
)

const MaybeDocumentationRoutes: Component = () => {
  const { moduleId } = useParams<{ moduleId: ModuleId }>()
  const [mdle] = createResource(() => docsStore.getModuleById(moduleId))

  return (
    <Show when={mdle()} keyed>
      {option => option.success && <DocumentationRoutes tree={option.value.docs} />}
    </Show>
  )
}

const Layout: Component<{
  tree: CompiledDocumentationTree
  moduleId: ModuleId
}> = (props) => {
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

  const nav = <Nav
    tree={props.tree}
    prefix={['docs', props.moduleId]}
    class="p-m.2 overflow-auto border-solid border-0 border-ie-px border-color-fg-5 size-i-max size-b-full"
    ref={drawer}
    settings={{
      leafActive: path => !!useMatch(() => `/${path.join('/')}`)(),
      leafAs: props => (
        <LocalLink
          style="none"
          href={`/${props.path.join('/')}`}
          onClick={() => setDrawerOpen(false)}
          class={props.class}
        >
          {props.children}
        </LocalLink>
      ),
    }}
  />

  return (
    <div class="size-i-full size-b-full flex flex-col" ref={container}>
      <Show when={!drawerFlat()}>
        <div class="relative flex gap-s items-center p-s.4 p-i-m.2 border-solid border-0 border-be-px border-color-fg-5">
          <Button onClick={() => setDrawerOpen(!drawerOpen())} class="p-s.6 rounded-full" style="half">
            <div class={`i-mdi-menu ${!drawerOpen() ? 'opacity-s' : 'opacity-zero'} transition`} />
            <div class={`i-mdi-backburger ${drawerOpen() ? 'opacity-s' : 'opacity-zero'} transition absolute`} />
          </Button>
          <div class="flex flex-wrap gap-s.4 text-fg-3">
            <For each={decodeURIComponent(useLocation().pathname).split('/').slice(3)}>
              {(crumb, i) => <>
                <div class={`${i() === 0 ? '' : 'text-fg-1 font-semibold'}`}>{crumb}</div>
                {i() === 0 && <div class="i-mdi-chevron-right" />}
              </>}
            </For>
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
              <DialogOverlay class="absolute inset-0" onClick={() => setDrawerOpen(false)} />
            </Show>
            <DialogPanel class={`bg-normal-3 transition-transform ease-out ${drawerFlat() ? 'relative' : 'absolute inset-b-0 inset-is-0'}`} style={`transform: translateX(${drawerVisible() ? '0' : '-100%'})`}>
              {nav}
            </DialogPanel>
          </Dialog>
        </Show>

        <Outlet
          class={`flex-1 transition-all ${(drawerOpen() && !drawerFlat()) ? 'blur-s.2 opacity-s.4' : ''}`}
          as={props => <main class={props.class}>{props.children}</main>}
        />
      </div>
    </div>
  )
}

const MaybeLayout: Component = () => {
  const { moduleId } = useParams<{ moduleId: ModuleId }>()
  const [mdle, { refetch }] = createResource(() => docsStore.getModuleById(moduleId))

  return (
    <Page class="[*]:absolute flex justify-center items-center">
      <Show
        when={!mdle.loading}
        fallback={<Progress />}
      >
        <Show
          when={mdle()?.success}
          fallback={
            <div>
              Error loading module with ID '{moduleId}'
              <div class="flex flex-wrap justify-between gap-s.4 m-bs-s">
                <Button style="half" onClick={refetch}>Retry</Button>
                <LocalLink style="secondary" href="/docs">Back to all docs</LocalLink>
              </div>
            </div>
          }
        >
          <Layout tree={(mdle() as { value: Module }).value.docs} moduleId={moduleId} />
        </Show>
      </Show>
    </Page>
  )
}

const NotFound: Component = () => (
  <Page class="p-m.2 flex gap-s text-m.2 items-center font-bold">
    <div class="i-mdi-arrow-left" />
    Select something
  </Page>
)

const Main: Component = () => (
  <Route path="docs">
    <Route path="/" component={Index} />
    <Route path="/:moduleId" component={MaybeLayout}>
      <Route path="/*" component={NotFound} />
      <MaybeDocumentationRoutes />
    </Route>
  </Route>
)

export default Main
