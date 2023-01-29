import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Watermarker = () => {
  let myP5;
  const canvasRef = useRef(null);
  
  useEffect(() => {
    myP5 = new p5((p) => {
      let img;
      let watermarkText = '';
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
          img = p.loadImage("https://mj-gallery.com/7f3b46a1-d33d-4958-832b-8ecebb79efc1/grid_0_384_N.webp");
        }
        catch(e){
          console.log(e)
        }
      }
      
      p.imageLoaded = () => {
        // Update the canvas size
        img.width = p.width
        img.height = p.height 
        p.resizeCanvas(img.width, img.height);
        // Draw the image and the watermark
        p.drawImage();
      }
      p.submitForm = () => {
        // Load the image from the entered URL
        img = p.loadImage(document.getElementById('imageUrl').value, p.imageLoaded);
        // Update the canvas size
        //resizeCanvas(img.width, img.height);
        // Set the watermark text
        watermarkText = document.getElementById('watermark').value;
      }

      p.setup = () => {
        // Create a container element
        // Create a canvas
        let canvas = p.createCanvas(img.width, img.height);
        watermarkText = document.getElementById('watermark').value;
        
        canvas.parent(canvasRef.current);
        // Set the text properties
        p.textSize(32)
        p.textAlign(p.LEFT, p.TOP);
        p.fill(255, 0, 0);


        //  TODO: Setup submit and uploads
        // Create the submit button
        // let submitButton = p.createButton('Submit');
        // let iconButton = p.createFileInput(p.uploadIcon);
        // submitButton.position(100, 180);
        // submitButton.parent(canvasRef.current)
        // submitButton.mousePressed(p.submitForm);
        // iconButton.position(90, 80);
      
        // p.createOpacitySlider();
        // p.createSizeSlider()
        // Draw the image and the watermark


        p.drawImage();
      }
      p.drawImage = () => {
        // Clear the canvas
        p.clear();
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
        else{
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
        if(e.key === "Enter"){
          console.log("loading" + e.target.value)

          let inputText = e.target.value//document.activeElement.id
          img = p.loadImage(inputText, p.imageLoaded)
        }
        if(e.target.id==="watermark"){
          watermarkText = e.target.value;
        }
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
        if(p.mouseIsPressed){
          p.drawImage();
          if(p.mouseX > 0 && p.mouseX < img.width && p.mouseY > 0 && p.mouseY<img.height){
            watermarkX = p.mouseX - p.textWidth(watermarkText)/2
            watermarkY = p.mouseY - p.textAscent(watermarkText);
          }
        }
      }
    });
    return () => myP5.remove();
  },[]);

  return (
    <>
      <div className="canvasWrapper" ref={canvasRef} />
      <label>image url</label><input type="text" id="imageURL" defaultValue={"https://mj-gallery.com/7f3b46a1-d33d-4958-832b-8ecebb79efc1/grid_0_384_N.webp"} />
      <label>watermark text</label> <input type="text" id="watermark" />
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