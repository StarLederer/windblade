import { resolve } from 'path'
import { defineConfig } from 'vite'
import favicon from 'vite-plugin-favicons-inject';
import solidPlugin from 'vite-plugin-solid';
import unocss from '@unocss/vite';
import transformerDirective from '@unocss/transformer-directives'
import presetIcons from '@unocss/preset-icons';
import presetVariants from 'unocss-preset-mini-variants';
import unocssPresetWindblade from "../unocss/src";

export default defineConfig({
  base: "./",

  resolve: {
    alias: {
      'windblade': resolve('../unocss/src'),
      '@windblade': resolve('..'),
      '@ui': resolve('./submodules/ui'),
      '~': resolve('./src'),
    },
  },

  plugins: [
    favicon(
      '../brand/logo.svg',
      {
        icons: {
          favicons: true,
          android: false,
          appleIcon: false,
          appleStartup: false,
          yandex: false,
          windows: false,
        },
      }
    ),
    solidPlugin(),
    unocss({
      presets: [
        presetVariants(),
        presetIcons(),
        unocssPresetWindblade(),
      ],
      transformers: [
        transformerDirective(),
      ],
      extendTheme: [
        ({ windblade }) => {
          windblade.proportions = {
            's.2': 0.2,
            's.4': 0.4,
            's.5': 0.5,
            's.6': 0.6,
            's.8': 0.8,
            's': 1,
            'm.2': 2,
            'm.4': 4,
            'm.5': 5,
            'm.6': 6,
            'm.8': 8,
            'm': 10,
            'l.2': 20,
            'l.4': 40,
            'l.5': 50,
            'l.6': 60,
            'l.8': 80,
            'l': 100,
          };
        }
      ],
      safelist: [
        ...["scheme-light", "scheme-dark"].flatMap((v1) => [240, 260].map((v2) => `${v1}-${v2}`)),
      ],
      rules: [
        ['highlight', { filter: 'brightness(1.2)' }],
        ['highlight+', { filter: 'brightness(1.4)' }]
      ],
    }),
  ],
})
