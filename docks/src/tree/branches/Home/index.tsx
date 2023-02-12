import { Component, Show } from "solid-js";
import { navigate, } from "~/lib/rotuer";
import Button from "@ui/primitives/Button";
import Link from "@ui/primitives/Button/Link";
import Container from "~/lib/Container";
import syntax from "~/lib/syntax";

import colorsTwJs from "./content/colors/tw.js.txt?raw";
import colorsTwHtml from "./content/colors/tw.html.txt?raw";
import colorsWbJs from "./content/colors/wb.js.txt?raw";
import colorsWbHtml from "./content/colors/wb.html.txt?raw";
import fgColorsTw from "./content/fgColors/tw.html.txt?raw";
import fgColorsWb from "./content/fgColors/wb.html.txt?raw";
import themeTw from "./content/theme/tw.js.txt?raw";
import themeWb from "./content/theme/wb.js.txt?raw";
import calculationsTw from "./content/calculations/tw.html.txt?raw";
import calculationsWb from "./content/calculations/wb.html.txt?raw";
import jsTw from "./content/js/tw.js.txt?raw";
import jsWb from "./content/js/wb.js.txt?raw";

const styles = {
  h3: "font-extrabold text-$($m.2+$s) text-fg-1",
  h4: "font-bold text-m.2 text-fg-2",
  h5: "font-semibold text-fg-2 p-s",
  p: "leading-$($s+$s.2) max-size-i-[128ch]",
  pre: "p-s overflow-auto last:flex-1",
};

const Comparison: Component<{
  code: {
    tw: {
      js?: string;
      html?: string;
    },
    wb: {
      js?: string;
      html?: string;
    },
  }
}> = (props) => (
  <div class="grid grid-fit-cols-m gap-s.4">
    <div class="bg-surface rounded-s flex flex-col">
      <h5 class={styles.h5}>T🤮ilwind:</h5>
      <Show when={props.code.tw.js} keyed>
        {(code) => <>
          <div class="size-b-px bg-surface" />
          <pre class={`${styles.pre} js`} innerHTML={syntax.highlighter()?.highlight(code, { language: "js" }).value} />
        </>}
      </Show>
      <Show when={props.code.tw.html} keyed>
        {(code) => <>
          <div class="size-b-px bg-surface" />
          <pre class={styles.pre} innerHTML={syntax.highlighter()?.highlight(code, { language: "xml" }).value} />
        </>}
      </Show>
    </div>
    <div class="bg-surface rounded-s flex flex-col">
      <h5 class={styles.h5}>Windblade ⚡:</h5>
      <Show when={props.code.wb.js} keyed>
        {(code) => <>
          <div class="size-b-px bg-surface" />
          <pre class={`${styles.pre} js`} innerHTML={syntax.highlighter()?.highlight(code, { language: "js" }).value} />
        </>}
      </Show>
      <Show when={props.code.wb.html} keyed>
        {(code) => <>
          <div class="size-b-px bg-surface" />
          <pre class={styles.pre} innerHTML={syntax.highlighter()?.highlight(code, { language: "xml" }).value} />
        </>}
      </Show>
    </div>
  </div>
);

const CTA: Component = () => (
  <Button style="solid" onClick={() => navigate("/docs/setup")}>
    Get started
    <div class="i-mdi-arrow-right" />
  </Button>
);

