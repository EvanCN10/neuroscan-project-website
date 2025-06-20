// NeuroScan Application JavaScript

// Handle Login Button Click
function handleLogin() {
  console.log("Login button clicked")
  window.location.href = "login.html"
}

// Handle Sign Up Button Click
function handleSignUp() {
  console.log("Sign Up button clicked")
  window.location.href = "signup.html"
}

// Add floating animation to decorative dots
function animateDecorateDots() {
  const dots = document.querySelectorAll(".dot")

  dots.forEach((dot, index) => {
    const delay = index * 200
    const duration = 2000 + index * 300

    setInterval(() => {
      dot.style.transform = "translateY(-10px)"
      setTimeout(() => {
        dot.style.transform = "translateY(0px)"
      }, duration / 2)
    }, duration)
  })
}

// Add subtle parallax effect to background
function addParallaxEffect() {
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    const container = document.querySelector(".container")
    const translateX = (mouseX - 0.5) * 20
    const translateY = (mouseY - 0.5) * 20

    container.style.backgroundPosition = `${50 + translateX}% ${50 + translateY}%`
  })
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("NeuroScan application loaded")

  // Start animations
  setTimeout(animateDecorateDots, 1000)
  addParallaxEffect()

  // Add fade-in effect to main content
  const mainContent = document.querySelector(".main-content")
  mainContent.style.opacity = "0"
  mainContent.style.transform = "translateY(30px)"

  setTimeout(() => {
    mainContent.style.transition = "all 0.8s ease"
    mainContent.style.opacity = "1"
    mainContent.style.transform = "translateY(0)"
  }, 300)
})

// Handle settings icon click
document.querySelector(".settings-icon").addEventListener("click", () => {
  alert("Settings menu would open here")
})

// Handle phone icon click
document.querySelector(".phone-icon").addEventListener("click", () => {
  alert("Contact information would be displayed here")
})

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // If login button is focused, trigger login
    if (document.activeElement.classList.contains("btn-login")) {
      handleLogin()
    }
    // If signup button is focused, trigger signup
    else if (document.activeElement.classList.contains("btn-signup")) {
      handleSignUp()
    }
  }
})

// Add touch support for mobile devices
function addTouchSupport() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)"
    })

    button.addEventListener("touchend", function () {
      this.style.transform = "scale(1)"
    })
  })
}

// Initialize touch support
addTouchSupport()
