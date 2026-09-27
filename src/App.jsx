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
const appUrl = import.meta.env.VITE_PUBBID_URL || '/pubbid/';
const contact = 'mailto:contato@healthcare.tec.br';

function Header() {
  const [open, setOpen] = useState(false);
  const consultancyPage = path === '/consultoria';
  return <header className="site-header"><div className="site-wrap header-inner">
    <a className={consultancyPage ? 'brand healthcare-brand' : 'brand'} href="/" aria-label={consultancyPage ? 'Healthcare.tec — início' : 'PubBid — início'}>{consultancyPage ? <><img src="/logo-icon.png" alt="" /><span>Healthcare.tec<small>Engineering Health</small></span></> : <><span className="brand-symbol"><Layers size={22} /></span><span>Pub<span className="brand-light">Bid</span><small>por Healthcare.tec</small></span></>}</a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Navegação principal" onClick={() => setOpen(false)} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('.menu-toggle').focus(); } }}>
      <a href="/#como-funciona">Como funciona</a><a href="/#fontes">Fontes e limites</a><a href="/consultoria/" aria-current={path === '/consultoria' ? 'page' : undefined}>Conteúdo institucional</a><a className="button button-small" href="/acesso/" aria-current={path === '/acesso' ? 'page' : undefined}>Acessar o sistema <ArrowUpRight size={16} /></a>
    </nav>
  </div></header>;
}

function ProductPreview() {
  return <figure className="product-preview" aria-label="Ilustração do fluxo de pesquisa, sem registros reais">
    <div className="preview-top"><span><Layers size={16} /> Ambiente de pesquisa</span><span className="demo-tag">Ilustração</span></div>
    <div className="preview-body"><div className="preview-label">EQUIPAMENTO DE INTERESSE</div><div className="preview-search"><Search size={19} /><span>Ultrassom diagnóstico</span></div>
      <div className="preview-tabs"><span>Processos</span><span>Itens e resultados</span><span>Referências</span></div>
      <div className="preview-record"><div className="record-icon"><Database size={20} /></div><div><strong>Da busca ao registro de origem</strong><p>Objeto da compra · órgão · fonte</p></div></div>
      <div className="preview-fields"><div><small>PROCESSO</small><span>Prazo publicado</span></div><div><small>EQUIPAMENTO</small><span>Descrição do item</span></div><div><small>EVIDÊNCIA</small><span>Resultado disponível</span></div><div><small>CONFERÊNCIA</small><span>Link para a fonte <ExternalLink size={12} /></span></div></div>
      <div className="preview-note"><Check size={16} /> Contexto para pesquisar. Evidência para conferir.</div>
    </div><figcaption>Representação ilustrativa do fluxo. Não exibe licitações reais.</figcaption>
  </figure>;
}

