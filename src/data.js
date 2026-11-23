/* Content for the Wipro · Boomi AI & Intelligent Integration Command Center.
   Evidence statements come from the candidate resume in /resume. Platform facts are from the
   vendor pages listed in SOURCES. Simulator output and payloads are illustrative, not client data. */
window.CC = (function () {
  'use strict';

  var META = {
    client: 'Wipro',
    title: 'Boomi AI & Intelligent Integration Command Center',
    role: 'Boomi Developer – AI & Intelligent Integration',
    version: '{{VERSION}}',
    date: '{{DATE}}',
    candidate: 'Kenneth P. Barnes'
  };

  var CATS = {
    design: 'Service Design & Development',
    test: 'Testing & Quality',
    deploy: 'Deployment & Production Readiness',
    ai: 'AI & Generative AI Integration',
    km: 'Knowledge Management & Improvement',
    tech: 'Required Technical Skills',
    aiskill: 'AI Skills',
    pref: 'Preferred Skills',
    exp: 'Experience Profile',
    comp: 'Key Competencies'
  };

  var PRACTICE = 'Integration practice delivered through UCS Solutions client engagements';
  var TXCN = 'State of Texas (TXDPS / TXHHS) and Chickasaw Nation API-management work (Apigee, MuleSoft, Boomi, ServiceNow)';

  /* [category, JD line, evidence from the resume, where it shows up, status] */
  var REQS = [
    ['design', 'Understand functional, technical and service design requirements and translate them into Boomi integration solutions.', 'Service designs translated into AtomSphere processes and subprocesses under the defined architecture and coding standards.', PRACTICE],
    ['design', 'Develop integrations using Boomi AtomSphere, following defined architecture, coding standards, reusable components and development processes.', '8 years hands-on Boomi: processes, subprocesses, connectors, profiles, maps and a reusable-component library.', PRACTICE],
    ['design', 'Build and maintain APIs, application integrations, data transformations, workflows and interfaces.', 'REST / SOAP APIs published through API Management; JSON, XML, flat-file and database profiles; maps with functions and scripting.', TXCN],
    ['design', 'Work with application subject-matter experts, architects and technical teams to clarify integration requirements and dependencies.', 'Requirements and dependencies settled with application SMEs, architects and technical teams across 400+ engagements.', 'UCS Solutions engagements; Amazon LeanIX, ServiceNow and Workday owners'],
    ['design', 'Provide technical inputs for effort estimation, solution design and delivery planning.', 'Scope estimation, forecasting and delivery planning; PMP, PgMP and SAFe certified.', 'UCS Solutions; Wipro; Humana'],

    ['test', 'Prepare unit test plans, test scenarios, test cases and test data for developed integrations.', 'Unit test plans, scenarios, cases and test data prepared for each integration.', PRACTICE],
    ['test', 'Perform unit testing and defect resolution before promoting integrations to higher environments.', 'Unit tests run and defects resolved before promotion to higher environments.', PRACTICE],
    ['test', 'Ensure appropriate error handling, exception management, logging and monitoring are incorporated into integrations.', 'Try / catch and exception frameworks, retry handling, structured logging, alerting and monitoring built into every process.', PRACTICE],
    ['test', 'Support integration, regression and production validation as required.', 'Integration, regression and production-validation support.', PRACTICE],

    ['deploy', 'Prepare and maintain deployment checklists covering configurations, dependencies, environment variables, credentials, rollback requirements and validation steps.', 'Deployment checklists owned end to end: configurations, dependencies, environment variables and extensions, credentials, rollback and validation.', PRACTICE],
    ['deploy', 'Support deployment of Boomi components across development, test, staging and production environments.', 'Boomi components deployed across development, test, staging and production.', PRACTICE],
    ['deploy', 'Create service user guides, support documentation and operational handover documents.', 'Service user guides, support documentation, runbooks and operational handover documents.', 'UCS Solutions; GE Appliances runbooks and trackers'],
    ['deploy', 'Assist support teams with troubleshooting and root-cause analysis for integration issues.', 'Troubleshooting and root-cause analysis with support teams; integration health monitored and synchronization failures resolved.', 'Amazon (LeanIX ↔ ServiceNow ↔ Workday integrations)'],

    ['ai', 'Understand core concepts of Generative AI, LLMs, prompt engineering, RAG, embeddings and vector search.', '5+ years production GenAI; LLMRAG-V3 framework with hybrid and GraphRAG retrieval, embeddings pipelines and evaluation.', 'LLMRAG-V3; State of Texas Claude + Bedrock RAG'],
    ['ai', 'Develop Boomi-based integrations that connect enterprise applications with AI services through REST APIs.', 'Boomi integrations calling AI services over REST with OAuth 2.0 authentication and token and cost controls.', PRACTICE],
    ['ai', 'Integrate AI services such as Azure OpenAI / OpenAI APIs or equivalent enterprise AI platforms where required.', 'Azure OpenAI, AWS Bedrock, Vertex AI and Claude integrated into enterprise workflows.', 'UCS Solutions; State of Texas; Humana; Ford'],
    ['ai', 'Use AI to enhance integration use cases: document / data processing, classification and enrichment, summarization, knowledge retrieval, error / incident analysis, workflow automation.', 'All six use cases covered with a reference pattern in this command center; summarization and document generation delivered with Copilot Studio agents.', 'State of Texas; Chickasaw Nation; CureSMA'],
    ['ai', 'Understand enterprise considerations around AI security, data privacy, access controls, hallucination management and responsible AI.', 'AI governance model on NIST AI RMF and ISO/IEC 42001; guardrails, evaluation gates, tracing and human approval; Sentinel AI platform.', 'Humana EA; GE Appliances; Sentinel AI'],
    ['ai', 'Leverage AI-assisted development capabilities to improve developer productivity, documentation, testing and troubleshooting.', 'Claude Code used for module generation, documentation and runbooks under reviewed, version-controlled workflows; Boomi AI and Boomi Companion on the platform side.', 'Wipro / Ford; GE Appliances; Humana'],

    ['km', 'Maintain the integration / service catalog with current service details, interfaces, dependencies, ownership and operational information.', 'Integration / service catalog upkeep; application inventories reconciled with system-of-record rules, ownership models and data-quality KPIs.', 'Amazon (LeanIX application portfolio); UCS Solutions'],
    ['km', 'Document and share lessons learned, reusable components, development patterns and troubleshooting guidance.', 'Lessons learned, reusable components, patterns and troubleshooting guides documented and shared; 30+ architects coached.', 'Amazon; UCS Solutions'],
    ['km', 'Identify opportunities to improve existing Boomi integrations through reusable frameworks, automation, performance optimization and AI-based capabilities.', 'Improvement through reusable frameworks, automation, performance optimization and AI-based capabilities.', PRACTICE],

    ['tech', 'Strong hands-on experience with Boomi AtomSphere.', '8 years hands-on, certified.', PRACTICE],
    ['tech', 'Experience developing Boomi processes and subprocesses, connectors, profiles and mappings, REST / SOAP web services, error-handling frameworks, scheduling and process deployment.', 'Each item is covered in the resume core competencies and integration experience block.', PRACTICE],
    ['tech', 'Good understanding of API-led integration, REST, JSON, XML, OAuth 2.0 and authentication mechanisms.', 'API-led design; REST, JSON, XML, OAuth 2.0, OIDC, JWT, mTLS; OAuth-secured FastAPI middleware at Amazon.', 'Amazon; ' + TXCN],
    ['tech', 'Experience integrating SaaS, cloud, databases and enterprise applications.', 'ServiceNow, Workday, SAP, LeanIX, SharePoint / Microsoft 365, SQL databases and Azure / AWS / GCP services.', 'Amazon; State of Texas; RCGGS'],
    ['tech', 'Working knowledge of SQL and data transformation.', 'SQL listed with data engineering depth (Spark, dbt, Kafka); mapping and transformation across profiles.', 'UCS Solutions; RCGGS'],
    ['tech', 'Understanding of CI/CD and integration deployment practices.', 'GitHub Actions and Azure DevOps pipelines; packaged-component deployment and environment promotion.', 'UCS Solutions; Humana; Ford'],
    ['tech', 'Good knowledge of unit testing and integration testing.', 'Unit and integration testing as release gates; evaluation-gated CI on AI pipelines.', PRACTICE],

    ['aiskill', 'Generative AI and LLM concepts.', 'Production LLM systems for 5+ years across Azure OpenAI, Bedrock, Vertex AI and Claude.', 'UCS Solutions'],
    ['aiskill', 'Prompt engineering.', 'Prompt orchestration, instruction design and guardrails.', 'UCS Solutions; Humana'],
    ['aiskill', 'AI / LLM APIs.', 'REST and SDK integration with Azure OpenAI, Bedrock, Vertex AI and Claude APIs.', 'UCS Solutions'],
    ['aiskill', 'RAG concepts.', 'Hybrid (BM25 + dense) retrieval, GraphRAG, re-ranking, query decomposition.', 'LLMRAG-V3; State of Texas'],
    ['aiskill', 'Embeddings and vector databases.', 'Embedding pipelines into Vertex AI Vector Search, Weaviate, Pinecone, Milvus and pgvector.', 'LLMRAG-V3'],
    ['aiskill', 'Enterprise AI security and responsible AI.', 'NIST AI RMF, ISO/IEC 42001, OWASP LLM Top 10; prompt-injection defenses; CISSP, CISM, CCSP.', 'Sentinel AI; Humana EA'],
    ['aiskill', 'Integrating AI / LLM capabilities into business workflows.', 'Copilot Studio agents and Power Automate flows for document generation, summarization and compliance documentation.', 'State of Texas; Chickasaw Nation'],
    ['aiskill', 'Azure OpenAI or OpenAI APIs (preferred).', 'Azure OpenAI listed in the technical environment; Azure depth of 18+ years.', 'UCS Solutions'],
    ['aiskill', 'Basic working knowledge of Python for AI prototyping and automation (desirable).', 'Expert Python: FastAPI services, LangChain / LangGraph, PyTorch.', 'Amazon; UCS Solutions'],

    ['pref', 'Boomi Professional Developer or relevant Boomi certifications.', 'Resume states Boomi-certified. Add the exact certificate title and ID before submission.', 'Certifications section', 'verify'],
    ['pref', 'Experience with Azure cloud services.', 'Azure 18+ years as primary public cloud.', 'UCS Solutions; Wipro 2017 – 2019'],
    ['pref', 'API management experience.', 'Boomi API Management, MuleSoft API Manager, Apigee and Azure API Management.', 'Wipro 2017 – 2019; State of Texas; Chickasaw Nation'],
    ['pref', 'DevOps / CI-CD exposure.', 'GitHub Actions, Azure DevOps, Terraform, Kubernetes.', 'UCS Solutions; Humana; Ford'],
    ['pref', 'Experience with enterprise integration architecture.', 'TOGAF 9 and SABSA certified; principal architect on integration-heavy programs.', 'Amazon; State of Texas'],
    ['pref', 'Exposure to AI-enabled automation and intelligent operations.', 'AI-assisted SOC workflows with analyst approval; Copilot Studio automation.', 'GE Appliances; State of Texas'],
    ['pref', 'Experience working with Agile delivery teams.', 'Agile / Scrum and SAFe (certified).', 'UCS Solutions; Humana; Ford'],

    ['exp', '5–8 years of overall integration / application development experience.', '30+ years.', 'Professional history, 1993 – present'],
    ['exp', '3+ years of hands-on Boomi development experience.', '8 years.', PRACTICE],
    ['exp', 'Practical exposure to AI / Generative AI integration use cases.', '5+ years of production GenAI, RAG and agentic systems.', 'UCS Solutions; State of Texas; Humana'],
    ['exp', 'Strong analytical, troubleshooting, documentation and stakeholder-coordination skills.', 'Root-cause analysis, runbooks and handover packs; executive and developer stakeholder communication.', 'Amazon; GE Appliances; Humana'],

    ['comp', 'Integration design and development.', 'Processes, APIs and transformations designed and built on Boomi, MuleSoft and Apigee.', PRACTICE],
    ['comp', 'Problem solving and troubleshooting.', 'Integration failures traced to cause and fixed at source; synchronization failures resolved.', 'Amazon'],
    ['comp', 'Quality-focused development.', 'Unit tests, error-handling standards and release gates.', PRACTICE],
    ['comp', 'Estimation and delivery planning.', 'Scope estimation and forecasting; PMP / PgMP.', 'UCS Solutions'],
    ['comp', 'Collaboration with application and technical teams.', 'Cross-functional work with SMEs, architects, security and product teams.', 'Wipro; Humana; Amazon'],
    ['comp', 'Documentation and knowledge management.', 'Service guides, runbooks, catalog entries, architecture decision records.', 'UCS Solutions; GE Appliances'],
    ['comp', 'Continuous improvement mindset.', 'Reusable frameworks and automation; Six Sigma Black Belt.', 'UCS Solutions'],
    ['comp', 'Ability to identify practical applications of AI within enterprise integration.', 'Six AI integration patterns in this command center, each with controls and a failure path.', 'This command center']
  ];

  var CAT_TEMPLATES = {
    design: {
      uses: 'New application-to-application interfaces, API enablement of an existing service, and change requests against a live integration.',
      examples: 'A service design naming source, target, trigger, payload and SLA becomes a main process, a mapping subprocess and a shared error-handling subprocess.',
      deps: 'Approved service design, interface specifications, connector licenses, environment access and the team naming and folder standards.',
      inter: 'Feeds test planning (cases derive from the design), the deployment checklist (extensions and credentials) and the service-catalog entry.',
      when: 'At intake of every new or changed integration, before any shape is placed on the canvas.',
      future: 'Design-first with AI assistance: Boomi DesignGen or Boomi Companion drafts the process from the service design and the developer reviews and hardens it.'
    },
    test: {
      uses: 'Unit verification of maps and routes, negative-path testing of error handling, regression after component changes.',
      examples: 'A test data set with a valid document, a schema-invalid document and a target-system timeout, each with an expected outcome and log entry.',
      deps: 'A stable test environment and runtime, representative and masked test data, access to target-system sandboxes.',
      inter: 'Results gate promotion in the deployment checklist; recurring defects become entries in the troubleshooting guide.',
      when: 'Before every promotion to a higher environment and after any change to a shared component.',
      future: 'AI-drafted test cases and synthetic test data from profiles, reviewed by the developer; regression packs run from the pipeline.'
    },
    deploy: {
      uses: 'Planned releases, hotfixes, environment refreshes and rollback rehearsals.',
      examples: 'Checklist row: OAuth client secret set as an encrypted environment extension in Test, verified by a connection test, owner named, rollback is redeploying the prior package version.',
      deps: 'Packaged components with version notes, environment extensions, runtime availability, change approval and a named rollback owner.',
      inter: 'Consumes test evidence; produces the handover pack used by support and the catalog update.',
      when: 'Every movement of a component between development, test, staging and production.',
      future: 'Pipeline-driven promotion through the platform API with the checklist as code, and AI-drafted release notes from component differences.'
    },
    ai: {
      uses: 'Document and data processing, classification and enrichment, summarization, knowledge retrieval, incident analysis and workflow automation.',
      examples: 'A Boomi process sends a masked payload to a chat-completions endpoint with a system prompt and a JSON schema, validates the reply and routes low-confidence results to a person.',
      deps: 'An approved AI platform and model, API credentials held as environment extensions, a prompt and schema under version control, data-classification rules.',
      inter: 'Relies on the same error-handling, logging and deployment disciplines as any integration; adds token, privacy and output-validation controls.',
      when: 'Where unstructured content, judgment-style classification or natural-language output would otherwise need manual effort.',
      future: 'Agent-ready integrations: processes and APIs exposed as MCP tools and governed from an agent control plane.'
    },
    km: {
      uses: 'Onboarding a new developer, impact analysis for a change, audit of interface ownership.',
      examples: 'Catalog entry: service name, source and target, interfaces, schedule, dependencies, owner, support contact, runbook link, last deployment.',
      deps: 'A single catalog of record, naming standards, and a rule that deployment is not complete until the catalog is updated.',
      inter: 'Updated by the deployment checklist; read by support during root-cause analysis; mined for reuse during design.',
      when: 'At every release, every ownership change and every post-incident review.',
      future: 'AI-written process documentation (Boomi Scribe) and catalog entries generated from deployed components, reviewed before publishing.'
    },
    tech: {
      uses: 'Day-to-day build of processes, APIs and transformations across SaaS, cloud, database and enterprise applications.',
      examples: 'A REST API published through API Management, secured with OAuth 2.0, backed by a process that maps JSON to a database profile.',
      deps: 'Platform access and runtimes, connector availability, API security standards, packaged-component discipline.',
      inter: 'Each skill shows up in design, test and deployment; weak error handling or mapping surfaces later as support load.',
      when: 'Throughout delivery; depth matters most on high-volume, multi-target or security-sensitive interfaces.',
      future: 'The same skills extended to AI endpoints, event streams and MCP-exposed tools.'
    },
    aiskill: {
      uses: 'Choosing where an LLM adds value in a flow, writing and versioning prompts, grounding answers in enterprise content.',
      examples: 'A retrieval step fetches the best-matching knowledge chunks by embedding similarity and passes them as context; the answer must cite them.',
      deps: 'Model access, an embedding model and vector store, curated source content, evaluation data.',
      inter: 'Security and responsible-AI controls wrap every call; integration skills carry the data to and from the model.',
      when: 'When the use case has a measurable outcome and data that is allowed to reach the model.',
      future: 'Agentic patterns — tools, memory and multi-agent hand-offs — under registry and policy control.'
    },
    pref: {
      uses: 'Faster ramp-up on a Wipro delivery team and broader coverage across platform, cloud and pipeline tasks.',
      examples: 'An Azure-hosted runtime with pipeline-driven promotion and API policies managed alongside the integration.',
      deps: 'Certificates and IDs on file; cloud subscriptions and pipeline tooling in the client environment.',
      inter: 'Each preferred skill removes a hand-off between the developer and the platform, cloud or DevOps team.',
      when: 'Useful from day one; decisive when the team is small.',
      future: 'Certification refresh on the current Boomi curriculum, including the AI and agent tracks.'
    },
    exp: {
      uses: 'Independent delivery, mentoring junior developers, stakeholder conversations without escalation.',
      examples: 'Leading an interface from requirement workshop to production handover.',
      deps: 'Verifiable project history and references.',
      inter: 'Depth in integration shortens design time; depth in AI shortens pilot time.',
      when: 'Assessed at screening and at the technical interview.',
      future: 'Seniority applied to reusable frameworks and team standards rather than single interfaces.'
    },
    comp: {
      uses: 'Every phase — requirement, build, test, release and support.',
      examples: 'A root-cause write-up that ends with a reusable fix and a catalog update.',
      deps: 'Team norms for estimation, documentation and review.',
      inter: 'The competencies compound: quality lowers support load, documentation speeds the next change.',
      when: 'Continuously.',
      future: 'The same habits applied to AI-assisted delivery.'
    }
  };

  var PLATFORMS = [
    {
      id: 'boomi', name: 'Boomi Enterprise Platform', tag: 'AtomSphere · primary platform for the role', years: '8 years, certified',
      caps: ['Processes and subprocesses', 'Connectors', 'Profiles and maps', 'REST / SOAP API Management', 'Try / catch and exception handling', 'Scheduling and deployment', 'Atom · Molecule · Atom Cloud'],
      m: {
        what: 'Boomi is a cloud-native integration platform (the JD calls it Boomi AtomSphere) for building, deploying and running integration processes and APIs across SaaS, cloud, database and on-premises systems.',
        how: 'A process is drawn on a canvas from shapes — connectors, maps, decisions, routes, try / catch — then packaged and deployed to a runtime (Atom, Molecule or Atom Cloud) attached to an environment whose extensions hold connection settings and credentials.',
        where: 'The integration layer between enterprise applications: order, employee, ticket, asset and document flows, plus the APIs that expose them.',
        uses: 'Application-to-application sync, API enablement, file and database integration, scheduled batch, event-triggered real-time flows, and calls out to AI services.',
        examples: 'ServiceNow incident to SQL reporting store; Workday worker change to downstream identity; an inbound REST API that validates, maps and writes to SAP.',
        deps: 'Platform account and role, runtime sizing, connector licenses, environment extensions for each stage, network access from the runtime to targets.',
        inter: 'API Management fronts processes; Process Reporting and logs feed support; the AtomSphere API drives pipeline deployment; Agentstudio can call processes as agent tools.',
        when: 'Default choice for the role; strongest where many SaaS endpoints and fast delivery matter more than hand-written code.',
        future: 'Agent-era platform direction: Agentstudio, Agent Control Tower, MCP Registry in API Control Plane and Boomi Companion for AI-assisted building.'
      }
    },
    {
      id: 'mule', name: 'MuleSoft Anypoint Platform', tag: 'API-led connectivity', years: '8 years, certified',
      caps: ['Mule 4 flows and subflows', 'DataWeave', 'RAML / OAS design', 'API Manager policies', 'Exchange assets', 'CloudHub · Runtime Fabric', 'MUnit'],
      m: {
        what: 'MuleSoft Anypoint is an integration and API-management platform organized around API-led connectivity: system, process and experience APIs.',
        how: 'Mule applications are built from flows and connectors, transform data with DataWeave, are published to Exchange, deployed to CloudHub or Runtime Fabric and governed with API Manager policies.',
        where: 'Enterprises standardized on Salesforce and API-led architecture, often alongside another iPaaS.',
        uses: 'Reusable system APIs over core applications, process orchestration, partner and mobile experience APIs.',
        examples: 'A system API over an ERP customer master reused by three process APIs; a rate-limited experience API for a partner portal.',
        deps: 'Anypoint organization and environments, runtime capacity, an API specification, policy standards, an MUnit test suite.',
        inter: 'Design patterns carry over to Boomi; in mixed estates Mule APIs are called from Boomi processes and the reverse.',
        when: 'When the client estate already runs Anypoint or when a three-layer API model is mandated.',
        future: 'MuleSoft Agent Fabric as an agent control plane: Agent Registry, Agent Broker, MCP Bridge and A2A Bridge, with MCP Connector and Flex Gateway support.'
      }
    },
    {
      id: 'apigee', name: 'Google Apigee', tag: 'API management and AI gateway', years: '8 years, certified',
      caps: ['API proxies and shared flows', 'OAuthV2 · VerifyAPIKey · JWT', 'SpikeArrest and Quota', 'Mediation and transformation', 'API products and portal', 'Analytics', 'Apigee X and hybrid'],
      m: {
        what: 'Apigee is an API-management platform: proxies in front of backend services with policies for security, traffic, mediation and analytics.',
        how: 'An API proxy receives the request, runs policies in request and response flows (verify key or token, quota, transform), routes to the target and records analytics; APIs are bundled into products for consumers.',
        where: 'The managed edge for internal, partner and public APIs; increasingly the gateway in front of LLM and MCP traffic.',
        uses: 'Securing and rate-limiting integration APIs, partner onboarding through a developer portal, usage analytics and monetization.',
        examples: 'An OAuth 2.0-protected proxy in front of a Boomi API with spike arrest and a per-product quota.',
        deps: 'Apigee organization and environments, target endpoints, identity provider, policy and naming standards.',
        inter: 'Sits in front of Boomi or MuleSoft APIs; shares OAuth and logging standards with them.',
        when: 'When API exposure needs consistent security, quotas and consumer management independent of the integration runtime.',
        future: 'Apigee AI gateway capabilities: LLM token policies (PromptTokenLimit, LLMTokenQuota), Model Armor checks, semantic caching, model routing and MCP support.'
      }
    },
    {
      id: 'llm', name: 'Enterprise AI Services', tag: 'Azure OpenAI / OpenAI and equivalents', years: '5+ years production GenAI',
      caps: ['Chat and completion APIs', 'Embeddings', 'Vector search', 'Prompt and schema versioning', 'Content filtering', 'Token metering', 'Bedrock · Vertex AI · Claude'],
      m: {
        what: 'Hosted LLM platforms reached over REST — Azure OpenAI / OpenAI are the JD preference, with AWS Bedrock, Vertex AI and Claude as equivalents.',
        how: 'The integration sends a prompt plus context to a deployment endpoint with an API key or an OAuth bearer token and receives text or structured JSON, with usage counted in tokens.',
        where: 'Any flow that reads, classifies, summarizes or drafts natural-language content.',
        uses: 'Document and data processing, classification and enrichment, summarization, knowledge retrieval, incident analysis, workflow automation.',
        examples: 'A support ticket summarized to three bullet points and a category code before it is written to the service-management tool.',
        deps: 'An approved model deployment, quota, credentials in environment extensions, a prompt and output schema, data-handling approval.',
        inter: 'Called from Boomi through an HTTP connector; fronted by an API or AI gateway for token limits and logging; grounded by a vector store.',
        when: 'When the task is language-shaped and the data is cleared to leave the source system.',
        future: 'Model routing by cost and data class, and agents that call integrations as tools through MCP.'
      }
    }
  ];

  var LIFECYCLE = [
    { id: 'lc-design', name: 'Design', line: 'Service design to integration design', m: {
      what: 'Reading the functional, technical and service design and deciding the process structure, connectors, profiles, error strategy and reuse.',
      how: 'Walk the design with the application SME and architect, list interfaces and dependencies, pick reusable components, and write the estimate and delivery plan.',
      where: 'Start of every new or changed integration.',
      uses: 'New interface, API enablement, change request, migration from another tool.',
      examples: 'A one-page integration design: trigger, source and target, mapping notes, volumes, error handling, security, test approach.',
      deps: 'Service design, interface specifications, standards, access to people who own the systems.',
      inter: 'Produces the inputs for build, the test plan and the deployment checklist.',
      when: 'Before build starts; revisited when requirements move.',
      future: 'AI-drafted first cut of the process and mapping, reviewed against standards.' } },
    { id: 'lc-build', name: 'Build', line: 'Processes, APIs, maps, error handling', m: {
      what: 'Developing the integration in Boomi to the coding standard: processes, subprocesses, connectors, profiles, maps and API components.',
      how: 'Compose shapes on the canvas, externalize settings as extensions, call the shared error-handling subprocess, and keep components in the agreed folder and naming structure.',
      where: 'Development environment and runtime.',
      uses: 'Application integrations, data transformations, workflows, interfaces and APIs.',
      examples: 'Main process with a try / catch wrapper, a mapping subprocess, and a common notify-and-log subprocess reused across services.',
      deps: 'Approved design, connectors, sandbox endpoints, reusable-component library.',
      inter: 'Everything built must be testable, deployable and documented, so build choices drive later effort.',
      when: 'After design sign-off.',
      future: 'Boomi DesignGen, Pathfinder and Companion to speed the build; the developer remains accountable for the result.' } },
    { id: 'lc-test', name: 'Test', line: 'Unit plans, cases, data, defects', m: {
      what: 'Proving the integration works and fails safely before it moves up.',
      how: 'Write the unit test plan, scenarios, cases and data; run positive and negative paths; fix defects; keep evidence.',
      where: 'Development and test environments.',
      uses: 'Unit testing, integration testing, regression and production validation.',
      examples: 'Cases for a valid document, a missing mandatory field, a duplicate, a target timeout and an expired credential.',
      deps: 'Test data that is representative and masked; sandboxes; a stable runtime.',
      inter: 'Evidence is a gate on the deployment checklist.',
      when: 'Before every promotion.',
      future: 'Generated test data and regression packs triggered from the pipeline.' } },
    { id: 'lc-deploy', name: 'Deploy', line: 'Checklist-driven promotion', m: {
      what: 'Moving packaged components through development, test, staging and production in a controlled way.',
      how: 'Package the components, complete the checklist (configuration, dependencies, environment variables, credentials, rollback, validation), deploy, verify and record.',
      where: 'Each environment boundary.',
      uses: 'Releases, hotfixes, rollbacks.',
      examples: 'Deploy a package version to Test, set extensions, run the connection and smoke tests, capture the result, then schedule the process.',
      deps: 'Change approval, environment access, extension values, a rollback owner.',
      inter: 'Depends on test evidence; triggers handover and the catalog update.',
      when: 'Every promotion.',
      future: 'Deployment through the platform API from a pipeline with approvals.' } },
    { id: 'lc-handover', name: 'Handover', line: 'Guides, runbooks, support readiness', m: {
      what: 'Giving support what it needs to run and fix the service.',
      how: 'Write the service user guide, the support document and the operational handover; walk the support team through monitoring and common failures.',
      where: 'Between project delivery and operations.',
      uses: 'Go-live, change of support owner, audit.',
      examples: 'Runbook with schedules, dependencies, alert meanings, restart steps and escalation contacts.',
      deps: 'Final configuration, monitoring in place, named owners.',
      inter: 'Feeds the service catalog and shortens root-cause analysis later.',
      when: 'Before production cut-over is called complete.',
      future: 'AI-drafted documentation from deployed components (Boomi Scribe), reviewed by the developer.' } },
    { id: 'lc-improve', name: 'Improve', line: 'Catalog, lessons, reuse, AI', m: {
      what: 'Keeping the catalog current and making the next integration cheaper than the last.',
      how: 'Update catalog entries, record lessons learned, promote reusable components and patterns, and look for automation, performance and AI opportunities.',
      where: 'After each release and each incident.',
      uses: 'Reusable frameworks, performance tuning, AI-assisted incident analysis.',
      examples: 'A common error-handling framework adopted by every new process; a slow map replaced after a volume test.',
      deps: 'Time reserved in the plan; a place to publish standards.',
      inter: 'Closes the loop back into design.',
      when: 'Continuously.',
      future: 'Agents that watch process logs and propose fixes for a person to approve.' } }
  ];

  var TECHNIQUES = ['LLM call', 'Prompt design', 'Embeddings', 'Vector search', 'RAG grounding', 'Schema validation', 'Human review'];

  var USECASES = [
    {
      id: 'idp', name: 'Intelligent document / data processing', line: 'Extract structured fields from unstructured documents inside an integration flow.',
      tech: ['LLM call', 'Prompt design', 'Schema validation', 'Human review'],
      flow: [['Source', 'Document arrives (file, mail, API)', ''], ['Boomi process', 'Convert to text, mask sensitive fields', ''], ['AI service', 'Extract fields as JSON', 'ai'], ['Validate', 'Schema and business rules', 'ctl'], ['Target', 'Create record in system of record', '']],
      blocks: ['Connector listener or scheduled poll', 'Data Process shape for text preparation', 'HTTP Client connector to the model endpoint', 'JSON profile and map', 'Decision and Try / Catch shapes', 'Exception subprocess'],
      controls: ['Mask personal data before the call', 'Force JSON output and validate against a profile', 'Route low-confidence or invalid extractions to a review queue'],
      payload: '{\n  "messages": [\n    {"role": "system", "content": "Extract invoice fields. Reply with JSON only: vendor, invoice_no, date, total, currency."},\n    {"role": "user", "content": "<document text, sensitive fields masked>"}\n  ],\n  "response_format": {"type": "json_object"},\n  "temperature": 0\n}',
      m: {
        what: 'Using a model to turn unstructured documents into structured data that an integration can route and load.',
        how: 'The process prepares text, calls the model with an extraction prompt and a fixed output shape, validates the reply and writes clean records to the target.',
        where: 'Inbound documents: invoices, forms, correspondence, attachments on tickets.',
        uses: 'Accounts-payable intake, onboarding forms, claims attachments, contract metadata.',
        examples: 'Invoice text in; vendor, number, date and total out as JSON; mismatched totals sent to a person.',
        deps: 'Text extraction for scanned content, an approved model, a JSON schema, a review queue.',
        inter: 'Feeds classification and workflow automation; shares the validation and exception framework.',
        when: 'When layouts vary too much for fixed templates.',
        future: 'Multimodal models reading the page image directly, with the same validation step.' }
    },
    {
      id: 'classify', name: 'Data classification and enrichment', line: 'Label and enrich records in flight so downstream systems can route them.',
      tech: ['LLM call', 'Prompt design', 'Schema validation'],
      flow: [['Source', 'Record or message', ''], ['Boomi process', 'Select fields to send', ''], ['AI service', 'Return category and attributes', 'ai'], ['Validate', 'Allowed-value check', 'ctl'], ['Target', 'Record updated with labels', '']],
      blocks: ['Map to a minimal request profile', 'HTTP Client connector', 'Cross-reference table for allowed values', 'Decision shape', 'Document properties for the labels'],
      controls: ['Send only the fields needed for the decision', 'Reject labels outside the allowed list', 'Log model, prompt version and result for audit'],
      payload: '{\n  "messages": [\n    {"role": "system", "content": "Classify the request into one of: ACCESS, HARDWARE, SOFTWARE, DATA, OTHER. Reply as JSON: {category, urgency, reason}."},\n    {"role": "user", "content": "<short description>"}\n  ],\n  "response_format": {"type": "json_object"},\n  "temperature": 0\n}',
      m: {
        what: 'Adding categories, priorities or derived attributes to data as it passes through an integration.',
        how: 'A small prompt with a closed list of labels; the reply is checked against that list before it is trusted.',
        where: 'Ticket routing, product and vendor data, document tagging, sensitivity labeling.',
        uses: 'Auto-routing service requests, tagging content for retention, enriching customer records.',
        examples: 'A free-text request labeled ACCESS with high urgency and routed to the identity team.',
        deps: 'A maintained label list, examples for the prompt, an audit log.',
        inter: 'Often the second step after document processing and the trigger for workflow automation.',
        when: 'When rules alone miss too many cases and a person currently triages.',
        future: 'Classification as an MCP tool that any governed agent can call.' }
    },
    {
      id: 'summarize', name: 'Automated summarization', line: 'Condense long content to what the receiving system or person needs.',
      tech: ['LLM call', 'Prompt design', 'Human review'],
      flow: [['Source', 'Long text or thread', ''], ['Boomi process', 'Trim, chunk, mask', ''], ['AI service', 'Summarize to a set format', 'ai'], ['Validate', 'Length and format check', 'ctl'], ['Target', 'Summary on the record', '']],
      blocks: ['Data Process shape for chunking', 'HTTP Client connector', 'Flow Control for multi-chunk content', 'Map to target profile', 'Notify shape for logging'],
      controls: ['Instruct the model to use only the supplied text', 'Keep the source linked beside the summary', 'Sample summaries for human quality review'],
      payload: '{\n  "messages": [\n    {"role": "system", "content": "Summarize in at most 5 bullet points using only the text provided. If something is unclear, say so."},\n    {"role": "user", "content": "<case notes, masked>"}\n  ],\n  "max_tokens": 300,\n  "temperature": 0.2\n}',
      m: {
        what: 'Producing a short, faithful summary of long content as part of a data flow.',
        how: 'Prepare and chunk the text, summarize with a constrained prompt, check the output and store it with a link to the source.',
        where: 'Case notes, meeting records, change histories, log bundles.',
        uses: 'Handover notes on escalated tickets, executive digests, audit summaries.',
        examples: 'A forty-message ticket thread reduced to five bullet points on the incident record.',
        deps: 'Token limits per call, a chunking rule, a place to keep the source link.',
        inter: 'Pairs with incident analysis; shares masking and logging controls.',
        when: 'When people skim long records and miss the point.',
        future: 'Summaries produced on demand by an agent through a governed tool call.' }
    },
    {
      id: 'retrieve', name: 'Knowledge retrieval', line: 'Answer from enterprise content using RAG, embeddings and vector search.',
      tech: ['LLM call', 'Prompt design', 'Embeddings', 'Vector search', 'RAG grounding', 'Human review'],
      flow: [['Source', 'Question from app or user', ''], ['Boomi process', 'Embed the question', 'ai'], ['Vector store', 'Retrieve top matching chunks', ''], ['AI service', 'Answer using retrieved context', 'ai'], ['Validate', 'Citations present', 'ctl'], ['Target', 'Answer with sources', '']],
      blocks: ['API Service component for the inbound question', 'HTTP Client connector to the embeddings endpoint', 'Connector or HTTP call to the vector store', 'Combine Documents and Map shapes', 'HTTP Client connector to the chat endpoint'],
      controls: ['Filter retrieval by the caller entitlements', 'Answer only from retrieved context and cite it', 'Return "not found" rather than guess'],
      payload: '{\n  "messages": [\n    {"role": "system", "content": "Answer only from CONTEXT. Cite the source id for each statement. If the answer is not in CONTEXT, reply NOT_FOUND."},\n    {"role": "user", "content": "QUESTION: <question>\\nCONTEXT: <retrieved chunks with ids>"}\n  ],\n  "temperature": 0\n}',
      m: {
        what: 'Retrieval-augmented generation: find the relevant enterprise content first, then let the model answer from it.',
        how: 'Content is chunked and embedded into a vector store ahead of time; at run time the question is embedded, similar chunks are retrieved and passed to the model as context.',
        where: 'Knowledge bases, policies, runbooks, integration documentation.',
        uses: 'Support assistants, policy lookup, "how does this interface work" for developers.',
        examples: 'A support analyst asks why an interface failed last night and gets the runbook step with its source.',
        deps: 'Curated content, an embedding model, a vector database, an ingestion integration to keep it fresh.',
        inter: 'The ingestion pipeline is itself an integration; retrieval quality drives hallucination risk.',
        when: 'When answers must come from enterprise content rather than model memory.',
        future: 'MCP tools complement RAG by reaching live systems for current data.' }
    },
    {
      id: 'incident', name: 'Error / incident analysis', line: 'Use AI on process logs and errors to speed root-cause analysis.',
      tech: ['LLM call', 'Prompt design', 'RAG grounding', 'Human review'],
      flow: [['Source', 'Failed execution or alert', ''], ['Boomi process', 'Collect error, context, recent changes', ''], ['AI service', 'Suggest probable cause and next step', 'ai'], ['Validate', 'Match to known-error list', 'ctl'], ['Target', 'Enriched incident for support', '']],
      blocks: ['Scheduled process reading execution records', 'Try / Catch output and document tracking fields', 'HTTP Client connector', 'Map to the service-management incident profile', 'Process Route to the notification subprocess'],
      controls: ['Strip payload data from logs before sending', 'Present output as a suggestion, never an automatic fix', 'Feed confirmed causes back into the troubleshooting guide'],
      payload: '{\n  "messages": [\n    {"role": "system", "content": "You assist integration support. From the error and context, give: probable_cause, evidence, next_step. Use the KNOWN_ERRORS list when it applies."},\n    {"role": "user", "content": "ERROR: <message>\\nCONTEXT: <process, step, target status>\\nKNOWN_ERRORS: <entries>"}\n  ],\n  "response_format": {"type": "json_object"},\n  "temperature": 0\n}',
      m: {
        what: 'Applying a model to integration failures so support starts with a probable cause instead of a raw stack trace.',
        how: 'A process gathers the error, the failing step and recent changes, asks the model for a structured assessment grounded in known errors, and attaches it to the incident.',
        where: 'Integration operations and support.',
        uses: 'Faster triage, consistent incident notes, trend spotting across failures.',
        examples: 'HTTP 401 from a target flagged as an expired credential with the rotation runbook step linked.',
        deps: 'Access to execution logs, a known-error list, the service-management API.',
        inter: 'Draws on the service catalog and runbooks; improves them when causes are confirmed.',
        when: 'When support spends more time reading logs than fixing.',
        future: 'An operations agent that proposes the fix and waits for approval.' }
    },
    {
      id: 'workflow', name: 'Intelligent workflow automation', line: 'Let AI make bounded decisions inside an orchestrated process.',
      tech: ['LLM call', 'Prompt design', 'Schema validation', 'Human review'],
      flow: [['Source', 'Business event', ''], ['Boomi process', 'Orchestrate steps and state', ''], ['AI service', 'Decide next step from options', 'ai'], ['Validate', 'Policy and threshold check', 'ctl'], ['Target', 'Action in target system or approval task', '']],
      blocks: ['Event or API trigger', 'Process Call and Process Route shapes', 'Business Rules shape', 'HTTP Client connector', 'Approval step through the workflow tool'],
      controls: ['Limit the model to a fixed list of actions', 'Require human approval above a set impact', 'Record every decision with inputs and model version'],
      payload: '{\n  "messages": [\n    {"role": "system", "content": "Choose exactly one action from: APPROVE, REQUEST_INFO, ESCALATE. Reply as JSON: {action, reason}."},\n    {"role": "user", "content": "<request summary and policy extract>"}\n  ],\n  "response_format": {"type": "json_object"},\n  "temperature": 0\n}',
      m: {
        what: 'An orchestrated process in which a model makes a bounded choice and the integration carries it out.',
        how: 'The process holds the state and the rules; the model picks from allowed actions; anything outside policy goes to a person.',
        where: 'Approvals, service requests, exception handling, onboarding.',
        uses: 'Auto-approving low-risk requests, drafting replies, deciding which queue or system acts next.',
        examples: 'A standard access request approved automatically; a privileged one escalated with the reason attached.',
        deps: 'Clear policy, an action list, an approval channel, an audit trail.',
        inter: 'Builds on classification and summarization; needs the strongest access and audit controls.',
        when: 'When the decision is frequent, low-risk and well described by policy.',
        future: 'Multi-step agents built in an agent studio, governed by a control tower and calling integrations as tools.' }
    }
  ];

  var AGENTIC = [
    { id: 'ag-studio', name: 'Boomi Agentstudio', vendor: 'Boomi', line: 'Design, govern and orchestrate AI agents on the Boomi platform.', m: {
      what: 'Boomi’s environment for building AI agents and giving them tools — APIs, integrations, prompts, MCP servers and database access connected to the platform.',
      how: 'Agent Designer defines the agent, its tools and guardrails; agents register automatically for oversight and can be invoked from an integration process with an Agent Step.',
      where: 'Alongside the integration and API layers of the Boomi Enterprise Platform.',
      uses: 'Order-status agents, support triage agents, data-steward assistants that act through existing integrations.',
      examples: 'An agent whose only tools are two governed Boomi APIs: look up an order and open a ticket.',
      deps: 'Platform edition with Agentstudio, a model connection, tools published as APIs or MCP servers.',
      inter: 'Uses API Management and integration processes as tools; governed by Agent Control Tower.',
      when: 'When the action an agent must take already exists as a Boomi integration or API.',
      future: 'Agents embedded in business applications and orchestrated across providers.' } },
    { id: 'ag-tower', name: 'Agent Control Tower', vendor: 'Boomi', line: 'Central registry, monitoring and control for agents from Boomi and other providers.', m: {
      what: 'The governance side of Agentstudio: a registry of agents with monitoring and access control.',
      how: 'Boomi agents register automatically; agents from providers such as Amazon Bedrock, Salesforce Agentforce and Microsoft Copilot can be registered; anomaly detection flags irregular behavior and a kill switch disables a compromised agent.',
      where: 'Security, platform and integration teams that need one view of agent activity.',
      uses: 'Inventory of agents, usage and error monitoring, incident response.',
      examples: 'An agent that starts calling a tool far more often than normal is flagged and disabled.',
      deps: 'Agents registered with owners; monitoring thresholds; an incident process.',
      inter: 'Complements API-gateway logging and the service catalog; the agent equivalent of process monitoring.',
      when: 'As soon as more than one team is building agents.',
      future: 'Policy enforcement across every agent, model and MCP interaction from one control plane.' } },
    { id: 'ag-mcpreg', name: 'MCP Registry in API Control Plane', vendor: 'Boomi', line: 'Governs which MCP servers the organization can use.', m: {
      what: 'A central hub in Boomi API Control Plane for approving MCP servers, added in the May 2026 release.',
      how: 'It aggregates servers from the official MCP registry and the internal Boomi registry; API products marked MCP-enabled appear automatically, and servers added to the Server Catalog become available as MCP sources in Agentstudio.',
      where: 'Between API management and agent building.',
      uses: 'Publishing an existing API product as an agent tool; approving third-party MCP servers.',
      examples: 'A "customer lookup" API product is marked MCP-enabled and shows up as a tool for approved agents.',
      deps: 'API products with clear specifications; an AI agent key for authentication; an approval owner.',
      inter: 'Turns integration and API assets into agent tools without rebuilding them.',
      when: 'When agents need governed access to enterprise APIs.',
      future: 'The API catalog and the tool catalog becoming one governed inventory.' } },
    { id: 'ag-companion', name: 'Boomi Companion', vendor: 'Boomi', line: 'Agent skills that let AI coding tools build on Boomi.', m: {
      what: 'A suite of agent skills and plug-ins, launched at Boomi World 2026, that gives third-party AI coding agents deep knowledge of the Boomi platform.',
      how: 'From a tool such as Claude Code, a natural-language request becomes designed, built, tested, deployed and diagnosed work on a Boomi account.',
      where: 'The developer workstation and pipeline.',
      uses: 'Drafting integration processes, creating APIs and agents, diagnosing failed runs.',
      examples: 'Ask for an order-sync process with error quarantine; review what is generated; harden it and deploy.',
      deps: 'A supported AI coding tool, platform credentials with the right role, team review standards.',
      inter: 'Speeds the build and test steps of the lifecycle; does not replace design review or the deployment checklist.',
      when: 'For first drafts, repetitive builds and diagnosis — with a developer accountable for the output.',
      future: 'Agentic engineering as a normal part of integration delivery.' } },
    { id: 'ag-fabric', name: 'MuleSoft Agent Fabric', vendor: 'MuleSoft', line: 'Discover, orchestrate, govern and observe agents and MCP servers.', m: {
      what: 'MuleSoft’s control plane for AI agents, MCP servers and APIs built across platforms.',
      how: 'Agent Registry catalogs agents and tools (scanners discover them in Agentforce, Bedrock, Vertex AI and Copilot Studio); Agent Broker routes work across agents; MCP Bridge and A2A Bridge make existing APIs and non-compliant agents usable.',
      where: 'Enterprises with agents on several platforms and an Anypoint estate.',
      uses: 'A single inventory of agents, policy on agent traffic, cross-agent orchestration.',
      examples: 'A Copilot Studio agent bridged to A2A so it can be governed and orchestrated with native agents.',
      deps: 'Anypoint organization, Flex Gateway for policy enforcement, agent owners.',
      inter: 'Same idea as Boomi Agent Control Tower; in mixed estates the two inventories must be reconciled.',
      when: 'When MuleSoft is the API backbone and agents are multiplying.',
      future: 'Agent networks built and deployed from CI/CD pipelines.' } },
    { id: 'ag-apigee', name: 'Apigee AI gateway', vendor: 'Google Cloud', line: 'API-gateway policies applied to LLM and MCP traffic.', m: {
      what: 'AI-specific capabilities added to Apigee API proxies.',
      how: 'LLM token policies (PromptTokenLimit, LLMTokenQuota) throttle and budget token use; Model Armor screens prompts and responses; semantic caching and model routing cut cost; MCP proxies are secured with OAuth.',
      where: 'In front of model endpoints and MCP servers.',
      uses: 'Token budgets per team or product, prompt-injection screening, usage analytics by model and application.',
      examples: 'A product-level token quota that stops one application exhausting the shared model deployment.',
      deps: 'Apigee organization, model endpoints as targets, policy standards.',
      inter: 'Sits between Boomi processes and the model; gives the cost and security evidence the JD asks for.',
      when: 'When several integrations share model capacity or when AI calls need the same governance as APIs.',
      future: 'One gateway for APIs, models, agents and tools.' } },
    { id: 'ag-mcp', name: 'Model Context Protocol (MCP)', vendor: 'Open standard', line: 'A standard way for agents to discover and call tools.', m: {
      what: 'An open protocol that lets AI agents connect to tools and data sources in a uniform way.',
      how: 'An MCP server describes its tools; an agent lists them and calls them with structured arguments; the server runs the action and returns a result.',
      where: 'Between agents and the systems they act on.',
      uses: 'Exposing an integration or API once and reusing it across many agents.',
      examples: 'A "create incident" tool backed by an existing integration process.',
      deps: 'An MCP server, authentication, a registry of approved servers.',
      inter: 'Complements RAG: retrieval brings curated content, MCP reaches live systems.',
      when: 'When more than one agent needs the same enterprise action.',
      future: 'Tool catalogs governed like API catalogs.' } },
    { id: 'ag-a2a', name: 'Agent2Agent (A2A)', vendor: 'Open standard', line: 'A protocol for agents to work with each other.', m: {
      what: 'An interoperability protocol that describes how one agent hands work to another.',
      how: 'Agents publish a card describing what they can do; a broker or another agent discovers it and delegates a task.',
      where: 'Multi-agent workflows across vendors.',
      uses: 'A service agent delegating a billing question to a finance agent.',
      examples: 'An agent bridged to A2A so it can join an orchestrated network.',
      deps: 'A2A-compliant agents or a bridge, a registry, policy on agent traffic.',
      inter: 'Sits beside MCP: MCP is agent-to-tool, A2A is agent-to-agent.',
      when: 'When work crosses agent or vendor boundaries.',
      future: 'Brokered agent networks with rate limits and audit like any API.' } }
  ];

  var CONTROLS = [
    { id: 'ct-sec', name: 'AI security', risk: 'Prompt injection, data exfiltration through prompts, abuse of model endpoints.', layer: 'Input screening at the gateway; least-privilege tool access; allow-listed endpoints from the runtime.', fw: 'OWASP LLM Top 10 · MITRE ATLAS', m: {
      what: 'Protecting AI-enabled integrations from attacks that target the model or the data sent to it.',
      how: 'Screen prompts and responses, restrict what tools and data a call can reach, authenticate every call and log it.',
      where: 'API or AI gateway, integration process, model platform.',
      uses: 'Any integration that passes user-supplied or external text to a model.',
      examples: 'An email body containing "ignore previous instructions" is treated as data and screened before the call.',
      deps: 'Gateway policies, content-safety service, security review of prompts.',
      inter: 'Shares identity and logging with access controls; informs incident response.',
      when: 'Always; depth scales with exposure.',
      future: 'Runtime policy across every agent, model and tool interaction.' } },
    { id: 'ct-priv', name: 'Data privacy', risk: 'Personal or regulated data sent to a model without need or approval.', layer: 'Field-level minimization and masking in the map before the call; approved regions and retention settings.', fw: 'HIPAA · ISO 27001 · client data policy', m: {
      what: 'Making sure only data that is allowed and needed reaches the model.',
      how: 'Classify the fields, send the minimum, mask identifiers in the map, and use model deployments with approved data handling.',
      where: 'The mapping step of the integration and the choice of model deployment.',
      uses: 'Health, financial, employee and customer data flows.',
      examples: 'A member identifier replaced with a token before summarization and restored afterwards.',
      deps: 'Data-classification rules, masking functions, approved deployments.',
      inter: 'Decisions here limit which use cases are possible.',
      when: 'At design, before any payload is defined.',
      future: 'Automated data classification in the flow (Boomi DataDetective-style) feeding masking rules.' } },
    { id: 'ct-access', name: 'Access controls', risk: 'Shared keys, over-broad permissions, answers that reveal content the caller should not see.', layer: 'OAuth 2.0 or managed identity per integration; credentials as encrypted environment extensions; entitlement filters on retrieval.', fw: 'NIST SP 800-207 · OAuth 2.0 / OIDC', m: {
      what: 'Controlling who and what can call the model, the tools and the data.',
      how: 'Give each integration its own identity, store secrets in environment extensions, rotate them, and filter retrieval by the caller’s entitlements.',
      where: 'Runtime, gateway, vector store, target systems.',
      uses: 'Every AI call and every tool exposed to an agent.',
      examples: 'A retrieval call that passes the user’s groups so only permitted documents are searched.',
      deps: 'Identity provider, secret-rotation process, role model.',
      inter: 'Underpins privacy and security; checked on the deployment checklist.',
      when: 'At design and at every deployment.',
      future: 'Per-agent identity with conditional access.' } },
    { id: 'ct-halluc', name: 'Hallucination management', risk: 'Confident but wrong output written into systems of record.', layer: 'Grounding with retrieved context; structured output validated against a profile; thresholds and human review.', fw: 'NIST AI RMF (Measure, Manage)', m: {
      what: 'Reducing and catching model output that is not supported by the input.',
      how: 'Ground the prompt in supplied context, require citations or a fixed JSON shape, validate against allowed values, and send doubtful results to a person.',
      where: 'The validation step after every model call.',
      uses: 'Extraction, classification, retrieval answers, automated decisions.',
      examples: 'An extracted total that does not equal the sum of line items is routed to review instead of posted.',
      deps: 'Schemas, business rules, an evaluation set, a review queue.',
      inter: 'Uses the same exception framework as other integration errors.',
      when: 'On every AI step that writes to a system of record.',
      future: 'Continuous evaluation gates on each prompt or model change.' } },
    { id: 'ct-resp', name: 'Responsible AI', risk: 'Unexplained automated decisions, bias, no accountability trail.', layer: 'Human approval for consequential actions; decision logs with inputs, prompt and model version; documented purpose and owner.', fw: 'NIST AI RMF · ISO/IEC 42001 · EU AI Act', m: {
      what: 'Using AI in a way that is accountable, explainable and proportionate to the impact.',
      how: 'Record the purpose and owner of each AI use, keep people in the loop where the outcome matters, and log enough to explain a decision later.',
      where: 'Governance intake, workflow design, audit.',
      uses: 'Approvals, eligibility, prioritization and anything affecting a person.',
      examples: 'Auto-approval limited to low-risk requests, with every decision reviewable.',
      deps: 'A governance intake, risk tiers, an audit store.',
      inter: 'Sets the limits inside which the other controls operate.',
      when: 'Before a use case is approved and at each change.',
      future: 'AI bills of materials and provenance records per release.' } },
    { id: 'ct-cost', name: 'Token and cost governance', risk: 'Runaway usage, one integration starving others, unpredictable spend.', layer: 'Token limits and quotas at the gateway; max_tokens and caching in the process; usage reported per integration.', fw: 'FinOps practice · gateway token policies', m: {
      what: 'Keeping model usage within budget and fair across integrations.',
      how: 'Cap prompt size, set quotas per consumer, cache repeat requests, choose the smallest adequate model and report usage.',
      where: 'AI gateway and process configuration.',
      uses: 'Shared model deployments, high-volume flows, batch backfills.',
      examples: 'A nightly batch throttled so interactive integrations keep their capacity.',
      deps: 'Usage metrics, quotas, a cost owner.',
      inter: 'Rate-limit responses must be handled by the retry logic in the process.',
      when: 'From the first pilot.',
      future: 'Model routing by cost and data class.' } }
  ];

  var SIM_STEPS = ['Trigger', 'Validate & map', 'Call AI service', 'Validate response', 'Deliver to target', 'Log & notify'];
  var SIMS = [
    { id: 'ok', name: 'Clean run', result: ['ok', 'Completed'], steps: [
      ['ok', 'Document received from the source system.'], ['ok', 'Request profile valid; sensitive fields masked.'], ['ok', 'HTTP 200 from the model endpoint.'], ['ok', 'Reply matches the JSON profile; values allowed.'], ['ok', 'Record written to the target.'], ['ok', 'Execution logged with prompt version and token usage.']] },
    { id: 'rate', name: 'Model rate limit (HTTP 429)', result: ['ok', 'Completed after retry'], steps: [
      ['ok', 'Document received from the source system.'], ['ok', 'Request profile valid; sensitive fields masked.'], ['warn', 'HTTP 429. Try / Catch retries after the Retry-After interval; second attempt returns 200.'], ['ok', 'Reply matches the JSON profile.'], ['ok', 'Record written to the target.'], ['ok', 'Retry count logged; no alert raised.']] },
    { id: 'schema', name: 'Invalid source document', result: ['crit', 'Stopped — sent to exception handling'], steps: [
      ['ok', 'Document received from the source system.'], ['crit', 'Mandatory field missing. Exception shape raises a business error; no AI call is made.'], ['idle', 'Skipped.'], ['idle', 'Skipped.'], ['idle', 'Skipped.'], ['warn', 'Document quarantined; support notified with the failing field and document reference.']] },
    { id: 'auth', name: 'Expired OAuth token (HTTP 401)', result: ['ok', 'Completed after token refresh'], steps: [
      ['ok', 'Document received from the source system.'], ['ok', 'Request profile valid; sensitive fields masked.'], ['warn', 'HTTP 401. Token refreshed from the identity provider and the call repeated once; 200 returned.'], ['ok', 'Reply matches the JSON profile.'], ['ok', 'Record written to the target.'], ['ok', 'Token refresh logged for the credentials owner.']] },
    { id: 'lowconf', name: 'Unsupported AI output', result: ['warn', 'Held for human review'], steps: [
      ['ok', 'Document received from the source system.'], ['ok', 'Request profile valid; sensitive fields masked.'], ['ok', 'HTTP 200 from the model endpoint.'], ['warn', 'Category is outside the allowed list. Result is not trusted.'], ['warn', 'Nothing written to the system of record; item placed in the review queue.'], ['ok', 'Reviewer notified; case added to the evaluation set.']] }
  ];

  var CHECKLIST = [
    ['Configurations', ['Package version and release notes recorded', 'Process schedules and listeners defined for the target environment', 'Connection settings externalized as environment extensions']],
    ['Dependencies', ['Shared components and subprocesses deployed at the required version', 'Upstream and downstream systems ready and owners informed', 'API products, plans and consumers in place']],
    ['Environment variables', ['Environment extensions and process properties set for this stage', 'Endpoints point at the correct environment', 'Model deployment name, prompt version and token limits set']],
    ['Credentials', ['Secrets stored encrypted; none in components or documents', 'OAuth clients and API keys issued for this environment', 'Connection tests passed with the deployed credentials']],
    ['Rollback requirements', ['Previous package version identified and redeployable', 'Data-correction approach agreed for partial runs', 'Rollback owner and decision time named']],
    ['Validation steps', ['Smoke test executed with expected result', 'Monitoring and alerts confirmed', 'Support handover and catalog entry updated']]
  ];

  var PLAN = [
    ['Days 1 – 30', 'Learn the estate', ['Read the service designs, coding standards and reusable-component library', 'Get access to every environment and shadow one deployment end to end', 'Take first integration from design to test with a unit test plan', 'Review the service catalog for gaps']],
    ['Days 31 – 60', 'Own delivery', ['Deliver integrations end to end including checklist, guides and handover', 'Propose a common error-handling and logging subprocess where one is missing', 'Pilot one AI integration with full controls — incident summarization is a low-risk start', 'Introduce AI-assisted documentation under review']],
    ['Days 61 – 90', 'Raise the baseline', ['Publish reusable patterns and a troubleshooting guide', 'Bring the service catalog fully current for owned services', 'Measure the AI pilot and decide whether to extend it', 'Show one API exposed as a governed MCP tool as a proof of concept']]
  ];

  var QA = [
    ['How do you structure error handling in a Boomi process?', 'Wrap the main path in a Try / Catch shape; raise business errors with an Exception shape; send every failure to one shared error subprocess through a Process Call or Process Route so logging, notification and quarantine behave the same everywhere; record tracked fields so a document can be found in Process Reporting.'],
    ['Atom, Molecule or Atom Cloud — how do you choose?', 'An Atom is a single-node runtime, right for modest volume or on-premises reach. A Molecule is a clustered runtime for high availability and volume. An Atom Cloud is a multi-tenant cloud runtime when nothing needs to sit inside the network. Decide on volume, availability and where the endpoints are.'],
    ['How do you call Azure OpenAI from Boomi?', 'An HTTP Client connector to the deployment endpoint with a JSON request profile; authenticate with an API key header or a Microsoft Entra ID bearer token; hold the endpoint, deployment name and credentials as environment extensions; map the reply through a JSON profile; handle 429 and 5xx with retry and 401 with a token refresh.'],
    ['How do you manage hallucination in an integration?', 'Ground the prompt in supplied context, set temperature low, require a fixed JSON shape, validate against a profile and allowed values, compare against business rules, and route anything doubtful to a person. Nothing unvalidated is written to a system of record.'],
    ['What is on your deployment checklist?', 'Configurations, dependencies, environment variables and extensions, credentials, rollback requirements and validation steps — each with an owner and evidence. The interactive checklist in this command center follows that structure.'],
    ['Explain RAG in integration terms.', 'Two integrations: an ingestion flow that chunks and embeds content into a vector store and keeps it fresh, and a run-time flow that embeds the question, retrieves matching chunks, and passes them to the model as context so the answer can cite its sources.'],
    ['How do you approach CI/CD for Boomi?', 'Treat packaged components as the release unit, promote the same package through environments, keep environment differences in extensions, automate deployment through the platform API from a pipeline, and gate promotion on test evidence.'],
    ['How do you keep a service catalog current?', 'Make the catalog update a checklist item so a deployment is not complete without it; hold one entry per service with interfaces, dependencies, owner and runbook; review it after incidents and ownership changes.'],
    ['Where would you not use AI in an integration?', 'Where a deterministic rule does the job, where the data may not leave the source system, where a wrong answer cannot be caught by validation, or where latency and cost outweigh the benefit.']
  ];

  var SOURCES = [
    ['Boomi Agentstudio — product page', 'https://boomi.com/platform/agentstudio/'],
    ['Boomi AI release notes, May 2026 — MCP Registry', 'https://help.boomi.com/docs/Atomsphere/Release_Notes/AI/ai_may_2026'],
    ['Boomi Companion — product page', 'https://boomi.com/platform/companion/'],
    ['Boomi training and certifications', 'https://boomi.com/services/training/'],
    ['MuleSoft Agent Fabric overview', 'https://docs.mulesoft.com/general/agent-fabric-overview'],
    ['Apigee AI gateway capabilities', 'https://docs.cloud.google.com/apigee/docs/api-platform/get-started/ai-capabilities'],
    ['Apigee LLM token policies', 'https://docs.cloud.google.com/apigee/docs/api-platform/tutorials/using-ai-token-policies'],
    ['Wipro and Boomi partnership', 'https://www.wipro.com/partners/boomi/']
  ];

  var TOPO = {
    nodes: [
      { id: 'tower', label: 'Agent Control Tower', ring: 0, kind: 'control', ref: 'ag-tower' },
      { id: 'boomi', label: 'Boomi process', ring: 1, kind: 'integration', ref: 'boomi' },
      { id: 'apim', label: 'API / AI gateway', ring: 1, kind: 'integration', ref: 'ag-apigee' },
      { id: 'mcp', label: 'MCP Registry', ring: 1, kind: 'control', ref: 'ag-mcpreg' },
      { id: 'agent', label: 'Agent (Agentstudio)', ring: 1, kind: 'agent', ref: 'ag-studio' },
      { id: 'llm', label: 'Azure OpenAI', ring: 2, kind: 'ai', ref: 'llm' },
      { id: 'vec', label: 'Vector store', ring: 2, kind: 'ai', ref: 'retrieve' },
      { id: 'snow', label: 'ServiceNow', ring: 2, kind: 'system', ref: 'incident' },
      { id: 'wd', label: 'Workday', ring: 2, kind: 'system', ref: 'boomi' },
      { id: 'sap', label: 'SAP', ring: 2, kind: 'system', ref: 'boomi' },
      { id: 'sql', label: 'SQL database', ring: 2, kind: 'system', ref: 'boomi' },
      { id: 'ext', label: 'External agent', ring: 2, kind: 'agent', ref: 'ag-a2a' }
    ],
    links: [['tower', 'agent'], ['tower', 'ext'], ['tower', 'mcp'], ['agent', 'mcp'], ['mcp', 'apim'], ['agent', 'apim'], ['apim', 'boomi'], ['apim', 'llm'], ['boomi', 'llm'], ['boomi', 'vec'], ['boomi', 'snow'], ['boomi', 'wd'], ['boomi', 'sap'], ['boomi', 'sql'], ['agent', 'ext']],
    kinds: { control: ['Control plane', '#a78bfa'], integration: ['Integration and gateway', '#38bdf8'], agent: ['Agents', '#fbbf24'], ai: ['AI services', '#34d399'], system: ['Systems of record', '#94a3b8'] }
  };

  return { META: META, CATS: CATS, REQS: REQS, CAT_TEMPLATES: CAT_TEMPLATES, PLATFORMS: PLATFORMS, LIFECYCLE: LIFECYCLE,
    TECHNIQUES: TECHNIQUES, USECASES: USECASES, AGENTIC: AGENTIC, CONTROLS: CONTROLS, SIM_STEPS: SIM_STEPS, SIMS: SIMS,
    CHECKLIST: CHECKLIST, PLAN: PLAN, QA: QA, SOURCES: SOURCES, TOPO: TOPO };
})();
