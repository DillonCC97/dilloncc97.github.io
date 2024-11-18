// Tent data stored in inches
const tents = [
  { name: "REI Flash Air", length: 88, width: 35, price: 200 },
  { name: "Big Agnes Spicer Peak 4", length: 118, width: 100, price: 400 },
];

// Unit conversion factors based on inches
const unitConversions = {
  in: 1, // Inches as the base unit
  ft: 1 / 12, // Inches to feet
  cm: 2.54, // Inches to centimeters
  m: 0.0254, // Inches to meters
};

let scatterChartInstance = null;
let overlayCtx = null;

/**
 * Converts a value in inches to the selected unit.
 * @param {number} value - The value in inches.
 * @param {string} unit - The target unit.
 * @returns {number} - The converted value.
 */
function convertFromInches(value, unit) {
  return value * unitConversions[unit];
}

/**
 * Normalizes tent dimensions, calculating area and price per square unit.
 * @param {Object} tent - The tent object.
 */
function normalizeDimensions(tent) {
  tent.areaInInches = tent.length * tent.width;
  tent.pricePerSqIn = tent.price / tent.areaInInches;
}

/**
 * Adds a tent to the list, converting input dimensions to inches.
 */
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
    length: length / unitConversions[lengthUnit], // Convert to inches
    width: width / unitConversions[widthUnit],
    price,
  };

  normalizeDimensions(tent);
  tents.push(tent);
  updateTentTable();
  generateCharts();
}

// Remove a tent and update
function removeTent(index) {
  tents.splice(index, 1);
  updateTentTable();
  generateCharts();
}

// Generate charts based on selected unit
function generateCharts() {
  const selectedUnit = document.getElementById("global-unit").value;
  generateScatterChart(selectedUnit);
  generateOverlayChart(selectedUnit);
}

// Generate the scatter chart with unit conversion
/**
 * Generates the scatter chart with unit conversion for display.
 * @param {string} selectedUnit - The selected unit for display.
 */
function generateScatterChart(selectedUnit = "ft") {
  const scatterCanvas = document.getElementById("scatter-chart");
  const scatterCtx = scatterCanvas.getContext("2d");

  // Convert from inches to the selected unit
  const scaleFactor = unitConversions[selectedUnit];

  const maxArea = Math.max(...tents.map(tent => (tent.areaInInches * scaleFactor ** 2)));
  const maxPricePerSqUnit = Math.max(...tents.map(tent => (tent.pricePerSqIn / (scaleFactor ** 2))));

  const paddedMaxArea = maxArea + maxArea * 0.1;
  const paddedMaxPrice = maxPricePerSqUnit + maxPricePerSqUnit * 0.1;

  // Destroy any existing chart instance before creating a new one
  if (scatterChartInstance) {
    scatterChartInstance.destroy();
    scatterChartInstance = null;
  }

  scatterChartInstance = new Chart(scatterCtx, {
    type: "scatter",
    data: {
      datasets: tents.map((tent, index) => ({
        label: `${tent.name}`,
        data: [
          {
            x: tent.areaInInches * scaleFactor ** 2,
            y: tent.pricePerSqIn / (scaleFactor ** 2),
          },
        ],
        backgroundColor: `rgba(${index * 45 % 255}, ${192 - index * 20 % 255}, 192, 0.6)`,
      })),
    },
    options: {
      responsive: true, // Ensures chart resizes with its container
      maintainAspectRatio: false, // Allows the chart to stretch vertically
      plugins: {
        legend: { display: true, position: "top" },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem) {
              const dataset = tooltipItem.dataset.label;
              const { x, y } = tooltipItem.raw;
              return `${dataset}: Area ${x.toFixed(2)} ${selectedUnit}², Price ${y.toFixed(2)} $/${selectedUnit}²`;
            },
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: `Area (${selectedUnit}²)`,
          },
        },
        y: {
          title: {
            display: true,
            text: `Price per ${selectedUnit}² ($)`,
          },
        },
      },
    },
  });
}

// Generate the overlay chart with unit conversion
/**
 * Generates the overlay chart with unit conversion for display.
 * @param {string} selectedUnit - The selected unit for display.
 */
