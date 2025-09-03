import { ipcMain } from "electron";
import { GEMINI_SUBMIT_MESSAGE_CHANNEL, GEMINI_INITIALIZE_SESSION_CHANNEL } from "./gemini-channels";
import { GoogleGenAI, Modality } from '@google/genai';
import { join } from "path";
import {drawRectangle, drawRectangleFunctionDeclaration, setLightValuesFunctionDeclaration} from "./gemini-functions"
import { measureMemory } from "vm";
import { handleServerContent, handleToolCalls, handleTurnComplete } from "./gemini-message-handlers";


let currentSession: any = null;
let responseQueue: any[] = [];
let isSessionActive = false;

const apiKey = process.env.GOOGLE_API_KEY || "";
const systemPrompt = "";
const model = 'gemini-live-2.5-flash-preview';

// Validate API key
if (!apiKey) {
  console.error('GOOGLE_API_KEY environment variable is not set');
}


const tools = [{
  googleSearch: {},
  functionDeclarations: [setLightValuesFunctionDeclaration,
    drawRectangleFunctionDeclaration
  ],
}]

let sessionConfig = {
  responseModalities: [Modality.TEXT],
  tools: tools,
  systemInstruction: {
    parts: [{text: systemPrompt}]
  }
}



let messageBuffer = "";
let isFinished = false;

async function processMessage(message){
  if (message.serverContent?.modelTurn?.parts){
    await handleServerContent(message, messageBuffer);
  }
  if (message.toolCall){
    await handleToolCalls(message.toolCall, currentSession);
  }
  if (message.serverContent?.turnComplete){
    handleTurnComplete();
  } 
  
}
async function createSession() {
    debugger; // Execution will pause here when DevTools is open
    const ai = new GoogleGenAI({apiKey: apiKey});
    currentSession = await ai.live.connect({
        model: model,
        callbacks: {
            onopen: function () {
                console.debug('Session opened');
                isSessionActive = true;
            },
            onmessage: function (msg) {
                processMessage(msg);
            },
            onerror: function (e) {
                console.debug('Error:', e.message);
                isSessionActive = false;
            },
            onclose: function (e) {
                console.debug('Close:', e.reason);
                isSessionActive = false;
                currentSession = null;
            },
        },
        config: sessionConfig,
    });
    return currentSession;
}

export function addGeminiEventListeners() {

    ipcMain.handle(GEMINI_INITIALIZE_SESSION_CHANNEL,
      async () => {
        try {
          if (!currentSession || !isSessionActive){
            await createSession();
          }
          return { success: true };
        } catch (error) {
          return { success: false, error: (error as Error).message };
        }
      }
   )
    
    ipcMain.handle(GEMINI_SUBMIT_MESSAGE_CHANNEL, 
        async (event, message: string) => {
          if (!currentSession || !isSessionActive) {
            await createSession();
          }
          currentSession.sendClientContent({ turns: message });

        return "ok";
         
          });
}