// Edit Profile page JavaScript

let hasUnsavedChanges = false
let originalFormData = {}

// Initialize edit profile page
document.addEventListener("DOMContentLoaded", () => {
    console.log("Edit Profile page loaded")
    setupEditProfileListeners()
    loadCurrentProfileData()
    trackFormChanges()
})

// Setup event listeners
function setupEditProfileListeners() {
    // Profile picture upload
    const profilePictureInput = document.getElementById("profilePicture")
    if (profilePictureInput) {
        profilePictureInput.addEventListener("change", handleProfilePictureUpload)
    }

    // Background image upload
    const backgroundInput = document.getElementById("backgroundImage")
    if (backgroundInput) {
        backgroundInput.addEventListener("change", handleBackgroundImageUpload)
    }

    // Form validation
    const formInputs = document.querySelectorAll(".form-input, .form-textarea")
    formInputs.forEach((input) => {
        input.addEventListener("blur", validateInput)
        input.addEventListener("input", clearValidationError)
    })

    // Navigation items
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
        item.addEventListener("click", handleNavigation)
    })
}

// Select profile picture
function selectProfilePicture() {
    const profilePictureInput = document.getElementById("profilePicture")
    if (profilePictureInput) {
        profilePictureInput.click()
    }
}

// Change background function
function changeBackground() {
    const backgroundInput = document.getElementById("backgroundImage")
    if (backgroundInput) {
        backgroundInput.click()
    }
}

// Load current profile data
function loadCurrentProfileData() {
    const currentData = {
        fullName: "Grayson Reginald Axton Greaves",
        username: "Greg Jonas",
        nik: "Grayson Reginald Axton Greaves",
        phoneNumber: "Greg Jonas",
        age: 60,
        height: 180,
        weight: 67,
        bio: "Hi, I'm Greg — passionate about staying mentally sharp as I age. I've been tracking my cognitive health regularly and believe that a balanced lifestyle, good nutrition, and brain exercises make all the difference. Here's to a healthier brain, one day at a time.",
        profilePicture: null,
        backgroundImage: "img/profile-background.jpg",
    }

    originalFormData = { ...currentData }
    console.log("Profile data loaded:", currentData)
}

// Track form changes
function trackFormChanges() {
    const formInputs = document.querySelectorAll(".form-input, .form-textarea")
    formInputs.forEach((input) => {
        input.addEventListener("input", () => {
            hasUnsavedChanges = true
            updateSaveButtonState()
        })
    })
}

// Update save button state
function updateSaveButtonState() {
    const saveButton = document.querySelector(".btn-edit-save")
    if (saveButton) {
        if (hasUnsavedChanges) {
            saveButton.textContent = "Save"
            saveButton.style.background = "#28a745"
        } else {
            saveButton.textContent = "Edit"
            saveButton.style.background = "#4ecdc4"
        }
    }
}

