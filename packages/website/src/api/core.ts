export interface Success<V> {
  success: true
  value: V
}

export type Option<V, E> = Success<V> | {
  success: false
  error: E
}

export interface ApiError {
  message: string
  cause: any
}
