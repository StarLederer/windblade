export type Option<V, E> = {
  success: true
  value: V
} | {
  success: false
  error: E
}

export interface ApiError {
  message: string
  cause: any
}