const Main: Component = () => {
  return (
    <div class="size-b-full overflow-auto">
      <section class="p--bm.2 p-b-m font-semibold bg-gradient-to-ss from-surface">
        <Container>
          <div class="font-bold text-m.2">
            <h2 class="text-fg-1 text-m.4 font-extrabold m-be-s">
              Essentailly Tailwind&nbsp;
              <span class="text-fg-1 text-m.2 font-extrabold">but:</span>
            </h2>
            <ul class="list-none m-be-s">
              <li>UnoCSS preset,</li>
              <li>Better color system,</li>
              <li>Logical properties,</li>
              <li>Easier to customize,</li>
              <li>Has Javascript core.</li>
            </ul>
          </div>
          <p class={`${styles.p} text-fg-3 m-be-s`}>
            Windblade is a Tailwind-inspired UnoCSS preset that does multiple things better than Tailwind. First, Windblade uses semantic hue-less colors that automatically adapt to the browser color scheme. Second, it uses logical properties instead of right-to-left, top-to-bottom ones and polyfills logical values which have not been implemented in CSS yet. Third, it has a much simpler theme that is faster to customize and fit your design language. And finally, it has a Javascript core that gives access to design tokens at runtime (e.g. for drawing to canvas).
          </p>
          <CTA />
        </Container>
      </section>

      <Container>
        <div class="flex flex-col gap-m p-b-m text-fg-3">
          <section class="flex flex-col gap-m.2">
            <h3 class={styles.h3}>Semantic colors</h3>

            <div class="flex flex-col gap-m.4">
              <section class="flex flex-col gap-s">
                <h4 class={styles.h4}>Tailwind has too many colors</h4>
                <p class={styles.p}>
                  Tailwind has an incomprehensible amount of colors which is very hard to customize. Windblade's semantic colors solve this by using color "meanings" like 'background' or 'surface' instead of actual color values like 'red', 'green', 'blue' or 'desaturated blue' and generating both background and foreground colors. HSL is used in the background to power this so you can use any hue you need with the hue-number or --hue CSS variable
                </p>
                <Comparison code={{
                  tw: {
                    js: colorsTwJs,
                    html: colorsTwHtml,
                  },
                  wb: {
                    js: colorsWbJs,
                    html: colorsWbHtml,
                  }
                }} />
              </section>

              <section class="flex flex-col gap-s">
                <h4 class={styles.h4}>Foreground colors in Tailwind are too much manual work</h4>
                <p class={styles.p}>
                  Tailwind provides a color framework but does not help you use it. Windblade's semantic colors solve this by automatically applying foreground colors and giving you semantic variations of them.
                </p>
                <Comparison code={{
                  tw: {
                    html: fgColorsTw,
                  },
                  wb: {
                    html: fgColorsWb,
                  }
                }} />
              </section>

              <section class="flex flex-col gap-s">
                <h4 class={styles.h4}>Color-scheme adaptation with Tailwind is a nightmare</h4>
                <p class={styles.p}>
                  Because Tailwind defines static color values you have to manually set light and dark colors every time which is twice as much code as it could be. Windblade's semantic colors solve this by flipping the lightness value so you only declare what the color means, and Windblade figures out exactly what it should look like in different color schemes.
                </p>
                <Comparison code={{
                  tw: {
                    html: '<div class="bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"> Hello </div>',
                  },
                  wb: {
                    html: '<div class="bg-blue"> Hello </div>',
                  }
                }} />
              </section>
            </div>
          </section>

          <section class="flex flex-col gap-s">
            <h3 class={styles.h3}>Logical properties</h3>
            <p class={styles.p}>
              Tailwind is very hard to use for multilanguage applications because layout reorientation has to be done manually. Windblade solves this by replacing all physical properties with logical counterparts even where CSS doesn't support it yet.
            </p>

            <Comparison code={{
              tw: {
                html: '<div class="rtl:m-right-l ltr:m-left-l"></div>\n<div>Horizontal writing modes are not supported at all =(</div>',
              },
              wb: {
                html: '<div class="m-ie-l"></div>\n<div class="size-i-l"> Size in the direction of writing (width if horizontal, height if vertical) </div>',
              }
            }} />
          </section>

          <section class="flex flex-col gap-s">
            <h3 class={styles.h3}>Simpler theme</h3>
            <p class={styles.p}>
              Tailwind configures a lot of things separately which takes a long time to customize and could just be automated. Windblade has a simpler theme that you can bend completely to your design language and rhythm very quickly.
            </p>

            <Comparison code={{
              tw: {
                js: themeTw,
              },
              wb: {
                js: themeWb,
              }
            }} />
          </section>

          <section class="flex flex-col gap-s">
            <h3 class={styles.h3}>Javascript core</h3>
            <p class={styles.p}>
              Windblade has a Javascript core that can be used in your front-end to process your design tokens. This mostly useful in sitations when you need to draw to an HTML canvas with Windblade colors.
            </p>

            <Comparison code={{
              tw: {
                js: jsTw,
              },
              wb: {
                js: jsWb,
              }
            }} />
          </section>

          <section class="flex flex-col gap-s">
            <h3 class={styles.h3}>Bonus: calculations</h3>
            <p class={styles.p}>
              Tailwind allows you to use custom values when your design specification does not fit with their design language. Windblade does not allow that to help you stay within your design language but allows you to do calculations with your proportions right inside CSS.
            </p>

            <Comparison code={{
              tw: {
                html: calculationsTw,
              },
              wb: {
                html: calculationsWb,
              }
            }} />
          </section>
        </div>
      </Container>

      <section class="bg-gradient-to-ss from-surface to-normal-2">
        <Container class="flex flex-col items-start gap-s p-b-m">
          <h3 class={styles.h3}>Ready to improve your Tailwind workflow?</h3>
          <p class={styles.p}>Learn how to set up, customize and use Windblade. No preliminary knowledge of Tailwind required <span class="text-fg-3">(Actually it is required at the moment but we are working to change that)</span>.</p>
          <CTA />
        </Container>
      </section>

      <footer>
        <Container class="flex items-center gap-s.4 p-b-m.2">
          Made by <Link href="https://github.com/StarLederer">Star Lederer</Link>
        </Container>
      </footer>
    </div>
  );
};

export default Main;
