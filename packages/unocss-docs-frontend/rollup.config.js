import { mkdir, writeFile } from 'fs/promises'
import { resolve } from 'path'

// rollup.config.js
import withSolid from 'rollup-preset-solid'

export default withSolid([{
  input: 'src/index.ts',
  plugins: [
    {
      name: 'reroute',
      buildEnd() {
        mkdir(resolve('dist'))
        writeFile(resolve('dist/index.cjs'), 'module.exports = require(\'./index/index.js\')')
        writeFile(resolve('dist/index.d.ts'), 'export * from \'./index\'\nexport { default } from \'./index/index.module.js\'')
        writeFile(resolve('dist/index.mjs'), 'export * from \'./index/index.module.js\'\nexport { default } from \'./index/index.module.js\'')
      },
    },
  ],
}])
