const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

/* Fecha o menu mobile ao clicar em um link */
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
  });
});

/* Ano automático no rodapé */
const ano = document.getElementById("ano");

if (ano) {
  ano.textContent = new Date().getFullYear();
}

/* Máscara opcional de CNPJ */
const cnpjInput = document.getElementById("cnpj");

cnpjInput?.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, "").slice(0, 14);

  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");

  event.target.value = value;
});

/* Máscara simples de telefone */
const telefoneInput = document.getElementById("telefone");

telefoneInput?.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, "").slice(0, 11);

  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d+)/, "($1) $2");
  }

  event.target.value = value;
});

const form = document.getElementById("leadForm");
const sendWhatsapp = document.getElementById("sendWhatsapp");
const sendEmail = document.getElementById("sendEmail");

function obterDadosFormulario() {
  const empresa = document.getElementById("empresa")?.value.trim() || "";
  const nome = document.getElementById("nome")?.value.trim() || "";
  const telefone = document.getElementById("telefone")?.value.trim() || "";
  const cnpj = document.getElementById("cnpj")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const cidade = document.getElementById("cidade")?.value.trim() || "";
  const servico = document.getElementById("servico")?.value || "";
  const demanda = document.getElementById("demanda")?.value.trim() || "";

  return {
    empresa,
    nome,
    telefone,
    cnpj,
    email,
    cidade,
    servico,
    demanda
  };
}

function validarFormulario() {
  if (!form) return false;

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  return true;
}

function montarMensagem() {
  const dados = obterDadosFormulario();

  const linhas = [
    "Olá! Gostaria de solicitar uma avaliação/cotação pelo site da Apoio Sustentabilidade.",
    "",
    `Empresa: ${dados.empresa}`,
    `Responsável: ${dados.nome}`,
    `Telefone / WhatsApp: ${dados.telefone}`
  ];

  if (dados.cnpj) {
    linhas.push(`CNPJ: ${dados.cnpj}`);
  }

  if (dados.email) {
    linhas.push(`E-mail: ${dados.email}`);
  }

  if (dados.cidade) {
    linhas.push(`Cidade / local da operação: ${dados.cidade}`);
  }

  if (dados.servico) {
    linhas.push(`Tipo de resíduo / serviço: ${dados.servico}`);
  }

  linhas.push(
    "",
    "Necessidade / demanda:",
    dados.demanda
  );

  return linhas.join("\n");
}

/* ENVIO PELO WHATSAPP */

sendWhatsapp?.addEventListener("click", () => {
  if (!validarFormulario()) return;

  const mensagem = montarMensagem();

  const whatsapp =
    `https://wa.me/5511994576047?text=${encodeURIComponent(mensagem)}`;

  window.open(
    whatsapp,
    "_blank",
    "noopener,noreferrer"
  );
});

/* ENVIO POR E-MAIL */

sendEmail?.addEventListener("click", () => {
  if (!validarFormulario()) return;

  const dados = obterDadosFormulario();
  const mensagem = montarMensagem();

  const assunto =
    `Solicitação de cotação - ${dados.empresa}`;

  const mailto =
    `mailto:apoiosustentabilidade@gmail.com` +
    `?subject=${encodeURIComponent(assunto)}` +
    `&body=${encodeURIComponent(mensagem)}`;

  window.location.href = mailto;
});
