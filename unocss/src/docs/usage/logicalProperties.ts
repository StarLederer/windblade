import { DocumentedThemeObject } from "../../docs/types";

const colors: DocumentedThemeObject = (_, { h1, h2, p, ul, pre }) => [
  h1("Using logical properties"),
  p("Windblade uses logical properties and values only."),
  p("All properties that can be customized on multiple axis/edges/corenrs can be appended with:"),
  ul([
    "-b for block axis (e.g. size-b).-b for block axis (e.g. size-b).",
    "-i for inline axis (e.g. size-i).",
    "-bs and -be for block start and end edges.",
    "-is and -ie for inline start and end edges.",
    "-ss -se -es -ee for corners (start start, start end, end start & end end)",
  ]),
  p("Windblade polyfills logical values so you can use this even where CSS does not support it yet (e.g. background-position with bg-{corner} utility)."),
  p("If you are new to logical properties try playing with bg-gradient-to-{edge/corner} and see which way the gradient goes."),
  p("Please note that width and height are completely removed in favor of size-{axis}."),
];

export default colors;
