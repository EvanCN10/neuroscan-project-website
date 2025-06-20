// Login page specific JavaScript

// Handle login form submission
function handleLoginSubmit(event) {
  event.preventDefault()

  // Add loading state
  const submitBtn = document.querySelector(".btn-login-submit")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Logging in..."
  submitBtn.disabled = true

  // Simulate login process
  setTimeout(() => {
    alert("Login successful!")

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  }, 1500)
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password")
  const toggleBtn = document.querySelector(".password-toggle")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggleBtn.textContent = "🙈"
  } else {
    passwordInput.type = "password"
    toggleBtn.textContent = "👁️"
  }
}

// Handle Google login
function handleGoogleLogin() {
  alert("Google login would be implemented here")
  // Simulate successful login
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

// Handle Facebook login
function handleFacebookLogin() {
  alert("Facebook login would be implemented here")
  // Simulate successful login
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

// Handle sign up redirect
function handleSignUpRedirect() {
  window.location.href = "signup.html"
}

// Add form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form")
  const inputs = form.querySelectorAll("input[required]")

  inputs.forEach((input) => {
    input.addEventListener("blur", validateInput)
    input.addEventListener("input", clearValidationError)
  })
})

function validateInput(event) {
  const input = event.target
  const value = input.value.trim()

  // Remove existing error styling
  input.classList.remove("error")

  // Validate based on input type
  if (input.type === "email" || input.name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value) && !isPhoneNumber(value)) {
      showInputError(input, "Please enter a valid email or phone number")
    }
  }

  if (input.type === "password") {
    if (value && value.length < 6) {
      showInputError(input, "Password must be at least 6 characters")
    }
  }
}

function isPhoneNumber(value) {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(value.replace(/\s/g, ""))
}

function showInputError(input, message) {
  input.classList.add("error")

  // Create or update error message
  let errorElement = input.parentNode.querySelector(".error-message")
  if (!errorElement) {
    errorElement = document.createElement("div")
    errorElement.className = "error-message"
    input.parentNode.appendChild(errorElement)
  }
  errorElement.textContent = message
}

function clearValidationError(event) {
  const input = event.target
  input.classList.remove("error")

  const errorElement = input.parentNode.querySelector(".error-message")
  if (errorElement) {
    errorElement.remove()
  }
}

// Add CSS for error states
const errorStyles = `
  .form-group input.error {
    border-color: #ff4444 !important;
    background: #ffebee !important;
    color: #d32f2f !important;
  }
  
  .error-message {
    color: #ff4444;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 20px;
  }
`

// Inject error styles
const styleSheet = document.createElement("style")
styleSheet.textContent = errorStyles
document.head.appendChild(styleSheet)
