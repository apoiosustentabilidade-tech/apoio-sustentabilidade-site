const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.getElementById('year').textContent = new Date().getFullYear();

const cnpjInput = document.getElementById('cnpj');

cnpjInput?.addEventListener('input', (event) => {
  let value = event.target.value.replace(/\D/g, '').slice(0, 14);

  value = value.replace(/^(\d{2})(\d)/, '$1.$2');
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');

  event.target.value = value;
});

document.getElementById('leadForm')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const empresa = document.getElementById('empresa').value.trim();
  const cnpj = document.getElementById('cnpj').value.trim();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const servico = document.getElementById('servico').value;
  const cidade = document.getElementById('cidade').value.trim();
  const demanda = document.getElementById('demanda').value.trim();

  const cnpjDigits = cnpj.replace(/\D/g, '');

  if (cnpjDigits.length !== 14) {
    cnpjInput?.setCustomValidity('Informe um CNPJ com 14 dígitos.');
    cnpjInput?.reportValidity();
    return;
  }

  cnpjInput?.setCustomValidity('');

  const text = [
    'Olá! Gostaria de solicitar uma avaliação/cotação pelo site da Apoio Sustentabilidade.',
    '',
    `Empresa: ${empresa}`,
    `CNPJ: ${cnpj}`,
    `Responsável: ${nome}`,
    `Telefone / WhatsApp: ${telefone}`,
    `E-mail: ${email}`,
    `Tipo de resíduo / serviço: ${servico}`,
    `Cidade / local da operação: ${cidade}`,
    '',
    'Necessidade / demanda:',
    demanda
  ].join('\n');

  window.open(
    `https://wa.me/5511994576047?text=${encodeURIComponent(text)}`,
    '_blank',
    'noopener,noreferrer'
  );
});
