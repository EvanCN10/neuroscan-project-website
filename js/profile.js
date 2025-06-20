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

  // Avatar upload
  const avatarUpload = document.getElementById("avatarUpload")
  if (avatarUpload) {
    avatarUpload.addEventListener("change", handleAvatarUpload)
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
    background: "/placeholder.svg?height=400&width=800",
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

// Edit profile function
function editProfile() {
  if (isEditMode) {
    cancelEdit()
    return
  }

  isEditMode = true
  const profileCard = document.querySelector(".profile-card")
  const editButton = document.querySelector(".btn-edit")

  // Change edit button text
  editButton.textContent = "Cancel"

  // Create edit form
  createEditForm()

  // Add edit mode class
  profileCard.classList.add("edit-mode")
}

// Create edit form
function createEditForm() {
  const profileInfo = document.querySelector(".profile-info")
  const currentName = document.querySelector(".profile-name").textContent
  const currentBio = document.querySelector(".profile-bio p").textContent
  const statValues = document.querySelectorAll(".stat-value")

  const editForm = document.createElement("div")
  editForm.className = "edit-form active"
  editForm.innerHTML = `
    <div class="form-group">
      <label for="editName">Full Name</label>
      <input type="text" id="editName" value="${currentName}">
    </div>
    
    <div class="form-group">
      <label for="editBio">Bio</label>
      <textarea id="editBio">${currentBio}</textarea>
    </div>
    
    <div class="form-group">
      <label for="editAge">Age</label>
      <input type="number" id="editAge" value="${statValues[0].textContent}">
    </div>
    
    <div class="form-group">
      <label for="editHeight">Height</label>
      <input type="text" id="editHeight" value="${statValues[1].textContent}">
    </div>
    
    <div class="form-group">
      <label for="editWeight">Weight</label>
      <input type="text" id="editWeight" value="${statValues[2].textContent}">
    </div>
    
    <div class="form-actions">
      <button class="btn-save" onclick="saveProfile()">Save Changes</button>
      <button class="btn-cancel" onclick="cancelEdit()">Cancel</button>
    </div>
  `

  // Hide original content
  const originalContent = profileInfo.children
  for (const child of originalContent) {
    child.style.display = "none"
  }

  // Add edit form
  profileInfo.appendChild(editForm)

  // Make avatar uploadable
  makeAvatarUploadable()
}

// Make avatar uploadable
function makeAvatarUploadable() {
  const avatarContainer = document.querySelector(".profile-avatar")
  avatarContainer.classList.add("avatar-upload")

  const fileInput = document.createElement("input")
  fileInput.type = "file"
  fileInput.accept = "image/*"
  fileInput.id = "avatarUpload"
  fileInput.addEventListener("change", handleAvatarUpload)

  avatarContainer.appendChild(fileInput)
}

// Handle avatar upload
function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const avatarImage = document.querySelector(".avatar-image")
      avatarImage.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Save profile
function saveProfile() {
  const formData = {
    name: document.getElementById("editName").value,
    bio: document.getElementById("editBio").value,
    age: document.getElementById("editAge").value,
    height: document.getElementById("editHeight").value,
    weight: document.getElementById("editWeight").value,
  }

  // Show loading
  showLoading()

  // Simulate save process
  setTimeout(() => {
    // Update original data
    originalData = { ...originalData, ...formData }

    // Update display
    updateProfileDisplay(originalData)

    // Exit edit mode
    exitEditMode()

    // Hide loading
    hideLoading()

    // Show success message
    showSuccessMessage("Profile updated successfully!")
  }, 1500)
}

// Cancel edit
function cancelEdit() {
  // Restore original data
  updateProfileDisplay(originalData)

  // Exit edit mode
  exitEditMode()
}

// Exit edit mode
function exitEditMode() {
  isEditMode = false
  const profileCard = document.querySelector(".profile-card")
  const editButton = document.querySelector(".btn-edit")
  const editForm = document.querySelector(".edit-form")
  const profileInfo = document.querySelector(".profile-info")

  // Change edit button text
  editButton.textContent = "Edit"

  // Remove edit mode class
  profileCard.classList.remove("edit-mode")

  // Remove edit form
  if (editForm) {
    editForm.remove()
  }

  // Show original content
  const originalContent = profileInfo.children
  for (const child of originalContent) {
    if (!child.classList.contains("edit-form")) {
      child.style.display = ""
    }
  }

  // Remove avatar upload functionality
  const avatarContainer = document.querySelector(".profile-avatar")
  avatarContainer.classList.remove("avatar-upload")
  const fileInput = document.getElementById("avatarUpload")
  if (fileInput) {
    fileInput.remove()
  }
}

// Show loading
function showLoading() {
  const profileCard = document.querySelector(".profile-card")
  profileCard.classList.add("loading")

  const loadingOverlay = document.createElement("div")
  loadingOverlay.className = "loading-overlay active"
  loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'

  profileCard.appendChild(loadingOverlay)
}

// Hide loading
function hideLoading() {
  const profileCard = document.querySelector(".profile-card")
  const loadingOverlay = document.querySelector(".loading-overlay")

  profileCard.classList.remove("loading")
  if (loadingOverlay) {
    loadingOverlay.remove()
  }
}

// Show success message
function showSuccessMessage(message) {
  // Create temporary success notification
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 6px;
    z-index: 1000;
    font-size: 14px;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  `
  notification.textContent = message

  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Handle navigation
function handleNavigation(event) {
  event.preventDefault()

  // If in edit mode, ask for confirmation
  if (isEditMode) {
    const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave?")
    if (!confirmLeave) {
      return
    }
  }

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Add active class to clicked item
  event.currentTarget.classList.add("active")

  const navText = event.currentTarget.querySelector(".nav-text").textContent
  console.log(`Navigating to: ${navText}`)

  // Navigate based on selection
  switch (navText) {
    case "Home":
      window.location.href = "dashboard.html"
      break
    case "Ringkasan":
      alert("Navigating to Summary page")
      break
    case "Help Desk":
      alert("Navigating to Help Desk")
      break
    case "Settings":
      alert("Navigating to Settings")
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