function Home() {
  return <>
    <section className="product-hero"><div className="site-wrap hero-grid"><div>
      <p className="eyebrow"><span className="status-dot" /> PESQUISA DE COMPRAS PÚBLICAS EM SAÚDE</p>
      <h1>Encontre compras públicas de equipamentos médico-hospitalares,<em> com evidência.</em></h1>
      <p className="hero-description">O PubBid é um piloto de pesquisa que cruza o catálogo de equipamentos EqptEC/SOMASUS com registros públicos do PNCP e referências do Compras.gov.br. Ele ajuda a localizar oportunidades e resultados, mantendo o vínculo com a fonte oficial.</p>
      <div className="action-row"><a className="button" href="/acesso/">Acessar o sistema <ArrowUpRight size={18} /></a><a className="text-link" href="#como-funciona">Conhecer o PubBid <ArrowRight size={17} /></a></div>
      <p className="hero-footnote">Fontes públicas. Cobertura explícita. Pesquisa com evidência.</p>
    </div><ProductPreview /></div></section>
    <section className="value-strip" aria-label="Benefícios"><div className="site-wrap value-grid">{[
      [Search, 'Pesquise equipamentos', 'Use nomes, sinônimos e termos do catálogo EqptEC.'],
      [Layers, 'Veja oportunidades', 'Consulte prazos, processos e resultados registrados.'],
      [ExternalLink, 'Confira a fonte', 'Abra o registro oficial antes de tomar uma decisão.'],
    ].map(([Icon, title, description]) => <div key={title}><Icon size={23} /><div><h2>{title}</h2><p>{description}</p></div></div>)}</div></section>
    <section className="site-section site-wrap problem-grid"><p className="eyebrow">O PILOTO PUBBID</p><div><h2>Uma camada de pesquisa sobre fontes públicas.</h2><p>O catálogo de equipamentos é lido de forma somente leitura a partir do EqptEC/SOMASUS. O PubBid coleta registros do PNCP, enriquece a pesquisa com o catálogo e referências de preços do Compras.gov.br e guarda as evidências em uma base local separada.</p></div></section>
    <section id="como-funciona" className="workflow-section"><div className="site-wrap site-section"><div className="section-heading"><div><p className="eyebrow">DA PERGUNTA À EVIDÊNCIA</p><h2>Uma pesquisa em três passos.</h2></div><p>Para fabricantes, distribuidores, equipes comerciais e áreas de planejamento.</p></div><div className="steps-grid">{[
      ['01', 'Escolha o equipamento', 'Pesquise pelo nome, sinônimo ou termo relacionado no catálogo.'],
      ['02', 'Escolha o modo', 'Use Default para dados recentes e prazos futuros; Discovery para até dois anos de histórico local.'],
      ['03', 'Confira a evidência', 'Abra PNCP ou Compras.gov.br e valide edital, retificações e situação atual.'],
    ].map(([n, title, description]) => <article key={n}><span className="step-number">{n}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <section className="site-section site-wrap"><p className="eyebrow">LEITURA DO CONJUNTO</p><h2>Do processo ao detalhe que importa.</h2><p className="section-intro">Recursos do piloto, conforme a disponibilidade e a qualidade dos registros coletados.</p><div className="features-grid">{[
      ['Processos e prazos', 'Registros publicados, atualizados ou ainda recebendo propostas, quando disponíveis.'],
      ['Itens e especificações', 'Itens e descrições vinculados ao equipamento pesquisado para conferência do edital.'],
      ['Referências de preços', 'Referências públicas do Compras.gov.br, agrupadas quando há unidade e equivalência revisáveis.'],
      ['Síntese da pesquisa', 'Órgãos, localidades, prazos, itens e resultados presentes na amostra.'],
    ].map(([title, description]) => <article key={title}><span className="feature-status">Disponível no piloto</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section id="fontes" className="sources-section"><div className="site-wrap site-section sources-grid"><div><p className="eyebrow">FONTES E LIMITES</p><h2>Transparência também faz parte da pesquisa.</h2><p>A cobertura varia por fonte, período, modalidade e qualidade dos registros. Uma busca não garante que todos os processos existentes tenham sido localizados.</p><p>Confira sempre o edital, as retificações, os prazos e a situação atual na fonte oficial. A data de coleta deve ser conferida no ambiente de pesquisa.</p></div><div className="sources-card"><div><span><strong>PNCP</strong><small>Coleta parcial: modalidades 4, 6, 8 e 9.</small></span><span className="source-tag">Conectado</span></div><div><span><strong>Compras.gov.br</strong><small>Catálogo e referências de preços; equivalências exigem revisão.</small></span><span className="source-tag">Conectado</span></div><div><span><strong>PCA, BPS e portais locais</strong><small>Integrações ainda não disponíveis.</small></span><span className="source-tag planned">Planejado</span></div><p>O PubBid apoia a pesquisa. Não prevê preços, chances de vitória ou resultados de licitações.</p></div></div></section>
    <section className="site-wrap closing-section"><div><p className="eyebrow">SEU PRÓXIMO PASSO</p><h2>Comece pela informação.<br />Decida com mais contexto.</h2></div><a className="button" href="/acesso/">Acessar o sistema <ArrowUpRight size={18} /></a></section>
  </>;
}

function Access() {
  return <section className="site-wrap access-section"><a className="text-link" href="/">← Conhecer o PubBid</a><p className="eyebrow">AMBIENTE DE PESQUISA</p><h1>Acesse o PubBid.</h1><p className="section-intro">Pesquise equipamentos, consulte registros e confira as fontes que dão contexto às compras públicas em saúde.</p><div className="access-grid"><article className="access-card"><span className="feature-status">{appUrl ? 'Acesso público' : 'Acesso em preparação'}</span><h2>Ambiente de pesquisa</h2><p>{appUrl ? 'Abra o ambiente de pesquisa e explore os registros disponíveis. O acesso é público, sem necessidade de login.' : 'O acesso público ao ambiente está em preparação. Entre em contato para saber sobre disponibilidade.'}</p><a className="button" href={appUrl || `${contact}?subject=Disponibilidade%20do%20PubBid`}>{appUrl ? 'Abrir ambiente de pesquisa' : 'Consultar disponibilidade'} <ArrowUpRight size={17} /></a></article><article className="access-card"><span className="feature-status muted-status">API do piloto</span><h2>Integrações</h2><p>A interface expõe endpoints de busca, tarefas e atualização sob o prefixo público da API. O uso deve respeitar a cobertura parcial e os limites das fontes.</p><a className="text-link" href={`${contact}?subject=Integra%C3%A7%C3%A3o%20com%20a%20API%20PubBid`}>Conversar sobre integração <ArrowRight size={17} /></a></article></div><p className="access-note">A cobertura das fontes é parcial. <a href="/#fontes">Conheça as fontes e limitações.</a></p></section>;
}

function Footer() {
  const consultancyPage = path === '/consultoria';
  return <footer className="site-footer"><div className="site-wrap"><div className="footer-grid"><div><a className={consultancyPage ? 'brand healthcare-brand footer-healthcare-brand' : 'brand'} href="/">{consultancyPage ? <><img src="/logo-icon.png" alt="" /><span>Healthcare.tec<small>Engineering Health</small></span></> : 'PubBid'}</a><p>{consultancyPage ? 'Engineering Health' : <>Pesquisa de compras públicas em saúde.<br />Uma iniciativa Healthcare.tec.</>}</p></div><nav aria-label="Rodapé"><a href="/#como-funciona">Como funciona</a><a href="/#fontes">Fontes e limites</a><a href="/consultoria/">Conteúdo institucional</a><a href="/acesso/">Acessar o sistema</a></nav><div><span className="footer-label">VAMOS CONVERSAR</span><a href={contact}>contato@healthcare.tec.br <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><p>{consultancyPage ? 'Healthcare.tec — conteúdo institucional mantido como página secundária.' : 'A ferramenta apoia pesquisa; não substitui o edital, a fonte oficial ou a análise técnica, jurídica e comercial.'}</p><span>© {new Date().getFullYear()} Healthcare.tec</span></div></div></footer>;
}

export default function App() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo">{path === '/' ? <Home /> : path === '/acesso' ? <Access /> : path === '/consultoria' ? <div className="consulting-content"><Hero /><PainPoints /><Services /><Differentials /><About /><ContactForm /></div> : <section className="site-wrap access-section"><h1>Página não encontrada.</h1><a className="button" href="/">Voltar ao PubBid</a></section>}</main><Footer /></>;
}
