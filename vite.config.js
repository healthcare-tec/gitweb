import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

// Real directories support direct visits and reloads on GitHub Pages.
function staticPages() {
  return {
    name: 'static-pages',
    writeBundle() {
      const html = readFileSync('dist/index.html', 'utf8')
      for (const [route, title, description] of [
        ['acesso', 'Acesse o PubBid | Healthcare.tec', 'Consulte a disponibilidade do ambiente de pesquisa e da API PubBid.'],
        ['consultoria', 'Consultoria em operações hospitalares | Healthcare.tec', 'Conheça os serviços de gestão de projetos, processos e acreditação da Healthcare.tec.'],
      ]) {
        const page = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
          .replaceAll('https://healthcare.tec.br/"', `https://healthcare.tec.br/${route}/"`)
        mkdirSync(`dist/${route}`, { recursive: true })
        writeFileSync(`dist/${route}/index.html`, page)
      }
      writeFileSync('dist/404.html', html.replace(/<title>.*?<\/title>/, '<title>Página não encontrada | PubBid</title>').replace('<head>', '<head><meta name="robots" content="noindex" />').replace(/\s*<link rel="canonical"[^>]*>/, ''))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), staticPages()],
  base: '/', // Use caminho absoluto para domínio customizado
  resolve: {
    alias: {
      '@/lib': path.resolve(__dirname, './src/lib'), // Alias para o diretório lib dentro de src
      '@': path.resolve(__dirname, './src'), // Alias para o diretório src
    },
  },
})
