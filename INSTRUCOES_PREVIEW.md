# Instruções para Visualizar o Preview com Imagens

**Data:** 4 de novembro de 2025  
**Branch:** feature/add-images  
**Objetivo:** Testar a versão do site com imagens sem afetar a produção

## 🎯 O que foi feito

Criamos uma versão alternativa do site Healthcare.tec em um branch separado (`feature/add-images`) com as seguintes alterações:

### ✨ Imagens Adicionadas:

**1. Hero Section (Topo do Site)**
- Imagem de fundo: Profissionais de saúde usando tecnologia (modern-tech.jpg)
- Overlay com gradiente azul-verde mantido
- Efeito visual profissional e moderno

**2. Seção de Serviços (4 Cards)**
Cada card agora tem uma imagem ilustrativa:

- **Gestão de Projetos Hospitalares** → Ilustração de project management
- **Redesenho de Processos e Fluxos** → Equipe colaborando
- **Preparação para Acreditação** → Equipe médica com paciente
- **Planejamento Financeiro e de Risco** → Profissionais com tecnologia

**Design dos Cards:**
- Imagem no topo (altura 192px)
- Gradiente escuro sobre a imagem
- Ícone circular branco sobreposto na parte inferior da imagem
- Conteúdo (título + descrição) abaixo
- Efeito hover com sombra aumentada

---

## 🔧 Como Configurar o Preview

Existem **2 opções** para visualizar o preview:

### **Opção 1: GitHub Pages Temporário** (Recomendado)

Esta opção permite visualizar o site em uma URL pública temporária.

**Passo a passo:**

1. **Acesse as configurações do GitHub Pages:**
   - Vá para: https://github.com/healthcare-tec/gitweb/settings/pages

2. **Altere temporariamente o branch:**
   - Em "Branch", selecione `feature/add-images` (em vez de `main`)
   - Mantenha a pasta como `/ (root)`
   - Clique em "Save"

3. **Aguarde o deploy (1-2 minutos)**
   - O GitHub Pages irá rebuildar o site
   - Uma mensagem aparecerá: "Your site is live at..."

4. **Acesse o preview:**
   - URL: https://healthcare-tec.github.io/gitweb/
   - **Nota:** O domínio healthcare.tec.br continuará apontando para a versão em produção (main)

5. **Teste e avalie:**
   - Navegue pelo site
   - Verifique as imagens no Hero
   - Verifique as imagens nos cards de serviços
   - Teste em diferentes dispositivos (mobile, tablet, desktop)

6. **Após testar:**
   - **Se gostar:** Faça merge do branch `feature/add-images` para `main` (instruções abaixo)
   - **Se não gostar:** Reverta o GitHub Pages para o branch `main` e delete o branch

---

### **Opção 2: Visualização Local** (Alternativa)

Se preferir testar localmente antes de publicar:

**Passo a passo:**

1. **Clone o repositório (se ainda não tiver):**
   ```bash
   git clone https://github.com/healthcare-tec/gitweb.git
   cd gitweb
   ```

2. **Checkout no branch de preview:**
   ```bash
   git checkout feature/add-images
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   - URL: http://localhost:5173

6. **Teste e avalie localmente**

---

## ✅ Como Aplicar as Mudanças em Produção

Se você gostar da versão com imagens e quiser publicá-la em produção (healthcare.tec.br):

### **Método 1: Merge via GitHub (Recomendado)**

1. **Acesse o repositório:**
   - https://github.com/healthcare-tec/gitweb

2. **Crie um Pull Request:**
   - Clique em "Pull requests" → "New pull request"
   - Base: `main` ← Compare: `feature/add-images`
   - Clique em "Create pull request"
   - Adicione título: "Adiciona imagens ao Hero e seções de serviços"
   - Clique em "Create pull request"

3. **Faça o Merge:**
   - Revise as alterações
   - Clique em "Merge pull request"
   - Clique em "Confirm merge"

4. **Aguarde o deploy:**
   - O GitHub Pages irá automaticamente rebuildar
   - Em 1-2 minutos, as alterações estarão em https://healthcare.tec.br

### **Método 2: Merge via Linha de Comando**

```bash
# Voltar para o branch main
git checkout main

