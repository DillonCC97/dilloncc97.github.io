/**
 * OLYMPIC LIFTING WORKOUT BUILDER - APPLICATION LOGIC
 * ===================================================
 * 
 * This file contains all application logic for the workout builder.
 * It manages state, renders UI elements, and handles user interactions.
 * 
 * ARCHITECTURE:
 * -------------
 * - State Management: Single state object tracks all selections
 * - UI Rendering: Functions dynamically generate UI from workout data
 * - Event Handling: Click handlers update state and trigger re-renders
 * 
 * ADDING NEW FEATURES:
 * --------------------
 * 1. To add new lift types: Update workout-data.js, no changes needed here
 * 2. To add new intensity levels: Update workout-data.js intensityLevels
 * 3. To modify UI rendering: Update the render functions in this file
 */

// ==========================================
// STATE MANAGEMENT
// ==========================================

/**
 * Application state
 * Tracks current user selections across all workout components
 */
const state = {
  liftType: 'cleanAndJerk',      // Current lift type key
  intensity: 'moderate',          // Current intensity level key
  selectedComplex: 0,             // Index of selected complex
  selectedAccessory: 0            // Index of selected accessory
};

// ==========================================
// UI RENDERING FUNCTIONS
// ==========================================

/**
 * Renders lift type selection buttons
 * Automatically generates buttons from all lift types in workoutData
 */
function renderLiftTypeButtons() {
  const container = document.getElementById('lift-type-buttons');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Generate a button for each lift type in the data
  Object.keys(workoutData).forEach(liftKey => {
    const lift = workoutData[liftKey];
    const button = createButton(
      lift.displayName,
      () => setLiftType(liftKey),
      state.liftType === liftKey
    );
    container.appendChild(button);
  });
}

/**
 * Renders intensity level selection buttons
 * Automatically generates buttons from intensityLevels configuration
 */
function renderIntensityButtons() {
  const container = document.getElementById('intensity-buttons');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Generate a button for each intensity level
  Object.keys(intensityLevels).forEach(intensityKey => {
    const intensity = intensityLevels[intensityKey];
    const button = createButton(
      intensity.displayName,
      () => setIntensity(intensityKey),
      state.intensity === intensityKey,
      intensity.description
    );
    container.appendChild(button);
  });
}

/**
 * Renders technical complex selection buttons
 * Buttons are generated based on current lift type and intensity
 */
function renderComplexButtons() {
  const container = document.getElementById('complex-buttons');
  if (!container) return;
  
  const currentData = workoutData[state.liftType];
  const complexes = currentData.complexes[state.intensity];
  
  container.innerHTML = '';
  
  // Generate a button for each complex at current intensity
  complexes.forEach((complex, idx) => {
    const button = createButton(
      complex.name,
      () => setComplex(idx),
      state.selectedComplex === idx,
      `${complex.percentage} • ${complex.sets}`
    );
    container.appendChild(button);
  });
}

/**
 * Renders accessory finisher selection buttons
 * Buttons are generated from current lift type's accessory options
 */
function renderAccessoryButtons() {
  const container = document.getElementById('accessory-buttons');
  if (!container) return;
  
  const currentData = workoutData[state.liftType];
  
  container.innerHTML = '';
  
  // Generate a button for each accessory option
  currentData.accessories.forEach((acc, idx) => {
    const button = createButton(
      acc.name,
      () => setAccessory(idx),
      state.selectedAccessory === idx
    );
    container.appendChild(button);
  });
}

/**
 * Renders the complete workout display
 * Updates all sections based on current state
 */
function renderWorkout() {
  const currentData = workoutData[state.liftType];
  const complexes = currentData.complexes[state.intensity];
  const progression = currentData.progressions[state.intensity];
  const selectedComplex = complexes[state.selectedComplex];
  const selectedAccessory = currentData.accessories[state.selectedAccessory];

  // Update lift name displays throughout the workout
  updateTextContent('warmup-lift-name', currentData.displayName);
  updateTextContent('lift-name', currentData.displayName);

  // Render each workout section
  renderWarmup(currentData.warmup);
  renderComplex(selectedComplex);
  renderProgression(progression);
  renderAccessory(selectedAccessory);
}

/**
 * Renders the warmup section
 * @param {Array<string>} warmupExercises - List of warmup exercises
 */
