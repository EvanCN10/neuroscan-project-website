// Settings page JavaScript

let settings = {
    darkTheme: true,
    textToSpeech: true,
    dyslexicMode: true,
    notifications: {
        email: true,
        push: true,
        sms: false,
    },
    profile: {
        name: "Greg Jonas",
        email: "greg.jonas@example.com",
    },
}

// Initialize settings page
document.addEventListener("DOMContentLoaded", () => {
    console.log("Settings page loaded")
    loadSettings()
    setupEventListeners()
    applyCurrentSettings()
})

// Setup event listeners
function setupEventListeners() {
    // Navigation items
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
        item.addEventListener("click", handleNavigation)
    })

    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem("neuroscan_settings")
    if (savedSettings) {
        settings = { ...settings, ...JSON.parse(savedSettings) }
    }
}

// Load settings into UI
function loadSettings() {
    document.getElementById("darkTheme").checked = settings.darkTheme
    document.getElementById("textToSpeech").checked = settings.textToSpeech
    document.getElementById("dyslexicMode").checked = settings.dyslexicMode
}

// Apply current settings to the page
function applyCurrentSettings() {
    if (settings.darkTheme) {
        document.body.classList.add("dark-theme")
    }

    if (settings.dyslexicMode) {
        document.body.classList.add("dyslexic-mode")
    }

    if (settings.textToSpeech) {
        initializeTextToSpeech()
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem("neuroscan_settings", JSON.stringify(settings))
    showSettingsSaved()
}

// Toggle dark theme
function toggleDarkTheme() {
    const checkbox = document.getElementById("darkTheme")
    settings.darkTheme = checkbox.checked

    if (settings.darkTheme) {
        document.body.classList.add("dark-theme")
        showNotification("Dark theme enabled", "success")
    } else {
        document.body.classList.remove("dark-theme")
        showNotification("Dark theme disabled", "info")
    }

    animateSettingChange(checkbox.closest(".setting-item"))
    saveSettings()
}

// Toggle text to speech
function toggleTextToSpeech() {
    const checkbox = document.getElementById("textToSpeech")
    settings.textToSpeech = checkbox.checked

    if (settings.textToSpeech) {
        initializeTextToSpeech()
        speak("Text to speech enabled")
        showNotification("Text to speech enabled", "success")
    } else {
        disableTextToSpeech()
        showNotification("Text to speech disabled", "info")
    }

    animateSettingChange(checkbox.closest(".setting-item"))
    saveSettings()
}

// Toggle dyslexic mode
function toggleDyslexicMode() {
    const checkbox = document.getElementById("dyslexicMode")
    settings.dyslexicMode = checkbox.checked

    if (settings.dyslexicMode) {
        document.body.classList.add("dyslexic-mode")
        showNotification("Dyslexic-friendly font enabled", "success")
    } else {
        document.body.classList.remove("dyslexic-mode")
        showNotification("Dyslexic-friendly font disabled", "info")
    }

    animateSettingChange(checkbox.closest(".setting-item"))
    saveSettings()
}

// Initialize text to speech
function initializeTextToSpeech() {
    if (!("speechSynthesis" in window)) {
        console.log("Text-to-speech not supported")
        return
    }

    // Add click listeners to readable elements
    const readableElements = document.querySelectorAll(".setting-label, .section-title")
    readableElements.forEach((element) => {
        element.addEventListener("click", () => {
            if (settings.textToSpeech) {
                speak(element.textContent)
                highlightText(element)
            }
        })
    })
}

// Disable text to speech
function disableTextToSpeech() {
    if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
    }
}

// Speak text function
function speak(text) {
    if (!settings.textToSpeech || !("speechSynthesis" in window)) return

    speechSynthesis.cancel() // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 0.8

    speechSynthesis.speak(utterance)
}

// Highlight text being read
function highlightText(element) {
    element.classList.add("tts-highlight")
    setTimeout(() => {
        element.classList.remove("tts-highlight")
    }, 2000)
}

// Animate setting change
function animateSettingChange(settingItem) {
    settingItem.classList.add("changed")
    setTimeout(() => {
        settingItem.classList.remove("changed")
    }, 600)
}

// Open profile details
function openProfileDetails() {
    showSettingModal(
        "Profile Details",
        `
      <div class="modal-form">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" value="${settings.profile.name}" id="profileName">
        </div>
        <div class="form-group">
          <label>Date of Birth</label>
          <input type="date" value="1963-05-15" id="profileDob">
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" value="+62 812 3456 7890" id="profilePhone">
        </div>
      </div>
    `,
        () => {
            // Save profile changes
            settings.profile.name = document.getElementById("profileName").value
            saveSettings()
            showNotification("Profile updated successfully", "success")
        },
    )
}

// Open email settings
function openEmailSettings() {
    showSettingModal(
        "Email Settings",
        `
      <div class="modal-form">
        <div class="form-group">
          <label>Primary Email</label>
          <input type="email" value="${settings.profile.email}" id="primaryEmail">
        </div>
        <div class="form-group">
          <label>Backup Email</label>
          <input type="email" placeholder="backup@example.com" id="backupEmail">
        </div>
        <div class="toggle-group">
          <label>
            <input type="checkbox" ${settings.notifications.email ? "checked" : ""} id="emailNotifications">
            Receive email notifications
          </label>
        </div>
      </div>
    `,
        () => {
            // Save email changes
            settings.profile.email = document.getElementById("primaryEmail").value
            settings.notifications.email = document.getElementById("emailNotifications").checked
            saveSettings()
            showNotification("Email settings updated", "success")
        },
    )
}

