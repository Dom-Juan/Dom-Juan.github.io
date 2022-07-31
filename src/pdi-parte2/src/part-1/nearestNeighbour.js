const resizePixels = (imgData, pixels, width2, height2) => {
  let temp = [width2*height2];
  let x_ratio = imgData.width/width2;
  let y_ratio = imgData.height/height2;
  for(let i = 0; i < height2; i++) {
    for(let j = 0; j < width2; j++) {
      let px = Math.floor(j*x_ratio);
      let py = Math.floor(i*y_ratio);
      temp[(i*width2)+j] = pixels[parseInt((py*imgData.width)+px)];
    }
  }
  return temp;
};

$("#btn-zoom").on("click", () => {
  let canvas2 = document.getElementById("canvas-pdi2");
  let context2 = canvas2.getContext("2d");
  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let pixels = imgData.data;
  for(let i = 0; i < imgData.length; i+=4) {
    pixels[i] = resizePixels(imgData, pixels[i], 1280, 960);
    pixels[i + 1] = resizePixels(imgData, pixels[i + 1], 1280, 960);
    pixels[i + 2] = resizePixels(imgData, pixels[i + 2], 1280, 960);
  }

  imgData.data.set(pixels);
  context2.putImageData(imgData, 0, 0); // put the pixels onto the destination canvas
  /*
  let scaleFac = 2.3; // scale 1> zoom in 
  let panX = 10;  // scaled image pan
  let panY = 10;
  let ang = 1;
  let w = context1.canvas.width;  // source image
  let h = context1.canvas.height;
  let wd = context2.canvas.width;  // destination image
  let hd = context2.canvas.height;
  // use 32bit ints as we are not interested in the channels
  

  let data = new Uint32Array(imgData.data.buffer);// source
  let dest = context2.createImageData(wd, hd);
  let zoomData = new Uint32Array(dest.data.buffer);// destination
  let xdx = Math.cos(ang) * scaleFac;  // xAxis vector x
  let xdy = Math.sin(ang) * scaleFac;  // xAxis vector y
  let ind = 0;
  let xx, yy;
  for (let y = 0; y < hd; y++) {
    for (let x = 0; x < wd; x++) {
      // transform point
      xx = (x * xdx - y * xdy + panX);
      yy = (x * xdy + y * xdx + panY);
      // is the lookup pixel in bounds
      if (xx >= 0 && xx < w && yy >= 0 && yy < h) {
        // use the nearest pixel to set the new pixel
        zoomData[ind++] = data[(xx | 0) + (yy | 0) * w]; // set the pixel
      } else {
        zoomData[ind++] = 0; // pixels outside bound are transparent
      }
    }
  }

  context2.putImageData(dest, 0, 0); // put the pixels onto the destination canvas
  */
});