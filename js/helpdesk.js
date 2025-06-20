// Help Desk page JavaScript

let isTyping = false
let typingTimeout = null
let draftTimeout = null

// Initialize help desk page
document.addEventListener("DOMContentLoaded", () => {
    console.log("Help Desk page loaded")
    setupEventListeners()
    scrollToBottom()

    // Show welcome message after a short delay
    setTimeout(() => {
        showWelcomeMessage()
    }, 1000)
})

// Setup event listeners
function setupEventListeners() {
    // Navigation items
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
        item.addEventListener("click", handleNavigation)
    })

    // Message input
    const messageInput = document.getElementById("messageInput")
    if (messageInput) {
        messageInput.addEventListener("input", handleTyping)
        messageInput.addEventListener("focus", () => {
            markMessagesAsRead()
        })
        messageInput.addEventListener("keypress", handleKeyPress)
    }

    // Contact items click handlers
    const contactItems = document.querySelectorAll(".contact-item")
    contactItems.forEach((item) => {
        item.addEventListener("click", handleContactClick)
    })
}

// Handle key press in message input
function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        sendMessage()
    }
}

// Handle typing indicator
function handleTyping() {
    const messageInput = document.getElementById("messageInput")
    const message = messageInput.value.trim()

    if (message.length > 0 && !isTyping) {
        isTyping = true
        // Could send typing indicator to server here
    }

    // Clear existing timeout
    if (typingTimeout) {
        clearTimeout(typingTimeout)
    }

    // Set new timeout
    typingTimeout = setTimeout(() => {
        isTyping = false
        // Could stop typing indicator here
    }, 1000)
}

// Send message function
function sendMessage() {
    const messageInput = document.getElementById("messageInput")
    const message = messageInput.value.trim()

    if (message === "") return

    // Add user message
    addMessage(message, "user")

    // Clear input
    messageInput.value = ""

    // Show typing indicator
    showTypingIndicator()

    // Simulate response delay
    setTimeout(
        () => {
            hideTypingIndicator()
            generateResponse(message)
        },
        1500 + Math.random() * 1000,
    ) // Random delay between 1.5-2.5 seconds

    // Clear draft
    localStorage.removeItem("helpdesk_draft")
}

// Add message to chat
function addMessage(content, sender, timestamp = null) {
    const chatMessages = document.getElementById("chatMessages")
    const messageDiv = document.createElement("div")

    const currentTime = timestamp || getCurrentTime()
    const messageClass = sender === "user" ? "user-message" : "support-message"

    messageDiv.className = `message ${messageClass}`
    messageDiv.innerHTML = `
    <div class="message-content">
      <p>${content}</p>
    </div>
    <div class="message-time">${currentTime}</div>
  `

    chatMessages.appendChild(messageDiv)
    scrollToBottom()

    // Add quick replies for certain support messages
    if (sender === "support" && shouldShowQuickReplies(content)) {
        addQuickReplies(messageDiv)
    }
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById("chatMessages")
    const typingDiv = document.createElement("div")

    typingDiv.className = "typing-indicator"
    typingDiv.id = "typingIndicator"
    typingDiv.innerHTML = `
    <div class="typing-dots">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
    <span style="font-size: 12px; color: #666; margin-left: 8px;">Support is typing...</span>
  `

    chatMessages.appendChild(typingDiv)
    scrollToBottom()
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator")
    if (typingIndicator) {
        typingIndicator.remove()
    }
}

// Generate automated response
function generateResponse(userMessage) {
    const responses = {
        greeting: [
            "Halo! Selamat datang di NeuroScan Help Desk. Bagaimana saya bisa membantu Anda hari ini?",
            "Hai! Terima kasih telah menghubungi kami. Ada yang bisa saya bantu?",
        ],
        score: [
            "Penurunan skor bisa disebabkan berbagai faktor. Saya sarankan untuk berkonsultasi dengan dokter spesialis untuk evaluasi lebih lanjut.",
            "Fluktuasi skor adalah hal yang normal, namun penurunan signifikan perlu diperiksa lebih lanjut oleh tenaga medis profesional.",
        ],
        appointment: [
            "Untuk membuat janji dengan dokter spesialis, Anda bisa menghubungi nomor +62 812 3456 7890 atau email ke Lebahganteng@Gmail.Com",
            "Kami dapat membantu mengatur konsultasi dengan dokter. Silakan hubungi customer service kami.",
        ],
        technical: [
            "Untuk masalah teknis, tim IT kami akan segera membantu. Mohon jelaskan masalah yang Anda alami.",
            "Kami akan meneruskan keluhan teknis Anda ke tim yang tepat. Biasanya akan ditangani dalam 24 jam.",
        ],
        default: [
            "Terima kasih atas pertanyaan Anda. Tim support kami akan segera merespons.",
            "Saya akan meneruskan pertanyaan Anda ke spesialis yang tepat. Mohon tunggu sebentar.",
            "Untuk informasi lebih detail, Anda bisa menghubungi customer service kami di +62 812 3456 7890",
        ],
    }

    let responseType = "default"
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("halo") || lowerMessage.includes("hai") || lowerMessage.includes("hello")) {
        responseType = "greeting"
    } else if (lowerMessage.includes("skor") || lowerMessage.includes("menurun") || lowerMessage.includes("grafik")) {
        responseType = "score"
    } else if (lowerMessage.includes("janji") || lowerMessage.includes("dokter") || lowerMessage.includes("konsultasi")) {
        responseType = "appointment"
    } else if (lowerMessage.includes("error") || lowerMessage.includes("bug") || lowerMessage.includes("tidak bisa")) {
        responseType = "technical"
    }

    const responseArray = responses[responseType]
    const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)]

    addMessage(randomResponse, "support")
}

