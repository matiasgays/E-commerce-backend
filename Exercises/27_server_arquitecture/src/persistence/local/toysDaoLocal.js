export default class ToysDaoLocal {
  constructor() {
    this.toys = [];
  }

  getToys() {
    return this.toys;
  }

  saveToy(toy) {
    this.toys.push(toy);
  }
}
