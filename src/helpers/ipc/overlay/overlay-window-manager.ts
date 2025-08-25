import {screen, BrowserWindow} from 'electron';
import path from 'path';

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;


function getPrimaryDisplayBounds(){
    const primaryDisplay = screen.getPrimaryDisplay();
    return {
        x: 0,
        y: 0, 
        width: primaryDisplay.bounds.width,
        height: primaryDisplay.bounds.height
    };
}


export function createOverlayWindow(){
    const bounds = getPrimaryDisplayBounds()

    const overlayWindow = new BrowserWindow({
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
    
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        movable: false,
        titleBarStyle: 'hidden',
        show: false,

        focusable: false,
        fullscreenable: false,
        minimizable: false,
        maximizable: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    



    overlayWindow.setIgnoreMouseEvents(true);
    overlayWindow.once('ready-to-show', () => {
        overlayWindow.show();
    });
    overlayWindow.setAlwaysOnTop(true, 'pop-up-menu');



    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        overlayWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + "#/overlay");
    } else {
        overlayWindow.loadFile(
            path.join(__dirname, "../renderer/main_window/index.html"),
            {hash: "/overlay"}
        );
    }
    return overlayWindow;
}




