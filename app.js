const statusMeta = {
  native: { label: "Fabric Native", color: "var(--blue)" },
  shared: { label: "Partial Coverage", color: "var(--amber)" },
  ecosystem: { label: "Gap · Extension Required", color: "var(--violet)" }
};

const gaps = [
  { title: "Universal ERP Write-Back", description: "Fabric has no universal transactional write-back capability across ERP products and business objects.", response: "API-first Azure Functions or Web Apps; Power Automate Desktop, UiPath, Automation Anywhere, computer-use, or human workflow when APIs are unavailable.", sources: [["Azure Functions", "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview"], ["Power Automate Desktop", "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction"]] },
  { title: "Unsupported Source CDC", description: "Native Mirroring only covers supported databases and requires source-side CDC permissions.", response: "Open Mirroring or partner CDC through Striim, Qlik, or Fivetran.", sources: [["Fabric Mirroring", "https://learn.microsoft.com/en-us/fabric/mirroring/overview"]] },
  { title: "Master & Reference Data Management", description: "Fabric and Purview do not provide full golden-record matching, survivorship, stewardship, and mastered-data distribution.", response: "Use Profisee, Informatica MDM, or Semarchy and publish mastered entities back through governed Fabric data products.", sources: [["Profisee for Microsoft", "https://profisee.com/microsoft/"]] },
  { title: "Data Contracts & Schema Enforcement", description: "Fabric records lineage and can tolerate schema drift, but it does not prevent breaking batch or lakehouse schema changes before propagation.", response: "Implement dbt model contracts, Soda checks, or a schema registry and enforce compatibility in CI/CD before deployment.", sources: [["Azure Schema Registry", "https://learn.microsoft.com/en-us/azure/event-hubs/schema-registry-overview"], ["dbt Model Contracts", "https://docs.getdbt.com/docs/mesh/govern/model-contracts"]] },
  { title: "Business-Specific Data Quality", description: "Fabric supplies transformation engines but cannot define Brookfield’s validation rules, thresholds, ownership, or exception decisions.", response: "Data contracts and reusable tests using notebooks, dbt, Great Expectations, Soda, and assigned data stewards.", sources: [["Purview Data Quality", "https://learn.microsoft.com/en-us/purview/unified-catalog-data-quality"]] },
  { title: "ERP Mapping & Transaction Logic", description: "Source-to-destination field mappings, transaction semantics, idempotency, and destination-specific rules are custom solution assets.", response: "Metadata-driven mapping repository plus reusable dispatch and worker framework.", sources: [["Azure Integration Services", "https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/enterprise-integration/integration-services"]] },
  { title: "Operational Exception Management", description: "Retry policy, dead-letter handling, operator intervention, reconciliation, and resynchronization are not delivered as an out-of-box ERP operations console.", response: "Fabric SQL dispatch state, Azure Monitor and Application Insights, plus Power Apps or ServiceNow for operator workflows.", sources: [["Fabric Monitoring Hub", "https://learn.microsoft.com/en-us/fabric/admin/monitoring-hub"], ["Service Bus Dead-Letter Queues", "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues"]] },
  { title: "Governance Operating Model", description: "Purview, Entra ID, OneLake security, and monitoring provide controls but do not supply accountability, support processes, or KPI ownership.", response: "Platform operating model with domain owners, access reviews, FinOps, policy-as-code, support SLAs, and stewardship.", sources: [["Fabric Governance & Compliance", "https://learn.microsoft.com/en-us/fabric/governance/governance-compliance-overview"]] }
  ,{ title: "Git Is Not Fabric Backup", description: "Git versions supported item definitions, not operational data, credentials, complete workspace state, or unsupported item types.", response: "Combine Git with item-definition exports, independently protected data, configuration inventories, and tested workspace recovery automation.", sources: [["Fabric Git Integration", "https://learn.microsoft.com/en-us/fabric/cicd/git-integration/intro-to-git-integration"]] }
  ,{ title: "No Customer-Controlled Active-Active Region", description: "OneLake geo-replication improves survivability, but regional failover is Microsoft-controlled and many workloads become unavailable or read-only.", response: "Maintain deployable definitions, cross-region data protection where required, capacity runbooks, and tested manual recovery procedures.", sources: [["Fabric Reliability", "https://learn.microsoft.com/en-us/fabric/security/reliability-fabric"]] }
  ,{ title: "Workload-Specific Backup", description: "Fabric does not provide one universal backup and restore mechanism across every item, definition, configuration, and data store.", response: "Define recovery controls per workload; use Git for definitions, PITR where supported, independent storage copies, and documented reconstruction automation.", sources: [["Fabric SQL Backup", "https://learn.microsoft.com/en-us/fabric/database/sql/backup"], ["Fabric Reliability", "https://learn.microsoft.com/en-us/fabric/security/reliability-fabric"]] }
  ,{ title: "Private Networking Compatibility", description: "Private Link and managed private endpoint support varies by workload; some Copilot, Power BI, Eventstream, Eventhouse, shortcut, and data-agent paths are constrained.", response: "Validate private connectivity per item before disabling public access and document approved gateway or trusted-access alternatives.", sources: [["Fabric Private Links", "https://learn.microsoft.com/en-us/fabric/security/security-private-links-overview"]] }
  ,{ title: "Capacity Alerting & Long-Term FinOps", description: "Capacity Metrics provides detailed recent utilization but not built-in alerting, unrestricted semantic-model reuse, or a complete long-term chargeback system.", response: "Use Real-Time Hub capacity events, Azure Cost Management, and a governed custom allocation and retention model.", sources: [["Capacity Metrics App", "https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app"]] }
  ,{ title: "Direct Lake Guardrails", description: "Direct Lake remains subject to SKU, file, row-group, memory, and fallback behavior that can materially affect report performance.", response: "Engineer Delta tables, test capacity and concurrency, monitor fallback, and retain Import or DirectQuery where they fit better.", sources: [["Direct Lake Overview", "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-overview"]] }
  ,{ title: "AI Region, Network & Capacity Constraints", description: "Fabric Copilot and data-agent availability depends on capacity, region, tenant settings, and network configuration; AI requests consume shared capacity.", response: "Validate residency and private-network compatibility, isolate capacity where needed, and retain human review and responsible-AI controls.", sources: [["Copilot in Fabric", "https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-fabric-overview"], ["Copilot Consumption", "https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-fabric-consumption"]] }
];

