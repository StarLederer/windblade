import { ruleUtils } from '@windblade/core'

const { logical } = ruleUtils

export const selectLogical = (options: {
  axis?: boolean
  edges?: boolean
  corners?: boolean
}) => `
  <select>
    ${[
      ...(options.axis ? Object.keys(logical.abbreviations.axis) : []),
      ...(options.edges ? Object.keys(logical.abbreviations.edges) : []),
      ...(options.corners ? Object.keys(logical.abbreviations.coners) : []),
    ].map(pos => `
      <option value="${pos}"/>
    `).join('')}
  </select>
`
