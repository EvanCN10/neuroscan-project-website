// Profile page JavaScript

let isEditMode = false
let originalData = {}

// Initialize profile page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile page loaded")
  setupProfileListeners()
  loadProfileData()
})

// Setup event listeners
function setupProfileListeners() {
  // Navigation items
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => {
    item.addEventListener("click", handleNavigation)
  })

  // Edit button
  const editButton = document.querySelector(".btn-edit")
  if (editButton) {
    editButton.addEventListener("click", editProfile)
  }
}

// Load profile data
function loadProfileData() {
  // Simulate loading profile data
  const profileData = {
    name: "Greg Jonas",
    bio: "Hi, I'm Greg — passionate about staying mentally sharp as I age. I've been tracking my cognitive health regularly and believe that a balanced lifestyle, good nutrition, and brain exercises make all the difference. Here's to a healthier brain, one day at a time.",
    age: 60,
    height: "180cm",
    weight: "67kg",
    avatar: "/placeholder.svg?height=120&width=120",
    background: "img/profile-background.jpg",
  }

  // Store original data for cancel functionality
  originalData = { ...profileData }

  // Update UI with profile data
  updateProfileDisplay(profileData)
}

// Update profile display
function updateProfileDisplay(data) {
  const nameElement = document.querySelector(".profile-name")
  const bioElement = document.querySelector(".profile-bio p")
  const avatarElement = document.querySelector(".avatar-image")
  const backgroundElement = document.querySelector(".background-image")

  if (nameElement) nameElement.textContent = data.name
  if (bioElement) bioElement.textContent = data.bio
  if (avatarElement) avatarElement.src = data.avatar
  if (backgroundElement) backgroundElement.src = data.background

  // Update stats
  const statValues = document.querySelectorAll(".stat-value")
  if (statValues.length >= 3) {
    statValues[0].textContent = data.age
    statValues[1].textContent = data.height
    statValues[2].textContent = data.weight
  }
}

// Edit profile function - redirect to edit page
function editProfile() {
  console.log("Edit button clicked - redirecting to edit profile page")
  window.location.href = "edit-profile.html"
}

// Handle navigation
function handleNavigation(event) {
  event.preventDefault()

  const href = event.currentTarget.getAttribute("href")
  const navText = event.currentTarget.querySelector(".nav-text").textContent

  console.log(`Navigating to: ${navText}`)

  // Direct navigation using href if available
  if (href && href !== "#") {
    window.location.href = href
    return
  }

  // Fallback navigation based on text
  switch (navText) {
    case "Home":
      window.location.href = "dashboard.html"
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
    case "Logout":
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html"
      }
      break
    default:
      break
  }
}

// Handle keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isEditMode) {
    cancelEdit()
  }
})

// Handle beforeunload to warn about unsaved changes
window.addEventListener("beforeunload", (event) => {
  if (isEditMode) {
    event.preventDefault()
    event.returnValue = ""
  }
})

// Declare cancelEdit function
function cancelEdit() {
  console.log("Cancel edit button clicked")
  // Reset profile data to original
  updateProfileDisplay(originalData)
  // Exit edit mode
  isEditMode = false
}
