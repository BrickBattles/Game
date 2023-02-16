const EasyStar = require('easystarjs');

export class Pathfinding {
  easystar: any;

  constructor() {
    this.easystar = new EasyStar.js();
    this.easystar.enableSync();
    this.easystar.enableDiagonals();
    this.easystar.enableCornerCutting();

    var grid = [
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0], // 1 = walkable, 0 = not walkable
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
    ];

    // 6x10
    var grid2 = [
      [0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];

    // 12x20 => 480x800 / 40x40
    var grid3 = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0], //
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.easystar.setGrid(grid3);
    this.easystar.setAcceptableTiles([1]);
    // this.easystar.setIterationsPerCalculation(1000);
  }

  findPath(startX: number, startY: number, endX: number, endY: number) {
    // conv 480x800 x y to 5x9 grid
    // let x_offset = 96;
    // let y_offset = 160;
    let x_offset = 40;
    let y_offset = 40;
    startX = Math.floor(startX / x_offset);
    startY = Math.floor(startY / y_offset);
    endX = Math.floor(endX / x_offset);
    endY = Math.floor(endY / y_offset);

    console.log(`startX: ${startX}, startY: ${startY}, endX: ${endX}, endY: ${endY}`);

    let sol = {};

    this.easystar.findPath(startX, startY, endX, endY, (path: any) => {
      if (path === null) {
        console.log('Path was not found.');
      } else {
        console.log(path);

        path = path.map((p: any) => {
          return { x: p.x * x_offset, y: p.y * y_offset };
        });
        sol = path;
      }
    });

    this.easystar.calculate();
    return sol;
  }
}
