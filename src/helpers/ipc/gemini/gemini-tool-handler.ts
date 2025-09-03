import { drawRectangle } from "./gemini-functions";



export function handleDrawRectangle(args) {
  // Your draw rectangle logic
  const result = drawRectangle(args.x, args.y, args.width, args.height);
  return {
    result: "success", 
    message: "Rectangle drawn successfully"
  };
}