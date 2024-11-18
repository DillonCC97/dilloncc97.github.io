const tents = [
  { name: "Tent A", length: 10, width: 8, price: 200 },
  { name: "Tent B", length: 12, width: 10, price: 300 },
  { name: "Tent C", length: 15, width: 10, price: 400 },
];

// Correct unit conversions with feet as the base unit
const unitConversions = {
  ft: 1, // Feet as the base unit
  in: 12, // Feet to inches (1 ft = 12 inches)
  cm: 30.48, // Feet to centimeters (1 ft = 30.48 cm)
  m: 0.3048, // Feet to meters (1 ft = 0.3048 m)
};

let scatterChartInstance = null;
let overlayCtx = null;

// Normalize dimensions and calculate derived properties
function normalizeDimensions(tent) {
  if (tent.width > tent.length) {
    [tent.length, tent.width] = [tent.width, tent.length];
  }
  tent.area = tent.length * tent.width;
  tent.pricePerSqFt = tent.price / tent.area;
}

// Add tent to the list and regenerate charts
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

  // Convert input lengths to feet
  const tent = {
    name,
    length: length / unitConversions[lengthUnit],
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
  const selectedUnit = document.getElementById("scatter-unit").value;
  generateScatterChart(selectedUnit);
  generateOverlayChart(selectedUnit);
}

// Generate the scatter chart with unit conversion
function generateScatterChart(selectedUnit = "ft") {
  const scatterCanvas = document.getElementById("scatter-chart");
  const scatterCtx = scatterCanvas.getContext("2d");

  // Convert tent dimensions to the selected unit
  const scaleFactor = unitConversions[selectedUnit];

  // Calculate the maximum area and price per square unit across all tents
  const maxArea = Math.max(...tents.map(tent => tent.area * scaleFactor ** 2));
  const maxPricePerSqUnit = Math.max(...tents.map(tent => tent.pricePerSqFt / (scaleFactor ** 2)));

  // Add 10% padding to the maximum values
  const paddedMaxArea = maxArea + maxArea * 0.1; // 10% extra padding
  const paddedMaxPrice = maxPricePerSqUnit + maxPricePerSqUnit * 0.1; // 10% extra padding

  // Destroy any existing chart instance
  if (scatterChartInstance) {
    scatterChartInstance.destroy();
    scatterChartInstance = null;
  }

  // Create the scatter plot
  scatterChartInstance = new Chart(scatterCtx, {
    type: "scatter",
    data: {
      datasets: tents.map((tent, index) => ({
        label: `${tent.name} ($${(tent.pricePerSqFt / (scaleFactor ** 2)).toFixed(2)} per ${selectedUnit}²)`,
        data: [
          {
            x: tent.area * scaleFactor ** 2, // Convert area to the selected unit
            y: tent.pricePerSqFt / (scaleFactor ** 2), // Convert price per area unit
          },
        ],
        backgroundColor: `rgba(${index * 45 % 255}, ${192 - index * 20 % 255}, 192, 0.6)`,
      })),
    },
    options: {
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
          min: 0, // Start from 0
          max: paddedMaxArea, // Include padding
        },
        y: {
          title: {
            display: true,
            text: `Price per ${selectedUnit}² ($)`,
          },
          min: 0, // Start from 0
          max: paddedMaxPrice, // Include padding
        },
      },
    },
  });
}

