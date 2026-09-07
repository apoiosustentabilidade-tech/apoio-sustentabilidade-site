const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

const ano = document.getElementById('ano');

if (ano) {
  ano.textContent = new Date().getFullYear();
}


/* =========================
   MÁSCARA DO CNPJ
========================= */

const cnpjInput = document.getElementById('cnpj');

cnpjInput?.addEventListener('input', (event) => {
  let value = event.target.value
    .replace(/\D/g, '')
    .slice(0, 14);

  value = value.replace(/^(\d{2})(\d)/, '$1.$2');
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');

  event.target.value = value;

  event.target.setCustomValidity('');
});
const telefoneInput = document.getElementById('telefone');

telefoneInput?.addEventListener('input', (event) => {
  let value = event.target.value
    .replace(/\D/g, '')
    .slice(0, 11);

  if (value.length > 10) {
    value = value.replace(
      /^(\d{2})(\d{5})(\d{4})$/,
      '($1) $2-$3'
    );
  } else if (value.length > 6) {
    value = value.replace(
      /^(\d{2})(\d{4})(\d{0,4})$/,
      '($1) $2-$3'
    );
  } else if (value.length > 2) {
    value = value.replace(
      /^(\d{2})(\d{0,5})$/,
      '($1) $2'
    );
  } else if (value.length > 0) {
    value = value.replace(
      /^(\d{0,2})$/,
      '($1'
    );
  }

  event.target.value = value;
  event.target.setCustomValidity('');
});

/* =========================
   ENVIO DO FORMULÁRIO
========================= */

document.getElementById('leadForm')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const empresa =
    document.getElementById('empresa')?.value.trim() || '';

  const cnpj =
    document.getElementById('cnpj')?.value.trim() || '';

  const nome =
    document.getElementById('nome')?.value.trim() || '';

  const telefone =
    document.getElementById('telefone')?.value.trim() || '';

  const email =
    document.getElementById('email')?.value.trim() || '';

  const servico =
    document.getElementById('servico')?.value || '';

  const cidade =
    document.getElementById('cidade')?.value.trim() || '';

  const demanda =
    document.getElementById('demanda')?.value.trim() || '';


  /* =========================
     VALIDAÇÃO DO CNPJ
     CNPJ É OPCIONAL
  ========================= */

  if (cnpj) {
    const cnpjDigits = cnpj.replace(/\D/g, '');

    if (cnpjDigits.length !== 14) {
      cnpjInput?.setCustomValidity(
        'Informe um CNPJ com 14 dígitos ou deixe o campo em branco.'
      );

      cnpjInput?.reportValidity();

      return;
    }
  }

  cnpjInput?.setCustomValidity('');


  /* =========================
     MONTA A MENSAGEM
  ========================= */

  const linhas = [
    'Olá! Gostaria de solicitar uma avaliação/cotação pelo site da Apoio Sustentabilidade.',
    '',
    `Empresa: ${empresa}`,
    `Responsável: ${nome}`,
    `Telefone / WhatsApp: ${telefone}`
  ];


  if (cnpj) {
    linhas.push(`CNPJ: ${cnpj}`);
  }


  if (email) {
    linhas.push(`E-mail: ${email}`);
  }


  if (servico) {
    linhas.push(`Tipo de resíduo / serviço: ${servico}`);
  }


  if (cidade) {
    linhas.push(`Cidade / local da operação: ${cidade}`);
  }


  linhas.push('');
  linhas.push('Necessidade / demanda:');
  linhas.push(demanda);


  const text = linhas.join('\n');


  /* =========================
     ABRE O WHATSAPP
  ========================= */

  const whatsappURL =
    `https://wa.me/5511994576047?text=${encodeURIComponent(text)}`;

  window.open(
    whatsappURL,
    '_blank',
    'noopener,noreferrer'
  );
});
