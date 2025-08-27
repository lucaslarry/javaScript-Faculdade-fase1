// Validação formulario
const form = document.querySelector('.forms');
const inputNome = document.getElementById('name');
const inputMail = document.getElementById('mail');
const inputDescricao = document.getElementById('description');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let erros = [];

  const nome = inputNome.value.trim();
  if (nome.split(' ').length < 2) {
    erros.push('O nome deve conter pelo menos 2 palavras.');
  }

  const email = inputMail.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    erros.push('Digite um e-mail válido.');
  }

  const descricao = inputDescricao.value.trim();
  if (descricao.length < 10) {
    erros.push('A descrição deve ter pelo menos 10 caracteres.');
  }

  if (erros.length > 0) {
    alert('Erros encontrados:\n- ' + erros.join('\n- '));
  } else {
    alert('Formulário enviado com sucesso!');
    form.reset();
  }
});

// Read more - Read less
const MAX_CHARS = 100;

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

  btn.addEventListener('click', () => {
    expanded = !expanded;
    p.textContent = expanded ? full : short;
    btn.textContent = expanded ? 'Read Less' : 'Read more';
  });
});
