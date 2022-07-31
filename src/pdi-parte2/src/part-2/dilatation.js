const dilatation = (imgData, canvasType) => {
  let canvas, context;
  if(canvasType === "canvas2") {
    canvas = document.getElementById("canvas-pdi2");
    context = canvas.getContext("2d");
  } else {
    canvas = document.getElementById("canvas-pdi3");
    context = canvas.getContext("2d");
  }
  let mask = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];

  let pixels = [], bPixels = [];

  for (let i = 0; i < imgData.data.length; i += 4) {
    bPixels.push(0);
  }

  for (let i = 0; i < imgData.data.length; i += 4) {
    pixels.push(imgData.data[i] > 0 ? 1 : 0);
  }

  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i] == 1) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (mask[j + 1][k + 1] === 1) {
            bPixels[i + k + j] = 1;
          }
        }
      }
    }
  }

  let pixelData = [];

  for (const element of bPixels) {
    if (element === 1) {
      pixelData.push(255, 255, 255, 255);
    } else {
      pixelData.push(0, 0, 0, 255);
    }
  }

  console.log(pixelData);

  let dilatationData = context.createImageData(imgWidth, imgHeight);

  dilatationData.data.set(new Uint8ClampedArray(pixelData));

  context.putImageData(dilatationData, 0, 0);
}

$("#btn-dilatation").on("click", () => {
  console.log("** Dilatação **");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  dilatation(imgData, "canvas2");

  console.log("Sucesso!");
});