// Generate the overlay chart with unit conversion
function generateOverlayChart(selectedUnit = "ft") {
  const overlayCanvas = document.getElementById("overlay-chart");
  overlayCtx = overlayCanvas.getContext("2d");

  // Fixed canvas size
  const canvasWidth = 550; // Fixed canvas width
  const canvasHeight = 800; // Fixed canvas height
  overlayCanvas.width = canvasWidth;
  overlayCanvas.height = canvasHeight;

  overlayCtx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Convert tent dimensions to the selected unit
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
    const x = (xPx / scale); // Convert back to units
    overlayCtx.beginPath();
    overlayCtx.moveTo(xPx, 0);
    overlayCtx.lineTo(xPx, canvasHeight);
    overlayCtx.stroke();
    overlayCtx.fillText(`${x.toFixed(0)} ${selectedUnit}`, xPx + 5, canvasHeight - 10);
  }

  // Horizontal grid lines and labels
  for (let i = 0; i <= canvasHeight / gridSpacingPx; i++) {
    const yPx = i * gridSpacingPx; // Position in pixels
    const y = (yPx / scale); // Convert back to units
    overlayCtx.beginPath();
    overlayCtx.moveTo(0, yPx);
    overlayCtx.lineTo(canvasWidth, yPx);
    overlayCtx.stroke();
    overlayCtx.fillText(`${y.toFixed(0)} ${selectedUnit}`, 5, yPx - 5);
  }

  // Render tents with scaling
  const sortedTents = [...tents].sort((a, b) => b.area - a.area);

  sortedTents.forEach((tent, index) => {
    const rectWidthPx = tent.width * scaleFactor * scale; // Convert width to pixels
    const rectHeightPx = tent.length * scaleFactor * scale; // Convert length to pixels

    overlayCtx.fillStyle = `rgba(${index * 60 % 255}, ${150 - index * 30 % 255}, 100, 0.1)`;
    overlayCtx.fillRect(0, 0, rectWidthPx, rectHeightPx);

    overlayCtx.strokeStyle = `rgba(${index * 60 % 255}, ${150 - index * 30 % 255}, 100, 1)`;
    overlayCtx.strokeRect(0, 0, rectWidthPx, rectHeightPx);

    // Add tent name and dimensions to the label
    overlayCtx.fillStyle = `rgba(${index * 60 % 255}, ${150 - index * 30 % 255}, 100, 1)`;
    overlayCtx.fillText(
      `${tent.name} (${tent.length.toFixed(1)}x${tent.width.toFixed(1)} ${selectedUnit})`,
      30,
      rectHeightPx - 30
    );
  });
}

let currentSortColumn = null;
let currentSortDirection = "asc";

/**
 * Updates the tent table in the DOM with unit conversion.
 */
/**
 * Updates the tent table in the DOM with unit conversion.
 */
function updateTentTable() {
  const tableBody = document.querySelector("#tent-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  const selectedUnit = document.getElementById("scatter-unit").value;
  const scaleFactor = unitConversions[selectedUnit];

  tents.forEach((tent, index) => {
    const convertedLength = tent.length * scaleFactor;
    const convertedWidth = tent.width * scaleFactor;
    const area = convertedLength * convertedWidth; // Calculate area in selected unit²
    const pricePerUnit = tent.price / area; // Calculate price per square unit

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tent.name}</td>
      <td>${convertedLength.toFixed(2)}</td>
      <td>${convertedWidth.toFixed(2)}</td>
      <td>${area.toFixed(2)}</td>
      <td>${tent.price.toFixed(2)}</td>
      <td>${pricePerUnit.toFixed(2)}</td>
      <td><button onclick="removeTent(${index})">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });

  updateSortIndicators(); // Update header indicators
}

/**
 * Sorts the tent table by a specified column.
 * @param {string} key - The key to sort by (e.g., "name", "length", "area").
 */
function sortTable(key) {
  const selectedUnit = document.getElementById("scatter-unit").value;
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
 * Updates the column headers with sorting indicators.
 */
function updateSortIndicators() {
  const headers = document.querySelectorAll("#tent-table th");
  headers.forEach((header) => {
    const key = header.getAttribute("onclick").match(/sortTable\('(.+?)'\)/)?.[1];
    if (key === currentSortColumn) {
      header.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} ${
        currentSortDirection === "asc" ? "↑" : "↓"
      }`;
    } else {
      header.textContent = key
        ? key.charAt(0).toUpperCase() + key.slice(1)
        : header.textContent;
    }
  });
}

// Initialize the table
updateTentTable();


// Initialize charts with default unit
tents.forEach(normalizeDimensions);
generateCharts();
