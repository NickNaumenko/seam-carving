class Matrix extends Array {
  constructor(width, height) {
    super(height);

    for (let i = 0; i < height; i++) {
      this[i] = new Array(width);
    }
  }

  get width() {
    return this[0]?.length;
  }

  get height() {
    return this.length;
  }

  removeVerticalSeam(seam) {
    if (seam.length !== this.length) {
      throw new Error('Seam length must be the same as energyMap length');
    }
    seam.forEach((val, i) => {
      this[i] = this[i].filter((energy, idx) => idx !== val);
    });
  }

  transpose() {
    const { width, height } = this;
    const matrix = new Matrix(height, width);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        matrix[col][row] = this[row][col];
      }
    }

    return matrix;
  }
}

export default Matrix;