function generateOverlayChart(selectedUnit = "ft") {
  const overlayCanvas = document.getElementById("overlay-chart");
  overlayCtx = overlayCanvas.getContext("2d");

  const canvasWidth = 550;
  const canvasHeight = 800;
  overlayCanvas.width = canvasWidth;
  overlayCanvas.height = canvasHeight;

  overlayCtx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Convert from inches to the selected unit
  const scaleFactor = unitConversions[selectedUnit];
  const maxTentLength = Math.max(...tents.map(t => t.length * scaleFactor), 1); // Max length in units
  const maxTentWidth = Math.max(...tents.map(t => t.width * scaleFactor), 1); // Max width in units

  // Calculate scaling factor to fit tents with at least 10% padding
  const lengthScale = canvasHeight / (maxTentLength * 1.1); // Scale to fit length with 10% padding
  const widthScale = canvasWidth / (maxTentWidth * 1.1); // Scale to fit width with 10% padding
  const scale = Math.min(lengthScale, widthScale); // Use the smaller scale for consistent sizing

  // Calculate grid spacing in units, rounded to the nearest multiple of 5
  const maxGridLines = 20; // Maximum number of gridlines
  let rawGridSpacing = Math.max(maxTentLength, maxTentWidth) / maxGridLines; // Tent size per gridline
  if (rawGridSpacing < 1) {
    rawGridSpacing = 1; // Minimum spacing
  } else {
    rawGridSpacing = Math.ceil(rawGridSpacing / 5) * 5; // Round up to nearest multiple of 5
  }

  const gridSpacingPx = rawGridSpacing * scale; // Grid spacing in pixels

  // Set dynamic font size for labels
  const baseFontSize = Math.max(10, Math.min(14, canvasHeight / 50));
  overlayCtx.font = `${baseFontSize}px Arial`;

  // Draw grid lines and labels
  overlayCtx.strokeStyle = "#cccccc";
  overlayCtx.lineWidth = 0.5;

  // Vertical grid lines and labels
  for (let i = 0; i <= canvasWidth / gridSpacingPx; i++) {
    const xPx = i * gridSpacingPx; // Position in pixels
    const x = i * rawGridSpacing; // Converted value in the selected unit
    overlayCtx.beginPath();
    overlayCtx.moveTo(xPx, 0);
    overlayCtx.lineTo(xPx, canvasHeight);
    overlayCtx.stroke();
    overlayCtx.fillText(`${x.toFixed(0)} ${selectedUnit}`, xPx + 5, canvasHeight - 10);
  }

  // Horizontal grid lines and labels
  for (let i = 0; i <= canvasHeight / gridSpacingPx; i++) {
    const yPx = i * gridSpacingPx; // Position in pixels
    const y = i * rawGridSpacing; // Converted value in the selected unit
    overlayCtx.beginPath();
    overlayCtx.moveTo(0, yPx);
    overlayCtx.lineTo(canvasWidth, yPx);
    overlayCtx.stroke();
    overlayCtx.fillText(`${y.toFixed(0)} ${selectedUnit}`, 5, yPx - 5);
  }

  // Render tents with scaling
  const sortedTents = [...tents].sort((a, b) => b.areaInInches - a.areaInInches);

  sortedTents.forEach((tent, index) => {
    const rectWidthPx = tent.width * scaleFactor * scale;
    const rectHeightPx = tent.length * scaleFactor * scale;

    overlayCtx.fillStyle = `rgba(${index * 60 % 255}, ${150 - index * 30 % 255}, 100, 0.1)`;
    overlayCtx.fillRect(0, 0, rectWidthPx, rectHeightPx);

    overlayCtx.strokeStyle = `rgba(${index * 60 % 255}, ${150 - index * 30 % 255}, 100, 1)`;
    overlayCtx.strokeRect(0, 0, rectWidthPx, rectHeightPx);

    // Convert length and width to the selected unit
    const convertedLength = tent.length * scaleFactor;
    const convertedWidth = tent.width * scaleFactor;

    overlayCtx.fillStyle = `rgba(${index * 60 % 255}, ${150 - index * 30 % 255}, 100, 1)`;
    overlayCtx.fillText(
      `${tent.name} (${convertedLength.toFixed(1)}x${convertedWidth.toFixed(1)} ${selectedUnit})`,
      30,
      rectHeightPx - 30
    );
  });
}

