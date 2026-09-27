# Publicação

## Site

Fluxo existente: `main` → GitHub Actions (`Deploy GitHub Pages`) → `gh-pages` → `healthcare.tec.br`.
O build mantém o arquivo `CNAME` de `public/` e emite `/acesso/index.html`, `/consultoria/index.html` e `/404.html`.

## Aplicações e túnel

O túnel compartilhado Fluid utiliza a rede do host. A entrada pública única é `https://fluid-api.healthcare.tec.br/`, encaminhada para `http://localhost:3039` (gateway PubBid). A raiz redireciona ao planejamento EqptEC em `/eqptec/`; a pesquisa PubBid atende `/pubbid/`.

Os ingress provisórios `pubbid.healthcare.tec.br` e `eqptec.healthcare.tec.br` foram removidos por decisão do proprietário. Nenhum registro DNS novo é necessário. O EqptEC continua internamente em 8501; a ponte `/eqptec/` já está ativa e foi validada com WebSocket.

`VITE_PUBBID_URL` usa `https://fluid-api.healthcare.tec.br/pubbid/` como padrão. A página de acesso apresenta o planejamento EqptEC como entrada principal e o PubBid como pesquisa complementar. Ambas as interfaces usam o único túnel da porta 3039.

`pubbid.service` e `eqptec.service` são unidades persistentes do usuário `apple`; ambas estavam ativas em 2026-09-27. Corrigir o site estático não exige reiniciar essas unidades nem alterar o túnel.

A API é anunciada mediante assinatura. A implementação de assinatura, autenticação e limites de uso é uma etapa separada; os endpoints internos continuam atendendo a interface.

O Worker preparado para aliases em `healthcare.tec.br/pubbid/` e `/api/pubbid/*` não foi publicado por falta de permissão. Os botões de `/acesso/` devem apontar diretamente para as URLs `fluid-api` verificadas e não dependem desse Worker.

## Verificação

Validar `/`, `/acesso/` e `/consultoria/` em desktop e celular, incluindo abertura direta/reload. Verificar títulos, canonical, menu móvel e links. As fontes e os estados de recursos devem continuar coerentes com o piloto.

## Reversão

Reverter o commit de atualização em `main` e deixar o workflow republicar. A alteração do site não remove os arquivos nem o Worker do Fluid. Alterações futuras de Tunnel/DNS devem registrar a configuração anterior antes da aplicação.
