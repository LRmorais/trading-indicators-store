# QuantEdge Indicadores — Landing Page

Landing page de vendas para biblioteca de indicadores (IBOV, WIN FUT, DOL FUT). Vite + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev   # sobe o servidor de desenvolvimento com hot reload
```

Para simular a versão de produção:

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve dist/ localmente
```

## O que editar antes de publicar

Todo o conteúdo abaixo é **placeholder profissional** e precisa ser substituído pelos dados reais:

| O quê | Onde | Arquivo |
|---|---|---|
| Número de WhatsApp | `WHATSAPP_NUMBER` (const no topo) e botão flutuante | `src/main.js`, `index.html` |
| Nome da marca, e-mail, endereço, CNPJ | Header, footer | `index.html` |
| Preços dos planos | Seção `#planos` | `index.html` |
| Depoimentos | Seção `#depoimentos` (marcados com comentário) | `index.html` |
| Números de prova social (traders atendidos, % assertividade, etc.) | Seção de stats e seção de performance | `index.html` |
| Redes sociais (links `href="#"`) | Footer | `index.html` |
| Aviso legal | Rodapé — revisar com jurídico antes de publicar | `index.html` |

## Estrutura

- `index.html` — página única (nav, hero, prova social, problema/solução, indicadores, mercados, como funciona, performance, depoimentos, planos, FAQ, formulário de lead, footer) — ponto de entrada do Vite
- `src/style.css` — fonte Tailwind (tokens de cor, componentes), importada por `main.js`
- `src/main.js` — menu mobile, accordion FAQ, animações on-scroll, validação e envio do formulário de lead via WhatsApp
- `dist/` — gerado pelo `npm run build` (ignorado no git)

## Deploy na Vercel

1. Suba o repositório para o GitHub (já configurado como remoto `origin`).
2. Importe o repositório na Vercel.
3. A Vercel detecta o Vite automaticamente (framework preset "Vite"): roda `npm run build` e publica a pasta `dist/`. Nenhum `vercel.json` é necessário.

## Formulário de lead

O formulário não tem backend: ao enviar, monta uma mensagem com os dados preenchidos e abre o WhatsApp (`wa.me`) em nova aba. Para conectar a um CRM/planilha, adicione uma chamada `fetch` antes do `window.open` em `src/main.js`.
