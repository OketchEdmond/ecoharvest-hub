

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    var menuButton = document.querySelector('.hamburger-menu');
    var navList = document.querySelector('.main-nav .nav-links');
  
    if (menuButton && navList) {
      menuButton.addEventListener('click', function () {
        navList.classList.toggle('active');
      });
    }
  
    // Contact form validation
    var form = document.querySelector('.contact-form');
  
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var message = document.getElementById('message');
  
        var hasError = false;
  
        if (name.value.trim() === '') {
          alert('Please enter your name.');
          hasError = true;
        } else if (email.value.trim() === '') {
          alert('Please enter your email.');
          hasError = true;
        } else if (!email.value.includes('@')) {
          alert('Email address is not valid.');
          hasError = true;
        } else if (message.value.trim().length < 10) {
          alert('Message should be at least 10 characters long.');
          hasError = true;
        }
  
        if (!hasError) {
          alert('Thanks for reaching out. Your message has been received.');
          form.reset();
        }
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-button');
    const assistantBox = document.querySelector('.assistant-box');
  
    sendBtn.addEventListener('click', () => {
      const msg = chatInput.value.trim();
      if (msg) {
        const userMsg = document.createElement('p');
        userMsg.innerHTML = `<strong>User:</strong> ${msg}`;
        assistantBox.appendChild(userMsg);
  
        const botMsg = document.createElement('p');
        botMsg.innerHTML = `<strong>Assistant:</strong> Thank you! We are checking available produce near you.`;
        assistantBox.appendChild(botMsg);
  
        chatInput.value = '';
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
  
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }
  
    const sendBtn = document.querySelector('.send-button');
    const chatInput = document.querySelector('.chat-input');
    const assistantBox = document.querySelector('.assistant-box');
  
    if (sendBtn && chatInput && assistantBox) {
      sendBtn.addEventListener('click', () => {
        const msg = chatInput.value.trim();
        if (msg) {
          const userMsg = document.createElement('p');
          userMsg.innerHTML = `<strong>User:</strong> ${msg}`;
          assistantBox.appendChild(userMsg);
  
          const botMsg = document.createElement('p');
          botMsg.innerHTML = `<strong>Assistant:</strong> We're locating farms near you that offer: ${msg}.`;
          assistantBox.appendChild(botMsg);
  
          chatInput.value = '';
          assistantBox.scrollTop = assistantBox.scrollHeight;
        }
      });
    }
  });
    
  