export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let totalProducers = 2;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const { totalProduction, suppliesConsumed, netBalance } = calculateProduction(
    totalProducers,
  );
  renderCrewSlots(totalProducers);
  renderShiftReport(totalProducers, totalProduction, suppliesConsumed);
  renderTextReadout(
    totalProducers,
    totalProduction,
    suppliesConsumed,
    netBalance,
  );
}

function calculateProduction(totalProducers: number) {
  const totalProduction = totalProducers * 3;
  const suppliesConsumed = 6;
  const netBalance = totalProduction - suppliesConsumed;

  return {
    totalProduction,
    suppliesConsumed,
    netBalance,
  };
}

function renderCrewSlots(totalProducers: number) {
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < totalProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < totalProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
}

function renderShiftReport(
  totalProducers: number,
  totalProduction: number,
  suppliesConsumed: number,
) {
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${totalProducers} / 6`, 18, 76);
  ctx.fillText(`Production: ${totalProduction}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, totalProduction * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${suppliesConsumed}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, suppliesConsumed * 14, 20);
}

function renderTextReadout(
  totalProducers: number,
  totalProduction: number,
  suppliesConsumed: number,
  netBalance: number,
) {
  readout.textContent =
    `Assigned: ${totalProducers}/6 · Production: ${totalProduction} · Consumption: ${suppliesConsumed} · Balance: ${
      netBalance > 0 ? "+" : ""
    }${netBalance}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  totalProducers = Math.max(0, totalProducers - 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  totalProducers = Math.min(6, totalProducers + 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    totalProducers = 2;
    update();
  };
update();
