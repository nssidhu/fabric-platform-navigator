# Microsoft Fabric Platform Navigator

An interactive, single-page capability dashboard for exploring the Microsoft Fabric platform, its native capabilities, partial coverage areas, documented gaps, and ecosystem options.

## Live Dashboard

**https://nssidhu.github.io/fabric-platform-navigator/**

## What It Covers

- Data engineering, ingestion, OneLake, Lakehouse, Warehouse, and Real-Time Intelligence
- Power BI semantic models, Direct Lake, reporting, and analytics
- Copilot, Fabric Data Agents, Data Science, and integrated AI services
- GitHub and Azure DevOps integration, deployment pipelines, and automated CI/CD
- Reliability, availability zones, backup, regional disaster recovery, and Multi-Geo
- Capacity sizing, scaling, monitoring, chargeback, and FinOps
- Identity, private networking, encryption, governance, and Microsoft Purview
- Fabric monitoring, workspace observability, tenant administration, and audit
- Controlled ERP synchronization patterns and external worker options

Each expandable capability includes:

- Coverage classification: **Native**, **Partial**, or **Gap**
- Essential, Standard, or Advanced tier
- Microsoft product and components
- Licensing considerations
- Known limitations and positioning
- Partner or alternative products where appropriate
- Links to Microsoft Learn or trusted vendor documentation

## Use the Dashboard

Open `index.html` directly, or run a local static server:

```powershell
python -m http.server 4173
```

Then browse to:

```text
http://127.0.0.1:4173
```

No build step or package installation is required.

## Project Structure

```text
.
├── index.html   # Semantic page structure and dashboard views
├── styles.css   # Responsive dark and light themes
├── app.js       # Capability data, filters, drill-downs, and decision guide
└── README.md
```

## Navigation

- **Overview** — Executive coverage metrics and documented platform gaps
- **Capability Map** — Searchable and filterable detailed capability model
- **Architecture** — Analytics and ERP synchronization reference architecture
- **Decision Guide** — Interactive Fabric ingestion-pattern selector

Capability filters and expanded records use URL parameters, so detailed views can be bookmarked and shared.

## Sources and Disclaimer

Product details and documented limitations link directly to Microsoft Learn or an applicable trusted product source in the dashboard.

This is an architecture assessment aid, not an official Microsoft product statement. Fabric capabilities, licensing, regional availability, previews, and service limits can change. Validate important design and purchasing decisions against current Microsoft documentation.

## GitHub Pages

GitHub Pages publishes the static site directly from the root of the `main` branch. No build workflow is required.
