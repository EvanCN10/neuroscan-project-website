// Handle navigation
function handleNavigation(event) {
    event.preventDefault()

    // Get the href attribute first
    const href = event.currentTarget.getAttribute("href")

    // If href exists and is not "#", use it directly
    if (href && href !== "#" && href !== "javascript:void(0)") {
        console.log(`Navigating via href to: ${href}`)
        window.location.href = href
        return
    }

    // Fallback: get navigation text
    const navTextElement = event.currentTarget.querySelector(".nav-text")
    if (!navTextElement) {
        console.error("Navigation text element not found")
        return
    }

    const navText = navTextElement.textContent.trim()
    console.log(`Navigating via text to: ${navText}`)

    // Navigate based on selection
    switch (navText) {
        case "Home":
            window.location.href = "dashboard.html"
            break
        case "Profile":
            window.location.href = "profile.html"
            break
        case "Riwayat":
            // Already on riwayat page
            break
        case "Help Desk":
            window.location.href = "helpdesk.html"
            break
        case "Settings":
            window.location.href = "settings.html"
            break
        case "Logout":
            if (confirm("Are you sure you want to logout?")) {
                window.location.href = "index.html"
            }
            break
        default:
            console.warn(`Unknown navigation item: ${navText}`)
            break
    }
}

// Initialize riwayat page
document.addEventListener("DOMContentLoaded", () => {
    console.log("Riwayat page loaded")
    initializeBrainVolumeChart()
    setupEventListeners()
})

// Setup event listeners
function setupEventListeners() {
    // Navigation items
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
        item.addEventListener("click", handleNavigation)
    })
}

// Initialize brain volume chart
function initializeBrainVolumeChart() {
    const canvas = document.getElementById("brainVolumeChart")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Chart data
    const months = ["JAN", "MAR", "MAY", "JUL", "SEP", "NOV"]
    const chartData = [120, 115, 110, 105, 100, 95]
    const mmseData = [28, 27, 26, 25, 24, 23]
    const hippocampusData = [95, 92, 89, 86, 83, 80]

    // Chart dimensions
    const padding = 50
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = "#e9ecef"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()

        // Y-axis labels
        ctx.fillStyle = "#666"
        ctx.font = "10px Arial"
        ctx.textAlign = "right"
        const value = 130 - (130 / 5) * i
        ctx.fillText(value.toString(), padding - 10, y + 3)
    }

    // Vertical grid lines
    for (let i = 0; i < months.length; i++) {
        const x = padding + (chartWidth / (months.length - 1)) * i
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, height - padding)
        ctx.stroke()

        // X-axis labels
        ctx.fillStyle = "#666"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.fillText(months[i], x, height - 15)
    }

    // Draw CHART line (blue)
    drawLine(ctx, chartData, "#3498db", 3, padding, chartWidth, chartHeight, 130)

    // Draw MMSE line (red) - scaled to fit
    const scaledMMSE = mmseData.map((val) => (val / 30) * 130)
    drawLine(ctx, scaledMMSE, "#e74c3c", 3, padding, chartWidth, chartHeight, 130)

    // Draw HIPPOCAMPUS line (purple)
    drawLine(ctx, hippocampusData, "#9b59b6", 3, padding, chartWidth, chartHeight, 130)

    // Draw legend
    drawLegend(ctx, width, height)

    // Add chart title
    ctx.fillStyle = "#333"
    ctx.font = "12px Arial"
    ctx.textAlign = "left"
    ctx.fillText("CHART", padding, 25)
    ctx.fillText("MMSE", padding + 60, 25)
    ctx.fillText("HIPPOCAMPUS VOLUME", padding + 110, 25)
}

// Draw line function
function drawLine(ctx, data, color, lineWidth, padding, chartWidth, chartHeight, maxValue) {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()

    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = padding + chartHeight - (value / maxValue) * chartHeight

        if (index === 0) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y)
        }

        // Draw data points
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, 2 * Math.PI)
        ctx.fill()
    })

    ctx.stroke()
}

// Draw legend
function drawLegend(ctx, width, height) {
    const legendItems = [
        { label: "CHART", color: "#3498db" },
        { label: "MMSE", color: "#e74c3c" },
        { label: "HIPPOCAMPUS", color: "#9b59b6" },
    ]

    const legendY = height - 35
    let legendX = 60

    legendItems.forEach((item, index) => {
        // Draw color indicator
        ctx.fillStyle = item.color
        ctx.fillRect(legendX, legendY, 12, 3)

        // Draw label
        ctx.fillStyle = "#666"
        ctx.font = "9px Arial"
        ctx.textAlign = "left"
        ctx.fillText(item.label, legendX + 18, legendY + 8)

        legendX += 80
    })
}

