document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Navigation (Hamburger Menu) ---
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.main-nav .nav-links');

  if (hamburgerMenu && navLinks) {
      hamburgerMenu.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          hamburgerMenu.classList.toggle('open');
          document.body.classList.toggle('no-scroll');
      });

      navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              navLinks.classList.remove('active');
              hamburgerMenu.classList.remove('open');
              document.body.classList.remove('no-scroll');
          });
      });
  }

  // --- 2. Product Carousel ---
  const carouselContainer = document.querySelector('.product-cards-container');
  const leftArrow = document.querySelector('.carousel-arrow.left-arrow');
  const rightArrow = document.querySelector('.carousel-arrow.right-arrow');
  const paginationDots = document.querySelectorAll('.carousel-pagination .dot');
  const productCards = document.querySelectorAll('.product-card');

  if (carouselContainer && productCards.length > 0) {
      const cardWidth = productCards[0].offsetWidth + 32;
      let currentIndex = 0;

      const updateCarousel = () => {
          carouselContainer.scrollTo({
              left: currentIndex * cardWidth,
              behavior: 'smooth'
          });

          paginationDots.forEach((dot, index) => {
              dot.classList.toggle('active', index === currentIndex);
          });
      };

      if (rightArrow) {
          rightArrow.addEventListener('click', () => {
              currentIndex = (currentIndex + 1) % productCards.length;
              updateCarousel();
          });
      }

      if (leftArrow) {
          leftArrow.addEventListener('click', () => {
              currentIndex = (currentIndex - 1 + productCards.length) % productCards.length;
              updateCarousel();
          });
      }

      paginationDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentIndex = index;
              updateCarousel();
          });
      });

      carouselContainer.addEventListener('scroll', () => {
          const scrollLeft = carouselContainer.scrollLeft;
          currentIndex = Math.round(scrollLeft / cardWidth);
          paginationDots.forEach((dot, index) => {
              dot.classList.toggle('active', index === currentIndex);
          });
      });

      updateCarousel();
  }

  // --- 3. Contact Form Validation ---
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
          event.preventDefault();

          const nameInput = document.getElementById('name');
          const emailInput = document.getElementById('email');
          const messageInput = document.getElementById('message');

          let isValid = true;

          if (nameInput.value.trim() === '') {
              displayError(nameInput, 'Name is required.');
              isValid = false;
          } else {
              clearError(nameInput);
          }

          if (emailInput.value.trim() === '') {
              displayError(emailInput, 'Email is required.');
              isValid = false;
          } else if (!isValidEmail(emailInput.value.trim())) {
              displayError(emailInput, 'Please enter a valid email address.');
              isValid = false;
          } else {
              clearError(emailInput);
          }

          if (messageInput.value.trim() === '') {
              displayError(messageInput, 'Message is required.');
              isValid = false;
          } else if (messageInput.value.trim().length < 10) {
              displayError(messageInput, 'Message must be at least 10 characters long.');
              isValid = false;
          } else {
              clearError(messageInput);
          }

          if (isValid) {
              alert('Form submitted successfully! We will review the submission as soon as possible.👍');
              contactForm.reset();
          }
      });

      function displayError(inputElement, message) {
          let errorElement = inputElement.nextElementSibling;
          if (!errorElement || !errorElement.classList.contains('error-message')) {
              errorElement = document.createElement('span');
              errorElement.classList.add('error-message');
              inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
          }
          errorElement.textContent = message;
          errorElement.style.color = 'red';
          errorElement.style.fontSize = '0.9em';
          errorElement.style.marginTop = '5px';
          inputElement.style.borderColor = 'red';
      }

      function clearError(inputElement) {
          const errorElement = inputElement.nextElementSibling;
          if (errorElement && errorElement.classList.contains('error-message')) {
              errorElement.remove();
          }
          inputElement.style.borderColor = '';
      }

      function isValidEmail(email) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(String(email).toLowerCase());
      }
  }

  // --- 4. AI Chatbot Integration (Puter.js) ---
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-button');
  const messageArea = document.getElementById('message-area');
  const typingDots = document.getElementById('typing-dots');
  const sampleQuestionButtons = document.querySelectorAll('.sample-q-button');

  // Define the system prompt with detailed context about EcoHarvest Hub
  const systemPrompt = `You are EcoHarvest Assistant, an AI chatbot representing EcoHarvest Hub, a startup based in Nairobi, Kenya. Your purpose is to provide helpful and accurate information about the company in a friendly, empowering, and connected tone, reflecting our brand values: Sustainable, Empowering, Connected.

Here's detailed information about EcoHarvest Hub:

Origin Story & Founder: EcoHarvest Hub was founded by Edmond Oketch to bridge the gap between small-scale farmers and consumers in Nairobi. Before our platform, fresh produce often went to waste due to farmers' lack of market access, while consumers struggled to find affordable, local, fresh food. Edmond created EcoHarvest Hub to solve this problem.

Mission: Our mission is to create a thriving ecosystem where agriculture is sustainable, farmers are empowered, and communities are deeply connected to their food sources, leading to food security and economic growth across Kenya. We aim to be the leading platform for local food distribution in Nairobi and beyond.

Services & Products:
1. CropConnect App: A mobile application that directly connects small-scale farmers with consumers. Farmers can list their produce, and consumers can browse and buy directly, ensuring fair prices for farmers and fresh produce for buyers. It features a Dynamic Pricing Algorithm driven by AI data analysis, which ensures fair pricing based on real-time market demand and supply, boosting farmer income by up to 20% and reducing food waste.
2. Agri-Insights Dashboard: A powerful tool providing real-time market data, weather updates, and sustainable farming tips to farmers. It includes Climate-Smart Advisory, which uses meteorological data and expert systems to offer personalized, actionable advice on planting and crop choices, helping farmers adapt to weather changes and reduce crop loss by 15%.
3. Eco-Logistics Network: An efficient and sustainable farm-to-door delivery system. It uses Optimized Route Planning with geospatial mapping and AI optimization to reduce transportation costs and carbon emissions, ensuring fresher produce reaches consumers faster and more affordably.

Team:
- Edmond Oketch: Founder and CEO. Leads strategic vision, product development, and community engagement.
- Ray Odhiambo: Chief Technology Officer (CTO). Architect of CropConnect App and Agri-Insights Dashboard, ensures robust and user-friendly technology.
- Shiko Maina: Head of Farmer Outreach. Builds relationships with farmers, provides training, and ensures platform meets their needs.

Vision/Long-term Goal: Our vision is to create a thriving ecosystem where agriculture is sustainable, farmers are empowered, and communities are deeply connected to their food sources, leading to food security and economic growth across Kenya. We aim to be the leading platform for local food distribution in Nairobi and beyond.

How to Support or Contact Us:
- Contact Form: Users can send messages directly through the 'CONTACT US' section on our website.
- Email: You can reach us at info@ecoharvesthub.com.
- Social Media: We are active on Facebook, Instagram, Twitter (X), LinkedIn, and WhatsApp (links available in the footer).
- Get Involved: Explore our products (CropConnect App) to buy local produce, or farmers can sign up to sell their harvests.

Please answer questions accurately and concisely based ONLY on the information provided above. If you don't know the answer based on this context, politely state that you cannot answer.`;


  // Function to add a message to the chat display
  function addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
      messageDiv.innerHTML = `<p>${text}</p>`; // Use innerHTML for simple paragraph
      messageArea.appendChild(messageDiv);
      messageArea.scrollTop = messageArea.scrollHeight; // Scroll to bottom
  }

  // Function to show/hide typing dots
  function showTypingDots() {
      typingDots.style.display = 'flex';
      messageArea.scrollTop = messageArea.scrollHeight; // Scroll to show dots
  }

  function hideTypingDots() {
      typingDots.style.display = 'none';
  }

  // Function to send message and get AI response
  async function sendMessage() {
      const userMessage = chatInput.value.trim();
      if (userMessage === '') {
          return; // Don't send empty messages
      }

      addMessage(userMessage, 'user');
      chatInput.value = ''; // Clear input field
      sendButton.disabled = true; // Disable send button while AI is thinking
      chatInput.disabled = true; // Disable input field

      showTypingDots();

      try {
          // Puter.js chat function
          const response = await puter.ai.chat(userMessage, {
              system_prompt: systemPrompt,
              model: "gemma-2b-it", // You can experiment with models if Puter.js supports others
          });

          addMessage(response, 'ai');
      } catch (error) {
          console.error('Puter.js AI chat error:', error);
          addMessage('Oops! It seems I\'m having trouble connecting right now. Please try again later or contact us directly at info@ecoharvesthub.com.', 'ai');
      } finally {
          hideTypingDots();
          sendButton.disabled = false; // Re-enable send button
          chatInput.disabled = false; // Re-enable input field
          chatInput.focus(); // Focus input for next message
      }
  }

  // Event listeners for sending message
  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          sendMessage();
      }
  });

  // Event listeners for sample question buttons
  sampleQuestionButtons.forEach(button => {
      button.addEventListener('click', () => {
          chatInput.value = button.dataset.question; // Populate input with question
          sendMessage(); // Send the question
      });
  });

});