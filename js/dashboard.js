// Dashboard JavaScript

// Initialize dashboard when page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded")
  initializeCharts()
  setupEventListeners()
})

// Initialize charts
function initializeCharts() {
  // Cognitive Activity Trend Chart
  const cognitiveCtx = document.getElementById("cognitiveChart")
  if (cognitiveCtx) {
    drawCognitiveChart(cognitiveCtx)
  }

  // Risk Assessment Chart
  const riskCtx = document.getElementById("riskChart")
  if (riskCtx) {
    drawRiskChart(riskCtx)
  }
}

// Draw cognitive activity trend chart
function drawCognitiveChart(canvas) {
  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Chart data
  const data = [25, 30, 35, 38, 32, 35]
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const maxValue = 40

  // Chart dimensions
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Draw grid lines
  ctx.strokeStyle = "#e9ecef"
  ctx.lineWidth = 1

  // Horizontal grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
    ctx.stroke()

    // Y-axis labels
    ctx.fillStyle = "#666"
    ctx.font = "12px Arial"
    ctx.textAlign = "right"
    ctx.fillText((maxValue - (maxValue / 4) * i).toString(), padding - 10, y + 4)
  }

  // Draw line chart
  ctx.strokeStyle = "#4ecdc4"
  ctx.lineWidth = 3
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
    ctx.fillStyle = "#4ecdc4"
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  })

  ctx.stroke()

  // X-axis labels
  ctx.fillStyle = "#666"
  ctx.font = "12px Arial"
  ctx.textAlign = "center"
  labels.forEach((label, index) => {
    const x = padding + (chartWidth / (labels.length - 1)) * index
    ctx.fillText(label, x, height - 10)
  })
}

// Draw risk assessment chart (donut chart)
function drawRiskChart(canvas) {
  const ctx = canvas.getContext("2d")
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 50

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Chart data
  const data = [65, 35]
  const colors = ["#4ecdc4", "#e9ecef"]
  const total = data.reduce((sum, value) => sum + value, 0)

  let currentAngle = -Math.PI / 2

  data.forEach((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.arc(centerX, centerY, radius - 15, currentAngle + sliceAngle, currentAngle, true)
    ctx.closePath()
    ctx.fillStyle = colors[index]
    ctx.fill()

    currentAngle += sliceAngle
  })
}

// Setup event listeners
function setupEventListeners() {
  // Scan Now button
  const scanBtn = document.querySelector(".scan-btn")
  if (scanBtn) {
    scanBtn.addEventListener("click", handleScanNow)
  }

  // Navigation items
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => {
    item.addEventListener("click", handleNavigation)
  })

  // Video play buttons
  const playButtons = document.querySelectorAll(".play-button")
  playButtons.forEach((button) => {
    button.addEventListener("click", handleVideoPlay)
  })

  // Article items
  const articleItems = document.querySelectorAll(".article-item")
  articleItems.forEach((item) => {
    item.addEventListener("click", handleArticleClick)
  })
}

// Handle scan now button click
function handleScanNow() {
  console.log("Redirecting to scan page...")
  window.location.href = "scan.html"
}

// Handle navigation
function handleNavigation(event) {
  // Don't prevent default for direct href links
  const href = event.currentTarget.getAttribute("href")

  if (href && href !== "#") {
    // Let the browser handle the navigation naturally
    return
  }

  // Only prevent default and handle manually if no href
  event.preventDefault()

  const navText = event.currentTarget.querySelector(".nav-text").textContent
  console.log(`Navigating to: ${navText}`)

  // Navigate based on selection
  switch (navText) {
    case "Home":
      window.location.href = "dashboard.html"
      break
    case "Profile":
      window.location.href = "profile.html"
      break
    case "Riwayat":
      window.location.href = "riwayat.html"
      break
    case "Help Desk":
      window.location.href = "helpdesk.html"
      break
    case "Settings":
      window.location.href = "settings.html"
      break
    default:
      break
  }
}

// Handle video play
function handleVideoPlay(event) {
  event.stopPropagation()
  console.log("Playing video...")
  // Here you would implement video player functionality
}

// Handle article click
function handleArticleClick(event) {
  const articleText = event.currentTarget.querySelector("p").textContent
  console.log(`Opening article: ${articleText}`)
  // Here you would implement article navigation
}

// Search functionality
const searchInput = document.querySelector(".search-bar input")
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value
    console.log(`Searching for: ${searchTerm}`)
    // Here you would implement search functionality
  })
}

// Refresh charts periodically (simulate real-time data)
setInterval(() => {
  // Only refresh if charts are visible
  if (document.visibilityState === "visible") {
    initializeCharts()
  }
}, 30000) // Refresh every 30 seconds
