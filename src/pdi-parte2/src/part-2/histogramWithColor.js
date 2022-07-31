const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
    : 0;
  return [
    Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
    Math.round(
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    ),
    Math.round((100 * (2 * l - s)) / 2),
  ];
}

const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
}

const applyColorEqualization = (imgData) => {

  let hslImageData = [];
  let histogram = [], eqHistogram = [];

  for (let i = 0; i < 100; i++) histogram[i] = 0;

  for (let x = 0; x < imgData.data.length; x += 4) {
    let hsl = RGBToHSL(
      imgData.data[x],
      imgData.data[x + 1],
      imgData.data[x + 2]
    );

    hslImageData.push(hsl[0], hsl[1], hsl[2]);

    histogram[hsl[2]] += 1;
  }

  console.log(histogram);

  console.log(hslImageData);

  let accumulatedF = 0;

  for (let x = 0; x < histogram.length; x++) {
    accumulatedF += histogram[x];

    let eq = Math.max(
      0,
      Math.round(
        (100 * accumulatedF) / (imgData.width * imgData.height)
      ) - 1
    );

    eqHistogram.push(eq);
  }

  console.log(eqHistogram);

  let clampedArray = [];

  for (let x = 0; x < hslImageData.length; x += 3) {
    let rgb = HSLToRGB(
      hslImageData[x],
      hslImageData[x + 1],
      eqHistogram[hslImageData[x + 2]]
    );

    clampedArray.push(rgb[0], rgb[1], rgb[2], 255);
  }
  console.log(clampedArray);

  let newImageData = context1.createImageData(imgData.width, imgData.height);

  newImageData.data.set(new Uint8ClampedArray(clampedArray));

  console.log(newImageData);

  return newImageData;
}


$("#btn-histogram-colors").on("click", () => {
  console.log("** Histograma com cores **");
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  //let canvas3 = document.getElementById("canvas-pdi3");
  //let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  //let context3 = canvas3.getContext("2d");
  //let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  // Pegando os dois resultados para comparar depois.
  let result = applyColorEqualization(imgData);
  imgData = result;

  context2.putImageData(imgData, 0, 0);
  //context3.putImageData(imgData, 0, 0);
  //context4.putImageData(imgData, 0, 0);

  console.log("Sucesso!");
});