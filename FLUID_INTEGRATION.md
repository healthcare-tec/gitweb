# Integração do Fluid no site

Esta branch prepara a entrada do Fluid no site público sem expor credenciais
da API.

## O que foi adicionado

- uma seção pública de apresentação em `src/components/FluidCTA.jsx`;
- um ponto de entrada de frontend em `src/lib/fluidApi.js`;
- chamadas futuras usando o caminho relativo `/api/fluid`;
- nenhum token ou segredo no código do site.

A seção pública apresenta o serviço e direciona o visitante para solicitar
acesso. A aplicação de simulação deverá ficar em uma área protegida, não na
landing page pública.

## Fluxo esperado

```text
site público
  -> área Fluid autenticada
  -> /api/fluid/* no mesmo domínio
  -> Cloudflare Worker
  -> Cloudflare Access + Tunnel
  -> API Fluid /api/v1/*
```

O Worker deve substituir as credenciais do navegador por secrets configurados
no Cloudflare. A API direta deve permanecer atrás do Access.

## Ainda pendente

- configurar a rota real do Worker no Cloudflare;
- decidir entre `app.healthcare.tec.br` e uma rota privada no domínio atual;
- configurar autenticação e autorização por organização/projeto;
- criar a tela autenticada de projeto, modelo, avaliação e resultado;
- testar o build e a navegação no domínio publicado.
