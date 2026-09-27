# Publicação

## Site

Fluxo existente: `main` → GitHub Actions (`Deploy GitHub Pages`) → `gh-pages` → `healthcare.tec.br`.
O build mantém o arquivo `CNAME` de `public/` e emite `/acesso/index.html`, `/consultoria/index.html` e `/404.html`.

## Aplicações e túnel

O túnel compartilhado Fluid utiliza a rede do host e preserva sua rota original:

| Hostname | Origem | Estado em 2026-09-27 |
| --- | --- | --- |
| `fluid-api.healthcare.tec.br` | `http://localhost:3039` | PubBid: HTML identificado e pesquisa com `refresh=0` validados, HTTP 200 |
| `pubbid.healthcare.tec.br` | `http://localhost:3039` | Ingress configurado; DNS pendente |
| `eqptec.healthcare.tec.br` | `http://localhost:8501` | Ingress configurado; DNS pendente; saúde local Streamlit HTTP 200 |

O token aceita edição do túnel, mas a criação de DNS retorna HTTP 403 / código 10000. É necessário acesso `Zone → DNS → Edit` para a zona. Criar os dois CNAME para `f0740511-0cf3-47de-a5f3-7d722b1b97ea.cfargotunnel.com`, com proxy ativo. Validar a interface e a pesquisa do PubBid e a sessão WebSocket do EqptEC antes de atualizar as URLs no site.

`VITE_PUBBID_URL` usa o hostname legado verificado como padrão. `VITE_EQPTEC_URL` fica vazio até a validação. Valores `VITE_*` são incorporados ao build; atualizar as variáveis requer republicar o site.

Os processos PubBid e EqptEC estão em uma sessão do usuário. O serviço systemd PubBid estava falhando por porta ocupada e foi parado para interromper o loop, preservando o processo ativo. A migração para serviços persistentes ainda precisa ser concluída, sem interromper coletas ou sessões em uso.

A API é anunciada mediante assinatura. A implementação de assinatura, autenticação e limites de uso é uma etapa separada; os endpoints internos continuam atendendo a interface.

O Worker preparado para `/pubbid/` e `/api/pubbid/*` não foi publicado por falta de permissão. Os acessos por subdomínio usam diretamente o túnel e não dependem desse Worker.

## Verificação

Validar `/`, `/acesso/` e `/consultoria/` em desktop e celular, incluindo abertura direta/reload. Verificar títulos, canonical, menu móvel e links. As fontes e os estados de recursos devem continuar coerentes com o piloto.

## Reversão

Reverter o commit de atualização em `main` e deixar o workflow republicar. A alteração do site não remove os arquivos nem o Worker do Fluid. Alterações futuras de Tunnel/DNS devem registrar a configuração anterior antes da aplicação.
