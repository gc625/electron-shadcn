import { BrowserWindow } from "electron";
import { handleDrawRectangle } from "./gemini-tool-handler";



export async function handleServerContent(message, messageBuffer){
    if (message.serverContent?.modelTurn.parts){
        for (const part of message.serverContent.modelTurn.parts){
            
            if (part.text) {
                console.debug(`MODEL TEXT: ${part.text}`);
                BrowserWindow.getAllWindows().forEach(
                    window => {
                        window.webContents.send('gemini-response-chunk', part.text
                        );
                    }
                )
            }
            
        }
    }


}

export async function handleToolCalls(toolCool, currentSession){
    const functionResponses = [];
    for (const fc of toolCool.functionCalls){
        let response;

        switch (fc.name) {
            case "draw_rectangle":
                response = handleDrawRectangle(fc.args);
                break;
            case "clear_canvas":
                // response = 
                break;
            default:
                response = {result: "error", message: `Unknown function: ${fc.name}`};
        }
        functionResponses.push({id: fc.id, name: fc.name, response})
    }
    await currentSession.sendToolResponse({ functionResponses}); 
}

export async function handleTurnComplete(){
    console.log("EOT recieved")
        BrowserWindow.getAllWindows().forEach(
        window => {
            window.webContents.send('gemini-response-complete'           );
        }
    )

}