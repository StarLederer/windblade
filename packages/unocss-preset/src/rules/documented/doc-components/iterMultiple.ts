export const iterObjects = (unoObjects: string[], keyAs: string, valueAs: string, innerXml: string) => unoObjects.map(obj => `
  <for object="${obj}" key-as="${keyAs}" value-as="${valueAs}">
    ${innerXml}
  </for>
`).join('')

export const iterArrays = (unoArrays: string[], valueAs: string, innerXml: string) => unoArrays.map(obj => `
  <for array="${obj}" value-as="${valueAs}">
    ${innerXml}
  </for>
`).join('')
