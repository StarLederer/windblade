import type { ParentComponent } from 'solid-js'
import type { IBaseProps } from '@ui/primitives/Button/Base'
import Base from '@ui/primitives/Button/Base'
import navigate from '.'

type IMainProps = IBaseProps & {
  href: string
  onClick?: () => void
}

const Main: ParentComponent<IMainProps> = (props) => {
  const searchParams = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    urlParams.set('navigation', props.href)
    return urlParams.toString()
  }

  return (
    <Base
      class={props.class}
      style={props.style}
      hue={props.hue}
      as={baseProps => (
        <a
          class={baseProps.class}
          style={`text-decoration: none; ${baseProps.style}`}
          href={`?${searchParams()}`}
          onClick={(ev) => {
            ev.preventDefault()
            navigate(props.href)
            props.onClick?.()
          }}
        >
          {baseProps.children}
        </a>
      )}
    >
      {props.children}
    </Base>
  )
}

export default Main
