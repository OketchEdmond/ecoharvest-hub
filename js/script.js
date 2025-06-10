// === EcoHarvest Hub JS ===

// Load Puter.js
const script = document.createElement('script');
script.src = "https://js.puter.com/v2/";
document.head.appendChild(script);

// Initialize after DOM load
window.addEventListener("DOMContentLoaded", () => {

  // Audience Toggle
  const studentBtn = document.getElementById("studentBtn");
  const mentorBtn = document.getElementById("mentorBtn");
  const studentContent = document.getElementById("studentContent");
  const mentorContent = document.getElementById("mentorContent");

  if (studentBtn && mentorBtn && studentContent && mentorContent) {
    studentBtn.addEventListener("click", () => {
      studentContent.style.display = "block";
      mentorContent.style.display = "none";
    });

    mentorBtn.addEventListener("click", () => {
      studentContent.style.display = "none";
      mentorContent.style.display = "block";
    });
  }

  // FAQ Accordion
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach((q) => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      const isVisible = answer.style.display === "block";

      document.querySelectorAll(".faq-answer").forEach((a) => a.style.display = "none");
      if (!isVisible) answer.style.display = "block";
    });
  });

  // Visitor Counter
  const counter = localStorage.getItem("visitCount") || 0;
  const updatedCount = parseInt(counter) + 1;
  localStorage.setItem("visitCount", updatedCount);
  const counterDisplay = document.getElementById("visitorCount");
  if (counterDisplay) counterDisplay.textContent = updatedCount;

  // Dark/Light Mode
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") body.classList.add("dark-mode");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact Form
  const form = document.querySelector(".contact form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.querySelector("input[name='name']");
      const email = form.querySelector("input[name='email']");
      const message = form.querySelector("textarea[name='message']");

      if (!name.value || !email.value || !message.value || !email.value.includes("@")) {
        alert("Please fill all fields correctly.");
        return;
      }

      alert("Message sent successfully!");
      form.reset();
    });
  }

  // === Puter Chatbot ===
  const chatInput = document.getElementById("chatInput");
  const chatBtn = document.getElementById("sendMessageBtn");
  const chatBox = document.getElementById("chatMessages");

  const startupContext = `
    EcoHarvest Hub was founded by Edmond Oketch. Our mission is to bridge small-scale farmers in Kenya to city consumers using apps like CropConnect and tools like Agri-Insights Dashboard. We aim to eliminate food waste, improve farmer income, and promote sustainability. Reach us at info@ecoharvesthub.com. Our vision is a resilient, transparent food ecosystem.
  `;

  const addMessage = (msg, sender) => {
    const div = document.createElement("div");
    div.className = `message ${sender}-message`;
    div.innerHTML = `<p>${msg}</p>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  if (chatBtn && chatInput && chatBox) {
    chatBtn.addEventListener("click", () => {
      const userMsg = chatInput.value.trim();
      if (!userMsg) return;

      addMessage(userMsg, "user");
      chatInput.value = "";

      puter.ai.chat({
        messages: [
          { role: "system", content: startupContext },
          { role: "user", content: userMsg }
        ]
      }).then(res => {
        const reply = res.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
        addMessage(reply, "assistant");
      }).catch(() => {
        addMessage("Oops! Something went wrong. Please try again later.", "assistant");
      });
    });
  }

  // Arrange product cards in a row
  const productCards = document.querySelector(".product-cards");
  if (productCards) {
    productCards.style.display = "flex";
    productCards.style.flexWrap = "nowrap";
    productCards.style.overflowX = "auto";
    productCards.style.gap = "20px";
  }

});

<script>
  const context = `
EcoHarvest Hub, founded by Edmond Oketch in Nairobi, bridges the gap between small-scale farmers and urban consumers. Its flagship tools include the CropConnect App, which connects farmers directly to buyers, and the Agri-Insights Dashboard for real-time weather, market, and sustainability data. With support from CTO Ray Odhiambo and outreach lead Shiko Maina, EcoHarvest is empowering farmers, reducing waste, and building a climate-smart food system in Kenya.
  `;

  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  function appendMessage(sender, text) {
    const div = document.createElement('div');
    div.style.marginBottom = '10px';
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  chatSend.addEventListener('click', async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) {
      appendMessage('System', '⚠️ Please enter a question.');
      return;
    }

    appendMessage('You', userMessage);
    chatInput.value = '';

    try {
      const response = await puter.ai.chat({
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: userMessage }
        ]
      });
      appendMessage('EcoBot', response.message);
    } catch (err) {
      appendMessage('System', '⚠️ There was an error. Please try again later.');
      console.error(err);
    }
  });

  document.querySelectorAll('.sample-question').forEach(button => {
    button.addEventListener('click', () => {
      chatInput.value = button.textContent;
      chatSend.click();
    });
  });
</script>
