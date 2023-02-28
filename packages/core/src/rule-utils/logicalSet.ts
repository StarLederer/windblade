import type { Rule } from '@unocss/core'
import type Theme from '../theme/Theme'

export const abbreviations = {
  axis: {
    b: 'block',
    i: 'inline',
  },
  edges: {
    bs: 'block-start',
    be: 'block-end',
    is: 'inline-start',
    ie: 'inline-end',
  },
  blockEdges: {
    bs: 'block-start',
    be: 'block-end',
  },
  inlineEdges: {
    is: 'inline-start',
    ie: 'inline-end',
  },
  coners: {
    ss: 'start-start',
    se: 'start-end',
    es: 'end-start',
    ee: 'end-end',
  },
} as const

export type Axis = typeof abbreviations.axis[keyof typeof abbreviations.axis]
export type Edge = typeof abbreviations.edges[keyof typeof abbreviations.edges]
export type BlockEdge = typeof abbreviations.blockEdges[keyof typeof abbreviations.blockEdges]
export type InlineEdge = typeof abbreviations.inlineEdges[keyof typeof abbreviations.inlineEdges]
export type Corner = typeof abbreviations.coners[keyof typeof abbreviations.coners]

const join = (arr: Array<any>) => (arr.filter(Boolean).join('-'))

export const axisRules = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<Theme>,
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, 'b', postfix]), join([propertyPrefix, 'block', propertyPostfix])),
  rule(join([prefix, 'i', postfix]), join([propertyPrefix, 'inline', propertyPostfix])),
])

export const edgeRules = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<Theme>,
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, 'b', postfix]), join([propertyPrefix, 'block', propertyPostfix])),
  rule(join([prefix, 'bs', postfix]), join([propertyPrefix, 'block-start', propertyPostfix])),
  rule(join([prefix, 'be', postfix]), join([propertyPrefix, 'block-end', propertyPostfix])),
  rule(join([prefix, 'i', postfix]), join([propertyPrefix, 'inline', propertyPostfix])),
  rule(join([prefix, 'is', postfix]), join([propertyPrefix, 'inline-start', propertyPostfix])),
  rule(join([prefix, 'ie', postfix]), join([propertyPrefix, 'inline-end', propertyPostfix])),
])

export const cornerRules = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<Theme>,
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, 'ss', postfix]), join([propertyPrefix, 'start-start', propertyPostfix])),
  rule(join([prefix, 'se', postfix]), join([propertyPrefix, 'start-end', propertyPostfix])),
  rule(join([prefix, 'ee', postfix]), join([propertyPrefix, 'end-end', propertyPostfix])),
  rule(join([prefix, 'es', postfix]), join([propertyPrefix, 'end-start', propertyPostfix])),
])
