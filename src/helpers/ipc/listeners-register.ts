import { BrowserWindow } from "electron";
import { addThemeEventListeners } from "./theme/theme-listeners";
import { addWindowEventListeners } from "./window/window-listeners";
import { addGeminiEventListeners } from "./gemini/gemini-listeners";
import { addOverlayEventListeners } from "./overlay/overlay-listeners";
export default function registerListeners(mainWindow: BrowserWindow) {
  addOverlayEventListeners();
  addWindowEventListeners(mainWindow);
  addThemeEventListeners();
  addGeminiEventListeners();
}
