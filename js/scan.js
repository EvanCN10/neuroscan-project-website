// Scan page JavaScript

let isScanning = false;
let scanTimeout = null;

// Initialize scan page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Scan page loaded");
  setupScanListeners();
  initializeCamera();
});

// Setup event listeners
function setupScanListeners() {
  const scanButton = document.querySelector(".scan-button");
  if (scanButton) {
    scanButton.addEventListener("click", startScan);
  }

  // Navigation items
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", handleNavigation);
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

// Initialize camera (simulated)
function initializeCamera() {
  console.log("Initializing camera for QR code scanning...");

  // Simulate camera initialization
  setTimeout(() => {
    console.log("Camera ready");
    showScanInstruction("Camera ready. Place QR code in the frame to scan.");
  }, 1000);
}

// Start scanning process
function startScan() {
  if (isScanning) {
    stopScan();
    return;
  }

  console.log("Starting scan...");
  isScanning = true;

  const scanArea = document.querySelector(".scan-area");
  const scanButton = document.querySelector(".scan-button");
  const scanInstruction = document.querySelector(".scan-instruction");

  // Add scanning visual effects
  scanArea.classList.add("scanning");
  scanButton.classList.add("active");
  scanInstruction.textContent = "Scanning for QR code...";

  // Update scan button icon
  const scanIcon = document.querySelector(".scan-icon");
  scanIcon.textContent = "⏹️";

  // Simulate scanning process
  scanTimeout = setTimeout(() => {
    simulateScanResult();
  }, 3000);
}

// Stop scanning process
function stopScan() {
  console.log("Stopping scan...");
  isScanning = false;

  const scanArea = document.querySelector(".scan-area");
  const scanButton = document.querySelector(".scan-button");
  const scanInstruction = document.querySelector(".scan-instruction");
  const scanIcon = document.querySelector(".scan-icon");

  // Remove scanning visual effects
  scanArea.classList.remove("scanning");
  scanButton.classList.remove("active");
  scanInstruction.textContent = "Place QR Code inside this square";
  scanIcon.textContent = "📷";

  // Clear timeout
  if (scanTimeout) {
    clearTimeout(scanTimeout);
    scanTimeout = null;
  }
}

// Simulate scan result
function simulateScanResult() {
  const scanArea = document.querySelector(".scan-area");
  const scanInstruction = document.querySelector(".scan-instruction");

  // Random success/failure for demo
  const isSuccess = Math.random() > 0.3;

  if (isSuccess) {
    // Success
    scanArea.classList.add("success");
    scanInstruction.textContent = "QR Code detected! Processing...";

    setTimeout(() => {
      showScanSuccess();
    }, 1500);
  } else {
    // Error
    scanArea.classList.add("error");
    scanInstruction.textContent = "QR Code not found. Please try again.";

    setTimeout(() => {
      resetScanState();
    }, 2000);
  }

  stopScan();
}

// Show scan success
function showScanSuccess() {
  const overlay = createLoadingOverlay();
  const scanArea = document.querySelector(".scan-area");
  scanArea.appendChild(overlay);

  overlay.classList.add("active");

  setTimeout(() => {
    // Simulate processing complete
    alert("Brain scan initiated successfully! Redirecting to results...");

    // Redirect to results or dashboard
    window.location.href = "dashboard.html";
  }, 3000);
}

// Create loading overlay
function createLoadingOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "scan-overlay";

  const spinner = document.createElement("div");
  spinner.className = "loading-spinner";

  const text = document.createElement("div");
  text.className = "loading-text";
  text.textContent = "Processing scan data...";

  const container = document.createElement("div");
  container.appendChild(spinner);
  container.appendChild(text);

  overlay.appendChild(container);

  return overlay;
}

// Reset scan state
function resetScanState() {
  const scanArea = document.querySelector(".scan-area");
  const scanInstruction = document.querySelector(".scan-instruction");

  scanArea.classList.remove("success", "error", "scanning");
  scanInstruction.textContent = "Place QR Code inside this square";
}

// Show scan instruction
function showScanInstruction(message) {
  const scanInstruction = document.querySelector(".scan-instruction");
  if (scanInstruction) {
    scanInstruction.textContent = message;
  }
}

// Handle navigation
function handleNavigation(event) {
  event.preventDefault();

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Add active class to clicked item
  event.currentTarget.classList.add("active");

  const navText = event.currentTarget.querySelector(".nav-text").textContent;
  console.log(`Navigating to: ${navText}`);

  // Navigate based on selection
  switch (navText) {
    case "Home":
      window.location.href = "dashboard.html";
      break;
    case "Profile":
      window.location.href = "profile.html";
      break;
    case "Ringkasan":
      alert("Navigating to Summary page");
      break;
    case "Help Desk":
      alert("Navigating to Help Desk");
      break;
    case "Settings":
      alert("Navigating to Settings");
      break;
    default:
      break;
  }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
  switch (event.key) {
    case " ": // Spacebar
    case "Enter":
      event.preventDefault();
      startScan();
      break;
    case "Escape":
      if (isScanning) {
        event.preventDefault();
        stopScan();
      }
      break;
    default:
      break;
  }
}

// Cleanup when leaving page
window.addEventListener("beforeunload", () => {
  if (isScanning) {
    stopScan();
  }
});

// Handle visibility change (pause scanning when tab is not active)
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isScanning) {
    stopScan();
    showScanInstruction("Scanning paused. Click scan button to resume.");
  }
});

// Simulate QR code detection for demo
function simulateQRCodeDetection() {
  if (!isScanning) return;

  // Simulate finding a QR code
  setTimeout(() => {
    if (isScanning) {
      simulateScanResult();
    }
  }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
}

// Auto-detect QR codes (simulation)
setInterval(() => {
  if (isScanning) {
    // Small chance of auto-detection
    if (Math.random() > 0.95) {
      simulateQRCodeDetection();
    }
  }
}, 500);