function renderWarmup(warmupExercises) {
  const list = document.getElementById('warmup-list');
  if (!list) return;
  
  list.innerHTML = warmupExercises
    .map(exercise => `<li>${exercise}</li>`)
    .join('');
}

/**
 * Renders the technical complex section
 * @param {Object} complex - Complex object with name, exercises, sets, percentage
 */
function renderComplex(complex) {
  updateTextContent('complex-name', complex.name);
  updateTextContent('complex-details', `${complex.percentage} of 1RM • ${complex.sets}`);
  
  const list = document.getElementById('complex-exercises');
  if (!list) return;
  
  // Render exercises with numbered list items
  list.innerHTML = complex.exercises
    .map((exercise, idx) => `<li data-number="${idx + 1}.">${exercise}</li>`)
    .join('');
}

/**
 * Renders the main lift progression section
 * @param {Object} progression - Progression object with name, sets, rest
 */
function renderProgression(progression) {
  updateTextContent('progression-name', progression.name);
  updateTextContent('progression-rest', progression.rest);
  
  const list = document.getElementById('progression-sets');
  if (!list) return;
  
  list.innerHTML = progression.sets
    .map(set => `<li>${set}</li>`)
    .join('');
}

/**
 * Renders the accessory finisher section
 * @param {Object} accessory - Accessory object with name and exercises
 */
function renderAccessory(accessory) {
  updateTextContent('accessory-name', accessory.name);
  
  const list = document.getElementById('accessory-exercises');
  if (!list) return;
  
  list.innerHTML = accessory.exercises
    .map(exercise => `<li>${exercise}</li>`)
    .join('');
}

// ==========================================
// UI HELPER FUNCTIONS
// ==========================================

/**
 * Creates a selection button element
 * @param {string} text - Button text
 * @param {Function} onClick - Click handler
 * @param {boolean} isSelected - Whether button is currently selected
 * @param {string} detail - Optional detail text (shown in smaller font)
 * @returns {HTMLButtonElement}
 */
function createButton(text, onClick, isSelected, detail = null) {
  const button = document.createElement('button');
  button.onclick = onClick;
  
  if (isSelected) {
    button.classList.add('selected');
  }
  
  button.textContent = text;
  
  // Add detail text if provided
  if (detail) {
    const detailSpan = document.createElement('span');
    detailSpan.className = 'button-detail';
    detailSpan.textContent = detail;
    button.appendChild(detailSpan);
  }
  
  return button;
}

/**
 * Updates text content of an element by ID
 * @param {string} elementId - ID of the element to update
 * @param {string} content - New text content
 */
function updateTextContent(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = content;
  }
}

// ==========================================
// STATE SETTERS
// ==========================================

/**
 * Updates the selected lift type
 * Resets complex and accessory selections to first option
 * @param {string} type - Lift type key (e.g., 'cleanAndJerk', 'snatch')
 */
function setLiftType(type) {
  state.liftType = type;
  state.selectedComplex = 0;
  state.selectedAccessory = 0;
  
  // Re-render affected UI sections
  renderLiftTypeButtons();
  renderComplexButtons();
  renderAccessoryButtons();
  renderWorkout();
}

/**
 * Updates the selected intensity level
 * Resets complex selection to first option (complexes change with intensity)
 * @param {string} level - Intensity level key (e.g., 'light', 'moderate', 'heavy')
 */
function setIntensity(level) {
  state.intensity = level;
  state.selectedComplex = 0;
  
  // Re-render affected UI sections
  renderIntensityButtons();
  renderComplexButtons();
  renderWorkout();
}

/**
 * Updates the selected complex
 * @param {number} idx - Index of the complex in the current intensity level
 */
function setComplex(idx) {
  state.selectedComplex = idx;
  
  // Re-render affected UI sections
  renderComplexButtons();
  renderWorkout();
}

/**
 * Updates the selected accessory
 * @param {number} idx - Index of the accessory in the accessories array
 */
function setAccessory(idx) {
  state.selectedAccessory = idx;
  
  // Re-render affected UI sections
  renderAccessoryButtons();
  renderWorkout();
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initializes the application
 * Called when DOM is fully loaded
 * Renders all UI components with default state
 */
function initializeApp() {
  renderLiftTypeButtons();
  renderIntensityButtons();
  renderComplexButtons();
  renderAccessoryButtons();
  renderWorkout();
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeApp);
