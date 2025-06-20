// Signup page specific JavaScript

// Handle signup form submission
function handleSignupSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const fullName = formData.get("fullName")
  const password = formData.get("password")
  const email = formData.get("email")
  const mobile = formData.get("mobile")
  const dateOfBirth = formData.get("dateOfBirth")

  console.log("Signup attempt:", {
    fullName,
    password: "***",
    email,
    mobile,
    dateOfBirth,
  })

  // Add loading state to button
  const submitBtn = document.querySelector(".btn-signup-submit")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Creating Account..."
  submitBtn.disabled = true

  // Simulate signup process
  setTimeout(() => {
    alert("Account created successfully! Welcome to NeuroScan!")

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  }, 2000)
}

// Toggle password visibility for signup password
function toggleSignupPassword() {
  const passwordInput = document.getElementById("password")
  const toggleBtn = passwordInput.parentNode.querySelector(".password-toggle")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggleBtn.textContent = "🙈"
  } else {
    passwordInput.type = "password"
    toggleBtn.textContent = "👁️"
  }
}

// Toggle password visibility for confirm password
function toggleConfirmPassword() {
  const passwordInput = document.getElementById("confirmPassword")
  const toggleBtn = passwordInput.parentNode.querySelector(".password-toggle")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggleBtn.textContent = "🙈"
  } else {
    passwordInput.type = "password"
    toggleBtn.textContent = "👁️"
  }
}

// Handle Google signup
function handleGoogleSignup() {
  console.log("Google signup clicked")
  alert("Google signup would be implemented here")
  // Simulate successful signup
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

// Handle Facebook signup
function handleFacebookSignup() {
  console.log("Facebook signup clicked")
  alert("Facebook signup would be implemented here")
  // Simulate successful signup
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

// Show help function
function showHelp() {
  alert("Need help? Contact our support team at support@neuroscan.com")
}

// Add date of birth formatting
document.addEventListener("DOMContentLoaded", () => {
  const dobInput = document.getElementById("dateOfBirth")

  dobInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length >= 2) {
      value = value.substring(0, 2) + " / " + value.substring(2)
    }
    if (value.length >= 7) {
      value = value.substring(0, 7) + " / " + value.substring(7, 11)
    }

    e.target.value = value
  })

  // Add form validation
  const form = document.querySelector(".signup-form")
  const inputs = form.querySelectorAll("input[required]")

  inputs.forEach((input) => {
    input.addEventListener("blur", validateSignupInput)
    input.addEventListener("input", clearSignupValidationError)
  })
})

function validateSignupInput(event) {
  const input = event.target
  const value = input.value.trim()

  // Remove existing error styling
  input.classList.remove("error")

  // Validate based on input type
  if (input.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      showSignupInputError(input, "Please enter a valid email address")
    }
  }

  if (input.type === "tel") {
    const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,15}$/
    if (value && !phoneRegex.test(value)) {
      showSignupInputError(input, "Please enter a valid phone number")
    }
  }

  if (input.type === "password") {
    if (value && value.length < 8) {
      showSignupInputError(input, "Password must be at least 8 characters")
    }
  }

  if (input.name === "dateOfBirth") {
    const dateRegex = /^\d{2} \/ \d{2} \/ \d{4}$/
    if (value && !dateRegex.test(value)) {
      showSignupInputError(input, "Please enter date in DD / MM / YYYY format")
    }
  }
}

function showSignupInputError(input, message) {
  input.classList.add("error")

  let errorElement = input.parentNode.querySelector(".error-message")
  if (!errorElement) {
    errorElement = document.createElement("div")
    errorElement.className = "error-message"
    input.parentNode.appendChild(errorElement)
  }
  errorElement.textContent = message
}

function clearSignupValidationError(event) {
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
    margin-left: 5px;
  }
`

// Inject error styles
const styleSheet = document.createElement("style")
styleSheet.textContent = errorStyles
document.head.appendChild(styleSheet)
