// Laplaciano feito em gauss
const gaussian = (imgData) => {
  // kernel para Gaussiano.
  let kernel = [
    [0, 0, -1, 0, 0],
    [0, -1, -2, -1, 0],
    [-1, -2, 16, -2, -1],
    [0, -1, -2, -1, 0],
    [0, 0, -1, 0, 0]
  ];

  let laplaceDataGauss = [];

  console.log("** Gaussiano **");
  let clampedArray = [];
  let pixelAt = bindPixelAt(imgData.data, imgData.width);

  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {

      let lapla = Math.round((
        kernel[0][0] * pixelAt(x - 2, y - 2) +
        kernel[0][1] * pixelAt(x - 1, y - 2) +
        kernel[0][2] * pixelAt(x, y - 2) +
        kernel[0][3] * pixelAt(x + 1, y - 2) +
        kernel[0][4] * pixelAt(x + 2, y - 2) +

        kernel[1][0] * pixelAt(x - 2, y - 1) +
        kernel[1][1] * pixelAt(x - 1, y - 1) +
        kernel[1][2] * pixelAt(x, y - 1) +
        kernel[1][3] * pixelAt(x + 1, y - 1) +
        kernel[1][4] * pixelAt(x + 2, y - 1) +

        kernel[2][0] * pixelAt(x - 2, y) +
        kernel[2][1] * pixelAt(x - 1, y) +
        kernel[2][2] * pixelAt(x, y) +
        kernel[2][3] * pixelAt(x + 1, y) +
        kernel[2][4] * pixelAt(x + 2, y) +

        kernel[3][0] * pixelAt(x - 2, y + 1) +
        kernel[3][1] * pixelAt(x - 1, y + 1) +
        kernel[3][2] * pixelAt(x, y + 1) +
        kernel[3][3] * pixelAt(x + 1, y + 1) +
        kernel[3][4] * pixelAt(x + 2, y + 1) +

        kernel[4][0] * pixelAt(x - 2, y + 2) +
        kernel[4][1] * pixelAt(x - 1, y + 2) +
        kernel[4][2] * pixelAt(x, y + 2) +
        kernel[4][3] * pixelAt(x + 1, y + 2) +
        kernel[4][4] * pixelAt(x + 2, y + 2)
      ));

      laplaceDataGauss.push(lapla, lapla, lapla, 255);
      //console.log(lapla);
    }
  }

  let imgDataLaplace = context1.createImageData(imgWidth, imgHeight);
  imgDataLaplace.data.set(new Uint8ClampedArray(laplaceDataGauss));

  return imgDataLaplace;
}

$("#btn-laplace3").on("click", () => {
  console.log("** Laplaciano **");
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  // Pegando os dois resultados para comparar depois.
  let result = gaussian(imgData);
  let result2 = laplace2(imgData);

  imgData = result;

  context2.putImageData(imgData, 0, 0);

  imgData = result2;

  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
  console.log("Sucesso!");
});