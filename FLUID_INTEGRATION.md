# Integração do Fluid no site

Esta branch prepara a entrada do Fluid no site público sem expor credenciais
da API.

## O que foi adicionado

- uma seção pública de apresentação em `src/components/FluidCTA.jsx`;
- um ponto de entrada de frontend em `src/lib/fluidApi.js`;
- chamadas futuras usando o caminho relativo `/api/fluid`;
- Worker em `cloudflare/fluid-proxy/`;
- configuração do Wrangler e workflow manual de deploy em
  `.github/workflows/deploy-fluid-proxy.yml`;
- nenhum token ou segredo no código do site.
- editor visual independente em `/fluid/`, com etapas arrastáveis, conexões,
  probabilidades, parâmetros, demanda e execução sem Excel;
- rascunho salvo no navegador e envio do contrato `process_map` para a API.

A seção pública apresenta o serviço e leva o usuário autenticado ao editor
visual protegido. A aplicação de simulação permanece separada da landing page.

## Fluxo esperado

```text
site público
  -> área Fluid autenticada
  -> /api/fluid/* no mesmo domínio
  -> Cloudflare Worker
  -> Cloudflare Access + Tunnel
  -> API Fluid /api/v1/*
```

O Worker substitui as credenciais do navegador por secrets configurados no
Cloudflare. A API direta deve permanecer atrás do Access.

## Ações complementares necessárias

### No Cloudflare

1. Criar o hostname `fluid-api.healthcare.tec.br` no Tunnel, apontando para
   `http://127.0.0.1:3039`.
2. Criar uma aplicação Access para esse hostname.
3. Adicionar uma política `Service Auth -> Service Token`.
4. Criar o Service Token e guardar o Client ID e Client Secret.
5. Garantir que o DNS de `healthcare.tec.br` esteja proxied pelo Cloudflare,
   para que a rota do Worker seja aplicada.
6. Após o primeiro deploy, adicionar no Worker os secrets
   `FLUID_API_TOKEN`, `CF_ACCESS_CLIENT_ID` e
   `CF_ACCESS_CLIENT_SECRET`.
7. Executar o deploy novamente e testar as rotas.

A primeira publicação pode responder 503 enquanto os secrets não estiverem
configurados; isso é esperado.

### No GitHub

Em **Settings > Secrets and variables > Actions**, cadastrar:

- `CLOUDFLARE_API_TOKEN`;
- `CLOUDFLARE_ACCOUNT_ID`.

Depois, em **Actions > Deploy Fluid proxy > Run workflow**, executar o deploy
duas vezes: uma para criar o Worker e outra após adicionar os secrets no
Worker.

### Testes complementares

- sem credenciais no hostname direto da API: deve ser bloqueado pelo Access;
- no Worker sem secrets: deve responder 503;
- no Worker com secrets e Access configurado: deve retornar a API;
- com origem diferente de `https://healthcare.tec.br`: deve ser bloqueado;
- sem autorização de usuário na área Fluid: deve ser bloqueado antes da API.

## Ainda pendente

- definir se a área de usuário será `app.healthcare.tec.br` ou uma rota
  privada no domínio atual;
- configurar autenticação e autorização por organização/projeto;
- criar a tela autenticada de projeto, modelo, avaliação e resultado;
- testar o build, o Access, o Worker e a API em sequência;
- só então publicar/mesclar a PR.
