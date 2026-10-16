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
  label: string;
  execute(): void;
};

const forwardCommand: Command = {
  label: "Forward",
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
  label: "Right",
  execute() {
    direction = (direction + 1) % 4;
    drawRover();
  },
};

document.querySelector<HTMLButtonElement>("#rover-forward")!.onclick = () => {
  commandQueue.push(forwardCommand);
  renderQueue();
};

document.querySelector<HTMLButtonElement>("#rover-right")!.onclick = () => {
  commandQueue.push(rightCommand);
  renderQueue();
};

const commandQueue: Command[] = [];

const displayQueue = document.querySelector<HTMLOListElement>(
  "#rover-queue-status",
)!;

document.querySelector<HTMLButtonElement>("#rover-run")!.onclick = () => {
  while (commandQueue.length > 0) {
    const command = commandQueue.shift()!;
    command.execute();
  }

  renderQueue();
};
document.querySelector<HTMLButtonElement>("#rover-clear")!.onclick = () => {
  commandQueue.length = 0;
  renderQueue();
};

function renderQueue() {
  displayQueue.replaceChildren();

  for (const command of commandQueue) {
    const item = document.createElement("li");
    item.textContent = command.label;
    displayQueue.appendChild(item);
  }
}

document.querySelector<HTMLButtonElement>("#rover-reset")!.onclick = () => {
  x = 2;
  y = 2;
  direction = 0;

  commandQueue.length = 0;
  renderQueue();
  drawRover();
};

drawRover();
renderQueue();
