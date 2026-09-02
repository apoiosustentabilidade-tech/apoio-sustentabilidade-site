const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
  });
});

const ano = document.getElementById('ano');
if (ano) {
  ano.textContent = new Date().getFullYear();
}

const cnpjInput = document.getElementById('cnpj');

if (cnpjInput) {
  cnpjInput.addEventListener('input', (evento) => {
    let valor = evento.target.value.replace(/\D/g, '').slice(0, 14);

    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');

    evento.target.value = valor;
  });
}

const leadForm = document.getElementById('leadForm');

if (leadForm) {
  leadForm.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const empresa = document.getElementById('empresa')?.value.trim() || '';
    const cnpj = document.getElementById('cnpj')?.value.trim() || '';
    const nome = document.getElementById('nome')?.value.trim() || '';
    const telefone = document.getElementById('telefone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const servico = document.getElementById('servico')?.value.trim() || '';
    const cidade = document.getElementById('cidade')?.value.trim() || '';
    const demanda = document.getElementById('demanda')?.value.trim() || '';

    const texto = [
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

    const whatsapp =
      `https://wa.me/5511994576047?text=${encodeURIComponent(texto)}`;

    window.open(
      whatsapp,
      '_blank',
      'noopener,noreferrer'
    );
  });
}
