import Matrix from './matrix';
import Picture from './picture';

class DualGradient extends Matrix {
  constructor(imageData) {
    const picture = new Picture(imageData);
    const { width, height } = picture;
    super(width, height);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        this[row][col] = DualGradient.calcEnergy(picture, row, col, width, height);
      }
    }
  }

  static calcEnergy(picture, row, col, width, height) {
    const mostRight = width - 1;
    const mostBottom = height - 1;

    const xGradient = () => {
      const left = col > 0 ? picture.getRGB(row, col - 1) : picture.getRGB(row, mostRight);
      const right = col < mostRight ? picture.getRGB(row, col + 1) : picture.getRGB(row, 0);

      return (((right >> 16) & 0xFF) - ((left >> 16) & 0xFF)) ** 2
        + (((right >> 8) & 0xFF) - ((left >> 8) & 0xFF)) ** 2
        + (((right >> 0) & 0xFF) - ((left >> 0) & 0xFF)) ** 2;
    };

    const yGradient = () => {
      const top = row > 0 ? picture.getRGB(row - 1, col) : picture.getRGB(mostBottom, col);
      const bottom = row < mostBottom ? picture.getRGB(row + 1, col) : picture.getRGB(0, col);
      return (((top >> 16) & 0xFF) - ((bottom >> 16) & 0xFF)) ** 2
        + (((top >> 8) & 0xFF) - ((bottom >> 8) & 0xFF)) ** 2
        + (((top >> 0) & 0xFF) - ((bottom >> 0) & 0xFF)) ** 2;
    };
    return Math.sqrt(xGradient() + yGradient());
  }
}

export default DualGradient;
