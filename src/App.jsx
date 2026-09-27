import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Search, Layers, ExternalLink, Menu, X, Check, Database } from 'lucide-react';
import Hero from './components/Hero';
import Services from './components/Services';
import PainPoints from './components/PainPoints';
import Differentials from './components/Differentials';
import About from './components/About';
import ContactForm from './components/ContactForm';
import './index.css';
import './pubbid.css';

const path = window.location.pathname.replace(/\/+$/, '').replace(/\/index\.html$/, '') || '/';
const appUrl = import.meta.env.VITE_PUBBID_URL || 'https://fluid-api.healthcare.tec.br/';
const contact = 'mailto:contato@healthcare.tec.br';

function Header() {
  const [open, setOpen] = useState(false);
  const consultancyPage = path === '/consultoria';
  return <header className="site-header"><div className="site-wrap header-inner">
    <a className={consultancyPage ? 'brand healthcare-brand' : 'brand'} href="/" aria-label={consultancyPage ? 'Healthcare.tec — início' : 'PubBid — início'}>{consultancyPage ? <><img src="/logo-icon.png" alt="" /><span>Healthcare.tec<small>Engineering Health</small></span></> : <><span className="brand-symbol"><Layers size={22} /></span><span>Pub<span className="brand-light">Bid</span><small>Apoio ao Planejamento de Incorporação</small></span></>}</a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Navegação principal" onClick={() => setOpen(false)} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('.menu-toggle').focus(); } }}>
      <a href="/">O PubBid</a><a href="/#como-funciona">Como apoia o planejamento</a><a href="/#recursos">Recursos</a><a href="/#fontes">Fontes e limites</a><a href="/consultoria/" aria-current={consultancyPage ? 'page' : undefined}>Consultoria</a><a className="button button-small" href="/acesso/" aria-current={path === '/acesso' ? 'page' : undefined}>Acessar o PubBid <ArrowUpRight size={16} /></a>
    </nav>
  </div></header>;
}

function ProductPreview() {
  return <figure className="product-preview" aria-label="Ilustração do fluxo de pesquisa, sem registros reais">
    <div className="preview-top"><span><Layers size={16} /> Ambiente de pesquisa</span><span className="demo-tag">Ilustração</span></div>
    <div className="preview-body"><div className="preview-label">EQUIPAMENTO DE INTERESSE</div><div className="preview-search"><Search size={19} /><span>Tomógrafo</span></div>
      <div className="preview-tabs"><span>Processos</span><span>Itens e resultados</span><span>Referências</span></div>
      <div className="preview-record"><div className="record-icon"><Database size={20} /></div><div><strong>Referências para revisar</strong><p>Descrição · valor · órgão · fonte</p></div></div>
      <div className="preview-fields"><div><small>PROCESSO</small><span>Prazo registrado</span></div><div><small>EQUIPAMENTO</small><span>Descrição do item</span></div><div><small>VALORES</small><span>Estimado e homologado</span></div><div><small>CONFERÊNCIA</small><span>Fonte original <ExternalLink size={12} /></span></div></div>
      <div className="preview-note"><Check size={16} /> Referências para análise da equipe.</div>
    </div><figcaption>Ilustração do fluxo. Não exibe dados ou processos reais.</figcaption>
  </figure>;
}