const capabilities = [
  { id: "05.1", group: "Data & Analytics", icon: "05.1", title: "Data Platform & Lakehouse", tier: "Standard", status: "native", summary: "Central analytical storage and compute for structured and semi-structured data.", product: "Microsoft Fabric", components: ["OneLake", "Lakehouse", "Data Warehouse", "Direct Lake", "Fabric capacities"], license: "Fabric capacity (F SKU)", positioning: "Strong unified SaaS lakehouse for new builds. Data-engineering-heavy organizations may still select Databricks or Snowflake for maturity and portability.", options: ["Databricks", "Snowflake"], docs: "https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview" },
  { id: "05.2", group: "Data & Analytics", icon: "05.2", title: "Data Engineering & Pipelines", tier: "Standard", status: "native", summary: "Ingestion, transformation, orchestration, and scheduling of data movement.", product: "Microsoft Fabric Data Factory", components: ["Data Factory in Fabric", "Dataflow Gen2", "Data Pipelines", "Fabric Data Engineering", "Mirroring", "Copy Job", "OneLake Shortcuts"], license: "Fabric capacity (F SKU)", positioning: "Strong low-code ingestion with broad connectivity. Code-first teams may still prefer dbt or Airflow for orchestration.", options: ["dbt", "Informatica", "Fivetran", "Airflow"], docs: "https://learn.microsoft.com/en-us/fabric/data-factory/data-factory-overview" },
  { id: "05.3", group: "Data & Analytics", icon: "05.3", title: "Master & Reference Data Management", tier: "Advanced", status: "ecosystem", summary: "Golden-record definition, matching, survivorship, stewardship, and distribution of shared reference data.", product: "No first-party product", components: [], license: "Not applicable", positioning: "A genuine Microsoft portfolio gap. SQL Server Master Data Services has no current first-party successor; Profisee is a Microsoft-aligned partner product rather than a Microsoft service.", options: ["Profisee", "Informatica MDM", "Semarchy"], docs: "" },
  { id: "05.4", group: "Data & Analytics", icon: "05.4", title: "Data Governance & Catalogue", tier: "Standard", status: "native", summary: "Data ownership, glossary, classification, catalogue, lineage, and access policy.", product: "Microsoft Purview", components: ["Unified Catalog", "Data Map", "Business glossary & domains", "Classification", "Sensitivity labels"], license: "Azure consumption", positioning: "Strong Microsoft-native governance. Collibra or Alation may be preferred when stewardship workflow across heterogeneous, non-Microsoft estates dominates.", options: ["Collibra", "Alation"], docs: "https://learn.microsoft.com/en-us/purview/data-governance-overview" },
  { id: "05.5", group: "Data & Analytics", icon: "05.5", title: "Data Quality & Lineage", tier: "Advanced", status: "shared", summary: "Quality rules, profiling, issue management, freshness, and end-to-end lineage from source to report.", product: "Microsoft Purview", components: ["Data Quality in Unified Catalog", "Data profiling", "Quality rules & scans", "Data Map lineage", "Freshness monitoring"], license: "Azure consumption", positioning: "Native quality and lineage are developing quickly but remain relatively new. Regulated environments often use specialist products for deeper auditability.", options: ["Informatica Data Quality", "Ataccama", "Great Expectations"], docs: "https://learn.microsoft.com/en-us/purview/unified-catalog-data-quality" },
  { id: "05.6", group: "Data & Analytics", icon: "05.6", title: "Business Intelligence & Reporting", tier: "Essential", status: "native", summary: "Semantic models, dashboards, operational reporting, paginated reporting, and self-service analytics.", product: "Power BI", components: ["Semantic models", "Power BI reports", "Direct Lake mode", "Paginated reports", "Power BI Desktop"], license: "Power BI Pro; premium-class features require qualifying Fabric capacity", positioning: "Market-leading and deeply integrated with Fabric. Tableau and Qlik remain common where those visualization estates are already established.", options: ["Tableau", "Qlik"], docs: "https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview" },
  { id: "05.7", group: "Data & Analytics", icon: "05.7", title: "Advanced Analytics & Data Science", tier: "Advanced", status: "native", summary: "Statistical modeling, forecasting, notebooks, experimentation, MLOps, and managed inference.", product: "Azure Machine Learning & Fabric Data Science", components: ["Azure Machine Learning", "Fabric Data Science", "AutoML", "Managed endpoints", "MLflow integration"], license: "Azure consumption + Fabric capacity", positioning: "A full-featured Microsoft data-science and MLOps stack. Databricks remains common where teams are already lakehouse-native.", options: ["Databricks", "Dataiku"], docs: "https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning" },
  { id: "05.8", group: "Data & Analytics", icon: "05.8", title: "Data Contracts & Schema Management", tier: "Advanced", status: "ecosystem", summary: "Producer and consumer contracts, schema registry, schema evolution, and breaking-change prevention.", product: "No first-party product for batch and lakehouse contracts", components: [], license: "Not applicable", positioning: "A genuine gap for batch and lakehouse data. Purview records lineage after the fact, while permissive schema drift can absorb rather than prevent breaking changes.", options: ["dbt Model Contracts", "Soda", "Confluent Schema Registry"], docs: "" },
  { id: "05.9", group: "Data & Analytics", icon: "05.9", title: "Real-Time & Streaming Analytics", tier: "Advanced", status: "native", summary: "Continuous processing of events, telemetry, and change streams for operational decisions.", product: "Microsoft Fabric Real-Time Intelligence", components: ["Real-Time Hub", "Eventstream", "Eventhouse / KQL Database", "Azure Event Hubs", "Azure Stream Analytics"], license: "Fabric capacity (F SKU)", positioning: "Strong end-to-end streaming and telemetry. Kafka-native or ultra-low-latency estates may still use Confluent or structured-streaming platforms.", options: ["Confluent", "Databricks Structured Streaming"], docs: "https://learn.microsoft.com/en-us/fabric/real-time-intelligence/overview" },
  { id: "05.10", group: "Data & Analytics", icon: "05.10", title: "Operational Historian & Asset Context", tier: "Standard", status: "shared", summary: "High-fidelity time-series retention with asset hierarchy and engineering context.", product: "Azure Digital Twins & Fabric Digital Twin Builder", components: ["Azure Digital Twins", "Digital Twin Builder in Fabric (preview)", "Eventhouse time-series retention", "Eventstream historian ingestion"], license: "Azure consumption + Fabric capacity", positioning: "Fabric can retain and contextualize operational time series, but Microsoft does not provide a complete plant historian with deterministic retention, edge store-and-forward, or an ISA-95 framework.", options: ["AVEVA PI System", "Aspen InfoPlus.21", "Canary"], docs: "https://learn.microsoft.com/en-us/fabric/real-time-intelligence/digital-twin-builder/overview" },

  { id: "06.1", group: "Integration & Automation", icon: "06.1", title: "API Management", tier: "Standard", status: "native", summary: "Publication, gateway policy, versioning, throttling, and governed consumption of interfaces.", product: "Azure API Management", components: ["API gateway", "Developer portal", "Versions & revisions", "Policy engine", "Self-hosted gateway"], license: "Azure consumption", positioning: "Solid full-lifecycle API management. Apigee or Kong may be preferred for advanced monetization or heavy multi-cloud federation.", options: ["Apigee", "Kong"], docs: "https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts" },
  { id: "06.2", group: "Integration & Automation", icon: "06.2", title: "Application & Data Integration", tier: "Standard", status: "native", summary: "Point-to-point and hub integration, connectors, mapping, and transformation between systems.", product: "Azure Integration Services", components: ["Azure Logic Apps", "Azure Functions", "1,400+ connectors", "Service Bus", "Data Factory"], license: "Azure consumption", positioning: "Strong iPaaS for Azure-centric estates. MuleSoft and Boomi can lead in large heterogeneous or on-premises integration landscapes.", options: ["MuleSoft", "Boomi"], docs: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview" },
  { id: "06.3", group: "Integration & Automation", icon: "06.3", title: "Event Streaming & Messaging", tier: "Advanced", status: "native", summary: "Publish/subscribe backbone, queues, topics, dead-lettering, and event-driven distribution.", product: "Azure Messaging Services", components: ["Azure Service Bus", "Azure Event Hubs", "Azure Event Grid", "Kafka-compatible endpoints", "Schema Registry"], license: "Azure consumption", positioning: "Comprehensive Azure-native messaging. Confluent is often preferred where an event-log standard or cross-cloud portability is mandatory.", options: ["Confluent Kafka", "RabbitMQ"], docs: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview" },
  { id: "06.4", group: "Integration & Automation", icon: "06.4", title: "Business Process Automation", tier: "Standard", status: "native", summary: "Workflow orchestration, approvals, and long-running business process automation.", product: "Power Automate", components: ["Cloud flows", "Approvals", "Process mining", "AI Builder", "Business process flows"], license: "Power Automate Premium", positioning: "Excellent for Microsoft-centric approvals and workflow. Heavy stateful BPM and case management may require Camunda, Pega, or Appian.", options: ["ServiceNow Workflow", "Camunda", "Pega", "Appian"], docs: "https://learn.microsoft.com/en-us/power-automate/getting-started" },
  { id: "06.5", group: "Integration & Automation", icon: "06.5", title: "Robotic Process Automation", tier: "Advanced", status: "native", summary: "User-interface automation for tasks in systems without suitable APIs.", product: "Power Automate Desktop", components: ["Attended RPA", "Unattended RPA", "Hosted RPA", "Desktop flows", "Process advisor"], license: "Add-on: unattended RPA", positioning: "Competitive inside the Microsoft stack. UiPath can be stronger for very large attended and unattended robot estates with complex orchestration.", options: ["UiPath", "Automation Anywhere"], docs: "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction" },
  { id: "06.6", group: "Integration & Automation", icon: "06.6", title: "Low-Code Application Platform", tier: "Standard", status: "native", summary: "Citizen and professional low-code application development with platform governance.", product: "Microsoft Power Apps", components: ["Canvas apps", "Model-driven apps", "Microsoft Dataverse", "Managed Environments", "Power Platform admin center"], license: "Power Apps per-app or per-user", positioning: "A leading enterprise low-code platform with mature governance controls; cost at scale and licensing complexity are the usual constraints.", options: ["OutSystems", "Mendix"], docs: "https://learn.microsoft.com/en-us/power-apps/powerapps-overview" },
  { id: "06.7", group: "Integration & Automation", icon: "06.7", title: "B2B & Partner Integration", tier: "Advanced", status: "shared", summary: "Trading-partner interfaces, managed file exchange, and industry protocol integration.", product: "Azure Logic Apps Enterprise Integration Pack", components: ["Integration accounts", "AS2", "X12 & EDIFACT", "RosettaNet", "Trading partner management"], license: "Azure consumption", positioning: "Covers core EDI protocols, but dedicated value-added networks remain stronger for high-volume trading-partner operations.", options: ["OpenText Business Network", "SPS Commerce", "Cleo"], docs: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-enterprise-integration-overview" },
  { id: "06.8", group: "Integration & Automation", icon: "06.8", title: "Integration Operations & Observability", tier: "Standard", status: "shared", summary: "Cross-engine monitoring, failure triage, dead-letter handling, replay, and source-to-destination reconciliation.", product: "Azure Monitor & Fabric Monitoring Hub", components: ["Fabric Monitoring Hub", "Workspace Monitoring", "Fabric Activator", "Application Insights", "Logic Apps run history"], license: "Azure consumption", positioning: "Individual engines expose useful run history, but there is no single console across Fabric, Logic Apps, Power Automate, and Functions with unified resubmission and reconciliation.", options: ["Datadog", "Monte Carlo"], docs: "https://learn.microsoft.com/en-us/fabric/admin/monitoring-hub" },
  { id: "06.9", group: "Integration & Automation", icon: "06.9", title: "Industrial Connectivity & OT-IT Integration", tier: "Standard", status: "shared", summary: "Acquire, normalize, contextualize, and move plant and asset data across the OT-to-corporate boundary.", product: "Azure IoT Operations", components: ["Edge MQTT broker", "OPC UA connector", "Data flows", "Azure Device Registry", "Arc-enabled Kubernetes"], license: "Azure consumption", positioning: "A strong open-standards edge data plane, but not a control system. Legacy protocols still need specialist gateways and disconnected operation has practical limits.", options: ["HighByte", "PTC Kepware", "Litmus"], docs: "https://learn.microsoft.com/en-us/azure/iot-operations/overview-iot-operations" },

  { id: "dispatch", group: "ERP Synchronization Implementation", icon: "B1", title: "Metadata-Driven Dispatch", tier: "Standard", status: "native", summary: "Mapping registry, durable work state, attempt history, exclusions, and source-record pointers.", product: "SQL Database in Fabric + Data Pipelines", components: ["Source-to-destination mapping", "SyncDispatchWorkTable", "Processing attempt history", "Atomic work claims"], license: "Fabric capacity", positioning: "Fabric supplies the storage and orchestration primitives; the reusable dispatch framework, claim semantics, mapping version binding, and audit behavior are solution code.", options: ["Azure Service Bus for native queue semantics"], docs: "https://learn.microsoft.com/en-us/fabric/database/sql/overview" },
  { id: "workers", group: "ERP Synchronization Implementation", icon: "B2", title: "Destination ERP Update", tier: "Advanced", status: "ecosystem", summary: "Execute destination transactions through API, RPA, computer-use, or human-assisted workers.", product: "No universal first-party ERP write-back product", components: ["Azure Functions", "Azure Web Apps", "Power Automate Desktop", "Computer-use agents"], license: "Varies by worker method", positioning: "Fabric can select and dispatch work but cannot universally perform destination-specific ERP transactions. Workers must be idempotent, least-privileged, observable, and governed.", options: ["UiPath", "Automation Anywhere", "Custom API workers", "Human workflow"], docs: "" },
  { id: "operations", group: "ERP Synchronization Implementation", icon: "OPS", title: "Operational Recovery & Resynchronization", tier: "Standard", status: "shared", summary: "Monitor, investigate, retry, reconcile, exclude, and resynchronize work independently of analytics.", product: "Fabric Monitoring + Azure Monitor + custom operator experience", components: ["Work status", "Attempt limits", "Poison-record handling", "On-demand resync", "State reconciliation"], license: "Azure consumption + Fabric capacity", positioning: "Monitoring primitives exist, but cross-engine exception workflow and proof that destination state matches source intent must be built or bought.", options: ["Power Apps", "ServiceNow", "Datadog", "Monte Carlo"], docs: "https://learn.microsoft.com/en-us/fabric/admin/monitoring-hub" },

  { id: "ALM.1", group: "Platform Engineering & CI/CD", icon: "AL1", title: "Git Integration", tier: "Essential", status: "shared", summary: "Workspace-scoped source control through GitHub, GitHub Enterprise Cloud, or Azure DevOps.", product: "Microsoft Fabric Git Integration", components: ["GitHub", "GitHub Enterprise Cloud", "Azure Repos", "Workspace Git status", "Fabric Git REST APIs"], license: "Fabric capacity plus Git-provider access", positioning: "Native source control for supported item definitions, but not universal item coverage or workspace backup. Unsupported items are ignored and several supported types remain preview.", options: ["Fabric CLI", "fabric-cicd", "Item Definition APIs"], docs: "https://learn.microsoft.com/en-us/fabric/cicd/git-integration/intro-to-git-integration" },
  { id: "ALM.2", group: "Platform Engineering & CI/CD", icon: "AL2", title: "Deployment Pipelines", tier: "Essential", status: "shared", summary: "Low-code promotion across configurable development, test, and production stages.", product: "Fabric Deployment Pipelines", components: ["2–10 stages", "Item pairing", "Selective deployment", "Deployment rules", "Dependency autobinding"], license: "Fabric subscription and suitable workspace capacity", positioning: "Strong native promotion mechanism, but supported item types vary, data usually is not copied, gateway mappings need attention, and dependency binding is not transactionally complete.", options: ["fabric-cicd", "Definition-based REST deployment"], docs: "https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/intro-to-deployment-pipelines" },
  { id: "ALM.3", group: "Platform Engineering & CI/CD", icon: "AL3", title: "Automated CI/CD APIs & Tooling", tier: "Standard", status: "native", summary: "Automate Fabric lifecycle through GitHub Actions, Azure Pipelines, REST APIs, CLI, and Terraform.", product: "Fabric REST APIs & Fabric CLI", components: ["Git APIs", "Deployment Pipeline APIs", "Item definitions", "Job APIs", "Fabric CLI", "Terraform provider"], license: "Fabric capacity plus selected CI/CD orchestrator", positioning: "A strong automation foundation, but portal parity depends on whether each item exposes a stable definition and API.", options: ["GitHub Actions", "Azure Pipelines", "fabric-cicd", "Terraform"], docs: "https://learn.microsoft.com/en-us/fabric/cicd/cicd-overview" },
  { id: "ALM.4", group: "Platform Engineering & CI/CD", icon: "AL4", title: "Environment Configuration & Promotion", tier: "Standard", status: "shared", summary: "Manage environment-specific values, dependency binding, and workspace-per-stage promotion.", product: "Variable Library & Deployment Pipelines", components: ["Variable value sets", "Deployment rules", "Autobinding", "Definition transformation", "Post-deployment APIs"], license: "Fabric capacity", positioning: "Useful environment-aware configuration, but not a universal secret or dependency system; some identifiers require transformation or post-deployment repair.", options: ["Azure Key Vault", "Build-time transforms", "REST post-deployment steps"], docs: "https://learn.microsoft.com/en-us/fabric/cicd/manage-deployment" },

  { id: "BCDR.1", group: "Reliability & BCDR", icon: "R1", title: "Availability-Zone Resilience", tier: "Essential", status: "native", summary: "Platform-managed distribution and rebalancing across Azure availability zones.", product: "Microsoft Fabric & OneLake", components: ["Zone distribution", "Automatic rebalancing", "OneLake resilience"], license: "Included with applicable Fabric capacity", positioning: "Good in-region resilience, but some Spark jobs and SQL queries can fail during zone events and require customer retry behavior.", options: ["Application retry policies", "ZRS for external ADLS Gen2"], docs: "https://learn.microsoft.com/en-us/fabric/security/reliability-fabric" },
  { id: "BCDR.2", group: "Reliability & BCDR", icon: "R2", title: "OneLake Cross-Region Disaster Recovery", tier: "Advanced", status: "shared", summary: "Capacity-level geo-replication of OneLake data into a supported paired region.", product: "OneLake BCDR", components: ["Capacity DR switch", "Geo-replicated OneLake data", "BCDR storage and operation meters"], license: "Fabric capacity plus replicated storage and transaction charges", positioning: "A data-survivability feature, not active-active Fabric. Failover is Microsoft-controlled, many workloads are unavailable, and complete recovery remains manual.", options: ["Git definitions", "Cross-region copies", "Recovery automation"], docs: "https://learn.microsoft.com/en-us/fabric/security/reliability-fabric" },
  { id: "BCDR.3", group: "Reliability & BCDR", icon: "R3", title: "Power BI Regional BCDR", tier: "Essential", status: "shared", summary: "Paired-region continuity for reports, dashboards, and semantic models.", product: "Power BI in Fabric", components: ["Geo-redundant storage", "Azure SQL geo-replication", "Read-only regional failover"], license: "Included for supported regional pairs", positioning: "Preserves read access during a regional event, but refresh, publishing, and metadata changes are unavailable during failover.", options: ["Validated regional strategy", "Offline executive reporting"], docs: "https://learn.microsoft.com/en-us/fabric/security/reliability-fabric" },
  { id: "BCDR.4", group: "Reliability & BCDR", icon: "R4", title: "Fabric SQL Backup & Point-in-Time Restore", tier: "Standard", status: "shared", summary: "Automatic backup and short-term point-in-time recovery for Fabric SQL databases.", product: "SQL Database in Microsoft Fabric", components: ["Full backups", "Differential backups", "Transaction-log backups", "1–35 day PITR"], license: "Fabric SQL capacity and backup storage", positioning: "Operational recovery only: backups are not geo-replicated, restore is same-workspace and portal-only, and long-term retention is unavailable.", options: ["Independent export or replication"], docs: "https://learn.microsoft.com/en-us/fabric/database/sql/backup" },
  { id: "BCDR.5", group: "Reliability & BCDR", icon: "R5", title: "Regional & Multi-Geo Placement", tier: "Advanced", status: "shared", summary: "Place workspace compute and item data in supported remote capacity regions.", product: "Fabric Multi-Geo", components: ["Home region", "Remote capacity regions", "Regional feature matrix"], license: "Fabric capacity in each selected region", positioning: "Supports residency and placement, but does not relocate all tenant metadata or create an active-active topology. Feature availability remains region-specific.", options: ["Regional landing-zone standards"], docs: "https://learn.microsoft.com/en-us/fabric/admin/region-availability" },

  { id: "FIN.1", group: "Capacity & FinOps", icon: "F1", title: "Capacity Sizing & Workload Isolation", tier: "Essential", status: "native", summary: "Size F capacities and isolate production, development, and high-impact workloads.", product: "Microsoft Fabric F Capacities", components: ["F2–F8192 SKUs", "Capacity Units", "Workspace assignment", "SKU estimator"], license: "Pay-as-you-go or reserved F SKU", positioning: "Native resource pools provide clear workload placement; separate capacities are required for hard performance and chargeback isolation.", options: ["Separate Dev/Test/Prod capacities"], docs: "https://learn.microsoft.com/en-us/fabric/enterprise/plan-capacity" },
  { id: "FIN.2", group: "Capacity & FinOps", icon: "F2", title: "Scale, Pause & Cost Controls", tier: "Standard", status: "native", summary: "Scale, pause, resume, and automate Azure Fabric capacity resources.", product: "Azure Fabric Capacity", components: ["Scale up/down", "Pause/resume APIs", "Azure Automation", "Reservations"], license: "F SKU; pay-as-you-go or reserved", positioning: "Useful FinOps controls, but pausing is not workload-aware, outstanding overages remain billable, and safe drain/scheduling needs external automation.", options: ["Azure Automation", "Scheduled runbooks"], docs: "https://learn.microsoft.com/en-us/fabric/enterprise/pause-resume" },
  { id: "FIN.3", group: "Capacity & FinOps", icon: "F3", title: "Capacity Metrics & Chargeback", tier: "Essential", status: "shared", summary: "Analyze CU usage, throttling, storage, and workspace/item/operation attribution.", product: "Fabric Capacity Metrics App", components: ["14-day compute", "30-day storage", "Timepoint drill-down", "Throttling analysis", "Autoscale visibility"], license: "Installed by a capacity administrator", positioning: "Best native utilization source, but lacks built-in alerts, unrestricted semantic-model reuse, allocation policy, and long-term enterprise retention.", options: ["Real-Time Hub events", "Azure Cost Management", "Custom chargeback model"], docs: "https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app" },

  { id: "PBI.1", group: "Power BI & AI", icon: "P1", title: "Direct Lake Semantic Models", tier: "Standard", status: "shared", summary: "Query curated Delta data through VertiPaq without maintaining a complete import copy.", product: "Power BI Direct Lake & OneLake", components: ["Direct Lake on OneLake", "Direct Lake on SQL", "VertiPaq framing", "Delta tables"], license: "Fabric capacity with SKU guardrails", positioning: "Preferred for many large OneLake models, but file layout, row groups, memory, unsupported model features, and DirectQuery fallback still require engineering and capacity testing.", options: ["Import", "DirectQuery", "Composite models"], docs: "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-overview" },
  { id: "AI.1", group: "Power BI & AI", icon: "A1", title: "Copilot Across Fabric Workloads", tier: "Standard", status: "shared", summary: "Natural-language assistance for Power BI, notebooks, Data Factory, Warehouse, SQL, and Real-Time Intelligence.", product: "Copilot in Fabric & Power BI", components: ["Report assistance", "Code generation", "NL-to-SQL", "NL-to-KQL", "Dataflow assistance"], license: "Eligible paid Fabric or Power BI capacity; token usage consumes CUs", positioning: "A broad productivity assistant requiring human review. Availability depends on region, tenant controls, capacity, networking, and cross-geo AI settings.", options: ["Microsoft Foundry", "Copilot Studio"], docs: "https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-fabric-overview" },
  { id: "AI.2", group: "Power BI & AI", icon: "A2", title: "Fabric Data Agents", tier: "Advanced", status: "shared", summary: "Governed conversational access across SQL, DAX, KQL, OneLake data, and ontologies.", product: "Fabric Data Agent", components: ["NL2SQL", "NL2DAX", "NL2KQL", "Graph integration", "Up to 5 configured sources"], license: "Eligible paid capacity; AI consumption applies", positioning: "Read-only, permission-aware conversational analytics—not a write-capable enterprise agent or guaranteed semantic compiler. Private-link and source constraints apply.", options: ["Microsoft Foundry Agent Service", "Copilot Studio"], docs: "https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent" },
  { id: "AI.3", group: "Power BI & AI", icon: "A3", title: "Prebuilt AI Services", tier: "Advanced", status: "shared", summary: "Apply hosted language, embedding, text analytics, translation, and AI functions from Fabric.", product: "Microsoft Foundry Tools in Fabric", components: ["Azure OpenAI models", "Embeddings", "Text Analytics", "Translator", "AI Functions", "SynapseML"], license: "Fabric Copilot/AI meter; BYOK uses separate Azure resources", positioning: "Convenient integrated enrichment, but preview status, model selection, region, networking, and separate AI metering require validation.", options: ["Bring Your Own Key", "Azure OpenAI", "Microsoft Foundry"], docs: "https://learn.microsoft.com/en-us/fabric/data-science/ai-services/ai-services-overview" },

  { id: "SEC.1", group: "Security & Networking", icon: "S1", title: "Identity & Authorization Foundation", tier: "Essential", status: "native", summary: "Entra authentication, service principals, Conditional Access, workspace/item permissions, and data-level controls.", product: "Microsoft Entra ID & Fabric", components: ["Entra authentication", "Service principals", "Conditional Access", "Workspace roles", "RLS / CLS / OLS"], license: "Fabric plus applicable Entra licensing", positioning: "Strong native identity foundation, but security semantics differ by item and workspace roles can bypass consumer-level Power BI RLS.", options: ["Least-privilege workspace design"], docs: "https://learn.microsoft.com/en-us/fabric/security/security-overview" },
  { id: "SEC.2", group: "Security & Networking", icon: "S2", title: "Workspace Identity & Secretless Access", tier: "Standard", status: "shared", summary: "Fabric-managed service identity for supported workspace connections and trusted access.", product: "Fabric Workspace Identity", components: ["Managed service principal", "Trusted workspace access", "Connection authentication"], license: "Fabric capacity; some trusted access requires purchased F SKU", positioning: "Preferred for supported connections, but it is not identical to Azure Managed Identity, support is not universal, and deleted identities cannot be restored.", options: ["Service principals", "Managed identities"], docs: "https://learn.microsoft.com/en-us/fabric/security/workspace-identity" },
  { id: "SEC.3", group: "Security & Networking", icon: "S3", title: "Private Networking", tier: "Advanced", status: "shared", summary: "Inbound Private Link and selected outbound private connectivity for Fabric workloads.", product: "Fabric Private Links & Managed Private Endpoints", components: ["Tenant private links", "Workspace private links", "Managed private endpoints", "Trusted workspace access", "Gateways"], license: "Fabric capacity plus applicable Azure networking charges", positioning: "Not universal across Fabric. Copilot and several Power BI, Purview, Eventhouse, Eventstream, shortcut, and data-agent paths can be unsupported or constrained.", options: ["VNet gateway", "On-premises gateway", "Trusted workspace access"], docs: "https://learn.microsoft.com/en-us/fabric/security/security-private-links-overview" },
  { id: "SEC.4", group: "Security & Networking", icon: "S4", title: "Encryption & Customer-Managed Keys", tier: "Advanced", status: "shared", summary: "Microsoft-managed encryption, TLS, and workspace-scoped customer-managed key controls.", product: "Microsoft Fabric & Azure Key Vault", components: ["Encryption at rest", "TLS 1.2+", "Workspace CMK", "Key Vault"], license: "Fabric plus Azure Key Vault and eligible capacity", positioning: "Strong baseline encryption, but CMK is workspace-scoped and not universal end-to-end control over every metadata, telemetry, backup, or external store.", options: ["Azure Key Vault"], docs: "https://learn.microsoft.com/en-us/fabric/security/security-fundamentals" },

  { id: "OPS.1", group: "Operations & Audit", icon: "O1", title: "Monitoring Hub", tier: "Essential", status: "shared", summary: "Central view of supported Fabric job health, progress, history, errors, and notifications.", product: "Fabric Monitoring Hub", components: ["Job status", "Run history", "Error details", "Failure notifications"], license: "Available according to item permissions", positioning: "Useful troubleshooting console, but limited by item support, recent activity windows, and notification coverage; it is not an enterprise telemetry platform.", options: ["Workspace Monitoring", "Azure Monitor"], docs: "https://learn.microsoft.com/en-us/fabric/admin/monitoring-hub" },
  { id: "OPS.2", group: "Operations & Audit", icon: "O2", title: "Workspace Monitoring", tier: "Standard", status: "shared", summary: "Store supported workspace logs and metrics in an Eventhouse for KQL analysis and dashboards.", product: "Fabric Workspace Monitoring", components: ["Monitoring Eventhouse", "KQL / SQL queries", "Real-time streaming", "Item logs and metrics"], license: "Capacity consumption for Eventhouse and Eventstream", positioning: "Strong native telemetry store, but retention is fixed at 30 days, coverage is item-specific, private links are unsupported, and ingestion categories cannot be filtered.", options: ["Azure Log Analytics", "External SIEM"], docs: "https://learn.microsoft.com/en-us/fabric/fundamentals/workspace-monitoring-overview" },
  { id: "OPS.3", group: "Operations & Audit", icon: "O3", title: "Tenant Administration & Audit", tier: "Essential", status: "shared", summary: "Tenant usage, governance reporting, scanner APIs, and user activity audit.", product: "Admin Monitoring Workspace & Microsoft Purview Audit", components: ["Tenant reports", "Usage semantic models", "Fabric activity audit", "Scanner APIs"], license: "Fabric administrator; Purview licensing varies by retention/features", positioning: "Useful governance telemetry, but the admin workspace is read-only and daily-refresh—not a low-latency, immutable enterprise observability platform.", options: ["Purview Audit Premium", "External SIEM"], docs: "https://learn.microsoft.com/en-us/fabric/admin/track-user-activities" }
];

const groups = [...new Set(capabilities.map(item => item.group))];
const viewNames = ["overview", "capabilities", "architecture", "decision"];
const dialog = document.querySelector("#capability-dialog");
const searchInput = document.querySelector("#capability-search");
let activeFilter = "all";

function statusPill(status) {
  return `<span class="status-pill">${statusMeta[status].label}</span>`;
}

function detailMarkup(item) {
  const components = item.components?.length ? item.components : ["No first-party components"];
  const primaryReference = item.docs
    ? `<a class="docs-link" href="${item.docs}" target="_blank" rel="noopener noreferrer">Open Primary Product Reference <span aria-hidden="true">↗</span></a>`
    : `<span class="no-reference">No first-party product reference</span>`;
  return `
    <div class="detail-grid">
      <div><span>Coverage</span><strong style="color:${statusMeta[item.status].color}">${statusMeta[item.status].label}</strong></div>
      <div><span>Tier</span><strong>${item.tier}</strong></div>
      <div><span>Microsoft</span><strong>${item.product}</strong></div>
      <div><span>Licensing</span><strong>${item.license}</strong></div>
    </div>
    <section class="detail-section"><h3>Components</h3><div class="option-chips">${components.map(component => `<span>${component}</span>`).join("")}</div></section>
    <section class="detail-section"><h3>Alternatives</h3><div class="option-chips">${item.options.map(option => `<span>${option}</span>`).join("")}</div></section>
    <section class="detail-section"><h3>Positioning</h3><p>${item.positioning}</p></section>
    <section class="detail-section"><h3>Sources</h3><div class="source-links">${primaryReference}</div></section>`;
}

function openCapability(id) {
  const item = capabilities.find(capability => capability.id === id);
  if (!item) return;
  document.querySelector("#dialog-category").textContent = `${item.id} · ${item.group}`;
  document.querySelector("#dialog-title").textContent = item.title;
  document.querySelector("#dialog-body").innerHTML = `<p class="dialog-summary">${item.summary}</p>${detailMarkup(item)}`;
  if (!dialog.open) dialog.showModal();
}

function renderOverview() {
  const featured = ["05.1", "05.4", "05.6", "05.8", "dispatch", "workers"];
  document.querySelector("#overview-cards").innerHTML = featured.map(id => {
    const item = capabilities.find(capability => capability.id === id);
    return `<button class="coverage-card" type="button" data-capability="${item.id}" style="--status-color:${statusMeta[item.status].color}">
      <span class="card-top">${statusPill(item.status)}<span class="card-arrow" aria-hidden="true">↗</span></span>
      <h3>${item.title}</h3><p>${item.summary}</p></button>`;
  }).join("");
  ["native", "shared"].forEach(status => {
    document.querySelector(`#metric-${status}`).textContent = capabilities.filter(item => item.status === status).length;
  });
  document.querySelector("#metric-gaps").textContent = gaps.length;
  document.querySelector("#gap-register").innerHTML = gaps.map((gap, index) => `<article class="gap-card">
    <span class="gap-number">G${String(index + 1).padStart(2, "0")}</span>
    <div><h3>${gap.title}</h3><p>${gap.description}</p><div class="gap-response"><span>How to Close It</span><strong>${gap.response}</strong></div>
    <div class="gap-sources"><span>Sources</span>${gap.sources.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} <i aria-hidden="true">↗</i></a>`).join("")}</div></div>
  </article>`).join("");
}

function renderCapabilities() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = capabilities.filter(item => {
    const matchesFilter = activeFilter === "all" || item.status === activeFilter;
    const haystack = [item.id, item.title, item.group, item.summary, item.product, item.positioning, item.license, ...item.components, ...item.options].join(" ").toLowerCase();
    return matchesFilter && haystack.includes(query);
  });
  document.querySelector("#result-count").textContent = `${filtered.length} of ${capabilities.length} capabilities shown`;
  const html = groups.map(group => {
    const items = filtered.filter(item => item.group === group);
    if (!items.length) return "";
    const counts = ["native", "shared", "ecosystem"].map(status => {
      const count = items.filter(item => item.status === status).length;
      return count ? `<span class="group-count ${status}">${count} ${statusMeta[status].label}</span>` : "";
    }).join("");
    return `<section><div class="group-heading"><h2>${group}</h2><span>${items.length} capabilities</span><i class="group-line"></i><div class="group-counts">${counts}</div></div>
      <div class="capability-list">${items.map(item => `<article class="capability-entry" style="--status-color:${statusMeta[item.status].color}">
        <button class="capability-row" type="button" data-inline-capability="${item.id}" aria-expanded="false" aria-controls="detail-${item.id.replace(".", "-")}">
          <span class="row-chevron" aria-hidden="true">›</span><span class="capability-icon">${item.icon}</span><span><strong>${item.title}</strong><small>${item.summary}</small></span>
          <span class="row-meta"><em>${item.tier}</em>${statusPill(item.status)}</span>
        </button>
        <div class="capability-detail" id="detail-${item.id.replace(".", "-")}" hidden><div class="inline-detail">${detailMarkup(item)}</div></div>
      </article>`).join("")}</div></section>`;
  }).join("");
  document.querySelector("#capability-groups").innerHTML = html || `<div class="empty-state">No capabilities match this search and coverage filter.</div>`;
}

function getView() {
  const params = new URLSearchParams(location.search);
  const requested = params.get("view");
  return viewNames.includes(requested) ? requested : "overview";
}

function applyUrlState() {
  const params = new URLSearchParams(location.search);
  const filter = params.get("filter");
  if (getView() === "capabilities" && ["all", "native", "shared", "ecosystem"].includes(filter)) {
    activeFilter = filter;
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
    });
    renderCapabilities();
  }
  document.querySelector(".gap-section")?.classList.remove("section-focus");
  if (getView() === "overview" && params.get("section") === "gaps") {
    requestAnimationFrame(() => {
      const section = document.querySelector(".gap-section");
      section?.classList.add("section-focus");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  const capabilityId = params.get("cap");
  if (getView() === "capabilities" && capabilityId) {
    requestAnimationFrame(() => {
      const trigger = document.querySelector(`[data-inline-capability="${CSS.escape(capabilityId)}"]`);
      if (trigger && trigger.getAttribute("aria-expanded") !== "true") trigger.click();
      trigger?.scrollIntoView({ behavior: "auto", block: "center" });
    });
  }
}

function showView(view) {
  document.querySelectorAll(".view").forEach(section => { section.hidden = section.dataset.view !== view; });
  document.querySelectorAll("[data-view-link]").forEach(link => {
    if (link.dataset.viewLink === view) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.title = `${view === "overview" ? "Fabric Platform Navigator" : document.querySelector(`[data-view="${view}"] h1`).textContent} | Brookfield`;
  window.scrollTo(0, 0);
}

function navigate(event) {
  const link = event.target.closest("[data-view-link], a.button, a.text-link, a.brand, a.metric-link");
  if (!link || !link.href || new URL(link.href).origin !== location.origin) return;
  event.preventDefault();
  const url = new URL(link.href);
  history.pushState({}, "", url);
  showView(getView());
  applyUrlState();
}

function recommendationFor(values) {
  const { latency, source, transform } = values;
  if (transform === "complex") return { id: "05.2", name: "Data Pipeline + Spark Notebook", why: ["You need custom or parameterized logic.", "Pipelines provide control flow and operational orchestration.", "Spark handles unsupported or compute-intensive transformations."], alt: "Use a Pipeline alone when activities and stored procedures cover the logic." };
  if (latency === "realtime" && source === "stream") return { id: "05.9", name: "Eventstream", why: ["The source emits a continuous event feed.", "Real-Time Intelligence supports filtering and routing before storage.", "Eventhouse is optimized for high-volume, time-oriented data."], alt: "Use Spark Structured Streaming when processing exceeds Eventstream’s light transformations." };
  if (latency === "realtime" && source === "database") return { id: "05.2", name: "Database Mirroring", why: ["Near-real-time database replication is required.", "Mirroring minimizes code and operational overhead.", "Source-aligned Delta tables become available in OneLake."], alt: "Use Open Mirroring or partner CDC if the database is not natively supported." };
  if (source === "cloud" && transform === "none") return { id: "05.2", name: "OneLake Shortcut", why: ["The data already resides in supported cloud storage.", "No transformation is needed on arrival.", "Zero-copy access avoids movement and duplicate storage."], alt: "Use Copy Job when workload isolation or physical retention in OneLake is required." };
  if ((source === "files" || source === "cloud") && transform === "low") return { id: "05.2", name: "Dataflow Gen2", why: ["Low-code shaping is needed during ingestion.", "Power Query supports reusable cleansing and joins.", "The pattern is well suited to files and business data sources."], alt: "Use Copy Job when no shaping is needed, or Pipelines when orchestration grows." };
  return { id: "05.2", name: "Copy Job", why: ["The requirement is batch or scheduled.", "The movement pattern is straightforward.", "Copy Job supports simple bulk, watermark, and CDC delivery without full orchestration."], alt: "Use Data Pipelines when dependencies, parameters, or multi-step control flow are required." };
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("fabric-navigator-theme", theme);
  document.querySelector("#theme-toggle").setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
}

renderOverview();
renderCapabilities();
showView(getView());
applyUrlState();
setTheme(new URLSearchParams(location.search).get("theme") || localStorage.getItem("fabric-navigator-theme") || "dark");

document.addEventListener("click", event => {
  navigate(event);
  const inlineTrigger = event.target.closest("[data-inline-capability]");
  if (inlineTrigger) {
    const entry = inlineTrigger.closest(".capability-entry");
    const detail = entry.querySelector(".capability-detail");
    const expanded = inlineTrigger.getAttribute("aria-expanded") === "true";
    inlineTrigger.setAttribute("aria-expanded", String(!expanded));
    detail.hidden = expanded;
    entry.classList.toggle("open", !expanded);
    const url = new URL(location.href);
    if (expanded) url.searchParams.delete("cap");
    else url.searchParams.set("cap", inlineTrigger.dataset.inlineCapability);
    history.replaceState({}, "", url);
    return;
  }
  const capabilityTrigger = event.target.closest("[data-capability]");
  if (capabilityTrigger) openCapability(capabilityTrigger.dataset.capability);
});
window.addEventListener("popstate", () => {
  showView(getView());
  applyUrlState();
});
document.querySelector("#theme-toggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
searchInput.addEventListener("input", renderCapabilities);
document.querySelector(".filter-group").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  renderCapabilities();
});
document.querySelector("#decision-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const values = Object.fromEntries(data.entries());
  const missing = ["latency", "source", "transform"].filter(name => !values[name]);
  if (missing.length) {
    const fieldset = event.currentTarget.querySelector(`input[name="${missing[0]}"]`)?.closest("fieldset");
    fieldset?.querySelector("input")?.focus();
    document.querySelector("#recommendation").innerHTML = `<div class="recommendation-empty"><span aria-hidden="true">!</span><h2>Complete All 3 Questions</h2><p>Select one option in each section to generate a recommendation.</p></div>`;
    return;
  }
  const result = recommendationFor(values);
  document.querySelector("#recommendation").innerHTML = `<div class="recommendation-result">
    <span class="rank">Recommended Pattern</span><h2>${result.name}</h2><p>Start here, then validate source support, network connectivity, credentials, and required service capacity.</p>
    <div class="recommendation-reasons">${result.why.map(reason => `<span>${reason}</span>`).join("")}</div>
    <button class="button secondary" type="button" data-capability="${result.id}">Inspect Capability Details</button>
    <div class="alternative"><strong>When to escalate</strong><p>${result.alt}</p></div></div>`;
});
