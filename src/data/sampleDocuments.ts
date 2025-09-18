export interface DocumentSnippet {
  page: number
  section: string
  content: string
  highlights: string[]
  aiAnnotations: {
    gpt4: string[]
    claude: string[]
  }
}

export interface SampleDocument {
  title: string
  parties?: string[]
  effectiveDate?: string
  jurisdiction?: string
  case?: string
  caseNumber?: string
  date?: string
  location?: string
  value?: string
  term?: string
  propoundingParty?: string
  respondingParty?: string
  pages: number
  snippets: DocumentSnippet[]
}

export const sampleDocuments: Record<string, SampleDocument> = {
  'nda-techco': {
    title: 'MUTUAL NON-DISCLOSURE AGREEMENT',
    parties: ['TechCo Inc.', 'DataFlow Systems LLC'],
    effectiveDate: 'January 15, 2025',
    jurisdiction: 'Delaware',
    pages: 8,
    snippets: [
      {
        page: 1,
        section: 'Preamble',
        content: `This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of January 15, 2025
        ("Effective Date") by and between TechCo Inc., a Delaware corporation with its principal place
        of business at 100 Innovation Drive, San Francisco, CA 94105 ("TechCo"), and DataFlow Systems LLC,
        a California limited liability company with its principal place of business at 500 Data Center Way,
        San Jose, CA 95110 ("DataFlow").`,
        highlights: ['Mutual Non-Disclosure Agreement', 'Delaware corporation', 'California limited liability company'],
        aiAnnotations: {
          gpt4: ['Clear identification of parties', 'Purpose well-defined', 'Standard recitals structure'],
          claude: ['Mutual obligations established', 'Jurisdiction clearly stated', 'Consider adding specific AI/ML IP provisions']
        }
      },
      {
        page: 3,
        section: 'Obligations',
        content: `3. CONFIDENTIALITY OBLIGATIONS
        3.1 Each Party agrees to maintain the Confidential Information of the other Party in strict confidence
        and not to disclose such Confidential Information to third parties or use such Confidential Information
        for any purpose except as necessary to accomplish the Purpose.

        3.2 The term of confidentiality shall be three (3) years from the date of disclosure.`,
        highlights: ['strict confidence', 'three (3) years', 'Confidential Information'],
        aiAnnotations: {
          gpt4: ['Standard confidentiality period', 'Clear obligations defined'],
          claude: ['Three years may be insufficient for ML models', 'Consider industry-specific standards']
        }
      }
    ]
  },

  'deposition-williams': {
    title: 'DEPOSITION OF DR. SARAH WILLIAMS',
    case: 'Williams v. Acme Corporation',
    caseNumber: '2024-CV-1847',
    date: 'December 10, 2024',
    location: 'San Francisco, California',
    pages: 45,
    snippets: [
      {
        page: 3,
        section: 'Examination',
        content: `Q: Dr. Williams, you've been retained as an expert witness in this matter, correct?
        A: Yes, that's correct.

        Q: How long have you been practicing in the field of product safety engineering?
        A: Approximately 22 years.`,
        highlights: ['expert witness', '22 years'],
        aiAnnotations: {
          gpt4: ['Expert qualifications established', 'Extensive experience noted'],
          claude: ['Strong credentials for expert testimony', 'May face Daubert challenge']
        }
      },
      {
        page: 23,
        section: 'Technical Analysis',
        content: `Q: Dr. Williams, based on your analysis, what conclusions did you reach?
        A: I identified three critical design flaws that directly contributed to the failure.
        The tensile strength was insufficient at only 48,000 PSI versus the required 65,000 PSI.`,
        highlights: ['three critical design flaws', 'tensile strength', '48,000 PSI'],
        aiAnnotations: {
          gpt4: ['Specific technical defects identified', 'Quantitative analysis provided'],
          claude: ['Strong technical foundation', 'Clear causation testimony']
        }
      }
    ]
  },

  'contract-services': {
    title: 'MASTER SERVICES AGREEMENT',
    parties: ['Global Solutions Inc.', 'Enterprise Partners LLC'],
    effectiveDate: 'February 1, 2025',
    value: '$2,400,000',
    term: '3 years',
    pages: 24,
    snippets: [
      {
        page: 8,
        section: 'Service Levels',
        content: `5.1 Service Availability. Provider shall ensure 99.9% availability monthly.

        5.3 Service Credits:
        - 99.5% to 99.89%: 5% credit
        - 99.0% to 99.49%: 10% credit
        - Below 95.0%: 50% credit`,
        highlights: ['99.9% availability', 'Service Credits', '50% credit'],
        aiAnnotations: {
          gpt4: ['Detailed SLA metrics', 'Graduated service credits'],
          claude: ['99.9% SLA is aggressive', 'Credits cap at 50%']
        }
      },
      {
        page: 14,
        section: 'Payment Terms',
        content: `8.1 Client shall pay Provider $200,000 monthly ($2,400,000 annually).

        8.3 Payment due within thirty (30) days. Late payments accrue 1.5% monthly interest.`,
        highlights: ['$200,000 monthly', '$2,400,000 annually', '1.5% monthly interest'],
        aiAnnotations: {
          gpt4: ['Clear fee structure', 'Standard payment terms'],
          claude: ['High monthly commitment', 'Interest rate may exceed state limits']
        }
      }
    ]
  },

  'discovery-merger': {
    title: 'FIRST REQUEST FOR PRODUCTION OF DOCUMENTS',
    case: 'Pinnacle Holdings v. Apex Corporation',
    caseNumber: 'Case No. 2024-CV-3821',
    propoundingParty: 'Plaintiff Pinnacle Holdings, Inc.',
    respondingParty: 'Defendant Apex Corporation',
    pages: 28,
    snippets: [
      {
        page: 1,
        section: 'Definitions and Scope',
        content: `Pursuant to Federal Rule of Civil Procedure 34, Plaintiff hereby requests production of documents.
        "Document" includes all ESI, emails, Slack/Teams messages, text messages, recordings.
        "Relevant Period" means January 1, 2020 to present.`,
        highlights: ['FRCP 34', 'All ESI', '5-year lookback period'],
        aiAnnotations: {
          gpt4: ['Very broad ESI definition', 'Standard FRCP 34 format', '5-year scope'],
          claude: ['Overbroad temporal scope', 'ESI definition will trigger objections', 'Consider proportionality limits']
        }
      },
      {
        page: 8,
        section: 'Financial Documents',
        content: `REQUEST NO. 12: All valuation documents from January 1, 2020 to present.
        REQUEST NO. 13: All financial statements for all subsidiaries 2020-present.
        REQUEST NO. 15: All financing documents for the proposed Merger.`,
        highlights: ['All valuation documents', 'All financial statements', 'Multi-year scope'],
        aiAnnotations: {
          gpt4: ['Extensive financial requests', 'Targets merger valuation'],
          claude: ['Time frame disproportionate', 'Investment banker privilege likely']
        }
      },
      {
        page: 15,
        section: 'Communications',
        content: `REQUEST NO. 38: All communications between executives including emails, texts, Slack, Teams.
        REQUEST NO. 39: All internal communications mentioning "Project Thunder" (merger code name).`,
        highlights: ['All communications', 'Project Thunder', 'Personal devices included'],
        aiAnnotations: {
          gpt4: ['Code name identified', 'Modern platforms included'],
          claude: ['Personal device searches problematic', 'Massive volume expected']
        }
      },
      {
        page: 28,
        section: 'Burden Summary',
        content: `TOTAL REQUESTS: 73
        ESTIMATED DOCUMENTS: 2.4 million
        ESTIMATED REVIEW TIME: 3,200 hours
        ESTIMATED COST: $875,000`,
        highlights: ['73 requests', '2.4 million documents', '$875,000 cost'],
        aiAnnotations: {
          gpt4: ['Massive document volume', 'Extremely high cost burden'],
          claude: ['Clear disproportionality', 'Strong basis for protective order', 'Cost-shifting warranted']
        }
      }
    ]
  },

  'master-services-agreement': {
    title: 'MASTER SERVICES AGREEMENT',
    parties: ['Global Solutions Inc.', 'Enterprise Partners LLC'],
    effectiveDate: 'February 1, 2025',
    value: '$2,400,000',
    term: '3 years',
    pages: 24,
    snippets: [
      {
        page: 1,
        section: 'Agreement Overview',
        content: `This Master Services Agreement ("Agreement") is entered into as of February 1, 2025 ("Effective Date")
        by and between Global Solutions Inc., a Delaware corporation ("Provider"), and Enterprise Partners LLC,
        a New York limited liability company ("Client"). Provider shall deliver comprehensive technology services
        valued at $2,400,000 annually over a three-year term.`,
        highlights: ['$2,400,000 annually', 'three-year term', 'technology services'],
        aiAnnotations: {
          gpt4: ['High-value contract', 'Multi-year commitment', 'Clear party identification'],
          claude: ['Significant financial commitment', 'Long-term relationship', 'Consider quarterly review clauses']
        }
      },
      {
        page: 8,
        section: 'Service Levels',
        content: `5.1 Service Availability. Provider shall ensure 99.9% availability monthly.

        5.3 Service Credits:
        - 99.5% to 99.89%: 5% credit
        - 99.0% to 99.49%: 10% credit
        - Below 95.0%: 50% credit`,
        highlights: ['99.9% availability', 'Service Credits', '50% credit'],
        aiAnnotations: {
          gpt4: ['Detailed SLA metrics', 'Graduated service credits'],
          claude: ['99.9% SLA is aggressive', 'Credits cap at 50%']
        }
      },
      {
        page: 14,
        section: 'Payment Terms',
        content: `8.1 Client shall pay Provider $200,000 monthly ($2,400,000 annually).

        8.3 Payment due within thirty (30) days. Late payments accrue 1.5% monthly interest.`,
        highlights: ['$200,000 monthly', '$2,400,000 annually', '1.5% monthly interest'],
        aiAnnotations: {
          gpt4: ['Clear fee structure', 'Standard payment terms'],
          claude: ['High monthly commitment', 'Interest rate may exceed state limits']
        }
      }
    ]
  }
}

export function getDocumentById(id: string): SampleDocument | undefined {
  return sampleDocuments[id]
}

export function getDocumentSnippet(id: string, page: number): DocumentSnippet | undefined {
  const doc = sampleDocuments[id]
  if (!doc) return undefined
  return doc.snippets.find(s => s.page === page)
}