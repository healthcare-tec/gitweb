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
const appUrl = import.meta.env.VITE_PUBBID_URL || 'https://fluid-api.healthcare.tec.br/pubbid/';
const planningUrl = 'https://fluid-api.healthcare.tec.br/';
const contact = 'mailto:contato@healthcare.tec.br';

function Header() {
  const [open, setOpen] = useState(false);
  const consultancyPage = path === '/consultoria';
  return <header className="site-header"><div className="site-wrap header-inner">
    <a className={consultancyPage ? 'brand healthcare-brand' : 'brand'} href="/" aria-label={consultancyPage ? 'Healthcare.tec — início' : 'EqptEC — início'}>{consultancyPage ? <><img src="/logo-icon.png" alt="" /><span>Healthcare.tec<small>Engineering Health</small></span></> : <><span className="brand-symbol"><Layers size={22} /></span><span>EqptEC<small>Planejamento de Incorporação Tecnológica</small></span></>}</a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Navegação principal" onClick={() => setOpen(false)} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('.menu-toggle').focus(); } }}>
      <a href="/">O planejamento</a><a href="/#como-funciona">Como funciona</a><a href="/#recursos">Pesquisa PubBid</a><a href="/#fontes">Fontes e limites</a><a href="/consultoria/" aria-current={consultancyPage ? 'page' : undefined}>Consultoria</a><a className="button button-small" href="/acesso/" aria-current={path === '/acesso' ? 'page' : undefined}>Acessar o planejamento <ArrowUpRight size={16} /></a>
    </nav>
  </div></header>;
}

function ProductPreview() {
  return <figure className="product-preview" aria-label="Ilustração da pesquisa complementar PubBid, sem registros reais">
    <div className="preview-top"><span><Layers size={16} /> Pesquisa PubBid</span><span className="demo-tag">Ilustração</span></div>
    <div className="preview-body"><div className="preview-label">EQUIPAMENTO DE INTERESSE</div><div className="preview-search"><Search size={19} /><span>Tomógrafo</span></div>
      <div className="preview-tabs"><span>Processos</span><span>Itens e resultados</span><span>Referências</span></div>
      <div className="preview-record"><div className="record-icon"><Database size={20} /></div><div><strong>Referências para revisar</strong><p>Descrição · valor · órgão · fonte</p></div></div>
      <div className="preview-fields"><div><small>PROCESSO</small><span>Prazo registrado</span></div><div><small>EQUIPAMENTO</small><span>Descrição do item</span></div><div><small>VALORES</small><span>Estimado e homologado</span></div><div><small>CONFERÊNCIA</small><span>Fonte original <ExternalLink size={12} /></span></div></div>
      <div className="preview-note"><Check size={16} /> Referências para análise da equipe.</div>
    </div><figcaption>Ilustração da pesquisa PubBid. Não exibe dados ou processos reais.</figcaption>
  </figure>;
}

