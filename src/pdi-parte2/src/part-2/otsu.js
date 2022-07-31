class PixelOfImage {
  constructor(position, intensity) {
    this.position = position;
    this.intensity = intensity;
  }
}

const getHistogram = (pixels) => {
  let histArray = [];
  for (let i = 0; i < 256; i++) histArray[i] = 0;
  pixels.forEach((val) => {
    histArray[val.intensity] = histArray[val.intensity] + 1;
  });
  return histArray;
};

const getWeight = (array, pixels) => {
  let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum/pixels.length;
};

const getMean = (array, backGroundStart) => {
  let mean = 0;
  let sum = 0;
  array.forEach((element, index) => {
    mean = mean + (element * (backGroundStart + index));
    sum += element;
  });

  return mean / sum;
};

const getBestThreshold = (histogram, pixels) => {
  let bestThreshold = -1;
  let bestInBetweenVariance = 0;
  let curInBetweenVariance;
  let array1 = [];
  let array2 = [];
  let mean1, mean2, weight1, weight2;
  histogram.forEach((hist, index) => {
    if (index != histogram.length - 1) {
      array1 = histogram.slice(0, index + 1);
      array2 = histogram.slice(index + 1, histogram.length);
      weight1 = getWeight(array1, pixels);
      weight2 = getWeight(array2, pixels);
      mean1 = getMean(array1, 0);
      mean2 = getMean(array2, array1.length);
      curInBetweenVariance = weight1 * weight2 * (mean1 - mean2) * (mean1 - mean2);
      if (curInBetweenVariance > bestInBetweenVariance) {
        bestInBetweenVariance = curInBetweenVariance;
        bestThreshold = index;
      }
    }
  });
  return bestThreshold;
};

const otsu = (imgData, bin) => {
  let grayscaleValue = 0, cumilativeCount = 0;
  let pixels = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    grayscaleValue = imgData.data[i];
    pixels.push(new PixelOfImage(cumilativeCount++, grayscaleValue));
  }

  let histogram = getHistogram(pixels);
  let otsuThreshold = getBestThreshold(histogram, pixels);
  console.log(otsuThreshold);
  debugger;
  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i].intensity < otsuThreshold) {
      imgData.data[4 * i] = 0;
      imgData.data[4 * i + 1] = 0;
      imgData.data[4 * i + 2] = 0;
    } else if (bin === true && pixels[i].intensity > otsuThreshold) {
      imgData.data[4 * i] = 255;
      imgData.data[4 * i + 1] = 255;
      imgData.data[4 * i + 2] = 255;
    } else {
      imgData.data[4 * i] = imgData.data[4 * i];
      imgData.data[4 * i + 1] = imgData.data[4 * i + 1];
      imgData.data[4 * i + 2] = imgData.data[4 * i + 2];
    }
    imgData.data[4 * i + 3] = 255;
  }
  return imgData;
}

$("#btn-otsu-binarização").on("click", () => {
  console.log("** OTSU Binarização **");
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  let result = otsu(imgData, true);

  imgData = result;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
  console.log("Sucesso!");
});

$("#btn-otsu-limiarização").on("click", () => {
  console.log("** OTSU Limiarização **");
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");

  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  let result = otsu(imgData, false);

  imgData = result;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
  console.log("Sucesso!");
});
