export function iterObjects(unoObjects: string[], keyAs: string, valueAs: string, innerXml: string) {
  return unoObjects.map(obj => `
    <for object="${obj}" key-as="${keyAs}" value-as="${valueAs}">
      ${innerXml}
    </for>
  `).join('')
}

export function iterArrays(unoArrays: string[], valueAs: string, innerXml: string) {
  return unoArrays.map(obj => `
    <for array="${obj}" value-as="${valueAs}">
      ${innerXml}
    </for>
  `).join('')
}
