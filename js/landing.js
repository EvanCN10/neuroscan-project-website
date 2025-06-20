// Landing page specific JavaScript

// Handle Sign Up redirect from landing page
function handleSignUpRedirect() {
  console.log("Redirecting to Sign Up page")

  // Add visual feedback
  const signupBtn = document.querySelector(".btn-signup-main")
  signupBtn.style.transform = "scale(0.95)"

  setTimeout(() => {
    signupBtn.style.transform = "scale(1)"
    // Redirect to signup page
    window.location.href = "signup.html"
  }, 150)
}

// Handle Login redirect from landing page
function handleLoginRedirect() {
  console.log("Redirecting to Login page")

  // Add visual feedback
  const loginBtn = document.querySelector(".btn-login-link")
  loginBtn.style.transform = "scale(0.95)"

  setTimeout(() => {
    loginBtn.style.transform = "scale(1)"
    // Redirect to login page
    window.location.href = "login.html"
  }, 150)
}

// Initialize landing page animations
document.addEventListener("DOMContentLoaded", () => {
  console.log("NeuroScan landing page loaded")

  // Add fade-in effect to landing content
  const landingContent = document.querySelector(".landing-content")
  landingContent.style.opacity = "0"
  landingContent.style.transform = "translateY(30px)"

  setTimeout(() => {
    landingContent.style.transition = "all 0.8s ease"
    landingContent.style.opacity = "1"
    landingContent.style.transform = "translateY(0)"
  }, 300)

  // Add floating animation to logo
  const logoCircle = document.querySelector(".logo-circle")
  setInterval(() => {
    logoCircle.style.transform = "translateY(-5px)"
    setTimeout(() => {
      logoCircle.style.transform = "translateY(0px)"
    }, 1000)
  }, 2000)
})

// Handle settings icon click
document.querySelector(".settings-icon").addEventListener("click", () => {
  alert("Settings menu would open here")
})

// Handle phone icon click
document.querySelector(".phone-icon").addEventListener("click", () => {
  alert("Contact information would be displayed here")
})
