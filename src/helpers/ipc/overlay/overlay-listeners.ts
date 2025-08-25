import { BrowserWindow, ipcMain } from "electron"; 
import {
    OVERLAY_CREATE_CHANNEL,
    OVERLAY_DESTROY_CHANNEL
} from "./overlay-channels";
import { createOverlayWindow} from "./overlay-window-manager"


let overlayWindow: BrowserWindow | null = null;


export function addOverlayEventListeners() {
    ipcMain.handle(OVERLAY_CREATE_CHANNEL, async() => {
        try {
            if (!overlayWindow){
                overlayWindow = createOverlayWindow();
            }
            return { success: true};
        } catch (error) {
            return { success: false, error: (error as Error).message};
        }
    });

    ipcMain.handle(OVERLAY_DESTROY_CHANNEL, async() => {
        try {
            if (! overlayWindow) {
                return {success: false};
            }
            overlayWindow.destroy()
            overlayWindow = null;
            return {success: true}
        } catch (error) {
            return {sucess: false, error: (error as Error).message};
        }
    })
}
