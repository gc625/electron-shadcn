import { create } from "domain";
import {
    OVERLAY_CREATE_CHANNEL,
    OVERLAY_DESTROY_CHANNEL
} from "./overlay-channels"



export function exposeOverlayContext(){
    const { contextBridge, ipcRenderer} = window.require("electron");

    contextBridge.exposeInMainWorld("overlayAPI",{
        create: () => ipcRenderer.invoke(OVERLAY_CREATE_CHANNEL),
        destroy: () => ipcRenderer.invoke(OVERLAY_DESTROY_CHANNEL)
    }
);

}