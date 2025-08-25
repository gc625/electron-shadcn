import React, {useRef, useEffect} from "react";

export default function OverlayPage() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Just set it to screen size - simple!
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
