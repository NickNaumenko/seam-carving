import DualGradient from './dualGradient';
import Matrix from './matrix';

class SeamCarver {
  constructor(imageData) {
    this.imageData = imageData;
    this.energyMap = new DualGradient(imageData);
  }

  findVerticalSeam() {
    const { energyMap } = this;
    const width = energyMap[0].length;
    const height = energyMap.length;
    const map = new Matrix(width, height);
    map[0] = [...energyMap[0]];

    for (let row = 1; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const left = Math.max(col - 1, 0);
        const right = Math.min(col + 1, width - 1);
        map[row][col] = Math.min(
          map[row - 1][left], map[row - 1][col], map[row - 1][right],
        ) + energyMap[row][col];
      }
    }

    const seam = new Array(height);
    let minValue = Infinity;
    for (let i = 1; i < width; i++) {
      if (map[height - 1][i] < minValue) {
        seam[0] = i;
        minValue = map[height - 1][i];
      }
    }

    for (let i = 1; i < height; i++) {
      const prevIdx = seam[i - 1];
      const left = Math.max(prevIdx - 1, 0);
      const right = Math.min(prevIdx + 1, width - 1);
      let min = map[height - 1 - i][prevIdx];
      seam[i] = prevIdx;
      if (map[height - 1 - i][left] < min) {
        min = map[height - 1 - i][left];
        seam[i] = left;
      }
      if (map[height - 1 - i][right] < min) {
        min = map[height - 1 - i][right];
        seam[i] = right;
      }
    }
    return seam.reverse();
  }

  removeVerticalSeam(seam) {
    this.energyMap.removeVerticalSeam(seam);

    const { data, width, height } = this.imageData;
    const newData = new Uint8ClampedArray(data.length - height * 4);

    const seamIndexes = seam.map((val, i) => (val + width * i) * 4);

    let idx = 0; let
      removedPixel = 0;
    for (let i = 0; i < newData.length; i++) {
      if (i === seamIndexes[removedPixel]) {
        i += 4;
        removedPixel++;
      }
      newData[idx++] = data[i];
    }
    this.imageData = new ImageData(newData, (width - 1));
    return this.imageData;
  }
}

export default SeamCarver;
