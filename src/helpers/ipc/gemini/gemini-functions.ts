import {Type} from "@google/genai"



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


export function setLightValues(brightness: number, color_temp: string){
    return {
        brightness: brightness,
        colorTemperature: color_temp
    }
}