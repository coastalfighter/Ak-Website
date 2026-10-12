import React, { Suspense, useEffect, useState } from 'react'
import { Routes, Route, Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Menu, X, Mail, MoveDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    slug: 'talent-acquisition', number: '01', title: 'Talent acquisition', kicker: 'Recruitment operations',
    intro: 'A focused recruiting engine that moves from role definition to candidate coordination with clarity.',
    details: ['Candidate sourcing and screening', 'Interview scheduling and follow-through', 'Pipeline reporting and process support'],
    accent: '#9df9c8'
  },
  {
    slug: 'virtual-assistance', number: '02', title: 'Virtual assistance', kicker: 'Administrative support',
    intro: 'Reliable support for the repeatable work that keeps leaders, teams and customer operations moving.',
    details: ['Calendar and inbox coordination', 'Research, documentation and data upkeep', 'Customer and back-office workflows'],
    accent: '#bfbcff'
  },
  {
    slug: 'finance-operations', number: '03', title: 'Finance operations', kicker: 'Accounting assistance',
    intro: 'Structured assistance for everyday finance workflows, organized around your controls and tools.',
    details: ['Accounts payable and receivable support', 'Payroll and invoicing coordination', 'Bookkeeping workflow assistance'],
    accent: '#ffcc9d'
  },
  {
    slug: 'legal-support', number: '04', title: 'Legal support', kicker: 'Process assistance',
    intro: 'Detail-oriented operational support that helps legal teams keep documents, research and deadlines organized.',
    details: ['Document and matter organization', 'Research and administrative support', 'Workflow and deadline coordination'],
    accent: '#9dddf9'
  }
]

const process = [
  ['Discover', 'Map the work, tools, handoffs and definition of done.'],
  ['Design', 'Shape a practical operating model around your team.'],
  ['Launch', 'Introduce the people, rhythm and reporting structure.'],
  ['Improve', 'Review performance and refine the system as needs evolve.']
]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(q.matches)
    update(); q.addEventListener('change', update)
    return () => q.removeEventListener('change', update)
  }, [])
  return reduced
}

function SmoothScroll() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let raf
    const loop = time => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    lenis.on('scroll', ScrollTrigger.update)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [reduced])
  return null
}

function ScrollEffects() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach(el => {
        gsap.fromTo(el, { y: 46, opacity: 0 }, {
          y: 0, opacity: 1, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        })
      })
    })
    return () => ctx.revert()
  }, [location.pathname])
  return null
}

const HeroCanvas = React.lazy(() => import('./HeroScene'))

function Brand() { return <Link className="brand" to="/" aria-label="Akrostech home"><span className="brand-mark">A</span><span>AKROSTECH</span></Link> }

function Navbar() {
  const [open,setOpen]=useState(false)
  const location=useLocation()
  useEffect(()=>setOpen(false),[location.pathname])
  const nav=[['/services','Services'],['/process','Process'],['/about','About']]
  return <header className="nav-wrap"><nav className="nav shell"><Brand/>
    <div className={`nav-links ${open?'is-open':''}`}>
      {nav.map(([to,label])=><NavLink key={to} to={to}>{label}</NavLink>)}
      <Link to="/contact" className="pill small">Start a conversation <ArrowUpRight size={15}/></Link>
    </div>
    <button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  </nav></header>
}

function Footer() {
  return <footer><div className="shell footer-grid">
    <div><Brand/><p>Operations, engineered around the way your team works.</p></div>
    <div className="footer-links"><span>Explore</span><Link to="/services">Services</Link><Link to="/process">Process</Link><Link to="/about">About</Link></div>
    <div className="footer-links"><span>Connect</span><Link to="/contact">Start a conversation</Link><a href="https://www.akrosstech.com" target="_blank" rel="noreferrer">Current website</a></div>
  </div><div className="shell footline"><span>© {new Date().getFullYear()} Akrostech Consulting</span><span>Clarity in every handoff.</span></div></footer>
}

function Page({children,className=''}) {
  return <motion.main className={className} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.4}}>{children}</motion.main>
}

function Eyebrow({children}) { return <div className="eyebrow"><i/>{children}</div> }
function ArrowLink({to,children}) { return <Link className="arrow-link" to={to}>{children}<ArrowRight size={17}/></Link> }

