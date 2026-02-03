document.addEventListener('DOMContentLoaded', function () {
  emailjs.init('uPKb3Zsl0i7ssJBpp');

  const form = document.getElementById('contact-form');
  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorContact = document.getElementById('error-contact');
  const errorMessage = document.getElementById('error-message');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorName.textContent = '';
      errorEmail.textContent = '';
      errorContact.textContent = '';
      errorMessage.textContent = '';
      formSuccess.textContent = '';

      let isValid = true;
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const contactNo = document.getElementById('contact_no').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name) {
        errorName.textContent = 'Please enter your name.';
        isValid = false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errorEmail.textContent = 'Please enter a valid email address.';
        isValid = false;
      }
      const malaysiaPhoneRegex = /^(011-\d{8}|01[2-9]-\d{7,8})$/;
      if (!malaysiaPhoneRegex.test(contactNo)) {
        errorContact.textContent =
          'Please enter a valid Malaysian phone number (e.g. 012-3456789).';
        isValid = false;
      }
      if (!message) {
        errorMessage.textContent = 'Please enter a message.';
        isValid = false;
      }

      if (!isValid) return;

      emailjs
        .sendForm('service_hrmpfai', 'template_uxoa3ji', this)
        .then(() => {
          formSuccess.textContent = 'Message sent successfully!';
          form.reset();
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          formSuccess.textContent = 'Failed to send message. Please try again.';
        });
    });
  }

  const sidebar = document.getElementById('sidebar');
  const menuOpen = document.getElementById('menuOpen');
  const menuClose = document.getElementById('menuClose');
  const menuOverlay = document.getElementById('menuOverlay');

  const toggleMenu = () => {
    sidebar.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
      menuOpen.style.opacity = '0';
      menuOpen.style.pointerEvents = 'none';
    } else {
      menuOpen.style.opacity = '1';
      menuOpen.style.pointerEvents = 'auto';
    }
  };

  if (menuOpen) menuOpen.addEventListener('click', toggleMenu);
  if (menuClose) menuClose.addEventListener('click', toggleMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);

  document.querySelectorAll('.sidebar a').forEach((link) => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
      menuOverlay.classList.remove('active');
      menuOpen.style.opacity = '1';
      menuOpen.style.pointerEvents = 'auto';
    });
  });

  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
});
