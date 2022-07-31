let pi = 3.142857;

const dctTransform = (imgData) => {
  console.log("\t >Entrou");
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let pixels = imgData.data;
  
  let ci = 0, cj = 0, dctData = new Array(), dtc1, sum, l, k, pp = [];

  let clampedArray = [];

  let m = imgHeight;
  let n = imgWidth;
  console.log(m, n);
/*
  let m = imgData.height;
  let n = imgData.width;
*/
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(i==0) ci = 1 / Math.sqrt(m);
      else ci = Math.sqrt(2) / Math.sqrt(m);
      
      if(j == 0) cj = 1 / Math.sqrt(n);
      else cj = Math.sqrt(2) / Math.sqrt(n);

      sum = 0;
      //console.log("=========Inicio for com k e l==============");
      for (k = 0; k < m; k++) {
        for (l = 0; l < n; l++) {
          //let p = context1.getImageData(k, l, 1, 1).data[0];
          //let p = pixels[k * m + l];
          let p = pixelAt(k, l);
          dtc1 =
            p *
            Math.cos((2 * k + 1) * i * pi / ( 2 * m)) * 
            Math.cos((2 * l + 1) * j * pi / (2 * n));
          sum = sum + dtc1;
        }
      }
      //console.log("==========Fim do for com k e l==============");
      let pixel =
        ci * cj * sum;
      //console.log("pixel: ", pixel);
      dctData.push(pixel, pixel, pixel, 255); //
      //console.log("Iteração: ", j, [pixel, pixel, pixel, 255]);
      //console.log("==========Fim do for com i e j==============");
    }
  }
  console.log(dctData);

  clampedArray = dctData;
  
  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(dctData);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgWidth, imgHeight);
  }

  return clampedArray;
};

const inverseDCTTransform = (imgData) => {
  console.log("\t >Entrou");
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let pixels = imgData.data;
  
  let ci = 0, cj = 0, dctData = new Array(), dtc1, sum, l, k, pp = [];

  let clampedArray = [];

  let m = imgHeight;
  let n = imgWidth;
  console.log(m, n);
/*
  let m = imgData.height;
  let n = imgData.width;
*/
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(i==0) ci = 1 / Math.sqrt(m);
      else ci = Math.sqrt(2) / Math.sqrt(m);
      
      if(j == 0) cj = 1 / Math.sqrt(n);
      else cj = Math.sqrt(2) / Math.sqrt(n);

      sum = 0;
      //console.log("=========Inicio for com k e l==============");
      for (k = 0; k < m; k++) {
        for (l = 0; l < n; l++) {
          //let p = context1.getImageData(k, l, 1, 1).data[0];
          //let p = pixels[k * m + l];
          let p = pixelAt(k, l)/255;
          dtc1 =
            p *
            Math.cos((2 * k + 1) * i * pi / ( 2 * m)) * 
            Math.cos((2 * l + 1) * j * pi / (2 * n));
          sum = sum + dtc1;
        }
      }
      //console.log("==========Fim do for com k e l==============");
      let pixel =
        ci * cj * sum;
      //console.log("pixel: ", pixel);
      dctData.push(pixel*255, pixel*255, pixel*255, 255); //
      //console.log("Iteração: ", j, [pixel, pixel, pixel, 255]);
      //console.log("==========Fim do for com i e j==============");
    }
  }

  console.log(dctData);

  clampedArray = dctData;
  
  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(dctData);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;
};

$("#btn-transform-cos").on("click", () => {
  console.log("** DCT **");

  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  let result = dctTransform(imgData);

  let imgDataResult = result.toImgData();

  imgData = imgDataResult;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
  console.log("Sucesso!");
});