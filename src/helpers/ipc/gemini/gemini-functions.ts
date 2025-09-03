import {Type} from "@google/genai"
import { DrawRectangleParams } from "../overlay/overlay-types";
import { ipcMain } from 'electron';

export const setLightValuesFunctionDeclaration = {
    name: 'set_light_values',
    description: 'Sets the brightness and color temperature of a light',
    parameters: {
        type: Type.OBJECT,
        properties: {
            brightness: {
                type: Type.NUMBER,
                description: 'Light level from 0 to 100, Zero is off and 100 is full brightness.',
            },
            color_temp: {
                type: Type.STRING,
                description: 'Color temperature of the light fixture, which can be `daylight`, `cool`, or `warm`',

            },
        },
        required: ['brightness', 'color_temp'],
    }
};

export const drawRectangleFunctionDeclaration = {
    name: 'draw_rectangle',
    description: 'Draws a rectangle on the screen',
    parameters: {
        type: Type.OBJECT,
        properties: {
            x: {
                type: Type.NUMBER,
                description: 'x coordinate of the top left corner of the rectangle'
            },
            y: {
                type: Type.NUMBER,
                description: 'y coordinate of the top left corner of the rectangle'
            },
            width: {
                type: Type.NUMBER,
                description: 'width of the rectangle'
            },
            height: {
                type: Type.NUMBER,
                description: 'height of the rectangle'
            }
        }
    }

}





export function setLightValues(brightness: number, color_temp: string){
    return {
        brightness: brightness,
        colorTemperature: color_temp
    }
}

export function drawRectangle(x: number, y: number, width: number, height: number){
    console.log("INSIDE DRAW RECTANGLE")
    const params: DrawRectangleParams = {
        x: x,
        y: y,
        width: width,
        height: height,
        color: "red",
        lineWidth: 2
    } 

        // Find the overlay window and send the drawing command
    const { BrowserWindow } = require('electron');
    const overlayWindow = BrowserWindow.getAllWindows().find((win: any) => 
        win.webContents.getURL().includes('#/overlay')
    );
    
    if (overlayWindow) {
        overlayWindow.webContents.send('draw-rectangle', params);
    }
    
    return params;


}
