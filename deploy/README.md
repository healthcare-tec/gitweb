# Publicação

## Site

Fluxo existente: `main` → GitHub Actions (`Deploy GitHub Pages`) → `gh-pages` → `healthcare.tec.br`.
O build mantém o arquivo `CNAME` de `public/` e emite `/acesso/index.html`, `/consultoria/index.html` e `/404.html`.

## Aplicações e túnel

O túnel compartilhado Fluid utiliza a rede do host. A entrada pública única é `https://fluid-api.healthcare.tec.br/`, encaminhada para `http://localhost:3039` (PubBid). Interface identificada e HTTP 200 verificados após simplificar as rotas.

Os ingress provisórios `pubbid.healthcare.tec.br` e `eqptec.healthcare.tec.br` foram removidos por decisão do proprietário. Nenhum registro DNS novo é necessário. O EqptEC continua internamente em 8501; o proprietário implementará a ponte entre os serviços. Não anunciar o acesso integrado como disponível antes de validar a rota e a sessão WebSocket correspondente.

`VITE_PUBBID_URL` usa `https://fluid-api.healthcare.tec.br/` como padrão. O site apresenta um único botão de acesso e informa que a integração EqptEC está em preparação.

Os processos PubBid e EqptEC estão em uma sessão do usuário. O serviço systemd PubBid estava falhando por porta ocupada e foi parado para interromper o loop, preservando o processo ativo. A migração para serviços persistentes ainda precisa ser concluída, sem interromper coletas ou sessões em uso.

A API é anunciada mediante assinatura. A implementação de assinatura, autenticação e limites de uso é uma etapa separada; os endpoints internos continuam atendendo a interface.

O Worker preparado para `/pubbid/` e `/api/pubbid/*` não foi publicado por falta de permissão. O acesso pelo hostname existente usa diretamente o túnel e não depende desse Worker.

## Verificação

Validar `/`, `/acesso/` e `/consultoria/` em desktop e celular, incluindo abertura direta/reload. Verificar títulos, canonical, menu móvel e links. As fontes e os estados de recursos devem continuar coerentes com o piloto.

## Reversão

Reverter o commit de atualização em `main` e deixar o workflow republicar. A alteração do site não remove os arquivos nem o Worker do Fluid. Alterações futuras de Tunnel/DNS devem registrar a configuração anterior antes da aplicação.
