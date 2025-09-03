import { removeAllListeners } from "process";
import {
    GEMINI_SUBMIT_MESSAGE_CHANNEL,
    GEMINI_INITIALIZE_SESSION_CHANNEL
} from "./gemini-channels"

export function exposeGeminiContext() {
    const { contextBridge, ipcRenderer } = window.require("electron");


    contextBridge.exposeInMainWorld("gemini",{
        submit: (message: string) => 
            ipcRenderer.invoke(GEMINI_SUBMIT_MESSAGE_CHANNEL, message),
        initialize_session: () => 
            ipcRenderer.invoke(GEMINI_INITIALIZE_SESSION_CHANNEL),

        onResponseChunk: (callback: (chunk: string) => void) => {
            ipcRenderer.on('gemini-response-chunk', (_event: any, chunk: string) => callback(chunk));
        },
        onResponseComplete: (callback: () => void) => {
            ipcRenderer.on('gemini-response-complete', (_event: any) => callback());
        },

        removeAllListeners: () => {
            ipcRenderer.removeAllListeners('gemini-response-chunk');
            ipcRenderer.removeAllListeners('gemini-response-complete');
        }
       
    });

}