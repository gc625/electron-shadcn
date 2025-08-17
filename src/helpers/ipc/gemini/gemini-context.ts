import {
    GEMINI_SUBMIT_MESSAGE_CHANNEL
} from "./gemini-channels"

export function exposeGeminiContext() {
    const { contextBridge, ipcRenderer } = window.require("electron");


    contextBridge.exposeInMainWorld("gemini",{
        submit: (message: string) => 
            ipcRenderer.invoke(GEMINI_SUBMIT_MESSAGE_CHANNEL, message),
    });

}