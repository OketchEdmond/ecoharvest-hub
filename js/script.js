

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
  