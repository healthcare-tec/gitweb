# Healthcare.tec / PubBid

Site público em https://healthcare.tec.br, com React, Vite e Tailwind.

## Páginas

- `/`: apresentação do PubBid, fluxo de pesquisa, recursos do piloto e limites de cobertura.
- `/acesso/`: entrada do ambiente de pesquisa e informações sobre integração com a API.
- `/consultoria/`: conteúdo institucional e formulário de contato existentes.

O build gera documentos HTML próprios para as rotas secundárias e uma página 404. Isso permite abrir e recarregar essas páginas diretamente no GitHub Pages.

## Build

```sh
npm ci
npm run build
```

Saída: `dist/`. O workflow `deploy-pages.yml` publica essa saída na branch `gh-pages` quando há push em `main`. Ele também mantém os arquivos legados do Fluid, que deixou de ser destacado na navegação principal.

## Aplicação PubBid

A aplicação é um serviço separado, na porta 3061 do servidor DV5. O proprietário definiu acesso público sem login. A página institucional não inclui a base SQLite.

Depois de publicar e verificar o endpoint HTTPS, definir `VITE_PUBBID_URL` no ambiente de build, ou em `.env.production` local. Essa variável contém apenas a URL pública. Enquanto estiver vazia, `/acesso/` mostra que o acesso está em preparação.

Tokens administrativos GitHub/Cloudflare não pertencem às variáveis `VITE_*` e não devem ser copiados para este projeto. As credenciais operacionais ficam fora do clone.

Veja [deploy/README.md](deploy/README.md) para implantação e reversão.
