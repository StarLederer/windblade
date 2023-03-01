import { defineBuildConfig } from 'unbuild'

// We are using this just for stubs because unbuild cannot build solid componenets atm
export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
})
