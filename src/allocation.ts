export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

let totalProducers = 2;

type ProductionReport = {
  totalProduction: number;
  suppliesConsumed: number;
  netBalance: number;
};

type DisplayRecord = {
  label: string;
  value: number;
  color: string;
};

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const productionReport: ProductionReport = calculateProduction(
    totalProducers,
  );
  renderCrewSlots(totalProducers);
  renderShiftReport(productionReport);
  renderTextReadout(productionReport);
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

function renderShiftReport(productionReport: ProductionReport) {
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${totalProducers} / 6`, 18, 76);
  const textColor = "#233e43";

  const displayRecords: DisplayRecord[] = [
    {
      label: "Production",
      value: productionReport.totalProduction,
      color: "#27766b",
    },
    {
      label: "Consumption",
      value: productionReport.suppliesConsumed,
      color: "#a44d23",
    },
  ];

  for (const [index, displayRecord] of displayRecords.entries()) {
    ctx.fillStyle = textColor;
    ctx.fillText(
      `${displayRecord.label}: ${displayRecord.value}`,
      18,
      102 + index * 52,
    );
    ctx.fillStyle = displayRecord.color;
    ctx.fillRect(18, 110 + index * 52, displayRecord.value * 14, 20);
  }
}

function renderTextReadout(productionReport: ProductionReport) {
  readout.textContent =
    `Assigned: ${totalProducers}/6 · Production: ${productionReport.totalProduction} · Consumption: ${productionReport.suppliesConsumed} · Balance: ${
      productionReport.netBalance > 0 ? "+" : ""
    }${productionReport.netBalance}`;
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
