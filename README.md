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

## Aplicação PubBid

A aplicação é um serviço separado, temporariamente remapeado para a porta 3039 do servidor DV5, a porta antes usada pelo Fluid. O proprietário definiu acesso público sem login. A página institucional não inclui a base SQLite. A tela `/acesso/` só anuncia o destino público quando `VITE_PUBBID_URL` estiver definido após a validação do fluxo completo.

Depois de publicar e verificar o endpoint HTTPS, definir `VITE_PUBBID_URL` no ambiente de build, ou em `.env.production` local. Essa variável contém apenas a URL pública. Enquanto estiver vazia, `/acesso/` mostra que o acesso está em preparação.

Tokens administrativos GitHub/Cloudflare não pertencem às variáveis `VITE_*` e não devem ser copiados para este projeto. As credenciais operacionais ficam fora do clone.

O site institucional usa a home para apresentar o piloto PubBid. O conteúdo Healthcare.tec anterior permanece em `/consultoria/`. O proxy preparado reutiliza os recursos da API anterior e publica a interface em `/pubbid/`.

Veja [deploy/README.md](deploy/README.md) para implantação e reversão.
