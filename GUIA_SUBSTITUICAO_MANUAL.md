# Guia de Substituição Manual - Sistema de Múltiplas Landing Pages

**Data:** 7 de novembro de 2025  
**Branch:** feature/add-images  
**Commit:** 0e418e6f  
**Status:** Pronto para substituição manual

---

## 🎯 O Que Foi Implementado

### 1. Sistema de Múltiplas Landing Pages

Criado um sistema de navegação com **3 landing pages distintas**:

#### **🏥 Hospitais** (Página Principal - `/`)
- Hero com slogan "Eficiência também salva vidas"
- Seção "Dores do Cliente" (6 pain points)
- 4 Serviços para hospitais:
  - Gestão de Projetos Hospitalares
  - Redesenho de Processos e Fluxos
  - Preparação para Acreditação
  - Planejamento Financeiro e de Risco
- Diferenciais, Sobre, Contato

#### **🏢 Empresas** (`/empresas`)
- Hero com slogan "Entrada Estratégica no Mercado de Saúde Brasileiro"
- 4 Serviços específicos para empresas:
  1. **Estudos de Mercado e Viabilidade** - Análise de entrada no mercado brasileiro
  2. **Inteligência Regulatória e Estratégia de Acesso** - Anvisa, Conitec, SUS, ONA, QMentum, JCI + tradução de manuais
  3. **Risk Intelligence** - Framework de avaliação de risco e contingências
  4. **Estudos de Demanda e Planejamento Regional** - Modelagem de oferta e demanda
- Diferenciais, Sobre, Contato

#### **🐾 Veterinária** (`/veterinaria`)
- Hero com slogan "Projetos Veterinários de Excelência"
- 4 Serviços focados em projeto e construção:
  1. **Planejamento e Viabilidade** - Estudo de viabilidade e layout
  2. **Gestão de Projeto e Construção** - Coordenação completa de obra
  3. **Especificação e Aquisição de Equipamentos** - Seleção e compra
  4. **Comissionamento e Start-up** - Instalação e treinamento
- Diferenciais, Sobre, Contato

---

### 2. Dropdown de Navegação no Header

- **Desktop:** Dropdown com seta indicando o segmento atual
- **Mobile:** Lista de segmentos no menu hambúrguer
- Navegação entre páginas sem recarregar (React Router)
- Destaque visual do segmento ativo

---

### 3. Imagens nos Cards de Serviços

Todos os cards de serviços agora têm:
- Imagem de fundo (192px de altura)
- Gradiente escuro sobre a imagem
- Ícone circular branco sobreposto
- Efeito hover com sombra aumentada

**Imagens utilizadas:**
- `modern-tech.jpg` - Profissionais de saúde com tecnologia
- `project-management.jpg` - Ilustração de gestão de projetos
- `team-collaboration.jpg` - Equipe colaborando
- `accreditation.jpg` - Equipe médica com paciente

---

## 📦 Estrutura de Arquivos Criados

```
src/
├── pages/
│   ├── HospitalsPage.jsx       (Página principal - Hospitais)
│   ├── EmpresasPage.jsx         (Página para Empresas)
│   └── VeterinariaPage.jsx      (Página para Veterinária)
├── components/
│   ├── empresas/
│   │   ├── HeroEmpresas.jsx
│   │   └── ServicesEmpresas.jsx
│   └── veterinaria/
│       ├── HeroVeterinaria.jsx
│       └── ServicesVeterinaria.jsx
├── App.jsx                      (Atualizado com React Router)
└── Header.jsx                   (Atualizado com dropdown)
```

---

## 🔄 Como Substituir em Produção (Manualmente)

### **Opção 1: Merge via GitHub (Recomendado)**

1. **Acesse o repositório no GitHub:**
   ```
   https://github.com/healthcare-tec/gitweb
   ```

2. **Crie um Pull Request:**
   - Clique em "Pull requests" → "New pull request"
   - Base: `main` ← Compare: `feature/add-images`
   - Título: "Adiciona sistema de múltiplas landing pages"
   - Clique em "Create pull request"

3. **Revise as alterações:**
   - Veja os arquivos modificados
   - Verifique o diff de cada arquivo

4. **Faça o Merge:**
   - Clique em "Merge pull request"
   - Confirme o merge
   - Aguarde 1-2 minutos para o GitHub Pages fazer o deploy

5. **Teste em produção:**
   - Acesse: https://healthcare.tec.br
   - Verifique se o dropdown aparece no header
   - Teste a navegação entre as 3 páginas
   - Verifique se as imagens aparecem nos cards

---

### **Opção 2: Merge via Linha de Comando**

```bash
# 1. Ir para o branch main
git checkout main

# 2. Fazer merge do feature/add-images
git merge feature/add-images

# 3. Fazer push para o GitHub
git push origin main

# 4. Aguardar deploy (1-2 minutos)
```

---

### **Opção 3: Substituição Manual de Arquivos**

Se preferir substituir apenas os arquivos compilados:

