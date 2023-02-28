import { resolve } from 'path'
import { defineConfig } from 'vite'
// import favicon from 'vite-plugin-favicons-inject'
import solidPlugin from 'vite-plugin-solid'
import unocss from '@unocss/vite'
import transformerDirective from '@unocss/transformer-directives'
import presetIcons from '@unocss/preset-icons'
import presetVariants from 'unocss-preset-mini-variants'
import presetWindblade from 'unocss-preset-windblade'

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      'unocss-docs': resolve('../unocss-docs/src/index.ts'),
      'unocss-preset-windblade': resolve('../unocss-preset/src/index.ts'),
      '@windblade/core': resolve('../core/src/index.ts'),
      '@windblade/unocss-preset-color': resolve('../unocss-preset-color/src/index.ts'),
      '@windblade/unocss-preset-dollars': resolve('../unocss-preset-dollars/src/index.ts'),

      '@windblade': resolve('..'),
      '@ui': resolve('./submodules/ui'),
      '~': resolve('./src'),
    },
  },

  plugins: [
    // Breaks on GitHub actions for some reason
    // favicon(
    //   resolve('../brand/logo.svg'),
    //   {
    //     icons: {
    //       favicons: true,
    //       android: false,
    //       appleIcon: false,
    //       appleStartup: false,
    //       yandex: false,
    //       windows: false,
    //     },
    //   }
    // ),
    solidPlugin(),
    unocss({
      presets: [
        presetWindblade(),
        presetVariants(),
        presetIcons(),
      ],
      transformers: [
        transformerDirective(),
      ],
      safelist: [
        ...['scheme-light', 'scheme-dark'].flatMap(v1 => [240, 260].map(v2 => `${v1}-${v2}`)),
      ],
      rules: [
        ['highlight', { filter: 'brightness(1.2) saturate(0.6)' }],
        ['highlight+', { filter: 'brightness(1.6) saturate(0.4)' }],
      ],
    }),
  ],
})
