import React, { useEffect, useState, useRef } from 'react';
import p5 from 'p5';
import styled from 'styled-components'
import { Modal } from './Modal'
import ToggleButton from './UI/Toggle'

const STARTING_IMG = 'https://mj-gallery.com/c5015e03-52d6-4d51-97c1-0c87b4cf7e3f/0_0.webp';
const Label = styled.label`
  padding: 10px;
  margin: 10px;
`
const Input = styled.input`
  margin-left: 10px;
`



const Watermarker = () => {
  let myP5;
  const canvasRef = useRef(null);
  const [toggleState, setToggleState] = useState(false);
  const [watermarkText, setWatermarkText] = useState("")
  
  const handleToggle = (state) => {
    setToggleState(state);
  };

  useEffect(() => {
    myP5 = new p5((p) => {
      let img;
      // let watermarkText = '';
      let watermarkSize = 1;
      let watermarkColor = 'white'
      let wm = {r: 255, g: 255, b: 255 }
      let watermarkX = 0;
      let watermarkY = 0;
      //let maxWidth = 500;
      let watermarkOpacity = 0.5;
      let iconImg;

      // Load the image from a URL
      p.preload = () => {
        try{
          img = p.loadImage(STARTING_IMG);
        }
        catch(e){
          console.log(e)
        }
      }

      p.imageLoaded = (loadedImage) => {
        // Update the canvas size
          const thresholdY = p.windowHeight*0.75
          if(loadedImage.height > thresholdY){
             let r = thresholdY / loadedImage.height
            //  console.log(r)
            //  console.log(img.height/r)
            loadedImage.height *= r;
            loadedImage.width *= r
          }
          // Draw the image and the watermark
            p.resizeCanvas(loadedImage.width, loadedImage.height);
            img = loadedImage;
            p.image(img, 0, 0, img.width, img.height);
      }

      p.setup = () => {
        const thresholdY = p.windowHeight*0.75
        if(img.height > thresholdY){
           let r = thresholdY / img.height
          //  console.log(r)
          //  console.log(img.height/r)
           img.height *= r;
           img.width *= r
        }
        // Create a canvas
        let canvas = p.createCanvas(img.width, img.height);
        // watermarkText = document.getElementById('watermark').value;
      
        canvas.parent(canvasRef.current);
        // Set the text properties
        p.textSize(32)
        p.textAlign(p.LEFT, p.TOP);
        p.fill(255, 0, 0);

        img.height = img.height*0.9
        p.resizeCanvas(img.width, img.height);
        p.drawImage();
      }
      p.drawImage = () => {
        // Clear the canvas
        // if(typeof p !== 'undefined'){p.clear();}
        // Check if the image needs to be resized
        let scaleFactor = 1;
        // if (img.width > maxWidth) {
        //   scaleFactor = maxWidth / img.width;
        // }
        // Display the image
        p.image(img, 0, 0, img.width, img.height);
        // Add the watermark text
        p.fill(wm.r, wm.g, wm.b, 255*watermarkOpacity);
        p.textSize(32*watermarkSize);
      
        if (iconImg) {
          p.image(iconImg, watermarkX, watermarkY, iconImg.width * watermarkSize, iconImg.height * watermarkSize);
        }
        else if(toggleState){
           p.text(watermarkText, watermarkX, watermarkY, img.width, img.height );
        }
      
      }
      
      p.uploadIcon = (file) =>  {
        if (file.type === 'image') {
          // Load the icon image
          iconImg = p.loadImage(file.data, () => {
            // Redraw the image with the icon
            p.drawImage();
          });
        }
      }
      
      p.submitForm = (e) => {
        watermarkText = document.getElementById('watermark').value;
      }
      p.keyReleased = (e) => {
        if(e.key === "Enter" && e.target.id=="imageURL"){
          console.log("loading" + e.target.value)

          let inputText = e.target.value//document.activeElement.id
          try{
            img = p.loadImage(inputText, function(loadedImage){
              const thresholdY = p.windowHeight*0.75
              if(loadedImage.height > thresholdY){
                 let r = thresholdY / loadedImage.height
                //  console.log(r)
                //  console.log(img.height/r)
                loadedImage.height *= r;
                loadedImage.width *= r
              }
              // Draw the image and the watermark
                p.resizeCanvas(loadedImage.width, loadedImage.height);
                p.image(loadedImage, 0, 0, loadedImage.width, loadedImage.height);
               return loadedImage;
            });
          }
          catch(e){
            console.log(e)
          }
         
         }
          
        
        // if(e.target.id==="watermark"){
        //   watermarkText = e.target.value;
        // }
      }
      p.saveImage = () => {
        let imageData = p.get(0, 0, img.width, img.height);
        let now = new Date().toLocaleString()
        // Save the image
        p.save(imageData, `${watermarkText}-${now}`, 'png');
        
        // Save the canvas as an image file
        //saveCanvas('watermarked-image', 'jpg');
      }

      p.draw = () => {

        if(p.mouseIsPressed && toggleState){
          p.drawImage();
          if(p.mouseX > 0 && p.mouseX < img.width && p.mouseY > 0 && p.mouseY<img.height){
            watermarkX = p.mouseX - p.textWidth(watermarkText)/2
            watermarkY = p.mouseY - p.textAscent(watermarkText);
          }
        }
      }
    });
    return () => myP5.remove();
  },[watermarkText, toggleState]);

  return (
    <>
      <div className="canvasWrapper" ref={canvasRef} />
      <div>
        <p>
          <Label>image url
              <Input type="text" id="imageURL"
              once={true}
               defaultValue={"https://mj-gallery.com/c5015e03-52d6-4d51-97c1-0c87b4cf7e3f/0_0.webp"} />
          </Label>
        </p>
        <Modal title="Open Controls">
          <Label>Add Text
            <Input type="text" id="watermark" defaultValue={watermarkText} 
                  onKeyUp={e=>setWatermarkText(e.target.value)} />
          </Label>
          <ToggleButton value={toggleState} onToggle={handleToggle} />
        </Modal>
       <p>
      
       </p>
      
      </div>
     
    </>
  )
}










// p.createOpacitySlider = () => {
//   let slider = p.createSlider(0, 1, 0.5, 0.01);
//   slider.position(200, 180);
//   slider.input(() => {
//     watermarkOpacity = slider.value();
//   });
// }


// p.createSizeSlider = () => {
//   let slider = p.createSlider(0.5, 1.5, 1, 0.02);
//   slider.position(400, 180);
//   slider.input(() => {
//     watermarkSize = slider.value();
//   });
// }

// function draw() {
//   // Update the watermark position if the mouse is pressed
//   if (p.mouseIsPressed) {
//     if(mouseX > 0 && mouseX < width && mouseY > 0){
//       watermarkX = mouseX;
//       watermarkY = mouseY;
//     }
//   }
//   // Draw the image and the watermark
//   p.drawImage();
//   //createColorSquares()
// }




export default Watermarker;