// Open password settings
function openPasswordSettings() {
    showSettingModal(
        "Password Settings",
        `
      <div class="modal-form">
        <div class="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" id="currentPassword">
        </div>
        <div class="form-group">
          <label>New Password</label>
          <input type="password" placeholder="Enter new password" id="newPassword">
        </div>
        <div class="form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" id="confirmPassword">
        </div>
        <div class="password-requirements">
          <p>Password must contain:</p>
          <ul>
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
          </ul>
        </div>
      </div>
    `,
        () => {
            // Validate and save password
            const newPassword = document.getElementById("newPassword").value
            const confirmPassword = document.getElementById("confirmPassword").value

            if (newPassword !== confirmPassword) {
                showNotification("Passwords do not match", "error")
                return
            }

            if (newPassword.length < 8) {
                showNotification("Password must be at least 8 characters", "error")
                return
            }

            showNotification("Password updated successfully", "success")
        },
    )
}

// Open notification settings
function openNotificationSettings() {
    showSettingModal(
        "Notification Settings",
        `
      <div class="modal-form">
        <div class="toggle-group">
          <label>
            <input type="checkbox" ${settings.notifications.email ? "checked" : ""} id="notifEmail">
            Email Notifications
          </label>
        </div>
        <div class="toggle-group">
          <label>
            <input type="checkbox" ${settings.notifications.push ? "checked" : ""} id="notifPush">
            Push Notifications
          </label>
        </div>
        <div class="toggle-group">
          <label>
            <input type="checkbox" ${settings.notifications.sms ? "checked" : ""} id="notifSms">
            SMS Notifications
          </label>
        </div>
        <div class="notification-types">
          <h4>Notification Types</h4>
          <div class="toggle-group">
            <label>
              <input type="checkbox" checked id="notifScanResults">
              Scan Results
            </label>
          </div>
          <div class="toggle-group">
            <label>
              <input type="checkbox" checked id="notifAppointments">
              Appointment Reminders
            </label>
          </div>
          <div class="toggle-group">
            <label>
              <input type="checkbox" id="notifMarketing">
              Marketing Updates
            </label>
          </div>
        </div>
      </div>
    `,
        () => {
            // Save notification settings
            settings.notifications.email = document.getElementById("notifEmail").checked
            settings.notifications.push = document.getElementById("notifPush").checked
            settings.notifications.sms = document.getElementById("notifSms").checked
            saveSettings()
            showNotification("Notification settings updated", "success")
        },
    )
}

// Show settings modal
function showSettingModal(title, content, onSave) {
    const modal = document.createElement("div")
    modal.className = "settings-modal"
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" onclick="closeSettingsModal()">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" onclick="closeSettingsModal()">Cancel</button>
          <button class="btn-save" onclick="saveModalSettings()">Save Changes</button>
        </div>
      </div>
    `

    // Store the save function
    modal.saveFunction = onSave

    // Add modal styles
    const modalStyles = `
      .settings-modal {
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
        max-width: 500px;
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
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 20px;
        border-top: 1px solid #e9ecef;
      }
      .modal-form .form-group {
        margin-bottom: 16px;
      }
      .modal-form label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: #333;
      }
      .modal-form input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
      }
      .toggle-group {
        margin-bottom: 12px;
      }
      .toggle-group label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .btn-cancel, .btn-save {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .btn-cancel {
        background: #6c757d;
        color: white;
      }
      .btn-save {
        background: #4ecdc4;
        color: white;
      }
      .password-requirements {
        margin-top: 12px;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 6px;
        font-size: 12px;
      }
      .notification-types {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e9ecef;
      }
    `

    const styleSheet = document.createElement("style")
    styleSheet.textContent = modalStyles
    document.head.appendChild(styleSheet)

    document.body.appendChild(modal)

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeSettingsModal()
        }
    })

    // Store references for cleanup
    window.currentModal = modal
    window.currentModalStyles = styleSheet
    window.currentModalSave = onSave
}

// Close settings modal
function closeSettingsModal() {
    if (window.currentModal) {
        window.currentModal.remove()
        window.currentModalStyles.remove()
        window.currentModal = null
        window.currentModalStyles = null
        window.currentModalSave = null
    }
}

// Save modal settings
function saveModalSettings() {
    if (window.currentModalSave) {
        window.currentModalSave()
    }
    closeSettingsModal()
}

// Show notification
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
      z-index: 1001;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease-out;
    `

    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()
    }, 3000)
}

// Show settings saved confirmation
function showSettingsSaved() {
    showNotification("Settings saved successfully", "success")
}

// Handle navigation
function handleNavigation(event) {
    event.preventDefault()

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
        case "Profile":
            window.location.href = "profile.html"
            break
        case "Riwayat":
            window.location.href = "riwayat.html"
            break
        case "Help Desk":
            window.location.href = "helpdesk.html"
            break
        case "Logout":
            if (confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("neuroscan_settings")
                window.location.href = "index.html"
            }
            break
        default:
            break
    }
}

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case "s":
                event.preventDefault()
                saveSettings()
                break
            case "Escape":
                closeSettingsModal()
                break
        }
    }
})

// Export settings
function exportSettings() {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = "neuroscan-settings.json"
    link.click()

    URL.revokeObjectURL(url)
    showNotification("Settings exported successfully", "success")
}

// Import settings
function importSettings(event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        try {
            const importedSettings = JSON.parse(e.target.result)
            settings = { ...settings, ...importedSettings }
            loadSettings()
            applyCurrentSettings()
            saveSettings()
            showNotification("Settings imported successfully", "success")
        } catch (error) {
            showNotification("Invalid settings file", "error")
        }
    }
    reader.readAsText(file)
}
  