function Home() {
  return <Page>
    <section className="hero noise"><div className="orb orb-a"/><div className="orb orb-b"/><Suspense fallback={<div className="hero-canvas" aria-hidden="true"/>}><HeroCanvas/></Suspense>
      <div className="shell hero-copy"><Eyebrow>Modern operations. Human judgment.</Eyebrow>
        <h1><span>Build the team.</span><span className="serif">Move the work.</span></h1>
        <p>Akrostech helps growing companies turn busy operational work into clear, accountable systems — across talent, administration, finance and legal support.</p>
        <div className="hero-actions"><Link to="/contact" className="pill">Start a conversation <ArrowRight size={17}/></Link><Link to="/services" className="text-link">Explore capabilities <ChevronRight size={16}/></Link></div>
      </div>
      <div className="scroll-cue"><MoveDown size={16}/><span>Scroll to explore</span></div>
    </section>

    <section className="statement section"><div className="shell statement-grid" data-reveal>
      <Eyebrow>The operating layer</Eyebrow><h2>Your growth should not create more chaos.</h2>
      <p>We help convert fragmented tasks into dependable workflows — with people, process and communication designed to work as one.</p>
    </div></section>

    <section className="services-preview section"><div className="shell">
      <div className="section-head" data-reveal><div><Eyebrow>Capabilities</Eyebrow><h2>Support where momentum usually breaks.</h2></div><ArrowLink to="/services">View all services</ArrowLink></div>
      <div className="service-list">{services.map((s,i)=><Link to={`/services/${s.slug}`} className="service-row" key={s.slug} style={{'--accent':s.accent}} data-reveal>
        <span className="service-num">{s.number}</span><div><span className="service-kicker">{s.kicker}</span><h3>{s.title}</h3></div><p>{s.intro}</p><span className="round-arrow"><ArrowUpRight/></span>
      </Link>)}</div>
    </div></section>

    <section className="contrast section"><div className="shell contrast-grid">
      <div className="sticky-copy" data-reveal><Eyebrow>One connected model</Eyebrow><h2>Not more hands.<br/>A better system.</h2><p>Clear ownership, useful reporting and thoughtful communication make outsourced work feel close to home.</p></div>
      <div className="principles">{[['01','Context before capacity','We start with how the work moves — not a generic staffing template.'],['02','Visibility by design','Rhythms and reporting keep progress visible without adding noise.'],['03','Built to evolve','The operating model can adapt as your priorities, volume and team change.']].map(x=><article key={x[0]} data-reveal><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>
    </div></section>

    <CTA/>
  </Page>
}

function CTA() { return <section className="cta section"><div className="shell cta-card noise" data-reveal><div className="cta-orbit"/><Eyebrow>Build what comes next</Eyebrow><h2>Give your best people<br/>their focus back.</h2><p>Tell us where work is getting stuck. We’ll help you shape a clearer way forward.</p><Link className="pill light" to="/contact">Start a conversation <ArrowRight size={17}/></Link></div></section> }

function PageHero({eyebrow,title,body}) { return <section className="page-hero noise"><div className="shell"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p></div></section> }

function Services() {
  return <Page><PageHero eyebrow="Capabilities" title="Expertise that moves work forward." body="Flexible operational support, designed around your systems, standards and pace."/>
    <section className="section"><div className="shell services-grid">{services.map(s=><Link to={`/services/${s.slug}`} className="service-card" key={s.slug} style={{'--accent':s.accent}} data-reveal>
      <div className="card-top"><span>{s.number}</span><ArrowUpRight/></div><span className="service-kicker">{s.kicker}</span><h2>{s.title}</h2><p>{s.intro}</p><ul>{s.details.map(d=><li key={d}>{d}</li>)}</ul><span className="arrow-link">Explore capability <ArrowRight size={17}/></span>
    </Link>)}</div></section><CTA/></Page>
}

function ServiceDetail() {
  const {slug}=useParams(), s=services.find(x=>x.slug===slug)
  if(!s) return <NotFound/>
  return <Page><section className="detail-hero noise" style={{'--accent':s.accent}}><div className="shell detail-grid"><div><Eyebrow>{s.kicker}</Eyebrow><h1>{s.title}</h1><p>{s.intro}</p><Link className="pill" to="/contact">Discuss this capability <ArrowRight size={17}/></Link></div><div className="detail-sphere"><span>{s.number}</span></div></div></section>
    <section className="section"><div className="shell detail-body"><div data-reveal><Eyebrow>Where we can help</Eyebrow><h2>Practical support, aligned to your workflow.</h2></div><div className="detail-list">{s.details.map((d,i)=><article data-reveal key={d}><span>0{i+1}</span><h3>{d}</h3><p>Scope, ownership and communication are defined with your team before the work begins.</p></article>)}</div></div></section>
    <section className="next-service shell">{services.filter(x=>x.slug!==slug).slice(0,1).map(n=><Link to={`/services/${n.slug}`} key={n.slug}><span>Next capability</span><h3>{n.title}</h3><ArrowRight/></Link>)}</section><CTA/>
  </Page>
}

function Process() {
  return <Page><PageHero eyebrow="The Akrostech approach" title="Clarity from first conversation to daily delivery." body="A simple operating rhythm helps every engagement start focused and stay useful."/>
    <section className="process-section section"><div className="shell process-grid"><aside data-reveal><Eyebrow>Four clear stages</Eyebrow><h2>A thoughtful start. A visible system.</h2><p>Every engagement is shaped around the work itself — its context, controls, communication and desired outcome.</p></aside>
      <div className="timeline">{process.map((x,i)=><article key={x[0]} data-reveal><span>0{i+1}</span><div><h3>{x[0]}</h3><p>{x[1]}</p></div></article>)}</div>
    </div></section>
    <section className="standards section"><div className="shell"><div className="section-head" data-reveal><div><Eyebrow>Working principles</Eyebrow><h2>Designed for confidence, not complexity.</h2></div></div><div className="standards-grid">{['Defined ownership','Documented workflows','Consistent communication','Useful reporting','Thoughtful access controls','Continuous refinement'].map(x=><div data-reveal key={x}><Check size={18}/><span>{x}</span></div>)}</div></div></section><CTA/>
  </Page>
}

function About() {
  return <Page><PageHero eyebrow="About Akrostech" title="A sharper operating model for ambitious teams." body="We believe growth is easier when essential work has structure, ownership and the right human attention."/>
    <section className="section"><div className="shell about-grid"><div data-reveal><Eyebrow>What we believe</Eyebrow><h2>The best support feels integrated — not distant.</h2></div><div data-reveal><p className="lead">Akrostech Consulting works with companies that need more operating capacity without losing context or control.</p><p>Our role is to understand the work, build a clear rhythm around it and help your team move with greater focus. That means fewer ambiguous handoffs, more visible progress and a model designed for the way your company actually runs.</p></div></div></section>
    <section className="values section"><div className="shell"><Eyebrow>Our compass</Eyebrow><div className="values-grid">{[['Clarity','Make ownership, expectations and progress easy to understand.'],['Care','Treat the details as part of the outcome, not an afterthought.'],['Adaptability','Build operating support that can change as the business does.'],['Accountability','Communicate directly and follow through on commitments.']].map((v,i)=><article key={v[0]} data-reveal><span>0{i+1}</span><h3>{v[0]}</h3><p>{v[1]}</p></article>)}</div></div></section><CTA/>
  </Page>
}

function Contact() {
  const email=import.meta.env.VITE_CONTACT_EMAIL || ''
  const endpoint=import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
  const booking=import.meta.env.VITE_BOOKING_URL || ''
  const [status,setStatus]=useState('')
  async function submit(e){
    e.preventDefault(); setStatus('')
    const form=new FormData(e.currentTarget)
    if(endpoint){
      try { const r=await fetch(endpoint,{method:'POST',body:form,headers:{Accept:'application/json'}}); if(!r.ok) throw new Error(); setStatus('Thanks — your message has been sent.'); e.currentTarget.reset() }
      catch { setStatus('The form could not send. Please try again or use the direct email option.') }
    } else if(email) {
      const subject=encodeURIComponent(`Akrostech enquiry — ${form.get('company')||form.get('name')}`)
      const body=encodeURIComponent(`Name: ${form.get('name')}\nCompany: ${form.get('company')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`)
      window.location.href=`mailto:${email}?subject=${subject}&body=${body}`
      setStatus('Your email app should open with the message ready to send.')
    } else setStatus('Thanks — contact delivery is being configured. Please use the company’s existing contact channel for now.')
  }
  return <Page><section className="contact-page noise"><div className="shell contact-grid"><div><Eyebrow>Start a conversation</Eyebrow><h1>Where is work getting stuck?</h1><p>Tell us what your team is trying to move. We’ll start with the problem, not a preset package.</p>{booking&&<a className="text-link" href={booking} target="_blank" rel="noreferrer">Book a meeting <ArrowUpRight size={16}/></a>}</div>
    <form className="contact-form" onSubmit={submit}><label>Name<input name="name" required autoComplete="name" placeholder="Your name"/></label><label>Work email<input type="email" name="email" required autoComplete="email" placeholder="you@company.com"/></label><label>Company<input name="company" autoComplete="organization" placeholder="Company name"/></label><label>What would you like to improve?<textarea name="message" required rows="5" placeholder="Tell us about the work, team or process…"/></label><button className="pill" type="submit">Send enquiry <ArrowRight size={17}/></button>{status&&<p className="form-status" role="status">{status}</p>}</form>
  </div></section></Page>
}

function NotFound() { return <Page><section className="notfound shell"><Eyebrow>404</Eyebrow><h1>This page stepped out.</h1><p>Let’s get you back to the work that matters.</p><Link className="pill" to="/">Return home <ArrowRight size={17}/></Link></section></Page> }

export default function App(){
  const location=useLocation()
  return <><SmoothScroll/><ScrollEffects/><Navbar/><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}>
    <Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<ServiceDetail/>}/><Route path="/process" element={<Process/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/>
  </Routes></AnimatePresence><Footer/></>
}