// Download report function
function downloadReport() {
    console.log("Downloading report...")
    showNotification("Report download started...", "info")

    setTimeout(() => {
        const reportData = generateReportData()
        const blob = new Blob([reportData], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = `NeuroScan_Report_${new Date().toISOString().split("T")[0]}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        showNotification("Report downloaded successfully!", "success")
    }, 1500)
}

// Share report function
function shareReport() {
    console.log("Sharing report...")

    if (navigator.share) {
        navigator
            .share({
                title: "NeuroScan Brain Health Report",
                text: "My latest brain health analysis from NeuroScan",
                url: window.location.href,
            })
            .then(() => {
                showNotification("Report shared successfully!", "success")
            })
            .catch((error) => {
                console.log("Error sharing:", error)
                fallbackShare()
            })
    } else {
        fallbackShare()
    }
}

// Fallback share function
function fallbackShare() {
    navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
            showNotification("Link copied to clipboard!", "success")
        })
        .catch(() => {
            showNotification("Unable to share. Please copy the URL manually.", "warning")
        })
}

// View details function
function viewDetails() {
    console.log("Viewing detailed analysis...")
    showDetailedAnalysis()
}

// Show detailed analysis modal
function showDetailedAnalysis() {
    const modal = document.createElement("div")
    modal.className = "analysis-modal"
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Detailed Brain Health Analysis</h3>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-section">
            <h4>MMSE Score Trend</h4>
            <p>Your Mini-Mental State Examination scores show a gradual decline over the past 11 months, from 28 to 23 points. This indicates some changes in cognitive function that warrant attention.</p>
          </div>
          <div class="detail-section">
            <h4>Hippocampus Volume</h4>
            <p>Hippocampal volume measurements show a consistent pattern that correlates with the MMSE findings. While still within acceptable ranges, the trend suggests the need for continued monitoring.</p>
          </div>
          <div class="detail-section">
            <h4>Recommendations</h4>
            <ul>
              <li>Continue regular brain health monitoring</li>
              <li>Maintain an active lifestyle with regular exercise</li>
              <li>Engage in cognitive stimulating activities</li>
              <li>Follow up with healthcare provider for comprehensive evaluation</li>
            </ul>
          </div>
        </div>
      </div>
    `

    // Add modal styles
    const modalStyles = `
      .analysis-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e9ecef;
      }
      .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
      }
      .modal-body {
        padding: 20px;
      }
      .detail-section {
        margin-bottom: 20px;
      }
      .detail-section h4 {
        color: #2d5a52;
        margin-bottom: 8px;
      }
      .detail-section p, .detail-section li {
        font-size: 14px;
        line-height: 1.5;
        color: #666;
      }
    `

    const styleSheet = document.createElement("style")
    styleSheet.textContent = modalStyles
    document.head.appendChild(styleSheet)

    document.body.appendChild(modal)

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })
}

// Close modal function
function closeModal() {
    const modal = document.querySelector(".analysis-modal")
    if (modal) {
        modal.remove()
    }
}

// Generate report data
function generateReportData() {
    const currentDate = new Date().toLocaleDateString()
    return `
  NeuroScan Brain Health Report
  Generated: ${currentDate}
  Patient: Greg Jonas
  
  SUMMARY:
  Over the past 6 months, hippocampal volume has remained within a healthy range.
  No significant decline detected in recent measurements.
  
  MMSE SCORES:
  January: 28/30
  March: 27/30
  May: 26/30
  July: 25/30
  September: 24/30
  November: 23/30
  
  HIPPOCAMPUS VOLUME:
  Measurements show stable volume with minor fluctuations within normal range.
  
  RECOMMENDATIONS:
  - Continue regular monitoring
  - Maintain healthy lifestyle
  - Engage in cognitive activities
  - Follow up with healthcare provider
  
  This report is for informational purposes only and should not replace professional medical advice.
    `
}

// Show notification function
function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`

    const colors = {
        success: "#28a745",
        warning: "#ffc107",
        error: "#dc3545",
        info: "#4ecdc4",
    }

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type] || colors.info};
      color: ${type === "warning" ? "#333" : "white"};
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 1000;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease-out;
    `

    notification.textContent = message

    // Add slide-in animation
    const style = document.createElement("style")
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)

    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()
        style.remove()
    }, 3000)
}

// Refresh chart data (simulate real-time updates)
function refreshChartData() {
    console.log("Refreshing chart data...")
    initializeBrainVolumeChart()
}

// Auto-refresh every 5 minutes
setInterval(refreshChartData, 5 * 60 * 1000)

// Handle keyboard shortcuts
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case "d":
                event.preventDefault()
                downloadReport()
                break
            case "s":
                event.preventDefault()
                shareReport()
                break
            case "Escape":
                closeModal()
                break
        }
    }
})
  