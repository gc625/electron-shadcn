import { BrowserWindow, ipcMain } from "electron"; 
import {
    OVERLAY_CREATE_CHANNEL,
    OVERLAY_DESTROY_CHANNEL,
    OVERLAY_DRAW_RECTANGLE_CHANNEL,
    OVERLAY_CLEAR_CANVAS_CHANNEL
} from "./overlay-channels";
import { createOverlayWindow} from "./overlay-window-manager"
import { DrawRectangleParams } from "./overlay-types";

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
            return {success: false, error: (error as Error).message};
        }
    });

    ipcMain.handle(OVERLAY_DRAW_RECTANGLE_CHANNEL, async(event, params: DrawRectangleParams)=> {
        try {
            if (! overlayWindow){
                return {success: false, error: "No overlay window exists"};
            }

            overlayWindow.webContents.send('draw-rectangle', params);
            return {success: true};
        } catch (error) {
            return {success: false, error: (error as Error).message};
        }
    });

    ipcMain.handle(OVERLAY_CLEAR_CANVAS_CHANNEL, async () => {
        try {
            if (!overlayWindow){
                return {success: false, error: "No overlay window exists"};
            }
            overlayWindow.webContents.send('clear-canvas');
            return {success: true};
        } catch (error) {
            return {success: false, error: (error as Error).message};
        }

    })
}
