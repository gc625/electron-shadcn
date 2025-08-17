import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { exposeGeminiContext } from "./gemini/gemini-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeGeminiContext();
}
