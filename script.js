// Global variables
let history = [];
let midValue = 0;

// Append value to the display
function appendValue(value) {
    const display = document.getElementById("currentDisplay");
    if (display.textContent === "0") {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

// Clear the display
function clearDisplay() {
    document.getElementById("currentDisplay").textContent = "0";
    document.getElementById("secondaryDisplay").textContent = "0";
}

// Calculate the result and update history
function calculateResult() {
    const display = document.getElementById("currentDisplay");
    try {
        const expression = display.textContent.replace("×", "*").replace("÷", "/").replace("^", "**");
        const result = eval(expression); // Evaluate the expression
        history.push(`${display.textContent} = ${result}`);
        updateHistory();
        display.textContent = result;
    } catch {
        display.textContent = "Error";
    }
}

// Store intermediate value
function storeIntermediate() {
    const display = document.getElementById("currentDisplay");
    midValue = parseFloat(display.textContent);
    document.getElementById("secondaryDisplay").textContent = `Stored: ${midValue}`;
}

// Update the history modal with previous calculations
function updateHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = ""; // Clear the list
    history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Toggle modals (settings, themes, history, scoring)
function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.classList.toggle("hidden");
}

// Change font size
function setFontSize(size) {
    const calculator = document.getElementById("calculator");
    calculator.style.fontSize = size === "small" ? "14px" : size === "medium" ? "18px" : "22px";
}

// Change theme dynamically
function setTheme(theme) {
    document.body.className = theme; // Assign the theme as the body class
}

// Placeholder for graph functionality
function showGraph() {
    alert("Graph functionality coming soon!");
}

// Scoring system: calculate APM, EPM, and Efficiency
let startTime = null;
let totalActions = 0;
let totalErrors = 0;

// Start tracking typing speed
function startTracking() {
    if (!startTime) {
        startTime = new Date().getTime();
    }
}

// Stop tracking and calculate scores
function stopTracking() {
    const endTime = new Date().getTime();
    const inputText = document.getElementById("currentDisplay").textContent;

    const timeElapsed = (endTime - startTime) / 1000; // Time in seconds
    totalActions = inputText.length; // Number of characters typed

    // Count errors (placeholder logic for errors)
    totalErrors = Math.floor(Math.random() * 5); // Randomly simulate errors

    const apm = Math.round((totalActions / timeElapsed) * 60); // Actions per minute
    const epm = Math.round((totalErrors / timeElapsed) * 60); // Errors per minute
    const efficiency = Math.max(0, 100 - epm); // Efficiency score (out of 100)

    // Display scoring results
    const scoringOutput = document.getElementById("scoringOutput");
    scoringOutput.innerHTML = `
        <p><strong>Actions Per Minute (APM):</strong> ${apm}</p>
        <p><strong>Errors Per Minute (EPM):</strong> ${epm}</p>
        <p><strong>Efficiency Score:</strong> ${efficiency} / 100</p>
    `;

    // Reset for next session
    startTime = null;
    totalActions = 0;
    totalErrors = 0;
}

// Initialize scoring modal
function showScoring() {
    toggleModal('scoringModal');
    stopTracking(); // Calculate scoring when modal is shown
}
