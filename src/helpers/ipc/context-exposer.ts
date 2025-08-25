import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { exposeGeminiContext } from "./gemini/gemini-context";
import { exposeOverlayContext } from "./overlay/overlay-context";
export default function exposeContexts() {
  exposeOverlayContext();
  exposeWindowContext();
  exposeThemeContext();
  exposeGeminiContext();
}