function Home() {
  return <>
    <section className="product-hero"><div className="site-wrap hero-grid"><div>
      <p className="eyebrow"><span className="status-dot" /> PLANEJAMENTO DE INCORPORAÇÃO TECNOLÓGICA COM EQPTEC</p>
      <h1>Planeje a incorporação de equipamentos com informações organizadas e fontes para conferência.</h1>
      <p className="hero-description">Acesse o EqptEC para organizar o planejamento de incorporação. Quando precisar de referências de compras públicas, consulte o PubBid para examinar descrições, preços, fornecedores disponíveis e fontes.</p>
      <div className="action-row"><a className="button" href="/acesso/">Acessar o planejamento <ArrowUpRight size={18} /></a><a className="text-link" href="#como-funciona">Como apoia o planejamento <ArrowRight size={17} /></a></div>
      <p className="hero-footnote">Planejamento e pesquisa de equipamentos médico-assistenciais.</p>
    </div><ProductPreview /></div></section>
    <section className="value-strip" aria-label="Planejamento e pesquisa de equipamentos"><div className="site-wrap value-grid">{[
      [Layers, 'Planeje a incorporação', 'Use o EqptEC para organizar o processo e os equipamentos.'],
      [Search, 'Reúna referências', 'Consulte no PubBid descrições, valores e fornecedores quando publicados e coletados.'],
      [ExternalLink, 'Confira as fontes', 'Valide os dados antes de levá-los à análise da equipe e ao relatório do planejamento.'],
    ].map(([Icon, title, description]) => <div key={title}><Icon size={23} /><div><h2>{title}</h2><p>{description}</p></div></div>)}</div></section>
    <section className="site-section site-wrap problem-grid"><p className="eyebrow">PLANEJAMENTO E PESQUISA</p><div><h2>Planejar uma aquisição exige conhecer o equipamento e as referências disponíveis.</h2><p>O EqptEC organiza o planejamento de incorporação. Descrições diferentes, dados incompletos e valores com escopos distintos dificultam a pesquisa de aquisição; o PubBid ajuda a reunir referências de compras públicas e identificar o que precisa de revisão técnica.</p></div></section>
    <section id="como-funciona" className="workflow-section"><div className="site-wrap site-section"><div className="section-heading"><div><p className="eyebrow">COMO FUNCIONA</p><h2>Do planejamento à análise da equipe.</h2></div><p>O EqptEC organiza o planejamento; o PubBid reúne referências de aquisição. A avaliação da necessidade e da viabilidade continua com a equipe responsável.</p></div><div className="steps-grid">{[
      ['01', 'Entre no EqptEC', 'Organize a necessidade, a unidade e o equipamento no processo de planejamento.'],
      ['02', 'Use o PubBid quando precisar de referências', 'Pesquise registros recentes ou históricos e examine descrições, unidades, quantidades e valores disponíveis.'],
      ['03', 'Confira e leve as referências para a análise', 'Abra a fonte original e avalie a pertinência para a necessidade do serviço e o escopo da aquisição.'],
    ].map(([n, title, description]) => <article key={n}><span className="step-number">{n}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <section id="recursos" className="site-section site-wrap"><p className="eyebrow">PESQUISA COMPLEMENTAR PUBBID</p><h2>Explore registros e veja o que ainda precisa de revisão.</h2><p className="section-intro">No EqptEC, use o catálogo, o processo de planejamento e o relatório PDF. Os recursos abaixo pertencem à pesquisa PubBid. A quantidade e a qualidade dos dados variam por consulta.</p><div className="features-grid">{[
      ['Pesquisa de equipamentos', 'Busca por nomes e sinônimos do catálogo. A associação é determinística e pode exigir revisão.'],
      ['Histórico de aquisições', 'Default consulta os últimos três meses e processos com prazo futuro no acervo. Discovery consulta até dois anos de histórico local.'],
      ['Referências de preços', 'Valores estimados e homologados aparecem separados quando coletados. Comparações dependem de unidade, especificação e escopo.'],
      ['Órgãos e fornecedores', 'A leitura resume a amostra exibida. Fornecedor, marca, modelo ou resultado podem não estar disponíveis.'],
      ['Filtro e leitura do conjunto', 'O filtro rigoroso pode ocultar candidatos sem evidência suficiente; a síntese acompanha os filtros e não representa todo o mercado.'],
      ['Fontes e cobertura', 'Links, datas e estados da coleta ajudam a conferir a evidência. A pesquisa pode estar parcial ou desatualizada.'],
    ].map(([title, description]) => <article key={title}><span className="feature-status">Disponível no piloto</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="audience-section"><div className="site-wrap site-section audience-grid"><div><p className="eyebrow">PARA EQUIPES DE SAÚDE</p><h2>Para equipes que planejam a incorporação de equipamentos em saúde.</h2></div><p>Gestores, engenharia clínica, áreas de planejamento e compras podem usar o EqptEC para organizar o processo de incorporação e o PubBid para reunir referências de aquisições que apoiem a avaliação técnica e o investimento.</p></div></section>
    <section id="fontes" className="sources-section"><div className="site-wrap site-section sources-grid"><div><p className="eyebrow">FONTES E LIMITES</p><h2>Saiba de onde vêm os dados e o que ainda falta.</h2><p>O piloto consulta PNCP e Compras.gov.br, com cobertura parcial. Nem todo registro contém descrição detalhada, preço ou fornecedor. Confirme a pertinência dos itens, os valores e a situação do processo na fonte antes de usar a informação.</p><p>O catálogo de equipamentos é lido do EqptEC, baseado em SOMASUS/SIGEM. Essa origem do catálogo não significa que essas bases sejam fontes de editais.</p></div><div className="sources-card"><div><span><strong>PNCP</strong><small>Coleta parcial de publicações, atualizações e propostas abertas nas modalidades 4, 6, 8 e 9.</small></span><span className="source-tag">Parcial</span></div><div><span><strong>Compras.gov.br</strong><small>Referências de preços em painel separado; equivalências de catálogo ainda exigem validação.</small></span><span className="source-tag">Parcial</span></div><div><span><strong>PCA, BPS e fontes locais</strong><small>Integrações futuras. Não fazem parte da busca atual.</small></span><span className="source-tag planned">Planejado</span></div><p>O PubBid não avalia tecnologias clinicamente, recomenda equipamentos, calcula viabilidade ou substitui a análise da equipe. Não há garantia de cobertura completa, atualização contínua ou alertas.</p></div></div></section>
    <section className="site-wrap closing-section"><div><p className="eyebrow">PRÓXIMO PASSO</p><h2>Organize o planejamento e reúna referências para a análise.</h2><p>Entre no EqptEC para planejar a incorporação. Use o PubBid para consultar aquisições disponíveis e confira as fontes antes de aproveitar qualquer referência.</p></div><a className="button" href="/acesso/">Acessar o planejamento <ArrowUpRight size={18} /></a></section>
  </>;
}

function Access() {
  return <section className="site-wrap access-section">
    <a className="text-link" href="/">← Conhecer o planejamento</a>
    <p className="eyebrow">PLANEJAMENTO DE INCORPORAÇÃO TECNOLÓGICA</p>
    <h1>Acessar o Planejamento de Incorporação Tecnológica.</h1>
    <p className="section-intro">Entre no EqptEC para planejar a incorporação de equipamentos. Use o PubBid como pesquisa complementar de compras públicas, preços e fontes.</p>
    <div className="access-grid">
      <article id="eqptec" className="access-card planning-access">
        <span className="feature-status">Aplicação principal</span>
        <h2>EqptEC · Planejamento de Incorporação Tecnológica</h2>
        <p>O EqptEC reúne o catálogo de equipamentos e recursos de Planejamento de Incorporação Tecnológica, incluindo relatórios PDF.</p>
        <a className="button" href={planningUrl}>Abrir o planejamento <ArrowUpRight size={17} /></a>
      </article>
      <article className="access-card">
        <span className="feature-status muted-status">Pesquisa complementar</span>
        <h2>PubBid · Pesquisa de compras públicas</h2>
        <p>Consulte processos, itens e resultados disponíveis. Use a pesquisa recente ou histórica e confira a cobertura e as fontes antes de levar as referências para sua análise.</p>
        <a className="button" href={appUrl}>Abrir o PubBid <ArrowUpRight size={17} /></a>
      </article>
      <article className="access-card api-card subscription-card">
        <span className="feature-status">Mediante assinatura</span>
        <h2>API do PubBid</h2>
        <p>O acesso à API para integrar os dados do PubBid a outros sistemas poderá ser contratado mediante assinatura do serviço. Entre em contato para conhecer as condições de acesso e os limites de uso.</p>
        <a className="text-link" href={`${contact}?subject=Assinatura%20da%20API%20PubBid`}>Consultar assinatura da API <ArrowUpRight size={17} /></a>
      </article>
    </div>
    <p className="access-note">O PubBid cobre parcialmente compras públicas de equipamentos médico-assistenciais. <a href="/#fontes">Conheça as fontes e limites.</a></p>
  </section>;
}

function Footer() {
  const consultancyPage = path === '/consultoria';
  return <footer className="site-footer"><div className="site-wrap"><div className="footer-grid"><div><a className={consultancyPage ? 'brand healthcare-brand footer-healthcare-brand' : 'brand'} href="/">{consultancyPage ? <><img src="/logo-icon.png" alt="" /><span>Healthcare.tec<small>Engineering Health</small></span></> : 'EqptEC'}</a><p>{consultancyPage ? 'Consultoria em gestão e operações de saúde.' : <>Planejamento de incorporação e pesquisa complementar de aquisições.<br />Uma iniciativa Healthcare.tec.</>}</p></div><nav aria-label="Rodapé"><a href="/#como-funciona">Como funciona</a><a href="/#recursos">Pesquisa PubBid</a><a href="/#fontes">Fontes e limites</a><a href="/consultoria/">Consultoria</a><a href="/acesso/">Acessar o planejamento</a><a href="/acesso/#eqptec">EqptEC</a></nav><div><span className="footer-label">VAMOS CONVERSAR</span><a href={contact}>contato@healthcare.tec.br <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><p>{consultancyPage ? 'Healthcare.tec — consultoria em gestão de projetos, processos e operações hospitalares.' : 'Planejamento no EqptEC e referências de compras públicas no PubBid. Confira as fontes e faça a avaliação com a equipe responsável.'}</p><span>© {new Date().getFullYear()} Healthcare.tec</span></div></div></footer>;
}

export default function App() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo">{path === '/' ? <Home /> : path === '/acesso' ? <Access /> : path === '/consultoria' ? <div className="consulting-content"><Hero /><PainPoints /><Services /><Differentials /><About /><ContactForm /></div> : <section className="site-wrap access-section"><h1>Página não encontrada.</h1><a className="button" href="/">Voltar ao planejamento</a></section>}</main><Footer /></>;
}
