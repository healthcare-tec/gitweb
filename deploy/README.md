# Publicação

## Site

Fluxo existente: `main` → GitHub Actions (`Deploy GitHub Pages`) → `gh-pages` → `healthcare.tec.br`.
O build mantém o arquivo `CNAME` de `public/` e emite `/acesso/index.html`, `/consultoria/index.html` e `/404.html`.

## Ambiente de pesquisa

- Origem indicada pelo proprietário: serviço PubBid remapeado para a porta 3039 do DV5.
- Acesso solicitado: público, sem login ou Cloudflare Access.
- Reutilizar o Worker `healthcare-fluid-proxy`, o túnel compartilhado e o hostname existente `fluid-api.healthcare.tec.br`. O PubBid ocupa temporariamente a porta 3039 enquanto o Fluid está parado. Interface em `/pubbid/` e API em `/api/pubbid/*`.
- Serviço PubBid deve ocupar temporariamente `127.0.0.1:3039`, gerenciado por systemd do usuário, reutilizando a porta deixada livre pelo Fluid.
- O túnel existente está configurado localmente em `/home/apple/services/cloudflare`; adicionar nele o hostname PubBid sem alterar a rota do Fluid.
- A origem deve ser alcançável pelo processo do Tunnel. `127.0.0.1:3039` funciona porque o túnel existente usa `network_mode: host`.
- O frontend usa `/pubbid/` como destino público padrão. Validar o endpoint após adicionar o hostname.

## Verificação

Validar `/`, `/acesso/` e `/consultoria/` em desktop e celular, incluindo abertura direta/reload. Verificar títulos, canonical, menu móvel e links. As fontes e os estados de recursos devem continuar coerentes com o piloto.

## Reversão

Reverter o commit de atualização em `main` e deixar o workflow republicar. A alteração do site não remove os arquivos nem o Worker do Fluid. Alterações futuras de Tunnel/DNS devem registrar a configuração anterior antes da aplicação.
