# Cloudflare Worker do Fluid

Este Worker faz a ponte entre o site público e a API Fluid sem expor tokens ao
navegador.

## Configuração obrigatória

1. No Cloudflare Tunnel, criar o hostname `fluid-api.healthcare.tec.br`
   apontando para `http://127.0.0.1:3039`.
2. Criar uma aplicação Access para esse hostname.
3. Criar uma política `Service Auth -> Service Token` para o Worker.
4. Criar o Service Token e guardar o Client ID e Client Secret.
5. No repositório GitHub, cadastrar os secrets da lista abaixo.
6. Executar manualmente a ação `Deploy Fluid proxy`.
7. Testar o hostname direto e a rota `/api/fluid/service-types`.

## Secrets do Worker

Os valores abaixo são secrets do Worker e não devem entrar no Git:

- `FLUID_API_TOKEN`: mesmo token configurado na API;
- `CF_ACCESS_CLIENT_ID`: Client ID do Service Token;
- `CF_ACCESS_CLIENT_SECRET`: Client Secret do Service Token.

O Wrangler valida que os três estejam configurados antes do deploy. Os secrets
são armazenados no Cloudflare, não no frontend nem em `wrangler.toml`.

## Secrets do GitHub Actions

No GitHub, em Settings > Secrets and variables > Actions, cadastrar:

- `CLOUDFLARE_API_TOKEN`: token de API do Cloudflare com permissão mínima
  para publicar o Worker;
- `CLOUDFLARE_ACCOUNT_ID`: ID da conta Cloudflare.

A ação está configurada como manual (`workflow_dispatch`) para impedir um
deploy acidental antes da configuração do Access.

## Segurança

A rota do Worker também precisa estar protegida pela autenticação da área
Fluid. A validação de origem reduz chamadas acidentais, mas não substitui
Cloudflare Access nem a autorização na API.

A API direta não deve ser publicada como acesso público. O Worker usa Service
Auth para alcançar o hostname protegido e injeta o token da API no servidor.