# Fazer merge do branch com imagens
git merge feature/add-images

# Enviar para o GitHub
git push origin main
```

---

## ❌ Como Reverter (Se Não Gostar)

Se você testar e não gostar das imagens:

1. **Reverter o GitHub Pages:**
   - Vá para: https://github.com/healthcare-tec/gitweb/settings/pages
   - Altere o branch de volta para `main`
   - Clique em "Save"

2. **Deletar o branch (opcional):**
   ```bash
   git branch -d feature/add-images
   git push origin --delete feature/add-images
   ```

3. **Produção permanece intacta:**
   - O site em healthcare.tec.br não foi afetado
   - Tudo volta ao normal

---

## 📊 Comparação: Antes vs Depois

| Elemento | Versão Atual (main) | Versão com Imagens (feature/add-images) |
|----------|---------------------|------------------------------------------|
| **Hero** | Gradiente sólido | Imagem de fundo + gradiente overlay |
| **Cards de Serviços** | Apenas ícone + texto | Imagem + ícone + texto |
| **Visual** | Limpo e minimalista | Mais rico e ilustrativo |
| **Tamanho da Página** | ~200 KB | ~1.5 MB (devido às imagens) |

---

## 🎨 Detalhes Técnicos

### Imagens Utilizadas:

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| modern-tech.jpg | 1.2 MB | Hero + Planejamento Financeiro |
| project-management.jpg | 57 KB | Gestão de Projetos |
| team-collaboration.jpg | 101 KB | Redesenho de Processos |
| accreditation.jpg | 65 KB | Preparação para Acreditação |

### Alterações no Código:

**Arquivos modificados:**
- `src/components/Hero.jsx` - Mudou imagem de fundo
- `src/components/Services.jsx` - Adicionou imagens aos cards
- `src/lib/utils/images.js` - Atualizou caminhos das imagens

**Estrutura dos Cards:**
```jsx
<Card>
  <div className="relative h-48">
    <img src={service.image} />
    <div className="gradient-overlay" />
    <div className="icon-badge">{icon}</div>
  </div>
  <div className="content">
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </div>
</Card>
```

---

## 📝 Observações

1. **Performance:** As imagens foram otimizadas, mas a página ficou um pouco mais pesada. Considere usar lazy loading se necessário.

2. **Responsividade:** As imagens se adaptam automaticamente a diferentes tamanhos de tela.

3. **Acessibilidade:** Todas as imagens têm atributos `alt` apropriados.

4. **SEO:** As imagens melhoram o visual mas não afetam o SEO negativamente.

5. **Backup:** A versão atual (sem imagens) está segura no branch `main` e pode ser restaurada a qualquer momento.

---

## 🔗 Links Úteis

- **Repositório:** https://github.com/healthcare-tec/gitweb
- **Branch com imagens:** https://github.com/healthcare-tec/gitweb/tree/feature/add-images
- **Configurações GitHub Pages:** https://github.com/healthcare-tec/gitweb/settings/pages
- **Site em produção:** https://healthcare.tec.br

---

## 💡 Próximos Passos Sugeridos

Se você decidir manter as imagens:

1. ✅ Fazer merge para produção
2. 🎨 Considerar adicionar mais imagens em outras seções (Sobre, Diferenciais)
3. ⚡ Implementar lazy loading para melhorar performance
4. 📱 Testar em diferentes dispositivos e navegadores
5. 🔍 Monitorar métricas de engajamento (tempo na página, taxa de conversão)

---

**Dúvidas?** Entre em contato ou consulte a documentação do GitHub Pages.

**Versão do Preview:** feature/add-images  
**Commit:** e33be26f  
**Data:** 4 de novembro de 2025

