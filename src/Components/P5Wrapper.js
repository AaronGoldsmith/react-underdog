import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Wrapper = () => {
  let myP5;
  const canvasRef = useRef(null);
  
  useEffect(() => {
    myP5 = new p5((p) => {
      let pos = p.createVector(200,200)
      p.setup = () => {
        p.createCanvas(400, 400).parent(canvasRef.current);
        p.resizeCanvas(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      }
      p.draw = () => {
        // clear to keep a transparent background
        p.clear()
        p.background(255, 255, 255, 0);
        p.fill(255, 0, 0);
        p.ellipse(pos.x, pos.y, 100, 100);
      }
      p.mousePressed = () => {
        pos.x = p.mouseX; 
        pos.y = p.mouseY
      }
      p.mouseDragged = () => {
        pos.x = p.mouseX; 
        pos.y = p.mouseY
      }
    });
    return () => myP5.remove();
  },[]);

  return <div className="canvasWrapper" ref={canvasRef} />;
}

export default P5Wrapper;