let currentSortColumn = null;
let currentSortDirection = "asc";

/**
 * Updates the tent table based on the selected unit.
 */
function updateTentTable() {
  const tableBody = document.querySelector("#tent-table tbody");
  tableBody.innerHTML = "";

  const selectedUnit = document.getElementById("global-unit").value;

  tents.forEach((tent, index) => {
    const convertedLength = convertFromInches(tent.length, selectedUnit);
    const convertedWidth = convertFromInches(tent.width, selectedUnit);
    const convertedArea = convertedLength * convertedWidth;
    const pricePerUnit = tent.price / convertedArea;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tent.name}</td>
      <td>${convertedLength.toFixed(2)}</td>
      <td>${convertedWidth.toFixed(2)}</td>
      <td>${convertedArea.toFixed(2)}</td>
      <td>${tent.price.toFixed(2)}</td>
      <td>${pricePerUnit.toFixed(2)}</td>
      <td><button onclick="removeTent(${index})">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });

  updateTableHeaders(); // Update header indicators
}

/**
 * Sorts the tent table by a specified column.
 * @param {string} key - The key to sort by (e.g., "name", "length", "area").
 */
function sortTable(key) {
  const selectedUnit = document.getElementById("global-unit").value;
  const scaleFactor = unitConversions[selectedUnit];

  // Toggle direction if sorting the same column, otherwise default to ascending
  if (currentSortColumn === key) {
    currentSortDirection = currentSortDirection === "asc" ? "desc" : "asc";
  } else {
    currentSortColumn = key;
    currentSortDirection = "asc";
  }

  // Dynamically calculate derived values for sorting
  tents.sort((a, b) => {
    const getValue = (tent) => {
      const convertedLength = tent.length * scaleFactor;
      const convertedWidth = tent.width * scaleFactor;
      const area = convertedLength * convertedWidth;

      return key === "name"
        ? tent.name
        : key === "length"
          ? convertedLength
          : key === "width"
            ? convertedWidth
            : key === "area"
              ? area
              : key === "price"
                ? tent.price
                : key === "pricePerSqFt"
                  ? tent.price / area
                  : 0;
    };

    const valueA = getValue(a);
    const valueB = getValue(b);

    if (currentSortDirection === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });

  updateTentTable(); // Re-render table after sorting
}

/**
 * Updates the table headers to reflect the selected unit and sorting indicators.
 */
function updateTableHeaders() {
  const selectedUnit = document.getElementById("global-unit").value;

  const unitLabel =
    selectedUnit === "in" ? "In" :
      selectedUnit === "ft" ? "Ft" :
        selectedUnit === "cm" ? "Cm" : "M";

  const headersConfig = {
    name: "Name",
    length: `Length (${unitLabel})`,
    width: `Width (${unitLabel})`,
    area: `Area (${unitLabel}²)`,
    price: "Price ($)",
    pricePerSqFt: `Price/${unitLabel}² ($)`,
  };

  const headers = document.querySelectorAll("#tent-table th");
  headers.forEach((header) => {
    const key = header.getAttribute("onclick")?.match(/sortTable\('(.+?)'\)/)?.[1];
    if (key && headersConfig[key]) {
      let headerText = headersConfig[key];
      if (key === currentSortColumn) {
        headerText += currentSortDirection === "asc" ? "↑" : "↓";
      }
      header.textContent = headerText;
    }
  });
}

/**
 * Updates the column headers with sorting indicators.
 */
function updateSortIndicators() {
  const headers = document.querySelectorAll("#tent-table th");
  headers.forEach((header) => {
    const key = header.getAttribute("onclick").match(/sortTable\('(.+?)'\)/)?.[1];
    if (key === currentSortColumn) {
      header.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}${
        currentSortDirection === "asc" ? "↑" : "↓"
      }`;
    } else {
      header.textContent = key
        ? key.charAt(0).toUpperCase() + key.slice(1)
        : header.textContent;
    }
  });
}

tents.forEach(normalizeDimensions);
updateTentTable();
generateCharts();
