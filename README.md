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

O EqptEC é a entrada principal para o Planejamento de Incorporação Tecnológica.
O PubBid é uma pesquisa complementar de compras públicas e utiliza o catálogo
do EqptEC. A página `/acesso/` apresenta os dois destinos nessa ordem.

- PubBid: pesquisa em `https://fluid-api.healthcare.tec.br/pubbid/` pelo gateway da porta 3039. A raiz pública abre o planejamento EqptEC. `VITE_PUBBID_URL` permite substituir o destino da pesquisa no build.
- EqptEC: `https://fluid-api.healthcare.tec.br/` redireciona para `/eqptec/`; o gateway da porta 3039 encaminha o tráfego à porta interna 8501, incluindo WebSocket.
- Entrada pública única: `fluid-api.healthcare.tec.br` encaminha para a porta 3039. Os subdomínios separados foram dispensados; não há dependência de novos registros DNS.
- API: a comunicação comercial informa acesso mediante assinatura do serviço, com contato para condições e limites. Esta alteração de conteúdo não implementa autenticação, cobrança ou bloqueio técnico dos endpoints usados pela interface.

O site não inclui bases SQLite. Tokens administrativos GitHub/Cloudflare ficam fora do clone e nunca devem entrar em variáveis `VITE_*`.

### Escopo atual das fontes PubBid

Além das integrações parciais PNCP e Compras.gov.br, o aplicativo PubBid tem consultas limitadas ao PNCP PCA e a planos de transferências especiais no Transferegov. Elas se restringem a CNPJs de compradores/beneficiários encontrados no acervo PNCP local ou informados pela CLI. Esses planos são registros de planejamento/financiamento, separados de licitações; não indicam cobertura nacional. O enriquecimento CGU é opcional e exige `PUBBID_CGU_API_KEY`. BPS, propostas FNS/InvestSUS e outros módulos Transferegov não estão conectados.


A consultoria mantém a página `/consultoria/` e o logo original Healthcare.tec. Os recursos legados do Fluid continuam preservados.

Veja [deploy/README.md](deploy/README.md) para implantação e reversão.