function Home() {
  return <>
    <section className="product-hero"><div className="site-wrap hero-grid"><div>
      <p className="eyebrow"><span className="status-dot" /> PESQUISA PARA PLANEJAMENTO EM SAÚDE</p>
      <h1>Informações de aquisições para planejar a incorporação de tecnologias em saúde.</h1>
      <p className="hero-description">Pesquise compras públicas de equipamentos, examine descrições, preços e fornecedores disponíveis e leve referências com fonte para sua análise de incorporação. O PubBid reúne os registros encontrados e mostra os limites da pesquisa.</p>
      <div className="action-row"><a className="button" href="/acesso/">Acessar o PubBid <ArrowUpRight size={18} /></a><a className="text-link" href="#como-funciona">Como apoia o planejamento <ArrowRight size={17} /></a></div>
      <p className="hero-footnote">Piloto para pesquisa de equipamentos médico-assistenciais.</p>
    </div><ProductPreview /></div></section>
    <section className="value-strip" aria-label="Como o PubBid apoia a pesquisa"><div className="site-wrap value-grid">{[
      [Search, 'Pesquise o equipamento', 'Encontre registros por nomes e sinônimos do catálogo.'],
      [Layers, 'Reúna referências', 'Consulte descrições, valores e fornecedores quando publicados e coletados.'],
      [ExternalLink, 'Fundamente sua análise', 'Examine a amostra e confira as fontes antes de usar os dados no planejamento.'],
    ].map(([Icon, title, description]) => <div key={title}><Icon size={23} /><div><h2>{title}</h2><p>{description}</p></div></div>)}</div></section>
    <section className="site-section site-wrap problem-grid"><p className="eyebrow">PESQUISA PARA AQUISIÇÃO</p><div><h2>Planejar uma aquisição exige conhecer o equipamento e as referências disponíveis.</h2><p>Descrições diferentes, dados incompletos e valores com escopos distintos dificultam a pesquisa. O PubBid organiza registros de compras públicas para ajudar sua equipe a reunir referências e identificar o que precisa de revisão técnica.</p></div></section>
    <section id="como-funciona" className="workflow-section"><div className="site-wrap site-section"><div className="section-heading"><div><p className="eyebrow">COMO APOIA O PLANEJAMENTO</p><h2>Da pesquisa à análise da equipe.</h2></div><p>O PubBid organiza evidências. A avaliação da necessidade e da viabilidade continua com a equipe responsável.</p></div><div className="steps-grid">{[
      ['01', 'Defina o equipamento de interesse', 'Pesquise pelo nome e escolha a consulta recente ou histórica.'],
      ['02', 'Examine a evidência disponível', 'Leia descrições, unidades, quantidades, valores e resultados. O filtro rigoroso ajuda a reduzir candidatos incertos.'],
      ['03', 'Confira e leve as referências para a análise', 'Abra a fonte original e avalie a pertinência para a necessidade do serviço e o escopo da aquisição.'],
    ].map(([n, title, description]) => <article key={n}><span className="step-number">{n}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <section id="recursos" className="site-section site-wrap"><p className="eyebrow">RECURSOS DO PILOTO</p><h2>Explore registros e veja o que ainda precisa de revisão.</h2><p className="section-intro">A quantidade e a qualidade dos dados variam por pesquisa. “Disponível” descreve uma função implementada, não cobertura completa.</p><div className="features-grid">{[
      ['Pesquisa de equipamentos', 'Busca por nomes e sinônimos do catálogo. A associação é determinística e pode exigir revisão.'],
      ['Histórico de aquisições', 'Default consulta os últimos três meses e processos com prazo futuro no acervo. Discovery consulta até dois anos de histórico local.'],
      ['Referências de preços', 'Valores estimados e homologados aparecem separados quando coletados. Comparações dependem de unidade, especificação e escopo.'],
      ['Órgãos e fornecedores', 'A leitura resume a amostra exibida. Fornecedor, marca, modelo ou resultado podem não estar disponíveis.'],
      ['Filtro e leitura do conjunto', 'O filtro rigoroso pode ocultar candidatos sem evidência suficiente; a síntese acompanha os filtros e não representa todo o mercado.'],
      ['Fontes e cobertura', 'Links, datas e estados da coleta ajudam a conferir a evidência. A pesquisa pode estar parcial ou desatualizada.'],
    ].map(([title, description]) => <article key={title}><span className="feature-status">Disponível no piloto</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="audience-section"><div className="site-wrap site-section audience-grid"><div><p className="eyebrow">PARA EQUIPES DE SAÚDE</p><h2>Referências para quem planeja a incorporação de equipamentos.</h2></div><p>Gestores, engenharia clínica, equipes de planejamento e áreas de compras podem usar o PubBid para reunir referências de aquisições e apoiar o trabalho de avaliação técnica e investimento.</p></div></section>
    <section id="fontes" className="sources-section"><div className="site-wrap site-section sources-grid"><div><p className="eyebrow">FONTES E LIMITES</p><h2>Saiba de onde vêm os dados e o que ainda falta.</h2><p>O piloto consulta PNCP e Compras.gov.br, com cobertura parcial. Nem todo registro contém descrição detalhada, preço ou fornecedor. Confirme a pertinência dos itens, os valores e a situação do processo na fonte antes de usar a informação.</p><p>O catálogo de equipamentos é lido do EqptEC, baseado em SOMASUS/SIGEM. Essa origem do catálogo não significa que essas bases sejam fontes de editais.</p></div><div className="sources-card"><div><span><strong>PNCP</strong><small>Coleta parcial de publicações, atualizações e propostas abertas nas modalidades 4, 6, 8 e 9.</small></span><span className="source-tag">Parcial</span></div><div><span><strong>Compras.gov.br</strong><small>Referências de preços em painel separado; equivalências de catálogo ainda exigem validação.</small></span><span className="source-tag">Parcial</span></div><div><span><strong>PCA, BPS e fontes locais</strong><small>Integrações futuras. Não fazem parte da busca atual.</small></span><span className="source-tag planned">Planejado</span></div><p>O PubBid não avalia tecnologias clinicamente, recomenda equipamentos, calcula viabilidade ou substitui a análise da equipe. Não há garantia de cobertura completa, atualização contínua ou alertas.</p></div></div></section>
    <section className="site-wrap closing-section"><div><p className="eyebrow">PRÓXIMO PASSO</p><h2>Reúna referências para o próximo passo do seu planejamento.</h2><p>Consulte equipamentos e aquisições disponíveis e confira as fontes para fundamentar sua análise.</p></div><a className="button" href="/acesso/">Acessar o PubBid <ArrowUpRight size={18} /></a></section>
  </>;
}

function Access() {
  return <section className="site-wrap access-section"><a className="text-link" href="/">← Conhecer o PubBid</a><p className="eyebrow">AMBIENTE DE PESQUISA</p><h1>Acesso ao Planejamento de Incorporação Tecnológica.</h1><p className="section-intro">Entre no PubBid para pesquisar equipamentos e reunir referências de compras públicas que apoiem seu planejamento.</p><div className="access-grid"><article className="access-card"><span className="feature-status">{appUrl ? 'Ambiente disponível' : 'Interface em preparação'}</span><h2>Pesquisa de equipamentos</h2><p>{appUrl ? 'Abra o ambiente de pesquisa. Confira os registros e as fontes disponíveis antes de usar as informações no planejamento.' : 'O endereço público da interface será informado depois da validação do fluxo completo de pesquisa.'}</p><a className="button" href={appUrl || `${contact}?subject=Disponibilidade%20do%20PubBid`}>{appUrl ? 'Abrir o PubBid' : 'Consultar disponibilidade'} <ArrowUpRight size={17} /></a></article><article className="access-card api-card"><span className="feature-status">API pública · sem autenticação</span><h2>Teste os endpoints</h2><p>A API está disponível no hostname público do ambiente. As respostas variam conforme o acervo local, os filtros e a cobertura das fontes.</p><dl className="api-endpoints"><div><dt><code>GET https://fluid-api.healthcare.tec.br/api/search</code></dt><dd>Parâmetros: <code>q</code>, <code>mode</code> (default ou discovery), <code>quality</code> (broad ou strict) e <code>refresh</code>.</dd></div><div><dt><code>GET https://fluid-api.healthcare.tec.br/api/jobs?id=123</code></dt><dd>Consulta o estado de uma coleta pelo identificador retornado pela pesquisa ou atualização.</dd></div><div><dt><code>POST https://fluid-api.healthcare.tec.br/api/refresh</code></dt><dd>Inicia uma atualização. Corpo JSON: <code>{'{"q":"tomógrafo","mode":"default"}'}</code>.</dd></div></dl><p className="api-example">Exemplo: <a href="https://fluid-api.healthcare.tec.br/api/search?q=tomografo&mode=default&quality=strict&refresh=0"><code>https://fluid-api.healthcare.tec.br/api/search?q=tomografo&amp;mode=default&amp;quality=strict&amp;refresh=0</code></a></p><p className="api-note">A API é pública e não exige chave. As consultas podem iniciar coletas nas fontes quando a cobertura estiver ausente ou vencida. Clientes de navegador em outros domínios precisam usar o endereço com CORS quando ele estiver ativo; confirme os dados na fonte oficial.</p></article></div><p className="access-note">O piloto cobre equipamentos médico-assistenciais. <a href="/#fontes">Conheça as fontes e limites.</a></p></section>;
}

function Footer() {
  const consultancyPage = path === '/consultoria';
  return <footer className="site-footer"><div className="site-wrap"><div className="footer-grid"><div><a className={consultancyPage ? 'brand healthcare-brand footer-healthcare-brand' : 'brand'} href="/">{consultancyPage ? <><img src="/logo-icon.png" alt="" /><span>Healthcare.tec<small>Engineering Health</small></span></> : 'PubBid'}</a><p>{consultancyPage ? 'Consultoria em gestão e operações de saúde.' : <>Apoio à pesquisa para planejamento de incorporação.<br />Uma iniciativa Healthcare.tec.</>}</p></div><nav aria-label="Rodapé"><a href="/#como-funciona">Como apoia o planejamento</a><a href="/#recursos">Recursos</a><a href="/#fontes">Fontes e limites</a><a href="/consultoria/">Consultoria</a><a href="/acesso/">Acessar o PubBid</a></nav><div><span className="footer-label">VAMOS CONVERSAR</span><a href={contact}>contato@healthcare.tec.br <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><p>{consultancyPage ? 'Healthcare.tec — consultoria em gestão de projetos, processos e operações hospitalares.' : 'Ferramenta de apoio à pesquisa para o planejamento de incorporação. Cobertura parcial; confira as fontes e faça a avaliação com a equipe responsável.'}</p><span>© {new Date().getFullYear()} Healthcare.tec</span></div></div></footer>;
}

export default function App() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo">{path === '/' ? <Home /> : path === '/acesso' ? <Access /> : path === '/consultoria' ? <div className="consulting-content"><Hero /><PainPoints /><Services /><Differentials /><About /><ContactForm /></div> : <section className="site-wrap access-section"><h1>Página não encontrada.</h1><a className="button" href="/">Voltar ao PubBid</a></section>}</main><Footer /></>;
}