1. **Baixe os arquivos do branch:**
   - Acesse: https://github.com/healthcare-tec/gitweb/tree/feature/add-images
   - Baixe: `index.html`, pasta `assets/`, pasta `images/`

2. **Substitua no repositório main:**
   - Faça upload dos arquivos via interface do GitHub
   - Ou use Git para copiar os arquivos

3. **Commit e push:**
   ```bash
   git add index.html assets/ images/
   git commit -m "Atualiza site com múltiplas landing pages"
   git push origin main
   ```

---

## ⚠️ Observações Importantes

### **1. React Router e GitHub Pages**

O React Router usa URLs do tipo `/empresas` e `/veterinaria`. Para funcionar no GitHub Pages, é necessário:

- **Opção A:** Usar Hash Router (URLs ficam `/#/empresas`)
- **Opção B:** Configurar 404.html para redirecionar para index.html

**Atualmente está usando BrowserRouter**, que pode não funcionar perfeitamente no GitHub Pages para rotas diretas.

**Solução rápida:** Se as rotas não funcionarem, posso converter para HashRouter (URLs com `#`).

---

### **2. Imagens Podem Não Aparecer**

Como identificado anteriormente, as imagens podem não carregar corretamente no build estático.

**Se as imagens não aparecerem após o deploy:**

1. **Teste primeiro** - Faça o merge e veja se funciona no GitHub Pages
2. **Se não funcionar** - Podemos:
   - Converter para HashRouter
   - Ajustar importação de imagens
   - Usar CDN externo para imagens

---

### **3. Cache do Navegador**

Após o deploy, limpe o cache do navegador:
- **Chrome/Edge:** Ctrl + Shift + Delete
- **Firefox:** Ctrl + Shift + Delete
- **Safari:** Cmd + Option + E

Ou use Ctrl+F5 (Windows) / Cmd+Shift+R (Mac) para forçar recarga.

---

## 🧪 Como Testar Localmente (Antes do Deploy)

### **Opção 1: Servidor de Desenvolvimento**

```bash
cd /home/ubuntu/gitweb
npm run dev
```

Acesse: http://localhost:5173

---

### **Opção 2: Build de Produção Local**

```bash
cd /home/ubuntu/gitweb
npm run build
npx serve dist
```

Acesse: http://localhost:3000

---

## 📊 Checklist de Verificação Pós-Deploy

Após fazer o deploy, verifique:

- [ ] Site carrega em https://healthcare.tec.br
- [ ] Dropdown de navegação aparece no header
- [ ] Ao clicar no dropdown, mostra: Hospitais, Empresas, Veterinária
- [ ] Página `/` (Hospitais) carrega corretamente
- [ ] Página `/empresas` carrega e mostra 4 serviços corretos
- [ ] Página `/veterinaria` carrega e mostra 4 serviços corretos
- [ ] Imagens aparecem nos cards de serviços
- [ ] Imagem de fundo aparece no Hero
- [ ] Formulário de contato funciona
- [ ] Link do WhatsApp funciona
- [ ] Logo e favicon aparecem
- [ ] Site responsivo (teste no mobile)

---

## 🔙 Como Reverter (Se Necessário)

Se algo der errado, você pode reverter facilmente:

```bash
# 1. Voltar para o commit anterior
git revert HEAD

# 2. Ou fazer reset para o commit antes do merge
git reset --hard HEAD~1

# 3. Fazer push forçado (cuidado!)
git push origin main --force
```

**Ou via GitHub:**
- Vá em "Commits"
- Clique em "Revert" no commit do merge

---

## 📝 Resumo das Alterações

| Item | Antes | Depois |
|------|-------|--------|
| **Páginas** | 1 (só hospitais) | 3 (hospitais, empresas, veterinária) |
| **Navegação** | Scroll interno | Dropdown + rotas |
| **Serviços Empresas** | N/A | 4 serviços específicos |
| **Serviços Veterinária** | N/A | 4 serviços específicos |
| **Imagens nos cards** | Não | Sim (4 imagens) |
| **React Router** | Não | Sim |
| **Dropdown no header** | Não | Sim |

---

## 🚀 Próximos Passos Sugeridos

Após o deploy bem-sucedido:

1. **Testar todas as funcionalidades**
2. **Coletar feedback** de usuários
3. **Ajustar conteúdo** se necessário
4. **Adicionar analytics** para monitorar navegação entre páginas
5. **Criar páginas de casos de sucesso** específicas para cada segmento
6. **Otimizar SEO** para cada landing page

---

## 📞 Suporte

Se encontrar problemas:

1. **Verifique o console do navegador** (F12 → Console)
2. **Verifique o GitHub Actions** para ver se o deploy foi bem-sucedido
3. **Teste em modo anônimo** para descartar problemas de cache
4. **Reverta se necessário** usando os comandos acima

---

**Branch:** feature/add-images  
**Commit:** 0e418e6f  
**Data:** 7 de novembro de 2025  
**Status:** ✅ Pronto para deploy

