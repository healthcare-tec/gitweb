# Healthcare.tec / PubBid

Site público em https://healthcare.tec.br, com React, Vite e Tailwind.

## Páginas

- `/`: apresentação do PubBid como apoio à pesquisa para planejamento de incorporação de equipamentos em saúde.
- `/acesso/`: situação de disponibilidade do ambiente de pesquisa e orientação sobre os dados.
- `/consultoria/`: conteúdo institucional legado e formulário de contato, mantidos como página secundária.

O build gera documentos HTML próprios para as rotas secundárias e uma página 404. Isso permite abrir e recarregar essas páginas diretamente no GitHub Pages.

## Build

```sh
npm ci
npm run build
```

Saída: `dist/`. O workflow `deploy-pages.yml` publica essa saída na branch `gh-pages` quando há push em `main`. Ele também mantém os arquivos legados do Fluid, que deixou de ser destacado na navegação principal.

## Aplicações

O PubBid é o produto principal: pesquisa compras públicas e utiliza o catálogo do EqptEC. O EqptEC tem sua própria interface de planejamento e relatórios PDF. A página `/acesso/` distingue os dois produtos.

- PubBid: porta 3039 no DV5. O destino padrão permanece `https://fluid-api.healthcare.tec.br/`, verificado com a interface PubBid e uma pesquisa sem coleta. `VITE_PUBBID_URL` permite substituir esse destino no build.
- EqptEC: Streamlit na porta 8501, mantido internamente. O proprietário criará a ponte para acesso integrado pelo mesmo endereço público. O site informa integração em preparação até a implementação e validação desse fluxo.
- Entrada pública única: `fluid-api.healthcare.tec.br` encaminha para o PubBid em 3039. Os subdomínios separados foram dispensados; não há dependência de novos registros DNS.
- API: a comunicação comercial informa acesso mediante assinatura do serviço, com contato para condições e limites. Esta alteração de conteúdo não implementa autenticação, cobrança ou bloqueio técnico dos endpoints usados pela interface.

O site não inclui bases SQLite. Tokens administrativos GitHub/Cloudflare ficam fora do clone e nunca devem entrar em variáveis `VITE_*`.

A consultoria mantém a página `/consultoria/` e o logo original Healthcare.tec. Os recursos legados do Fluid continuam preservados.

Veja [deploy/README.md](deploy/README.md) para implantação e reversão.
