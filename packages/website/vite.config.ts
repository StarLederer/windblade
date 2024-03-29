import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import unocss from '@unocss/vite'
import transformerDirective from '@unocss/transformer-directives'
import presetIcons from '@unocss/preset-icons'
import presetVariants from 'unocss-preset-mini-variants'
import presetWindblade from '@windblade/unocss-preset'

// import favicon from 'vite-plugin-favicons-inject'

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@windblade/core': resolve('../core/src/index.ts'),
      '@windblade/unocss-docs': resolve('../unocss-docs/src/index.ts'),
      '@windblade/unocss-preset': resolve('../unocss-preset/src/index.ts'),
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
        'scheme-light-260',
        'scheme-dark-240',
      ],
      rules: [
        ['highlight', { filter: 'brightness(1.2) saturate(0.6)' }],
        ['highlight+', { filter: 'brightness(1.6) saturate(0.4)' }],
      ],
    }),
  ],
})
