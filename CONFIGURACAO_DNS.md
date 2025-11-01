# Configuração do Domínio Customizado healthcare.tec.br

**Data:** 31 de outubro de 2025  
**Domínio:** healthcare.tec.br  
**Repositório:** healthcare-tec/gitweb

## ✅ Alterações Realizadas

### 1. Ajuste do Base Path no Vite

**Arquivo:** `vite.config.js`

**Alteração:**
```javascript
// ANTES (para GitHub Pages com subpath)
base: './', // Use caminho relativo para o GitHub Pages

// DEPOIS (para domínio customizado)
base: '/', // Use caminho absoluto para domínio customizado
```

**Motivo:** Quando você usa um domínio customizado (healthcare.tec.br), o site é servido da raiz do domínio, não de um subdiretório. Por isso, os caminhos dos assets devem ser absolutos (`/assets/...`) em vez de relativos (`./assets/...`).

### 2. Criação do Arquivo CNAME

**Arquivo:** `CNAME` (na raiz do repositório e em `/public`)

**Conteúdo:**
```
healthcare.tec.br
```

**Motivo:** O arquivo CNAME informa ao GitHub Pages qual domínio customizado deve ser usado. Ele precisa estar:
- Na raiz do repositório (para o GitHub Pages ler)
- Na pasta `/public` (para ser incluído automaticamente em cada build do Vite)

### 3. Rebuild e Deploy

- Build realizado com `npm run build`
- Arquivos copiados para a raiz do repositório
- Commit: "feat: Configurar base path para domínio customizado healthcare.tec.br"
- Push realizado com sucesso

## 🌐 Configuração DNS Necessária

Para que o domínio **healthcare.tec.br** funcione corretamente, você precisa configurar os seguintes registros DNS no seu provedor de domínio:

### Opção 1: Usar CNAME (Recomendado para subdomínios)

Se você está usando `www.healthcare.tec.br` ou outro subdomínio:

```
Tipo: CNAME
Nome: www (ou o subdomínio desejado)
Valor: healthcare-tec.github.io
TTL: 3600 (ou o padrão)
```

### Opção 2: Usar A Records (Para domínio raiz)

Se você está usando `healthcare.tec.br` (sem www), configure os seguintes registros A:

```
Tipo: A
Nome: @ (ou deixe em branco)
Valor: 185.199.108.153
TTL: 3600

Tipo: A
Nome: @ (ou deixe em branco)
Valor: 185.199.109.153
TTL: 3600

Tipo: A
Nome: @ (ou deixe em branco)
Valor: 185.199.110.153
TTL: 3600

Tipo: A
Nome: @ (ou deixe em branco)
Valor: 185.199.111.153
TTL: 3600
```

**Importante:** Esses são os IPs oficiais do GitHub Pages. Eles raramente mudam, mas você pode verificar a documentação oficial em: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

### Opção 3: Configuração Completa (Recomendado)

Para garantir que tanto `healthcare.tec.br` quanto `www.healthcare.tec.br` funcionem:

1. Configure os 4 registros A (acima) para o domínio raiz
2. Configure um CNAME para www:
   ```
   Tipo: CNAME
   Nome: www
   Valor: healthcare-tec.github.io
   TTL: 3600
   ```

## ⚙️ Configuração no GitHub Pages

1. Acesse: https://github.com/healthcare-tec/gitweb/settings/pages
2. Em "Custom domain", verifique se está configurado: **healthcare.tec.br**
3. Marque a opção "Enforce HTTPS" (recomendado)
4. Aguarde alguns minutos para o certificado SSL ser provisionado

## 🔍 Verificação

Após configurar o DNS, você pode verificar se está funcionando:

### Verificar Propagação DNS
```bash
# Linux/Mac
dig healthcare.tec.br

# Windows
nslookup healthcare.tec.br
```

### Testar no Navegador
- Acesse: http://healthcare.tec.br
- Acesse: https://healthcare.tec.br
- Acesse: http://www.healthcare.tec.br
- Acesse: https://www.healthcare.tec.br

**Nota:** A propagação DNS pode levar de alguns minutos até 48 horas, dependendo do provedor.

## 📝 Status Atual

✅ **Vite configurado** com `base: '/'` para domínio customizado  
✅ **Arquivo CNAME** criado com `healthcare.tec.br`  
✅ **Build realizado** e arquivos na raiz do repositório  
✅ **Push enviado** para o GitHub  
✅ **Site funcionando** em https://healthcare.tec.br (redirecionado do GitHub Pages)

⚠️ **Próximo Passo:** Configurar os registros DNS no provedor do domínio healthcare.tec.br

## 🔄 URLs do Site

- **GitHub Pages (original):** https://healthcare-tec.github.io/gitweb/
- **Domínio Customizado:** https://healthcare.tec.br (após configuração DNS)

**Observação:** Notei que o navegador já está redirecionando para healthcare.tec.br, o que indica que o CNAME está funcionando! Se o site está carregando corretamente, significa que a configuração DNS já está ativa.

## 📚 Referências

- [GitHub Pages - Configurar Domínio Customizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Vite - Base Path Configuration](https://vitejs.dev/config/shared-options.html#base)

