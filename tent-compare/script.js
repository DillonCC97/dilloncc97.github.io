const tents = [
  { name: "Tent A", length: 10, width: 8, price: 200 },
  { name: "Tent B", length: 12, width: 10, price: 300 },
  { name: "Tent C", length: 15, width: 10, price: 400 },
];

const unitConversions = {
  ft: 1,
  in: 1 / 12,
  cm: 1 / 30.48,
  m: 1 / 3.28084,
};

let scatterChartInstance = null;
let overlayCtx = null;

function normalizeDimensions(tent) {
  if (tent.width > tent.length) {
    [tent.length, tent.width] = [tent.width, tent.length];
  }
  tent.area = tent.length * tent.width;
  tent.pricePerSqFt = tent.price / tent.area;
}

function addTent() {
  const name = document.getElementById("tent-name").value;
  const length = parseFloat(document.getElementById("tent-length").value);
  const width = parseFloat(document.getElementById("tent-width").value);
  const lengthUnit = document.getElementById("length-unit").value;
  const widthUnit = document.getElementById("width-unit").value;
  const price = parseFloat(document.getElementById("tent-price").value);

  if (!name || length <= 0 || width <= 0 || price <= 0) {
    alert("Please provide valid inputs for all fields.");
    return;
  }

  const tent = {
    name,
    length: length * unitConversions[lengthUnit],
    width: width * unitConversions[widthUnit],
    price,
  };
  normalizeDimensions(tent);
  tents.push(tent);
  updateTentList();
  generateScatterChart();
  generateOverlayChart();
}

function removeTent(index) {
  tents.splice(index, 1);
  updateTentList();
  generateScatterChart();
  generateOverlayChart();
}

function updateTentList() {
  const list = document.getElementById("tent-list");
  list.innerHTML = "";
  tents.forEach((tent, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${tent.name} - ${tent.length.toFixed(2)}x${tent.width.toFixed(2)} ft (${tent.area.toFixed(2)} ft²) - $${tent.price.toFixed(2)}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeTent(index);
    listItem.appendChild(removeButton);
    list.appendChild(listItem);
  });
}

function generateScatterChart() {
  const scatterCtx = document.getElementById("scatter-chart").getContext("2d");
  const scatterUnit = document.getElementById("scatter-unit").value;

  // Conversion factor for selected unit
  const unitFactor = 1 / unitConversions[scatterUnit];

  // Destroy existing scatter chart if present
  if (scatterChartInstance) {
    scatterChartInstance.destroy();
  }

  // Create Scatter Chart
  scatterChartInstance = new Chart(scatterCtx, {
    type: "scatter",
    data: {
      datasets: tents.map((tent, index) => ({
        label: tent.name,
        data: [
          {
            x: tent.area * unitFactor * unitFactor, // Convert area
            y: tent.pricePerSqFt / (unitFactor * unitFactor), // Convert price per square unit
          },
        ],
        backgroundColor: `rgba(${index * 45 % 255}, ${192 - index * 20 % 255}, 192, 0.6)`,
      })),
    },
    options: {
      plugins: {
        legend: { display: true, position: "top" },
        tooltip: { enabled: true },
      },
      scales: {
        x: { title: { display: true, text: `Area (${scatterUnit}²)` } },
        y: { title: { display: true, text: `Price per ${scatterUnit}² ($)` } },
      },
    },
  });
}

function generateOverlayChart() {
  const overlayCanvas = document.getElementById("overlay-chart");
  overlayCtx = overlayCanvas.getContext("2d");
  const scatterUnit = document.getElementById("scatter-unit").value;

  // Maximum dimensions of the tents
  const maxTentLength = Math.max(...tents.map((tent) => tent.length));
  const maxTentWidth = Math.max(...tents.map((tent) => tent.width));

  // Dynamic canvas size based on maximum tent width
  overlayCanvas.width = maxTentWidth * 100; // Scale width to 100px per unit
  overlayCanvas.height = maxTentLength * 100; // Scale height to 100px per unit

  // Conversion factor for selected unit
  const unitFactor = 1 / unitConversions[scatterUnit];

  // Clear the canvas
  overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  // Calculate scale factor to fit all tents within canvas
  const scale = Math.min(
    overlayCanvas.width / maxTentWidth,
    overlayCanvas.height / maxTentLength
  );

  // Sort tents by area in descending order for layering
  const sortedTents = [...tents].sort((a, b) => b.area - a.area);

  sortedTents.forEach((tent, index) => {
    // Calculate scaled rectangle dimensions
    const rectWidth = tent.width * scale;
    const rectHeight = tent.length * scale;

    // Convert dimensions to selected unit
    const lengthConverted = tent.length * unitFactor;
    const widthConverted = tent.width * unitFactor;

    // Define colors for fill and stroke
    const fillColor = `rgba(${index * 60 % 255}, ${192 - index * 30 % 255}, 150, 0.4)`;
    const strokeColor = `rgba(${index * 60 % 255}, ${192 - index * 30 % 255}, 150, 1)`;

    // Align to the top-left corner
    const offsetX = 0;
    const offsetY = 0;

    // Draw the filled rectangle
    overlayCtx.fillStyle = fillColor;
    overlayCtx.fillRect(offsetX, offsetY, rectWidth, rectHeight);

    // Draw the rectangle outline
    overlayCtx.strokeStyle = strokeColor;
    overlayCtx.lineWidth = 2;
    overlayCtx.strokeRect(offsetX, offsetY, rectWidth, rectHeight);

    // Add label to the bottom-left of the rectangle
    overlayCtx.font = "14px Arial";
    overlayCtx.fillStyle = "black";
    overlayCtx.fillText(
      `${tent.name} (${lengthConverted.toFixed(2)}x${widthConverted.toFixed(2)} ${scatterUnit})`,
      offsetX + 5, // Padding from left
      offsetY + rectHeight - 5 // Padding from bottom
    );
  });
}

// Initial setup
tents.forEach(normalizeDimensions);
updateTentList();
generateScatterChart();
generateOverlayChart();
