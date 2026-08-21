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
6. Executar manualmente a ação `Deploy Fluid proxy` uma primeira vez.
7. Configurar os três secrets do Worker no dashboard Cloudflare.
8. Executar a ação novamente para publicar o código com os secrets disponíveis.
9. Testar o hostname direto e a rota `/api/fluid/service-types`.

Durante a primeira publicação, o Worker pode responder 503 até que os secrets
sejam configurados. Isso é esperado e evita que o proxy opere sem autenticação.

## Secrets do Worker

Os valores abaixo são secrets do Worker e não devem entrar no Git:

- `FLUID_API_TOKEN`: mesmo token configurado na API;
- `CF_ACCESS_CLIENT_ID`: Client ID do Service Token;
- `CF_ACCESS_CLIENT_SECRET`: Client Secret do Service Token.

No dashboard, abra **Workers & Pages > Worker > Settings > Variables and
Secrets**, adicione os três como tipo **Secret** e publique. Alternativamente,
use `wrangler secret put` localmente. Os valores não ficam no frontend nem em
`wrangler.toml`.

## Secrets do GitHub Actions

No GitHub, em Settings > Secrets and variables > Actions, cadastrar:

- `CLOUDFLARE_API_TOKEN`: token de usuário do Cloudflare com escopo mínimo
  para **Workers Scripts: Write** e **Workers Routes: Write** na conta/zona
  deste projeto;
- `CLOUDFLARE_ACCOUNT_ID`: ID da conta Cloudflare.

A ação está configurada como manual (`workflow_dispatch`) para impedir um
deploy acidental antes da configuração do Access.

## Segurança

A rota do Worker também precisa estar protegida pela autenticação da área
Fluid. A validação de origem reduz chamadas acidentais, mas não substitui
Cloudflare Access nem a autorização na API.

A API direta não deve ser publicada como acesso público. O Worker usa Service
Auth para alcançar o hostname protegido e injeta o token da API no servidor.
