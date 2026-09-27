# Proxy público do PubBid

Reaproveita o Worker existente `healthcare-fluid-proxy` e o túnel compartilhado
do projeto Fluid. O hostname original `fluid-api.healthcare.tec.br` será reutilizado
temporariamente pelo PubBid, apontando para `http://127.0.0.1:3039`, enquanto o
serviço Fluid estiver parado. O nome do diretório e do Worker foi mantido
para reutilizar os recursos do Fluid, conforme solicitado pelo proprietário.

## Rotas previstas no Worker

- `/pubbid/`: interface do serviço PubBid da porta 3039.
- `/api/pubbid/search`, `/api/pubbid/jobs`, `/api/pubbid/refresh`: alias público da API, com CORS aberto.
- A interface recebe os caminhos corretos das APIs e um link de volta ao site.
- Acesso público sem login, conforme instrução do proprietário.

O Worker anterior usa `/api/fluid/*`. A nova configuração substitui essa rota
pelas rotas PubBid. A aplicação Access existente em `/api/fluid` não é utilizada
pelas novas rotas; os segredos antigos não são enviados à aplicação PubBid.

## Pré-requisitos de implantação

1. Serviço PubBid ativo em `127.0.0.1:3039` no DV5.
2. Manter o túnel existente e o hostname `fluid-api.healthcare.tec.br`.
3. Quando o Fluid voltar, restaurar a origem original e mover o PubBid para um
   hostname próprio antes de executar os dois serviços simultaneamente.
4. O hostname direto já responde em `https://fluid-api.healthcare.tec.br/`; uma busca de produção com `refresh=0` retornou HTTP 200 e JSON válido.
5. Publicar este Worker e suas rotas. O token usado nesta sessão não tem acesso à criação de versões do Worker; ele precisa da permissão de edição de Workers Scripts e Routes.
6. Validar `/pubbid/` e `/api/pubbid/*` sem credenciais e sem redirecionamento ao Access depois da publicação.
7. Usar o hostname direto nos testes enquanto o alias no domínio principal não estiver implantado.

O workflow manual permanece em `deploy-fluid-proxy.yml`, agora chamado
`Deploy PubBid proxy`. Ele exige apenas `CLOUDFLARE_API_TOKEN` e
`CLOUDFLARE_ACCOUNT_ID` nos secrets do GitHub, e verifica o upstream antes de
publicar. O `.env` local não atualiza automaticamente os secrets do GitHub.

## Validação local

```sh
node --test cloudflare/fluid-proxy/src/index.test.js
```

O teste verifica transformação dos caminhos da interface, preservação de query
strings e corpo POST, tratamento de falhas e ausência de encaminhamento de
credenciais administrativas ou cookies.

## Estado

O túnel Fluid foi iniciado e sua configuração remota encaminha
`fluid-api.healthcare.tec.br` para `localhost:3039`. O PubBid está respondendo
no hostname direto; `GET /api/search` foi confirmado em produção. O Worker ainda
não foi publicado: a API Cloudflare recusou a criação da versão por falta de
acesso ao recurso. O código de proxy inclui CORS para o alias do domínio
principal, que ficará ativo depois de conceder permissão e publicar o Worker.
