// Form validation
const form = document.querySelector('.forms');
const inputNome = document.getElementById('name');
const inputMail = document.getElementById('mail');
const inputDescricao = document.getElementById('description');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let errors = [];

  const name = inputNome.value.trim();
  if (name.split(' ').length < 2) {
    errors.push('Name must contain at least 2 words.');
  }

  const email = inputMail.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    errors.push('Enter a valid email.');
  }

  const description = inputDescricao.value.trim();
  if (description.length < 10) {
    errors.push('Description must have at least 10 characters.');
  }

  if (errors.length > 0) {
    alert('Errors found:\n- ' + errors.join('\n- '));
  } else {
    alert('Form submitted successfully!');
    form.reset();
  }
});

// Read more / Read less + Visualize attachment
const MAX_CHARS = 100;

// Map each person to their attachment page
const attachmentPages = {
  'Bernado Schafer': 'pages/bernardo.html',
  'Lucas Larry': 'pages/lucaslarry.html',
  'Micael Lima': 'https://micael1ma.github.io/',
};

document.querySelectorAll('.person-description').forEach((section) => {
  const p = section.querySelector('.bio');
  const btn = section.querySelector('.toggle-btn');

  if (!p || !btn) return;

  const full = (p.dataset.fulltext || '').trim();
  const short =
    full.length > MAX_CHARS ? full.slice(0, MAX_CHARS) + '...' : full;

  let expanded = false;

  p.textContent = short;
  btn.textContent = 'Read more';

  // Create attachment button but hide it initially
  const attachmentBtn = document.createElement('button');
  attachmentBtn.classList.add('button');
  attachmentBtn.style.display = 'none';
  attachmentBtn.textContent = 'Visualize attachment';
  section.appendChild(attachmentBtn);

  // Set attachment link based on person's name
  const personName = section
    .closest('.person')
    .querySelector('p.font-64')
    .textContent.trim();
  const attachmentPage = attachmentPages[personName] || '#';
  attachmentBtn.addEventListener('click', () => {
    window.location.href = attachmentPage;
  });

  btn.addEventListener('click', () => {
    expanded = !expanded;
    p.textContent = expanded ? full : short;
    btn.textContent = expanded ? 'Read less' : 'Read more';
    attachmentBtn.style.display = expanded ? 'inline-block' : 'none';
  });
});
