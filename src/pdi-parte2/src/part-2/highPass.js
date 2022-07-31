const highPass = (imgData, cutSize) => {
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let pixels = []
  console.log(imgData, cutSize);
  let num = parseInt(cutSize);
  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      if (Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2))) > num) {
        pixels.push(pixelAt(x, y), pixelAt(x, y), pixelAt(x, y), 255);
      } else
        pixels.push(0, 0, 0, 255);
    }
  }

  console.log(pixels);

  let imgDataHighPass = context1.createImageData(imgData.width, imgData.height);
  imgDataHighPass.data.set(new Uint8ClampedArray(pixels));

  return imgDataHighPass;
};

$("#btn-high-pass").on("click", () => {
  console.log("** Passa alta **");
  $("#high-pass-result").empty();
  $("#cut-value").empty();
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  let t = 0;
  t = parseInt($("#cut-value").val());
  if ($("#cut-value").val() === undefined || $("#cut-value").val() === null || isNaN($("#cut-value").val()))
    $("#high-pass-result").append("Digite um valor valido para o corte!!!");
  else {
    let result = highPass(imgData, t);

    let imgDataResult = result;
    imgData = imgDataResult;

    context2.putImageData(imgData, 0, 0);
    context3.putImageData(imgData, 0, 0);
    context4.putImageData(imgData, 0, 0);
    console.log("Sucesso!");
    t = $("#high-pass-result").empty();
    $("#high-pass-result").append("Sucesso ao realizar a operação!");
  }
});