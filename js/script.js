document.addEventListener('DOMContentLoaded', () => {
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
              alert('Form submitted successfully! (This is a demo, no actual submission occurs)');
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
});