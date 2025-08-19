import { ipcMain } from "electron";
import { GEMINI_SUBMIT_MESSAGE_CHANNEL, GEMINI_INITIALIZE_SESSION_CHANNEL } from "./gemini-channels";
import { GoogleGenAI, Modality } from '@google/genai';
import { promiseHooks } from "v8";
import { C, M } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";


let currentSession: any = null;
let responseQueue: any[] = [];
let isSessionActive = false;

const apiKey = "";
const systemPrompt = "";
const model = 'gemini-live-2.5-flash-preview';
let sessionConfig = {
  responseModalities: [Modality.TEXT],
  systemInstruction: {
    parts: [{text: systemPrompt}]
  }
}
async function waitMessage(){
    let done = false;
    let message = undefined;
    while (!done){
      message = responseQueue.shift();
      if (message){
        done = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve,100));
      }
    }
    return message;

}

async function handleTurn() {
  const turns = [];
  let done = false;
  while (!done){
    const message = await waitMessage();
    turns.push(message);
    if (message.serverContent && message.serverContent.turnComplete){
      done = true;
    }
  }
  return turns;
}

async function createSession() {
    const ai = new GoogleGenAI({apiKey: apiKey});
    currentSession = await ai.live.connect({
        model: model,
        callbacks: {
            onopen: function () {
                console.debug('Session opened');
                isSessionActive = true;
            },
            onmessage: function (msg) {
                console.debug("recieved msg")
                console.debug(msg);
                responseQueue.push(msg);
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
          console.debug("sending content to gemini: ",message);
          currentSession.sendClientContent({ turns: message });
          const turns = await handleTurn()

          let final_string = ""
          
          for (const turn of turns){
            console.debug(turn);
            if (turn.serverContent?.modelTurn?.parts){
              for (const part of turn.serverContent.modelTurn.parts){
                console.debug("part: ", part)
                if (part.text){
                final_string += part.text;
                }
              }
            }
          }
          return final_string});
}