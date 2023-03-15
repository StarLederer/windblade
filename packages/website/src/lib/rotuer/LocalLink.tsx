import type { ParentComponent } from 'solid-js'
import { A } from '@solidjs/router'
import type { IBaseProps } from '@ui/primitives/Button/Base'
import Base from '@ui/primitives/Button/Base'

type IMainProps = IBaseProps & {
  href: string
  onClick?: () => void
  activeClass?: string
}

const Main: ParentComponent<IMainProps> = (props) => {
  return (
    <Base
      class={props.class}
      style={props.style}
      hue={props.hue}
      as={baseProps => (
        <A
          class={baseProps.class}
          style={`text-decoration: none; ${baseProps.style}`}
          href={props.href}
          activeClass={props.activeClass}
          onClick={() => {
            props.onClick?.()
          }}
        >
          {baseProps.children}
        </A>
      )}
    >
      {props.children}
    </Base>
  )
}

export default Main
