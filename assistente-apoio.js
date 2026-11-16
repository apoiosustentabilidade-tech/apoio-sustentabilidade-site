
(function () {
    "use strict";

    function iniciarAssistente() {

        if (document.getElementById("apoio-assistente")) return;

        const whatsapp = "5511994576047";

        const container = document.createElement("div");
        container.id = "apoio-assistente";

        container.innerHTML = `
            <button id="apoio-chat-abrir"
                aria-expanded="false"
                aria-controls="apoio-chat-janela">
                <span>💬</span>
                Atendimento virtual
            </button>

            <section id="apoio-chat-janela"
                aria-label="Assistente Virtual Apoio Sustentabilidade"
                hidden>

                <div class="apoio-chat-cabecalho">
                    <div>
                        <strong>Assistente Virtual</strong>
                        <small>Apoio Sustentabilidade</small>
                        <small>Atendimento comercial automático</small>
                    </div>

                    <button id="apoio-chat-fechar"
                        aria-label="Fechar atendimento">
                        ✕
                    </button>
                </div>

                <div id="apoio-chat-mensagens"
                    aria-live="polite">
                </div>

                <div class="apoio-chat-rodape">
                    Apoio Sustentabilidade
                    <small>
                        Conectando soluções, transformando
                        resíduos em oportunidades.
                    </small>
                </div>

            </section>
        `;

        document.body.appendChild(container);

        const abrir = document.getElementById("apoio-chat-abrir");
        const fechar = document.getElementById("apoio-chat-fechar");
        const janela = document.getElementById("apoio-chat-janela");
        const mensagens = document.getElementById("apoio-chat-mensagens");

        function mensagem(texto, tipo = "assistente") {

            const item = document.createElement("div");

            item.className = "apoio-mensagem apoio-" + tipo;
            item.textContent = texto;

            mensagens.appendChild(item);
            mensagens.scrollTop = mensagens.scrollHeight;
        }

        function opcoes(lista) {

            const grupo = document.createElement("div");
            grupo.className = "apoio-chat-opcoes";

            lista.forEach(function (opcao) {

                const botao = document.createElement("button");

                botao.type = "button";
                botao.textContent = opcao[0];

                botao.addEventListener("click", function () {

                    grupo.remove();
                    mensagem(opcao[0], "cliente");
                    opcao[1]();

                });

                grupo.appendChild(botao);

            });

            mensagens.appendChild(grupo);
            mensagens.scrollTop = mensagens.scrollHeight;
        }

        function acessarPagina(pagina) {
            window.location.href = pagina;
        }

        function abrirWhatsApp(texto) {

            const endereco =
                "https://wa.me/" + whatsapp +
                "?text=" + encodeURIComponent(texto);

            window.open(
                endereco,
                "_blank",
                "noopener,noreferrer"
            );

            mensagem(
                "O atendimento será direcionado ao WhatsApp da nossa equipe."
            );

            opcoes([
                ["Voltar ao menu principal", menuPrincipal]
            ]);
        }

        function menuPrincipal() {

            mensagem("Selecione a opção desejada:");

            opcoes([
                ["Solicitar uma cotação", menuCotacao],
                ["Conhecer nossos serviços", menuServicos],
                ["Contratar serviço já cotado", contratarServico],
                ["Consultar uma solicitação", consultarSolicitacao],
                ["Documentação ambiental", menuDocumentacao],
                ["Falar com um atendente", atendimentoHumano]
            ]);
        }

        function menuCotacao() {

            mensagem(
                "Para solicitar uma cotação, escolha o canal de atendimento."
            );

            opcoes([

                ["Preencher formulário de cotação", function () {
                    acessarPagina("solicitar-cotacao.html");
                }],

                ["Solicitar pelo WhatsApp", function () {
                    abrirWhatsApp(
                        "Olá! Gostaria de solicitar uma cotação de serviços ambientais."
                    );
                }],

                ["Voltar ao menu principal", menuPrincipal]

            ]);
        }

        function menuServicos() {

            mensagem(
                "Conheça nossos serviços de gerenciamento ambiental de resíduos."
            );

            opcoes([

                ["Caminhão auto-vácuo", function () {
                    acessarPagina("caminhao-auto-vacuo.html");
                }],

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

                ["Voltar ao menu principal", menuPrincipal]

            ]);
        }

        function menuOutrosServicos() {

            mensagem("Selecione o serviço de seu interesse:");

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

                ["Voltar aos serviços", menuServicos],

                ["Voltar ao menu principal", menuPrincipal]

            ]);
        }

        function menuDocumentacao() {

            mensagem(
                "Oferecemos suporte para documentação e regularização ambiental."
            );

            opcoes([

                ["CADRI e MTR", function () {
                    acessarPagina("cadri-mtr-documentacao-ambiental.html");
                }],

                ["Solicitar orientação ambiental", function () {
                    abrirWhatsApp(
                        "Olá! Preciso de orientação sobre CADRI, MTR e documentação ambiental."
                    );
                }],

                ["Voltar ao menu principal", menuPrincipal]

            ]);
        }

        function contratarServico() {

            mensagem(
                "Tenha em mãos o número da proposta comercial para facilitar seu atendimento."
            );

            opcoes([

                ["Encaminhar aprovação da proposta", function () {
                    abrirWhatsApp(
                        "Olá! Gostaria de contratar um serviço já cotado.\n\nEmpresa:\nNúmero da proposta:\nServiço:"
                    );
                }],

                ["Voltar ao menu principal", menuPrincipal]

            ]);
        }

        function consultarSolicitacao() {

            mensagem(
                "Nossa equipe poderá verificar o andamento da sua solicitação."
            );

            opcoes([

                ["Consultar programação de coleta", function () {
                    abrirWhatsApp(
                        "Olá! Gostaria de consultar a programação da minha coleta.\n\nEmpresa:\nNúmero da solicitação:"
                    );
                }],

                ["Consultar proposta comercial", function () {
                    abrirWhatsApp(
                        "Olá! Gostaria de consultar uma proposta comercial.\n\nEmpresa:\nNúmero da proposta:"
                    );
                }],

                ["Consultar documentação", function () {
                    abrirWhatsApp(
                        "Olá! Gostaria de consultar a documentação referente ao meu atendimento.\n\nEmpresa:"
                    );
                }],

                ["Voltar ao menu principal", menuPrincipal]

            ]);
        }

        function atendimentoHumano() {

            mensagem(
                "Você pode entrar em contato diretamente com nossa equipe comercial."
            );

            opcoes([

                ["Atendimento via WhatsApp", function () {
                    abrirWhatsApp(
                        "Olá! Gostaria de falar com a equipe da Apoio Sustentabilidade."
                    );
                }],

                ["Atendimento por e-mail", function () {
                    window.location.href =
                        "mailto:apoiosustentabilidade@gmail.com" +
                        "?subject=" +
                        encodeURIComponent("Solicitação de atendimento");

                    opcoes([
                        ["Voltar ao menu principal", menuPrincipal]
                    ]);
                }],

                ["Voltar ao menu principal", menuPrincipal]

            ]);
        }

        abrir.addEventListener("click", function () {

            janela.hidden = false;
            abrir.hidden = true;
            abrir.setAttribute("aria-expanded", "true");

            if (!mensagens.hasChildNodes()) {

                mensagem(
                    "Olá! Seja bem-vindo à Apoio Sustentabilidade."
                );

                mensagem(
                    "Sou seu assistente virtual de atendimento ambiental."
                );

                menuPrincipal();
            }

            fechar.focus();

        });

        function fecharAssistente() {

            janela.hidden = true;
            abrir.hidden = false;
            abrir.setAttribute("aria-expanded", "false");
            abrir.focus();

        }

        fechar.addEventListener("click", fecharAssistente);

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
