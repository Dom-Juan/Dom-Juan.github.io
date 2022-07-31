const erosion = (imgData, canvasType) => {
  let canvas, context;
  if(canvasType === "canvas2") {
    canvas = document.getElementById("canvas-pdi2");
    context = canvas.getContext("2d");
  } else {
    canvas = document.getElementById("canvas-pdi4");
    context = canvas.getContext("2d");
  }

  let pixels = [];
  let mask = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];

  let remove;
  let pixelsArray = [];

  for (let i = 0; i < imgData.data.length; i += 4) {
    pixels.push(imgData.data[i] > 0 ? 1 : 0);
  }

  for (let i = 0; i < pixels.length; i+=4) {
    pixelsArray[i] = 0;
  }

  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i] == 1) {
      remove = false;
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (mask[j + 1][k + 1] === 1 && pixels[i + j + k] === 0) {
            remove = true;
          }
          if (remove) {
            pixelsArray[i] = 0;
          } else {
            pixelsArray[i] = 1;
          }
        }
      }
    }
  }

  let newPixelData = [];

  for (const element of pixelsArray) {
    if (element === 1) {
      newPixelData.push(255, 255, 255, 255);
    } else {
      newPixelData.push(0, 0, 0, 255);
    }
  }

  let erosionData = context.createImageData(imgWidth, imgHeight);

  erosionData.data.set(new Uint8ClampedArray(newPixelData));

  context.putImageData(erosionData, 0, 0);
}

$("#btn-erosion").on("click", () => {
  console.log("** Erosão **");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  erosion(imgData, "canvas2");

  console.log("Sucesso!");
});