// Handle profile picture upload
function handleProfilePictureUpload(event) {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            showErrorMessage("Profile picture must be less than 5MB")
            return
        }

        if (!file.type.startsWith("image/")) {
            showErrorMessage("Please select a valid image file")
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            const placeholder = document.querySelector(".profile-picture-placeholder")
            if (placeholder) {
                placeholder.innerHTML = `<img src="${e.target.result}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
                hasUnsavedChanges = true
                updateSaveButtonState()
            }
        }
        reader.readAsDataURL(file)
    }
}

// Handle background image upload
function handleBackgroundImageUpload(event) {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 10 * 1024 * 1024) {
            showErrorMessage("Background image must be less than 10MB")
            return
        }

        if (!file.type.startsWith("image/")) {
            showErrorMessage("Please select a valid image file")
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            const backgroundThumbnail = document.querySelector(".background-thumbnail")
            const backgroundImage = document.querySelector(".background-image")

            if (backgroundThumbnail) backgroundThumbnail.src = e.target.result
            if (backgroundImage) backgroundImage.src = e.target.result

            hasUnsavedChanges = true
            updateSaveButtonState()
        }
        reader.readAsDataURL(file)
    }
}

// Save profile function
function saveProfile() {
    if (!hasUnsavedChanges) {
        window.location.href = "profile.html"
        return
    }

    if (!validateForm()) {
        showErrorMessage("Please fix the errors before saving")
        return
    }

    showLoading()

    const formData = {
        fullName: document.getElementById("fullName")?.value.trim() || "",
        username: document.getElementById("username")?.value.trim() || "",
        nik: document.getElementById("nik")?.value.trim() || "",
        phoneNumber: document.getElementById("phoneNumber")?.value.trim() || "",
        age: Number.parseInt(document.getElementById("age")?.value) || 0,
        height: Number.parseInt(document.getElementById("height")?.value) || 0,
        weight: Number.parseInt(document.getElementById("weight")?.value) || 0,
        bio: document.getElementById("bio")?.value.trim() || "",
    }

    console.log("Saving profile data:", formData)

    setTimeout(() => {
        hideLoading()
        showSuccessAnimation()
        hasUnsavedChanges = false
        updateSaveButtonState()
        showSuccessMessage("Profile updated successfully!")

        setTimeout(() => {
            window.location.href = "profile.html"
        }, 1500)
    }, 2000)
}

// Validate form
function validateForm() {
    let isValid = true
    const requiredFields = ["fullName", "username", "age", "height", "weight", "bio"]

    requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId)
        if (field && !field.value.trim()) {
            showInputError(field, "This field is required")
            isValid = false
        }
    })

    return isValid
}

// Validate individual input
function validateInput(event) {
    const input = event.target
    const value = input.value.trim()

    clearValidationError(event)

    if (!value) {
        showInputError(input, "This field is required")
        return
    }

    switch (input.id) {
        case "age":
            const ageValue = Number.parseInt(value)
            if (isNaN(ageValue) || ageValue < 1 || ageValue > 150) {
                showInputError(input, "Please enter a valid age between 1 and 150")
            } else {
                showInputSuccess(input)
            }
            break
        case "height":
            const heightValue = Number.parseInt(value)
            if (isNaN(heightValue) || heightValue < 50 || heightValue > 300) {
                showInputError(input, "Please enter a valid height between 50 and 300 cm")
            } else {
                showInputSuccess(input)
            }
            break
        case "weight":
            const weightValue = Number.parseInt(value)
            if (isNaN(weightValue) || weightValue < 20 || weightValue > 500) {
                showInputError(input, "Please enter a valid weight between 20 and 500 kg")
            } else {
                showInputSuccess(input)
            }
            break
        default:
            showInputSuccess(input)
            break
    }
}

// Show input error
function showInputError(input, message) {
    input.classList.add("error")
    input.classList.remove("success")

    let errorElement = input.parentNode.querySelector(".error-message")
    if (!errorElement) {
        errorElement = document.createElement("div")
        errorElement.className = "error-message"
        input.parentNode.appendChild(errorElement)
    }
    errorElement.textContent = message
}

// Show input success
function showInputSuccess(input) {
    input.classList.add("success")
    input.classList.remove("error")

    const errorElement = input.parentNode.querySelector(".error-message")
    if (errorElement) {
        errorElement.remove()
    }
}

// Clear validation error
function clearValidationError(event) {
    const input = event.target
    input.classList.remove("error", "success")

    const errorElement = input.parentNode.querySelector(".error-message")
    if (errorElement) {
        errorElement.remove()
    }
}

// Show loading
function showLoading() {
    const formSection = document.querySelector(".form-section")
    if (formSection) {
        formSection.classList.add("loading")

        const loadingOverlay = document.createElement("div")
        loadingOverlay.className = "loading-overlay active"
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'

        formSection.appendChild(loadingOverlay)
    }
}

// Hide loading
function hideLoading() {
    const formSection = document.querySelector(".form-section")
    const loadingOverlay = document.querySelector(".loading-overlay")

    if (formSection) formSection.classList.remove("loading")
    if (loadingOverlay) loadingOverlay.remove()
}

// Show success animation
function showSuccessAnimation() {
    const formSection = document.querySelector(".form-section")
    if (formSection) {
        formSection.classList.add("success")
        setTimeout(() => {
            formSection.classList.remove("success")
        }, 600)
    }
}

// Show success message
function showSuccessMessage(message) {
    const notification = document.createElement("div")
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 1000;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  `
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()
    }, 3000)
}

// Show error message
function showErrorMessage(message) {
    const notification = document.createElement("div")
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #dc3545;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 1000;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
  `
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()
    }, 3000)
}

// Handle navigation
function handleNavigation(event) {
    event.preventDefault()

    if (hasUnsavedChanges) {
        const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave?")
        if (!confirmLeave) {
            return
        }
    }

    const href = event.currentTarget.getAttribute("href")
    const navText = event.currentTarget.querySelector(".nav-text").textContent

    console.log(`Navigating to: ${navText}`)

    if (href && href !== "#") {
        window.location.href = href
        return
    }

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
        case "Logout":
            if (confirm("Are you sure you want to logout?")) {
                window.location.href = "index.html"
            }
            break
        default:
            break
    }
}

// Handle beforeunload to warn about unsaved changes
window.addEventListener("beforeunload", (event) => {
    if (hasUnsavedChanges) {
        event.preventDefault()
        event.returnValue = ""
    }
})
