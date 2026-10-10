// SIRA SPACE INTERACTIVE JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  // 1. FILTERABLE PORTFOLIO GALLERY
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. MODAL DIALOG (TAKE QUOTATION)
  const modal = document.getElementById('quote-modal');
  const btnOpenModal = document.getElementById('btn-open-quote');
  const btnCloseModal = document.getElementById('btn-close-modal');

  if (btnOpenModal && modal) {
    btnOpenModal.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if (btnCloseModal && modal) {
    btnCloseModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close modal when clicking outside content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 3. COST CALCULATOR LOGIC
  const propBtns = document.querySelectorAll('#opt-property .opt-btn');
  const finishBtns = document.querySelectorAll('#opt-finish .opt-btn');
  const calcPriceDisplay = document.getElementById('calc-price');

  let currentProp = '2bhk';
  let currentFinish = 'classic';

  const priceMap = {
    '2bhk_classic': '₹ 6.5 Lakhs - ₹ 8.5 Lakhs',
    '2bhk_premium': '₹ 9.5 Lakhs - ₹ 12.0 Lakhs',
    '3bhk_classic': '₹ 10.5 Lakhs - ₹ 13.5 Lakhs',
    '3bhk_premium': '₹ 15.0 Lakhs - ₹ 18.5 Lakhs',
    'villa_classic': '₹ 18.0 Lakhs - ₹ 22.0 Lakhs',
    'villa_premium': '₹ 25.0 Lakhs - ₹ 35.0+ Lakhs',
  };

  function updateEstimate() {
    const key = `${currentProp}_${currentFinish}`;
    if (calcPriceDisplay && priceMap[key]) {
      calcPriceDisplay.textContent = priceMap[key];
    }
  }

  propBtns.forEach(b => {
    b.addEventListener('click', () => {
      propBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      currentProp = b.getAttribute('data-val');
      updateEstimate();
    });
  });

  finishBtns.forEach(b => {
    b.addEventListener('click', () => {
      finishBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      currentFinish = b.getAttribute('data-val');
      updateEstimate();
    });
  });

  const btnConfirmQuote = document.getElementById('btn-confirm-quote');
  if (btnConfirmQuote) {
    btnConfirmQuote.addEventListener('click', () => {
      modal.classList.remove('active');
      const inquireSection = document.getElementById('inquire');
      if (inquireSection) {
        inquireSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 4. CONTACT FORM SUBMISSION HANDLING
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.style.display = 'block';
        contactForm.reset();
      }
    });
  }
});
