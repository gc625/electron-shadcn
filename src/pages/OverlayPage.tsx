import React, {useRef, useEffect} from "react";
import { DrawRectangleParams } from "@/helpers/ipc/overlay/overlay-types";
export default function OverlayPage() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (! canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
}, []);

    useEffect(() => {
      const canvas = canvasRef.current;

      if (!canvas ) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const { ipcRenderer } = window.require("electron");

      const handleDrawRectangle = (_event: any, params: DrawRectangleParams) => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const {x, y, width, height, color = "red", lineWidth = 2} = params;

          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;

          ctx.strokeRect(x, y, width, height);
      };

      const handleClearCanvas = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      ipcRenderer.on('draw-rectangle', handleDrawRectangle);
      ipcRenderer.on('clear-canvas', handleClearCanvas);

      return () => {
        ipcRenderer.off('draw-rectangle', handleDrawRectangle);
        ipcRenderer.off('clear-canvas', handleClearCanvas);
      };

    }, []);
    

return (
  <>
    {/* Global style override for overlay */}
    <style>{`
      html, body, #root {
        background: transparent !important;
      }
    `}</style>
    
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'transparent',
      pointerEvents: 'none',
      zIndex: 9999
    }}>
      <div style={{ color: 'RED', position: 'absolute', top: '10px', left: '10px' }}>
        OVERLAY LOADED
      </div>
      <canvas ref={canvasRef} />
    </div>
  </>
);
}
