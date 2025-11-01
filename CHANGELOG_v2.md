# Changelog - Versão 2.0

**Data:** 31 de outubro de 2025  
**Commit:** 8708d3e1  
**URL:** https://healthcare.tec.br

## 🎯 Resumo das Alterações

Esta versão corrige problemas críticos de visualização e atualiza informações de contato do site Healthcare.tec.

## ✅ Alterações Implementadas

### 1. Correção do Favicon

**Problema:** O favicon não estava aparecendo na aba do navegador após a migração para o domínio customizado.

**Solução:**
- Substituído o favicon antigo pelo logo correto (lâmpada com coração)
- Convertido o PNG para formato ICO otimizado (16x16, 32x32, 48x48 pixels)
- Atualizado o caminho no `index.html` de `/gitweb/favicon.ico` para `/favicon.ico`
- Arquivo salvo em: `/public/favicon.ico` e copiado para a raiz no build

**Resultado:** Favicon agora aparece corretamente na aba do navegador.

### 2. Correção do Logo no Header

**Problema:** O logo no header não estava carregando após a mudança de base path.

**Solução:**
- Atualizado o caminho no componente `Header.jsx` de `/gitweb/logo-icon.png` para `/logo-icon.png`
- Logo mantém o design com fundo branco circular
- Tamanho: 8x8 (w-8 h-8) dentro de um container de 12x12 (w-12 h-12)

**Resultado:** Logo aparece corretamente no header com fundo branco circular.

### 3. Atualização do E-mail de Contato

**Problema:** E-mail antigo `cadastro@outlook.com` precisava ser substituído pelo e-mail corporativo.

**Solução:**
- Atualizado em `ContactForm.jsx`: `contato@healthcare.tec.br`
- Atualizado em `Footer.jsx`: `contato@healthcare.tec.br`
- Links `mailto:` atualizados em ambos os componentes

**Resultado:** Todos os links de e-mail agora direcionam para `contato@healthcare.tec.br`.

### 4. Correção do Template HTML

**Problema:** O `index.html` estava sendo sobrescrito a cada build com caminhos incorretos.

**Solução:**
- Criado template HTML corrigido (`index.html.template`)
- Caminho do favicon atualizado para `/favicon.ico`
- Linguagem do HTML alterada para `pt-BR`
- Template será usado como base para futuros builds

**Arquivos Modificados:**
```
/home/ubuntu/gitweb/
├── index.html (template corrigido)
├── index.html.template (backup do template)
├── public/favicon.ico (favicon otimizado)
├── public/logo-icon.png (logo atualizado)
├── src/components/Header.jsx (caminho do logo corrigido)
├── src/components/ContactForm.jsx (e-mail atualizado)
└── src/components/Footer.jsx (e-mail atualizado)
```

## 🔧 Detalhes Técnicos

### Favicon
- **Formato:** ICO multi-resolução (16x16, 32x32, 48x48)
- **Tamanho:** 15 KB
- **Caminho:** `/favicon.ico`
- **Origem:** Convertido de `/upload/721C2491-E294-46EE-96A8-0325719CDFFE.png`

### Logo no Header
- **Formato:** PNG
- **Tamanho:** 1.5 MB (original)
- **Caminho:** `/logo-icon.png`
- **Design:** Lâmpada com coração, fundo branco circular

### E-mail de Contato
- **Antigo:** cadastro@outlook.com
- **Novo:** contato@healthcare.tec.br
- **Locais atualizados:** 
  - Formulário de contato (ContactForm.jsx)
  - Rodapé (Footer.jsx)
  - Links mailto em ambos os componentes

## 🌐 Configuração do Domínio

- **Domínio:** healthcare.tec.br
- **Base Path:** `/` (raiz)
- **CNAME:** Configurado em `/CNAME` e `/public/CNAME`
- **GitHub Pages:** Servindo da raiz do repositório

## 📋 Funcionalidades Mantidas

✅ Formulário de contato com Web3Forms (Access Key: f1821e05-9c1c-4737-ae59-6bf1e8802946)  
✅ Link do WhatsApp (+55 12 996202525)  
✅ Seção "Dores do Cliente"  
✅ Seção "Rede de Especialistas"  
✅ Design responsivo  
✅ Todas as seções funcionais  

## 🚀 Deploy

- **Branch:** main
- **Commit:** 8708d3e1
- **Mensagem:** "fix: Corrige favicon, logo no header e atualiza e-mail para contato@healthcare.tec.br"
- **Status:** ✅ Deployado com sucesso

## 🔍 Verificação

**Testes realizados:**
- ✅ Favicon aparece na aba do navegador
- ✅ Logo aparece no header com fundo branco circular
- ✅ E-mail atualizado para contato@healthcare.tec.br no formulário
- ✅ E-mail atualizado para contato@healthcare.tec.br no rodapé
- ✅ Site carregando corretamente em https://healthcare.tec.br
- ✅ Todas as seções funcionando
- ✅ Formulário de contato operacional
- ✅ Link do WhatsApp funcionando

## 📝 Notas

- O favicon pode levar alguns minutos para aparecer devido ao cache do navegador
- Para forçar a atualização do favicon, use Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)
- O e-mail antigo (cadastro@outlook.com) não está mais presente no código
- O Web3Forms continua enviando para cadastro@outlook.com (configurado na conta Web3Forms)
- Se desejar alterar o destino dos e-mails do formulário, é necessário atualizar nas configurações da conta Web3Forms

## 🔄 Próximas Versões

Sugestões para melhorias futuras:
- [ ] Otimizar tamanho do logo-icon.png (atualmente 1.5 MB)
- [ ] Adicionar meta tags Open Graph para compartilhamento em redes sociais
- [ ] Implementar Google Analytics ou similar
- [ ] Adicionar certificado SSL personalizado (se necessário)
- [ ] Configurar redirecionamento de www para domínio raiz (ou vice-versa)

---

**Versão anterior:** v1.0 (commit: 93dc5856)  
**Versão atual:** v2.0 (commit: 8708d3e1)

