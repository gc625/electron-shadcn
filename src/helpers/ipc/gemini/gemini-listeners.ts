import { ipcMain } from "electron";
import { GEMINI_SUBMIT_MESSAGE_CHANNEL } from "./gemini-channels";



export function addGeminiEventListeners() {
    ipcMain.handle(GEMINI_SUBMIT_MESSAGE_CHANNEL, 
        (event, message: string) => {return `main process recieved ${message}`});
}