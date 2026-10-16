export {};

const canvas = document.querySelector<HTMLCanvasElement>("#rover-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>("#rover-readout")!;
let x = 2;
let y = 2;
let direction = 0;
const directionRecords = [
  { name: "North", yOffset: -1, xOffset: 0 },
  { name: "East", yOffset: 0, xOffset: 1 },
  { name: "South", yOffset: 1, xOffset: 0 },
  { name: "West", yOffset: 0, xOffset: -1 },
];

function drawRover() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#718881";
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      ctx.strokeRect(10 + column * 56, 10 + row * 56, 56, 56);
    }
  }
  ctx.save();
  ctx.translate(38 + x * 56, 38 + y * 56);
  ctx.rotate(direction * Math.PI / 2);
  ctx.fillStyle = "#27766b";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(17, 16);
  ctx.lineTo(-17, 16);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  readout.textContent = `Position: (${x}, ${y}) · Facing: ${
    directionRecords[direction].name
  }`;
}

type Command = {
  execute(): void;
};

const forwardCommand: Command = {
  execute() {
    const newY = y + directionRecords[direction].yOffset;
    const newX = x + directionRecords[direction].xOffset;

    if (newY >= 0 && newY <= 4 && newX >= 0 && newX <= 4) {
      y = newY;
      x = newX;
      drawRover();
    }
  },
};

const rightCommand: Command = {
  execute() {
    direction = (direction + 1) % 4;
    drawRover();
  },
};

document.querySelector<HTMLButtonElement>("#rover-forward")!.onclick = () => {
  forwardCommand.execute();
};

document.querySelector<HTMLButtonElement>("#rover-right")!.onclick = () => {
  rightCommand.execute();
};

document.querySelector<HTMLButtonElement>("#rover-reset")!.onclick = () => {
  x = 2;
  y = 2;
  direction = 0;
  drawRover();
};
drawRover();
