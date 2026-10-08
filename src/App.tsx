import { useMemo, useState, type ReactNode } from "react";

type Page =
  | "home"
  | "data"
  | "descriptive"
  | "diagnostic"
  | "predictive"
  | "prescriptive"
  | "about";

type IconName =
  | "grid"
  | "database"
  | "chart"
  | "search"
  | "trend"
  | "shield"
  | "user"
  | "menu"
  | "arrow";

const pages: { id: Page; label: string; icon: IconName; eyebrow?: string }[] = [
  { id: "home", label: "Overview", icon: "grid" },
  { id: "data", label: "Sources & data", icon: "database" },
  { id: "descriptive", label: "Descriptive", icon: "chart", eyebrow: "Analysis types" },
  { id: "diagnostic", label: "Diagnostic", icon: "search" },
  { id: "predictive", label: "Predictive", icon: "trend" },
  { id: "prescriptive", label: "Prescriptive", icon: "shield" },
  { id: "about", label: "About", icon: "user", eyebrow: "Project" },
];

const sourceLinks = {
  cisa: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
  cisaJson:
    "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
  verizon: "https://www.verizon.com/business/resources/reports/dbir/",
  verizon2025:
    "https://www.verizon.com/business/resources/reports/2025-dbir-data-breach-investigations-report.pdf",
  fbi: "https://www.ic3.gov/AnnualReport/Reports",
  fbi2024: "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf",
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    trend: <><path d="m3 17 6-6 4 4 8-9" /><path d="M15 6h6v6" /></>,
    shield: <><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function PageHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div className="kicker">{kicker}</div>
      <div className="page-title">{title}</div>
      <div className="page-description">{description}</div>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card ${className}`}>{children}</section>;
}

function Stat({
  label,
  value,
  change,
  tone = "cyan",
}: {
  label: string;
  value: string;
  change: string;
  tone?: "cyan" | "purple" | "red" | "amber";
}) {
  return (
    <Card className={`stat-card tone-${tone}`}>
      <div className="stat-top">
        <span>{label}</span>
        <span className="signal-dot" />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-change">{change}</div>
    </Card>
  );
}

function Home({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <div className="hero">
        <div>
          <div className="status-pill"><span /> Public-source security research</div>
          <div className="hero-title">Turning public evidence into <em>security insight.</em></div>
          <div className="hero-copy">
            A source-transparent study of exploited vulnerabilities, confirmed breaches, security incidents, and internet-crime complaints published by CISA, Verizon, and the FBI.
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => go("descriptive")}>
              Explore analysis <Icon name="arrow" />
            </button>
            <button className="secondary-button" onClick={() => go("data")}>View raw dataset</button>
          </div>
        </div>
        <div className="editorial-note" aria-label="Project summary">
          <div className="note-top">
            <span>Research note</span>
            <span>01 / 2025</span>
          </div>
          <div className="note-mark">A study in<br /><em>public security data.</em></div>
          <div className="note-details">
            <div><span>Sources</span><b>CISA · Verizon · FBI</b></div>
            <div><span>Reporting</span><b>Source-specific</b></div>
            <div><span>Method</span><b>Four analytical lenses</b></div>
          </div>
          <div className="note-foot">Security / Research / Development</div>
        </div>
      </div>

      <div className="section-header">
        <div><span className="kicker">Analysis framework</span><div className="section-title">Four lenses. One clear picture.</div></div>
        <div className="section-note">From hindsight to foresight</div>
      </div>
      <div className="analysis-grid">
        {[
          ["descriptive", "01", "What is reported?", "Summarizes source-specific incidents, breaches, complaints, losses, and vulnerabilities."],
          ["diagnostic", "02", "Which factors appear?", "Examines access paths and involvement patterns published in the Verizon DBIR."],
          ["predictive", "03", "What should we monitor?", "Identifies forward-looking signals without creating unsupported forecasts."],
          ["prescriptive", "04", "What should we do?", "Prioritizes practical controls grounded in CISA, Verizon, and FBI reporting."],
        ].map(([id, number, title, copy]) => (
          <button className="analysis-card" key={id} onClick={() => go(id as Page)}>
            <span className="analysis-number">{number}</span>
            <span className="analysis-title">{title}</span>
            <span className="analysis-copy">{copy}</span>
            <span className="analysis-link">Open analysis <Icon name="arrow" size={15} /></span>
          </button>
        ))}
      </div>
    </>
  );
}

function Descriptive() {
  return (
    <>
      <PageHeading kicker="01 / Descriptive analysis" title="What do the sources report?" description="A source-specific summary of the threat landscape. These measures use different populations and methodologies and are not combined into a single total." />
      <div className="stats-grid">
        <Stat label="Security incidents" value="22,052" change="Verizon 2025 DBIR" />
        <Stat label="Confirmed breaches" value="12,195" change="Verizon 2025 DBIR" tone="purple" />
        <Stat label="IC3 complaints" value="859,532" change="FBI IC3 · 2024" tone="red" />
        <Stat label="Reported losses" value="$16.6 billion" change="FBI IC3 · 2024" tone="amber" />
      </div>
      <div className="two-column">
        <Card>
          <div className="card-head"><div><span className="card-kicker">Threat landscape</span><div className="card-title">Verizon DBIR findings</div></div><span className="tag">2025 report</span></div>
          <div className="evidence-list">
            <div><strong>139</strong><span>countries represented by victims in the analyzed data</span></div>
            <div><strong>30%</strong><span>of analyzed breaches involved a third party</span></div>
            <div><strong>20%</strong><span>of analyzed breaches involved vulnerability exploitation</span></div>
            <div><strong>22%</strong><span>involved use of stolen credentials</span></div>
          </div>
          <a className="source-link" href={sourceLinks.verizon2025} target="_blank" rel="noreferrer">Read the Verizon 2025 DBIR <Icon name="arrow" size={15} /></a>
        </Card>
        <Card>
          <div className="card-head"><div><span className="card-kicker">Internet crime</span><div className="card-title">FBI IC3 complaint counts</div></div><span className="tag">2024 report</span></div>
          <div className="evidence-list compact">
            <div><strong>193,407</strong><span>phishing / spoofing complaints</span></div>
            <div><strong>64,882</strong><span>personal data breach complaints</span></div>
            <div><strong>21,442</strong><span>business email compromise complaints</span></div>
            <div><strong>3,156</strong><span>ransomware complaints</span></div>
          </div>
          <a className="source-link" href={sourceLinks.fbi2024} target="_blank" rel="noreferrer">Read the FBI IC3 2024 report <Icon name="arrow" size={15} /></a>
        </Card>
      </div>
      <Card className="insight-card">
        <div className="insight-icon"><Icon name="chart" /></div>
        <div><span>Interpretation boundary</span><p>DBIR incidents and breaches, IC3 complaints, and CISA KEV records describe different phenomena. They are presented separately and should not be added together or treated as a worldwide incident total.</p></div>
      </Card>
    </>
  );
}

function Diagnostic() {
  const causes = [
    ["Use of stolen credentials", 22, "Share of analyzed breaches"],
    ["Vulnerability exploitation", 20, "Share of analyzed breaches"],
    ["Phishing", 15, "Approximately 15% of analyzed breaches"],
    ["Third-party involvement", 30, "Present in analyzed breaches"],
  ];
  return (
    <>
      <PageHeading kicker="02 / Diagnostic analysis" title="Which factors are visible?" description="Published Verizon findings identify prominent access paths and involvement patterns. These percentages are not presented as mutually exclusive causes." />
      <div className="diagnostic-layout">
        <Card>
          <div className="card-head"><div><span className="card-kicker">Observed factors</span><div className="card-title">Signals in analyzed breaches</div></div><span className="tag">Verizon 2025 DBIR</span></div>
          <div className="cause-list">
            {causes.map(([name, value, note], index) => (
              <div className="cause-row" key={String(name)}>
                <div className="cause-rank">0{index + 1}</div>
                <div className="cause-main"><div><b>{name}</b><span>{note}</span></div><div className="progress"><i style={{ width: `${value}%` }} /></div></div>
                <strong>{value}%</strong>
              </div>
            ))}
          </div>
        </Card>
        <div className="stack">
          <Card>
            <span className="card-kicker">Year-over-year observation</span>
            <div className="correlation-value">+34%</div>
            <div className="card-title">Vulnerability exploitation</div>
            <p className="muted">The DBIR reports a 34% increase from the prior year in exploitation of vulnerabilities as an initial access vector.</p>
          </Card>
          <Card className="finding-card">
            <div className="finding-mark">!</div>
            <div><span className="card-kicker">Important context</span><p>Third-party involvement appeared in <b>30%</b> of breaches analyzed by Verizon, up from roughly 15% in the previous report.</p></div>
          </Card>
        </div>
      </div>
      <div className="three-grid">
        {[
          ["Credentials", "22%", "Use of stolen credentials remained a major access concern in the DBIR dataset."],
          ["Exploitation", "20%", "Vulnerability exploitation was present in one fifth of analyzed breaches."],
          ["Phishing", "~15%", "Phishing remained near 15% in the analyzed breach data."],
        ].map(([label, value, copy]) => (
          <Card key={label}><span className="card-kicker">{label}</span><div className="factor-line"><strong>{value}</strong><span>of analyzed breaches</span></div><p className="muted">{copy}</p></Card>
        ))}
      </div>
      <a className="source-link standalone" href={sourceLinks.verizon2025} target="_blank" rel="noreferrer">Source: Verizon 2025 Data Breach Investigations Report <Icon name="arrow" size={15} /></a>
    </>
  );
}

function Predictive() {
  return (
    <>
      <PageHeading kicker="03 / Predictive analysis" title="What should be monitored next?" description="These public sources do not form a consistent time series for a defensible incident forecast. This page therefore identifies evidence-based monitoring signals without inventing future values." />
      <div className="forecast-banner">
        <div><span>Current CISA KEV catalog</span><strong>1,734</strong><small>known exploited vulnerabilities · catalog release October 4, 2026</small></div>
        <span className="tag">Dynamic dataset</span>
      </div>
      <Card>
        <div className="card-head"><div><span className="card-kicker">Observed additions</span><div className="card-title">CISA KEV entries by date added year</div></div><span className="tag">Not a forecast</span></div>
        <div className="year-strip">
          {[["2021", "311"], ["2022", "555"], ["2023", "187"], ["2024", "186"], ["2025", "245"], ["2026*", "250"]].map(([year, value]) => (
            <div key={year}><span>{year}</span><strong>{value}</strong><small>catalog additions</small></div>
          ))}
        </div>
        <p className="method-caption">* 2026 count reflects records in the catalog retrieved October 8, 2026, with the latest catalog release dated October 4, 2026. Counts are calculated only from CISA’s <span>dateAdded</span> field.</p>
      </Card>
      <div className="three-grid">
        {[
          ["Exposure signal", "KEV additions", "Monitor newly added vulnerabilities and CISA remediation due dates."],
          ["Access signal", "Credentials", "Track controls related to stolen credentials and phishing."],
          ["Dependency signal", "Third parties", "Review critical suppliers and externally managed services."],
        ].map(([label, value, note]) => <Card className="forecast-card" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></Card>)}
      </div>
      <Card className="insight-card">
        <div className="insight-icon"><Icon name="trend" /></div>
        <div><span>Analytical restraint</span><p>No numerical forecast is presented. CISA catalog additions, Verizon case data, and FBI complaints use different collection methods and cannot support a single predictive incident model without additional assumptions.</p></div>
      </Card>
      <a className="source-link standalone" href={sourceLinks.cisa} target="_blank" rel="noreferrer">Source: CISA Known Exploited Vulnerabilities Catalog <Icon name="arrow" size={15} /></a>
    </>
  );
}

function Prescriptive() {
  const actions = [
    { priority: "P1", title: "Prioritize CISA KEV remediation", basis: "CISA KEV", copy: "Match the asset inventory against the current catalog and act according to CISA-required remediation actions and due dates." },
    { priority: "P1", title: "Strengthen credential controls", basis: "Verizon DBIR", copy: "Apply phishing-resistant MFA and monitor credential use, especially for remote access and privileged accounts." },
    { priority: "P2", title: "Review third-party exposure", basis: "Verizon DBIR", copy: "Inventory critical providers, define access boundaries, and include incident-notification requirements in supplier reviews." },
    { priority: "P2", title: "Prepare complaint and fraud response", basis: "FBI IC3", copy: "Document rapid escalation paths for phishing, business email compromise, ransomware, and financial fraud reports." },
  ];
  return (
    <>
      <PageHeading kicker="04 / Prescriptive analysis" title="What should we do?" description="A source-informed action plan derived from the risks highlighted by CISA, Verizon, and FBI reporting. No unsupported reduction estimates are attached." />
      <div className="prescriptive-summary">
        <div><span className="kicker">Recommended focus</span><strong>Known exposure before speculative risk</strong><p>Start with actively exploited vulnerabilities, credential controls, and critical third parties.</p></div>
        <div className="target-ring"><span>KEV</span><small>first</small></div>
      </div>
      <div className="action-list">
        {actions.map((action, index) => (
          <Card className="action-card" key={action.title}>
            <div className="action-index">0{index + 1}</div>
            <div className="action-content"><div><span className={`priority ${action.priority === "P1" ? "urgent" : ""}`}>{action.priority}</span><div className="card-title">{action.title}</div></div><p>{action.copy}</p></div>
            <div className="action-meta"><span>Evidence base <strong>{action.basis}</strong></span></div>
          </Card>
        ))}
      </div>
      <Card>
        <div className="card-head"><div><span className="card-kicker">Practical sequence</span><div className="card-title">Implementation workflow</div></div></div>
        <div className="roadmap">
          <div><b>Identify</b><span>Map assets to CISA KEV</span><span>Locate privileged access</span></div>
          <div><b>Reduce</b><span>Remediate known exposure</span><span>Strengthen authentication</span></div>
          <div><b>Maintain</b><span>Review suppliers</span><span>Monitor source updates</span></div>
        </div>
      </Card>
      <div className="source-inline">
        <a href={sourceLinks.cisa} target="_blank" rel="noreferrer">CISA KEV</a>
        <a href={sourceLinks.verizon2025} target="_blank" rel="noreferrer">Verizon 2025 DBIR</a>
        <a href={sourceLinks.fbi2024} target="_blank" rel="noreferrer">FBI IC3 2024</a>
      </div>
    </>
  );
}

function Dataset() {
  const indicators = [
    ["Verizon DBIR", "2025", "Security incidents analyzed", "22,052", "Security incidents", sourceLinks.verizon2025, "2025 DBIR"],
    ["Verizon DBIR", "2025", "Confirmed data breaches", "12,195", "Data breaches", sourceLinks.verizon2025, "2025 DBIR"],
    ["Verizon DBIR", "2025", "Countries represented", "139", "Report coverage", sourceLinks.verizon2025, "2025 DBIR"],
    ["Verizon DBIR", "2025", "Third-party involvement", "30%", "Analyzed breaches", sourceLinks.verizon2025, "2025 DBIR"],
    ["FBI IC3", "2024", "Complaints received", "859,532", "Internet crime complaints", sourceLinks.fbi2024, "2024 IC3 Report"],
    ["FBI IC3", "2024", "Reported losses", "$16.6 billion", "Reported financial loss", sourceLinks.fbi2024, "2024 IC3 Report"],
    ["FBI IC3", "2024", "Phishing / spoofing complaints", "193,407", "Complaint type", sourceLinks.fbi2024, "2024 IC3 Report"],
    ["FBI IC3", "2024", "Ransomware complaints", "3,156", "Complaint type", sourceLinks.fbi2024, "2024 IC3 Report"],
    ["CISA KEV", "Current", "Catalog entries", "1,734", "Known exploited vulnerabilities", sourceLinks.cisa, "CISA KEV Catalog"],
    ["CISA KEV", "Current", "Known ransomware use", "361", "KEV field: Known", sourceLinks.cisa, "CISA KEV Catalog"],
  ];
  return (
    <>
      <PageHeading kicker="Public-source research" title="Cybersecurity threat intelligence" description="Selected real-world cybersecurity data from CISA, the Verizon Data Breach Investigations Report, and the FBI Internet Crime Complaint Center." />
      <div className="dataset-meta">
        <div><span>12,195</span> confirmed breaches<small>Verizon 2025 DBIR</small></div>
        <div><span>22,052</span> security incidents analyzed<small>Verizon 2025 DBIR</small></div>
        <div><span>859,532</span> IC3 complaints — 2024<small>FBI IC3 Annual Report</small></div>
        <div><span>$16.6 billion</span> reported IC3 losses — 2024<small>FBI IC3 Annual Report</small></div>
      </div>

      <div className="source-sections">
        <Card className="source-panel">
          <div className="source-panel-top"><span>01</span><span className="tag">2025 report</span></div>
          <span className="card-kicker">Threat landscape</span>
          <div className="card-title">Verizon DBIR</div>
          <p>The 2025 report analyzed 22,052 real-world security incidents, including 12,195 confirmed data breaches, with victims represented across 139 countries.</p>
          <a className="source-link" href={sourceLinks.verizon2025} target="_blank" rel="noreferrer">Open report <Icon name="arrow" size={15} /></a>
        </Card>
        <Card className="source-panel">
          <div className="source-panel-top"><span>02</span><span className="tag">2024 report</span></div>
          <span className="card-kicker">Internet crime</span>
          <div className="card-title">FBI IC3</div>
          <p>IC3 received 859,532 complaints in 2024, with $16.6 billion in reported losses. Complaints are reports to IC3 and are not equivalent to confirmed breaches.</p>
          <a className="source-link" href={sourceLinks.fbi2024} target="_blank" rel="noreferrer">Open report <Icon name="arrow" size={15} /></a>
        </Card>
        <Card className="source-panel">
          <div className="source-panel-top"><span>03</span><span className="tag">Current catalog</span></div>
          <span className="card-kicker">Exploited vulnerabilities</span>
          <div className="card-title">CISA KEV</div>
          <p>The catalog contained 1,734 vulnerabilities at retrieval. Of these, 361 records marked known ransomware campaign use as “Known.” The catalog changes as CISA adds records.</p>
          <div className="source-actions">
            <a className="source-link" href={sourceLinks.cisa} target="_blank" rel="noreferrer">Open catalog <Icon name="arrow" size={15} /></a>
            <a className="source-link secondary" href={sourceLinks.cisaJson} target="_blank" rel="noreferrer">Official JSON</a>
          </div>
        </Card>
      </div>

      <Card className="table-card">
        <div className="card-head"><div><span className="card-kicker">Published and catalog-derived values</span><div className="card-title">Selected real-world cybersecurity indicators</div></div><span className="tag">Public sources</span></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>Source</th><th>Year</th><th>Metric</th><th>Value</th><th>Category</th><th>Reference</th></tr></thead>
            <tbody>
              {indicators.map(([source, year, metric, value, category, href, reference]) => (
                <tr key={`${source}-${metric}`}>
                  <td><b>{source}</b></td><td>{year}</td><td>{metric}</td><td><strong>{value}</strong></td><td>{category}</td>
                  <td><a className="table-link" href={href} target="_blank" rel="noreferrer">{reference}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="provenance">
        <div><span className="card-kicker">Methodology</span><div className="card-title">Data provenance</div></div>
        <p>Statistics shown on this page are sourced from publicly available cybersecurity reports and datasets published by CISA, Verizon, and the FBI Internet Crime Complaint Center. Values are presented according to the methodology and reporting periods of their respective sources.</p>
        <p>CISA counts were calculated directly from the official downloadable KEV JSON catalog. The count is dynamic and can change as CISA adds vulnerabilities. These sources do not represent every cyber incident worldwide.</p>
        <span className="review-date">Last source review: October 8, 2026 · CISA catalog release: October 4, 2026</span>
      </Card>

      <section className="sources-block">
        <span className="card-kicker">References</span>
        <div className="section-title">Data sources</div>
        <div className="source-list">
          <a href={sourceLinks.cisa} target="_blank" rel="noreferrer"><span>CISA — Known Exploited Vulnerabilities Catalog</span><small>Current · dynamic catalog</small><Icon name="arrow" size={17} /></a>
          <a href={sourceLinks.verizon} target="_blank" rel="noreferrer"><span>Verizon — Data Breach Investigations Report</span><small>2025 report used</small><Icon name="arrow" size={17} /></a>
          <a href={sourceLinks.fbi} target="_blank" rel="noreferrer"><span>FBI Internet Crime Complaint Center — Annual Reports</span><small>2024 report used</small><Icon name="arrow" size={17} /></a>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHeading kicker="About the project" title="Cybersecurity analytics study" description="An academic project demonstrating how public cybersecurity data can support descriptive, diagnostic, predictive, and prescriptive thinking." />
      <div className="about-layout">
        <Card className="profile-card">
          <div className="avatar">RG</div>
          <div className="profile-name">Raghav</div>
          <div className="profile-role">B.Tech · 2nd Year</div>
          <div className="profile-details">
            <div><span>Roll number</span><b>154</b></div>
            <div><span>Section</span><b>C</b></div>
            <div><span>Course</span><b>B.Tech 2nd Year</b></div>
          </div>
        </Card>
        <div className="stack">
          <Card><span className="card-kicker">Project objective</span><div className="card-title large">From public evidence to informed action</div><p className="muted">This project uses authoritative public data from CISA, Verizon, and the FBI IC3 to demonstrate four analytical perspectives while preserving each source’s definitions and reporting boundaries.</p></Card>
          <Card>
            <span className="card-kicker">Methodology</span>
            <div className="method-list">
              {["Summarize published indicators", "Examine reported factors", "Identify monitoring signals", "Recommend source-informed controls"].map((item, i) => <div key={item}><span>0{i + 1}</span>{item}</div>)}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = useMemo(() => pages.find((item) => item.id === page), [page]);

  const navigate = (next: Page) => {
    setPage(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <aside className={mobileOpen ? "sidebar open" : "sidebar"}>
        <button className="brand" onClick={() => navigate("home")} aria-label="Go to overview">
          <span className="brand-mark"><Icon name="shield" size={22} /></span>
          <span><b>RAGHAV</b><small>SECURITY STUDIES</small></span>
        </button>
        <nav>
          {pages.map((item, index) => (
            <div key={item.id}>
              {item.eyebrow && <div className="nav-eyebrow">{item.eyebrow}</div>}
              <button className={page === item.id ? "nav-item active" : "nav-item"} onClick={() => navigate(item.id)}>
                <Icon name={item.icon} /><span>{item.label}</span>{page === item.id && <i />}
              </button>
              {index === 1 && <div className="nav-divider" />}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="system-status"><span /><div><b>Sources reviewed</b><small>CISA · Verizon · FBI</small></div></div>
          <div className="student-mini"><div>RG</div><span><b>Raghav</b><small>Roll no. 154 · Sec C</small></span></div>
        </div>
      </aside>

      {mobileOpen && <button className="backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
      <main>
        <header>
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
          <div className="breadcrumb"><span>Security analytics</span><i>/</i><b>{current?.label}</b></div>
          <div className="header-badge"><span /> Public sources</div>
        </header>
        <div className="content">
          {page === "home" && <Home go={navigate} />}
          {page === "data" && <Dataset />}
          {page === "descriptive" && <Descriptive />}
          {page === "diagnostic" && <Diagnostic />}
          {page === "predictive" && <Predictive />}
          {page === "prescriptive" && <Prescriptive />}
          {page === "about" && <About />}
        </div>
      </main>
    </div>
  );
}
