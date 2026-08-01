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
| Número de WhatsApp | `WHATSAPP_NUMBER` (const no topo) e botão flutuante | `public/assets/js/main.js`, `public/index.html` |
| Nome da marca, e-mail, endereço, CNPJ | Header, footer | `public/index.html` |
| Preços dos planos | Seção `#planos` | `public/index.html` |
| Depoimentos | Seção `#depoimentos` (marcados com comentário) | `public/index.html` |
| Números de prova social (traders atendidos, % assertividade, etc.) | Seção de stats e seção de performance | `public/index.html` |
| Redes sociais (links `href="#"`) | Footer | `public/index.html` |
| Aviso legal | Rodapé — revisar com jurídico antes de publicar | `public/index.html` |

## Estrutura

Tudo que é servido publicamente fica em `public/` (é o Output Directory configurado no `vercel.json` — obrigatório para o deploy funcionar na Vercel):

- `public/index.html` — página única (nav, hero, prova social, problema/solução, indicadores, mercados, como funciona, performance, depoimentos, planos, FAQ, formulário de lead, footer)
- `public/assets/css/output.css` — CSS compilado (gerado, não editar direto)
- `public/assets/js/main.js` — menu mobile, accordion FAQ, animações on-scroll, validação e envio do formulário de lead via WhatsApp
- `src/input.css` — fonte Tailwind (tokens de cor, componentes) — fica fora de `public/` pois não precisa ser servida diretamente

## Deploy na Vercel

1. Suba o repositório para o GitHub (já configurado como remoto `origin`).
2. Importe o repositório na Vercel.
3. A Vercel detecta o `vercel.json` automaticamente: roda `npm run build` (compila o Tailwind) e publica a pasta `public/`. Nenhuma configuração manual extra é necessária.

## Formulário de lead

O formulário não tem backend: ao enviar, monta uma mensagem com os dados preenchidos e abre o WhatsApp (`wa.me`) em nova aba. Para conectar a um CRM/planilha, adicione uma chamada `fetch` antes do `window.open` em `public/assets/js/main.js`.
