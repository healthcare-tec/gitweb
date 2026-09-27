# Publicação

## Site

Fluxo existente: `main` → GitHub Actions (`Deploy GitHub Pages`) → `gh-pages` → `healthcare.tec.br`.
O build mantém o arquivo `CNAME` de `public/` e emite `/acesso/index.html`, `/consultoria/index.html` e `/404.html`.

## Ambiente de pesquisa

- Origem indicada pelo proprietário: serviço PubBid na porta 3061 do DV5.
- Acesso solicitado: público, sem login ou Cloudflare Access.
- Hostname proposto: `pubbid.healthcare.tec.br`.
- Implantação pendente: iniciar/confirmar serviço, configurar Tunnel/DNS e verificar a página e a API pela URL pública.
- Preferir reaproveitar o conector Tunnel da conta após inspecionar sua configuração; preservar as outras rotas existentes.
- A origem deve ser alcançável pelo processo do Tunnel. `127.0.0.1:3061` só funciona se ambos estiverem no mesmo namespace de rede.
- Não ativar o link público até a verificação do endpoint. Depois, configurar `VITE_PUBBID_URL` no build e republicar o site.

## Verificação

Validar `/`, `/acesso/` e `/consultoria/` em desktop e celular, incluindo abertura direta/reload. Verificar títulos, canonical, menu móvel e links. As fontes e os estados de recursos devem continuar coerentes com o piloto.

## Reversão

Reverter o commit de atualização em `main` e deixar o workflow republicar. A alteração do site não remove os arquivos nem o Worker do Fluid. Alterações futuras de Tunnel/DNS devem registrar a configuração anterior antes da aplicação.
