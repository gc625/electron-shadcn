import { DrawRectangleParams } from "./overlay-types";
import {
    OVERLAY_CREATE_CHANNEL,
    OVERLAY_DESTROY_CHANNEL,
    OVERLAY_DRAW_RECTANGLE_CHANNEL,
    OVERLAY_CLEAR_CANVAS_CHANNEL
} from "./overlay-channels"



export function exposeOverlayContext(){
    const { contextBridge, ipcRenderer} = window.require("electron");

    contextBridge.exposeInMainWorld("overlayAPI",{
        create: () => ipcRenderer.invoke(OVERLAY_CREATE_CHANNEL),
        destroy: () => ipcRenderer.invoke(OVERLAY_DESTROY_CHANNEL),
        
        drawRectangle: (params: DrawRectangleParams) => ipcRenderer.invoke(OVERLAY_DRAW_RECTANGLE_CHANNEL, params),
        clearCanvas: () => ipcRenderer.invoke(OVERLAY_CLEAR_CANVAS_CHANNEL),

    }
);

}