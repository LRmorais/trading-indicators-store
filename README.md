# QuantEdge Indicadores — Landing Page

Landing page de vendas para biblioteca de indicadores (IBOV, WIN FUT, DOL FUT). HTML + Tailwind CSS (build local, sem CDN).

## Rodar localmente

```bash
npm install
npm run build   # compila o CSS uma vez
npm run serve   # sobe um servidor em http://localhost:8080
```

Durante o desenvolvimento, use `npm run dev` em outro terminal para recompilar o CSS automaticamente a cada alteração.

## O que editar antes de publicar

Todo o conteúdo abaixo é **placeholder profissional** e precisa ser substituído pelos dados reais:

| O quê | Onde | Arquivo |
|---|---|---|
| Número de WhatsApp | `WHATSAPP_NUMBER` (const no topo) e botão flutuante | `assets/js/main.js`, `index.html` |
| Nome da marca, e-mail, endereço, CNPJ | Header, footer | `index.html` |
| Preços dos planos | Seção `#planos` | `index.html` |
| Depoimentos | Seção `#depoimentos` (marcados com comentário) | `index.html` |
| Números de prova social (traders atendidos, % assertividade, etc.) | Seção de stats e seção de performance | `index.html` |
| Redes sociais (links `href="#"`) | Footer | `index.html` |
| Aviso legal | Rodapé — revisar com jurídico antes de publicar | `index.html` |

## Estrutura

- `index.html` — página única (nav, hero, prova social, problema/solução, indicadores, mercados, como funciona, performance, depoimentos, planos, FAQ, formulário de lead, footer)
- `src/input.css` — fonte Tailwind (tokens de cor, componentes)
- `assets/css/output.css` — CSS compilado (gerado, não editar direto)
- `assets/js/main.js` — menu mobile, accordion FAQ, animações on-scroll, validação e envio do formulário de lead via WhatsApp

## Formulário de lead

O formulário não tem backend: ao enviar, monta uma mensagem com os dados preenchidos e abre o WhatsApp (`wa.me`) em nova aba. Para conectar a um CRM/planilha, adicione uma chamada `fetch` antes do `window.open` em `assets/js/main.js`.