// Check if quick replies should be shown
function shouldShowQuickReplies(content) {
    const triggers = ["membantu", "bantuan", "pertanyaan", "konsultasi"]
    return triggers.some((trigger) => content.toLowerCase().includes(trigger))
}

// Add quick reply buttons
function addQuickReplies(messageElement) {
    const quickReplies = ["Buat janji dokter", "Informasi hasil scan", "Masalah teknis", "Hubungi customer service"]

    const quickRepliesDiv = document.createElement("div")
    quickRepliesDiv.className = "quick-replies"

    quickReplies.forEach((reply) => {
        const button = document.createElement("button")
        button.className = "quick-reply-btn"
        button.textContent = reply
        button.onclick = () => {
            document.getElementById("messageInput").value = reply
            sendMessage()
        }
        quickRepliesDiv.appendChild(button)
    })

    messageElement.appendChild(quickRepliesDiv)
}

// Show welcome message
function showWelcomeMessage() {
    const welcomeMessages = [
        "Selamat datang di NeuroScan Help Desk! 👋",
        "Kami siap membantu Anda dengan pertanyaan seputar hasil scan dan kesehatan otak.",
        "Silakan ketik pertanyaan Anda atau pilih salah satu opsi bantuan di bawah ini.",
    ]

    welcomeMessages.forEach((message, index) => {
        setTimeout(() => {
            addMessage(message, "support")
        }, index * 1000)
    })

    // Add quick start options
    setTimeout(() => {
        const chatMessages = document.getElementById("chatMessages")
        const quickStartDiv = document.createElement("div")
        quickStartDiv.className = "message support-message"
        quickStartDiv.innerHTML = `
      <div class="message-content">
        <p>Pilih topik bantuan:</p>
      </div>
      <div class="quick-replies">
        <button class="quick-reply-btn" onclick="handleQuickReply('Hasil scan saya')">📊 Hasil Scan</button>
        <button class="quick-reply-btn" onclick="handleQuickReply('Buat janji dokter')">👨‍⚕️ Janji Dokter</button>
        <button class="quick-reply-btn" onclick="handleQuickReply('Masalah teknis')">🔧 Bantuan Teknis</button>
        <button class="quick-reply-btn" onclick="handleQuickReply('Informasi umum')">ℹ️ Info Umum</button>
      </div>
    `
        chatMessages.appendChild(quickStartDiv)
        scrollToBottom()
    }, 3500)
}

// Handle quick reply
function handleQuickReply(message) {
    document.getElementById("messageInput").value = message
    sendMessage()
}

// Get current time
function getCurrentTime() {
    const now = new Date()
    return now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
}

// Scroll to bottom of chat
function scrollToBottom() {
    const chatMessages = document.getElementById("chatMessages")
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight
    }, 100)
}

// Mark messages as read
function markMessagesAsRead() {
    // Could implement read receipts here
    console.log("Messages marked as read")
}

// Handle contact item clicks
function handleContactClick(event) {
    const contactItem = event.currentTarget
    const contactValue = contactItem.querySelector(".contact-value").textContent

    if (contactValue.includes("@")) {
        // Email
        window.location.href = `mailto:${contactValue}`
    } else {
        // Phone
        window.location.href = `tel:${contactValue}`
    }
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
        case "Settings":
            alert("Navigating to Settings")
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

// File upload functionality
function initializeFileUpload() {
    const chatInput = document.querySelector(".chat-input-container")

    // Add file upload button
    const fileButton = document.createElement("button")
    fileButton.innerHTML = "📎"
    fileButton.className = "file-upload-btn"
    fileButton.style.cssText = `
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.3s ease;
  `

    fileButton.onclick = () => {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.accept = "image/*,.pdf,.doc,.docx"
        fileInput.onchange = handleFileUpload
        fileInput.click()
    }

    chatInput.querySelector(".chat-input").insertBefore(fileButton, chatInput.querySelector(".send-button"))
}

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
        const fileName = file.name
        const fileSize = (file.size / 1024 / 1024).toFixed(2) // MB

        addMessage(`📎 File uploaded: ${fileName} (${fileSize} MB)`, "user")

        setTimeout(() => {
            addMessage("Terima kasih telah mengirim file. Tim kami akan meninjau dan merespons segera.", "support")
        }, 1000)
    }
}

// Initialize file upload when page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initializeFileUpload, 500)
})

// Auto-save draft messages
function saveDraft() {
    const messageInput = document.getElementById("messageInput")
    const draft = messageInput.value

    if (draft.trim()) {
        localStorage.setItem("helpdesk_draft", draft)
    } else {
        localStorage.removeItem("helpdesk_draft")
    }
}

// Load draft on page load
function loadDraft() {
    const draft = localStorage.getItem("helpdesk_draft")
    if (draft) {
        document.getElementById("messageInput").value = draft
    }
}

// Setup auto-save
document.addEventListener("DOMContentLoaded", () => {
    loadDraft()

    const messageInput = document.getElementById("messageInput")
    messageInput.addEventListener("input", () => {
        clearTimeout(draftTimeout)
        draftTimeout = setTimeout(saveDraft, 500)
    })
})
