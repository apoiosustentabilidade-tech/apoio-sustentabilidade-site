
/* ==================================================
   APOIO SUSTENTABILIDADE
   ASSISTENTE VIRTUAL V3 PREMIUM
   ================================================== */

(function () {
    "use strict";

    function iniciarAssistente() {

        if (document.getElementById("apoio-assistente")) return;

        const whatsapp = "5511994576047";
        let iniciado = false;

        const icones = {

            chat: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',

            headset: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="3" y="11" width="4" height="7" rx="2"/><rect x="17" y="11" width="4" height="7" rx="2"/><path d="M21 18c0 3-3 4-7 4"/>',

            cotacao: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4"/>',

            truck: '<path d="M2 5h13v12H2zM15 9h4l3 4v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',

            contrato: '<path d="M5 3h10l4 4v14H5zM15 3v5h4M8 14l3 3 5-6"/>',

            consulta: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',

            documento: '<path d="M5 3h10l4 4v14H5zM15 3v5h4M8 12h8M8 16h8"/>',

            seta: '<path d="m9 6 6 6-6 6"/>',

            voltar: '<path d="m12 5-7 7 7 7M5 12h14"/>',

            email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',

            inicio: '<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7"/>'

        };

        function svg(nome) {

            return '<svg width="22" height="22" ' +
                'viewBox="0 0 24 24" fill="none" ' +
                'stroke="currentColor" stroke-width="1.7" ' +
                'stroke-linecap="round" stroke-linejoin="round" ' +
                'aria-hidden="true">' +
                (icones[nome] || icones.seta) +
                '</svg>';

        }

        const container = document.createElement("div");

        container.id = "apoio-assistente";

        container.innerHTML = `
            <button type="button"
                id="apoio-chat-abrir"
                aria-expanded="false"
                aria-controls="apoio-chat-janela">

                <span>${svg("chat")}</span>
                Atendimento virtual

            </button>

            <section id="apoio-chat-janela"
                aria-label="Assistente Virtual Apoio Sustentabilidade"
                hidden>

                <div class="apoio-chat-cabecalho">

                    <div class="apoio-chat-avatar">
                        ${svg("headset")}
                    </div>

                    <div class="apoio-chat-identidade">

                        <strong>Apoio Sustentabilidade</strong>

                        <small>
                            Assistente Virtual de Atendimento
                        </small>

                        <div class="apoio-chat-status">

                            <span class="apoio-chat-status-ponto"></span>

                            Atendimento automático 24 horas

                        </div>

                    </div>

                    <button type="button"
                        id="apoio-chat-fechar"
                        aria-label="Fechar atendimento">

                        ✕

                    </button>

                </div>

                <div id="apoio-chat-mensagens"
                    aria-live="polite"></div>

                <div class="apoio-chat-rodape">

                    <button type="button"
                        id="apoio-chat-inicio">

                        ${svg("inicio")}
                        Menu principal

                    </button>

                    <div class="apoio-chat-marca">

                        APOIO SUSTENTABILIDADE

                        <small>
                            Conectando soluções, transformando
                            resíduos em oportunidades.
                        </small>

                    </div>

                </div>

            </section>
        `;

        document.body.appendChild(container);

        const abrir = document.getElementById("apoio-chat-abrir");

        const fechar = document.getElementById("apoio-chat-fechar");

        const janela = document.getElementById("apoio-chat-janela");

        const mensagens = document.getElementById("apoio-chat-mensagens");

        const inicio = document.getElementById("apoio-chat-inicio");

        function rolarMensagens(posicao = "final") {

            requestAnimationFrame(function () {

                mensagens.scrollTop = posicao === "inicio"
                    ? 0
                    : mensagens.scrollHeight;

            });

        }

        function mensagem(texto, tipo = "assistente") {

            const item = document.createElement("div");

            item.className = "apoio-mensagem apoio-" + tipo;

            item.textContent = texto;

            mensagens.appendChild(item);

        }

        function removerMenus() {

            mensagens.querySelectorAll(".apoio-chat-opcoes")
                .forEach(function (menu) {

                    menu.remove();

                });

        }

        function opcoes(lista, principal = false) {

            removerMenus();

            const grupo = document.createElement("div");

            grupo.className = "apoio-chat-opcoes";

            if (principal) {

                grupo.classList.add("apoio-menu-principal");

            }

            lista.forEach(function (opcao) {

                const botao = document.createElement("button");

                botao.type = "button";

                const titulo = document.createElement("strong");

                titulo.textContent = opcao[0];

                const conteudo = document.createElement("span");

                conteudo.className = "apoio-opcao-conteudo";

                conteudo.appendChild(titulo);

                if (opcao[2]) {

                    const descricao = document.createElement("small");

                    descricao.textContent = opcao[2];

                    conteudo.appendChild(descricao);

                }

                const simbolo = document.createElement("span");

                simbolo.className = "apoio-opcao-icone";

                simbolo.innerHTML = svg(opcao[3] || "seta");

                botao.appendChild(simbolo);

                botao.appendChild(conteudo);

                const seta = document.createElement("span");

                seta.className = "apoio-opcao-seta";

                seta.innerHTML = svg("seta");

                botao.appendChild(seta);

                botao.addEventListener("click", function () {

                    removerMenus();

                    mensagem(opcao[0], "cliente");

                    opcao[1]();

                });

                grupo.appendChild(botao);

            });

            mensagens.appendChild(grupo);

            rolarMensagens(principal ? "inicio" : "final");

        }

        function acessarPagina(pagina) {

            window.location.href = pagina;

        }

        function abrirWhatsApp(texto) {

            window.open(
                "https://wa.me/" + whatsapp +
                "?text=" + encodeURIComponent(texto),
                "_blank",
                "noopener,noreferrer"
            );

            mensagem(
                "Continue seu atendimento pelo WhatsApp da nossa equipe comercial."
            );

            opcoes([

                ["Abrir WhatsApp novamente", function () {

                    abrirWhatsApp(texto);

                }, "", "chat"],

                ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

            ]);

        }

        /* MENU PRINCIPAL */

        function menuPrincipal() {

            mensagens.innerHTML = "";

            const boasVindas = document.createElement("div");

            boasVindas.className = "apoio-boas-vindas";

            boasVindas.innerHTML = `
                <strong>Olá! Seja bem-vindo(a)! 👋</strong>

                <p>
                    Selecione abaixo o atendimento desejado.
                    Estamos à disposição para atender sua empresa.
                </p>
            `;

            mensagens.appendChild(boasVindas);

            opcoes([

                [
                    "Solicitar uma cotação",
                    menuCotacao,
                    "Novos serviços ambientais",
                    "cotacao"
                ],

                [
                    "Conhecer nossos serviços",
                    menuServicos,
                    "Coleta, transporte e destinação",
                    "truck"
                ],

                [
                    "Contratar serviço já cotado",
                    contratarServico,
                    "Aprovação de proposta comercial",
                    "contrato"
                ],

                [
                    "Consultar uma solicitação",
                    consultarSolicitacao,
                    "Propostas e programação de coletas",
                    "consulta"
                ],

                [
                    "Documentação ambiental",
                    menuDocumentacao,
                    "CADRI, MTR e CDF",
                    "documento"
                ],

                [
                    "Falar com um atendente",
                    atendimentoHumano,
                    "Contato com nossa equipe comercial",
                    "headset"
                ]

            ], true);

            iniciado = true;

        }

        /* COTACAO */

        function menuCotacao() {

            mensagem(
                "Para solicitar uma cotação, escolha o canal de atendimento."
            );

            opcoes([

                ["Preencher formulário de cotação", function () {

                    acessarPagina("solicitar-cotacao.html");

                }, "Solicitação detalhada de serviços", "cotacao"],

                ["Solicitar pelo WhatsApp", function () {

                    abrirWhatsApp(
                        "Olá! Gostaria de solicitar uma cotação de serviços ambientais."
                    );

                }, "Contato com a equipe comercial", "chat"],

                ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

            ]);

        }

        /* SERVICOS AMBIENTAIS */

        function menuServicos() {

            mensagem("Selecione o serviço ambiental de seu interesse.");

            opcoes([

                ["Caminhão auto-vácuo", function () {

                    acessarPagina("caminhao-auto-vacuo.html");

                }, "", "truck"],

                ["Limpeza de caixas separadoras", function () {

                    acessarPagina("limpeza-caixa-separadora-agua-oleo.html");

                }],

                ["Hidrojateamento industrial", function () {

                    acessarPagina("hidrojateamento-industrial.html");

                }],

                ["Resíduos industriais", function () {

                    acessarPagina("residuos-industriais.html");

                }],

                ["Resíduos Classe I", function () {

                    acessarPagina("residuos-classe-1.html");

                }],

                ["Resíduos Classe II", function () {

                    acessarPagina("residuos-classe-2.html");

                }],

                ["Outros serviços", menuOutrosServicos],

                ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

            ]);

        }

        function menuOutrosServicos() {

            mensagem("Conheça outras modalidades de atendimento.");

            opcoes([

                ["Coleta de resíduos comuns", function () {

                    acessarPagina("coleta-lixo-comum-empresas.html");

                }],

                ["Limpeza de caixa de gordura e fossa", function () {

                    acessarPagina("limpeza-caixa-gordura-fossa.html");

                }],

                ["Coleta de resíduos eletrônicos", function () {

                    acessarPagina("coleta-residuos-eletronicos.html");

                }],

                ["Locação de caçambas", function () {

                    acessarPagina("locacao-cacambas-residuos.html");

                }],

                ["Logística reversa", function () {

                    acessarPagina("logistica-reversa-sp.html");

                }],

                ["Voltar aos serviços", menuServicos, "", "voltar"],

                ["Voltar ao menu principal", menuPrincipal, "", "inicio"]

            ]);

        }

        /* DOCUMENTACAO */

        function menuDocumentacao() {

            mensagem(
                "Oferecemos suporte para documentação e regularização ambiental."
            );

            opcoes([

                ["CADRI e MTR", function () {

                    acessarPagina("cadri-mtr-documentacao-ambiental.html");

                }, "Informações sobre documentação ambiental", "documento"],

                ["Solicitar orientação ambiental", function () {

                    abrirWhatsApp(
                        "Olá! Preciso de orientação sobre CADRI, MTR e documentação ambiental."
                    );

                }, "", "chat"],

                ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

            ]);

        }

        /* CONTRATACAO */

        function contratarServico() {

            mensagem(
                "Tenha em mãos o número da proposta comercial para facilitar seu atendimento."
            );

            opcoes([

                ["Encaminhar aprovação da proposta", function () {

                    abrirWhatsApp(
                        "Olá! Gostaria de contratar um serviço já cotado." +
                        "\n\nEmpresa:" +
                        "\nNúmero da proposta:" +
                        "\nServiço:"
                    );

                }, "", "contrato"],

                ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

            ]);

        }

        /* CONSULTAS */

        function consultarSolicitacao() {

            mensagem(
                "Nossa equipe poderá verificar o andamento da sua solicitação."
            );

            opcoes([

                ["Consultar programação de coleta", function () {

                    abrirWhatsApp(
                        "Olá! Gostaria de consultar a programação da minha coleta." +
                        "\n\nEmpresa:" +
                        "\nNúmero da solicitação:"
                    );

                }, "", "truck"],

                ["Consultar proposta comercial", function () {

                    abrirWhatsApp(
                        "Olá! Gostaria de consultar uma proposta comercial." +
                        "\n\nEmpresa:" +
                        "\nNúmero da proposta:"
                    );

                }, "", "consulta"],

                ["Consultar documentação", function () {

                    abrirWhatsApp(
                        "Olá! Gostaria de consultar a documentação referente ao meu atendimento." +
                        "\n\nEmpresa:"
                    );

                }, "", "documento"],

                ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

            ]);

        }

        /* ATENDIMENTO HUMANO */

        function atendimentoHumano() {

            mensagem(
                "Escolha o canal de contato com nossa equipe comercial."
            );

            opcoes([

                ["Atendimento via WhatsApp", function () {

                    abrirWhatsApp(
                        "Olá! Gostaria de falar com a equipe da Apoio Sustentabilidade."
                    );

                }, "", "chat"],

                ["Atendimento por e-mail", function () {

                    window.location.href =
                        "mailto:apoiosustentabilidade@gmail.com" +
                        "?subject=" +
                        encodeURIComponent("Solicitação de atendimento");

                    opcoes([

                        ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

                    ]);

                }, "", "email"],

                ["Voltar ao menu principal", menuPrincipal, "", "voltar"]

            ]);

        }

        /* CONTROLE DA JANELA */

        abrir.addEventListener("click", function () {

            janela.hidden = false;

            abrir.hidden = true;

            abrir.setAttribute("aria-expanded", "true");

            if (!iniciado || mensagens.children.length === 0) {

                menuPrincipal();

            }

            fechar.focus({ preventScroll: true });

        });

        function fecharAssistente() {

            janela.hidden = true;

            abrir.hidden = false;

            abrir.setAttribute("aria-expanded", "false");

            abrir.focus({ preventScroll: true });

        }

        fechar.addEventListener("click", fecharAssistente);

        inicio.addEventListener("click", menuPrincipal);

        janela.addEventListener("keydown", function (evento) {

            if (evento.key === "Escape") {

                fecharAssistente();

            }

        });

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarAssistente
        );

    } else {

        iniciarAssistente();

    }

})();

/* FIM DO ASSISTENTE VIRTUAL V3 PREMIUM */
