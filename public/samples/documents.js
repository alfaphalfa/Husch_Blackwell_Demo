const sampleDocuments = {
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
        San Jose, CA 95110 ("DataFlow"). TechCo and DataFlow may be referred to individually as a "Party"
        and collectively as the "Parties."

        WHEREAS, the Parties wish to explore a potential business relationship concerning the development
        and integration of artificial intelligence solutions for enterprise data management (the "Purpose");

        WHEREAS, in connection with such discussions, each Party may disclose to the other certain
        confidential and proprietary information;

        NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein,
        and for other good and valuable consideration, the receipt and sufficiency of which are hereby
        acknowledged, the Parties agree as follows:`,
        highlights: ['Mutual Non-Disclosure Agreement', 'Delaware corporation', 'California limited liability company', 'artificial intelligence solutions'],
        aiAnnotations: {
          gpt4: ['Clear identification of parties', 'Purpose well-defined', 'Standard recitals structure'],
          claude: ['Mutual obligations established', 'Jurisdiction clearly stated', 'Consider adding specific AI/ML IP provisions']
        }
      },
      {
        page: 2,
        section: 'Definitions',
        content: `1. DEFINITIONS
        1.1 "Confidential Information" means all information, whether written, oral, electronic, visual,
        or in any other form, that is disclosed by one Party (the "Disclosing Party") to the other Party
        (the "Receiving Party") and that is designated as confidential or that reasonably should be
        understood to be confidential given the nature of the information and the circumstances of disclosure.

        Confidential Information includes, but is not limited to:
        (a) Software, source code, object code, algorithms, and system architectures;
        (b) Trade secrets, know-how, inventions, techniques, processes, and methodologies;
        (c) Business plans, financial information, customer lists, and supplier information;
        (d) Product roadmaps, marketing strategies, and pricing information;
        (e) Machine learning models, training data sets, and AI architectures;
        (f) Any other proprietary information marked or identified as confidential.

        1.2 "Representatives" means a Party's employees, officers, directors, advisors, attorneys,
        accountants, and other agents who have a legitimate need to know the Confidential Information
        for the Purpose.`,
        highlights: ['Confidential Information', 'Machine learning models', 'training data sets', 'Trade secrets'],
        aiAnnotations: {
          gpt4: ['Broad definition of confidential information', 'Specific inclusion of AI/ML assets', 'Representatives clearly defined'],
          claude: ['Definition may be overly broad', 'Consider excluding publicly available information explicitly', 'Good coverage of technical IP']
        }
      },
      {
        page: 3,
        section: 'Obligations',
        content: `3. CONFIDENTIALITY OBLIGATIONS
        3.1 Each Party agrees to maintain the Confidential Information of the other Party in strict confidence
        and not to disclose such Confidential Information to third parties or use such Confidential Information
        for any purpose except as necessary to accomplish the Purpose.

        3.2 Each Party may disclose Confidential Information only to its Representatives who:
        (a) Have a legitimate need to know such information for the Purpose;
        (b) Have been informed of the confidential nature of such information;
        (c) Are bound by confidentiality obligations at least as restrictive as those contained herein.

        3.3 Each Party shall protect the other Party's Confidential Information using the same degree of
        care it uses to protect its own confidential information, but in no event less than reasonable care.

        3.4 The term of confidentiality shall be three (3) years from the date of disclosure of the specific
        Confidential Information, except for trade secrets, which shall be maintained in confidence for so
        long as such information remains a trade secret under applicable law.`,
        highlights: ['strict confidence', 'three (3) years', 'trade secrets', 'reasonable care'],
        aiAnnotations: {
          gpt4: ['Standard confidentiality period', 'Trade secret protection extended appropriately', 'Care standard defined'],
          claude: ['Consider industry-specific standards for AI data', 'Three years may be insufficient for ML models', 'Need clear definition of "reasonable care"']
        }
      },
      {
        page: 5,
        section: 'Exceptions',
        content: `5. EXCEPTIONS
        The obligations set forth in Section 3 shall not apply to any Confidential Information that:

        (a) Was known to the Receiving Party prior to disclosure by the Disclosing Party, as evidenced
        by written records;

        (b) Is or becomes publicly available through no breach of this Agreement by the Receiving Party;

        (c) Is rightfully received by the Receiving Party from a third party without breach of any
        confidentiality obligation;

        (d) Is independently developed by the Receiving Party without use of or reference to the
        Confidential Information, as evidenced by written records;

        (e) Is required to be disclosed by law, regulation, or court order, provided that the Receiving
        Party provides prompt written notice to the Disclosing Party and cooperates in any effort by
        the Disclosing Party to seek a protective order.`,
        highlights: ['publicly available', 'independently developed', 'required to be disclosed by law', 'protective order'],
        aiAnnotations: {
          gpt4: ['Standard exceptions included', 'Legal disclosure provision appropriate', 'Written records requirement good'],
          claude: ['Consider adding whistleblower protections', 'May need FOIA-specific language for government contracts', 'Notice provision could specify timeline']
        }
      },
      {
        page: 7,
        section: 'Termination',
        content: `9. TERMINATION AND RETURN OF INFORMATION
        9.1 This Agreement shall remain in effect until terminated by either Party upon thirty (30) days'
        prior written notice to the other Party.

        9.2 Upon termination of this Agreement or upon request by the Disclosing Party, the Receiving Party
        shall promptly:
        (a) Return all Confidential Information and all copies thereof to the Disclosing Party;
        (b) Destroy all notes, analyses, compilations, studies, and other documents prepared by the
        Receiving Party that contain or reflect any Confidential Information;
        (c) Provide written certification of compliance with this Section 9.2.

        9.3 Notwithstanding the foregoing, the Receiving Party may retain Confidential Information to the
        extent required by law or regulation, provided such retained information continues to be subject
        to the confidentiality obligations herein.`,
        highlights: ['thirty (30) days', 'Return all Confidential Information', 'written certification', 'required by law'],
        aiAnnotations: {
          gpt4: ['Clear termination process', 'Return/destroy obligations specified', 'Legal retention exception included'],
          claude: ['30-day notice may be too long for urgent situations', 'Consider adding emergency termination clause', 'Certification requirement is good practice']
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
        page: 1,
        section: 'Appearances',
        content: `UNITED STATES DISTRICT COURT
        NORTHERN DISTRICT OF CALIFORNIA

        SARAH WILLIAMS, et al.,
            Plaintiffs,
        v.                                    Case No. 2024-CV-1847
        ACME CORPORATION,
            Defendant.

        VIDEOTAPED DEPOSITION OF DR. SARAH WILLIAMS
        December 10, 2024
        9:00 a.m.

        APPEARANCES:
        For Plaintiffs:
        JENNIFER MARTINEZ, ESQ.
        Martinez & Associates, LLP
        1800 Market Street, Suite 2500
        San Francisco, CA 94102

        For Defendant:
        ROBERT CHEN, ESQ.
        Chen, Smith & Partners
        555 California Street, Suite 4000
        San Francisco, CA 94104

        Court Reporter: LISA THOMPSON, CSR No. 13579`,
        highlights: ['VIDEOTAPED DEPOSITION', 'Case No. 2024-CV-1847', 'Court Reporter', 'APPEARANCES'],
        aiAnnotations: {
          gpt4: ['Proper case caption', 'All parties represented', 'Videotaped deposition noted', 'Court reporter present'],
          claude: ['Federal court jurisdiction', 'Product liability case indicated', 'Both parties have counsel present']
        }
      },
      {
        page: 3,
        section: 'Examination',
        content: `EXAMINATION BY MS. MARTINEZ:

        Q: Please state your name for the record.
        A: Dr. Sarah Williams.

        Q: Dr. Williams, you understand you're under oath today?
        A: Yes, I do.

        Q: Could you please provide your educational background?
        A: I have a Bachelor of Science in Mechanical Engineering from MIT, a Master's in Materials Science
        from Stanford, and a Ph.D. in Mechanical Engineering, also from Stanford.

        Q: How long have you been practicing in the field of product safety engineering?
        A: Approximately 22 years.

        Q: Dr. Williams, you've been retained as an expert witness in this matter, correct?
        A: Yes, that's correct.

        Q: And what were you asked to do in connection with this case?
        A: I was asked to examine the allegedly defective product, review the design specifications and
        testing data, analyze the failure mechanism, and provide my expert opinion on whether the product
        contained design or manufacturing defects that contributed to the incident.`,
        highlights: ['under oath', 'MIT', 'Stanford', '22 years', 'expert witness', 'defective product'],
        aiAnnotations: {
          gpt4: ['Expert qualifications established', 'Proper oath acknowledgment', 'Clear scope of engagement'],
          claude: ['Strong educational credentials', 'Extensive experience noted', 'Expert tasked with comprehensive analysis']
        }
      },
      {
        page: 23,
        section: 'Technical Analysis',
        content: `Q: Dr. Williams, based on your analysis, what conclusions did you reach regarding the product defect?

        A: Based on my examination of the product and review of the testing data, I identified three critical
        design flaws that directly contributed to the failure. First, the tensile strength of the primary
        support bracket was insufficient for the stated load capacity. The specifications called for a
        minimum tensile strength of 65,000 PSI, but my testing showed the actual strength was only 48,000 PSI.

        Q: What was the second issue you identified?

        A: The welding points showed signs of incomplete fusion. Specifically, at joints A3 through A7,
        I observed lack of penetration averaging 40% of the specified weld depth. This is clearly visible
        in Exhibit 12, which shows the metallographic cross-sections.

        Q: And the third issue?

        A: The safety mechanism failed to engage under stress conditions that were within normal operating
        parameters. The trigger threshold was set at 150% of maximum load, but industry standards and
        prudent engineering practice require activation at 125% maximum.

        Q: In your opinion, to a reasonable degree of engineering certainty, did these defects cause
        the plaintiff's injuries?

        A: Yes, in my professional opinion, these design and manufacturing defects were substantial
        contributing factors to the product failure that resulted in the plaintiff's injuries.`,
        highlights: ['three critical design flaws', 'tensile strength', '48,000 PSI', 'incomplete fusion', 'safety mechanism failed', 'reasonable degree of engineering certainty'],
        aiAnnotations: {
          gpt4: ['Specific technical defects identified', 'Quantitative analysis provided', 'Clear causation opinion', 'Reference to exhibits'],
          claude: ['Strong technical foundation', 'Industry standards referenced', 'Direct causation testimony', 'May face Daubert challenge on methodology']
        }
      },
      {
        page: 34,
        section: 'Cross-Examination',
        content: `CROSS-EXAMINATION BY MR. CHEN:

        Q: Dr. Williams, you mentioned you conducted testing on the product, correct?
        A: Yes, that's correct.

        Q: But you didn't test the actual product involved in the incident, did you?
        A: No, that product was too damaged. I tested exemplar products of the same model and
        manufacturing batch.

        Q: So you're assuming the exemplar products are identical to the incident product?
        A: Based on the manufacturing records and quality control data, products from the same
        batch should have identical specifications and characteristics.

        Q: But you can't say with certainty that the specific product had these defects?
        A: I can say with reasonable engineering certainty based on batch testing, manufacturing
        records, and failure analysis that the defects I identified were present in products
        from this production run.

        Q: Dr. Williams, isn't it true that the product met all applicable federal safety standards?
        A: While it may have met minimum federal standards, those standards are not always sufficient
        to ensure product safety. Industry best practices often exceed federal minimums.

        MR. CHEN: Move to strike as non-responsive.
        MS. MARTINEZ: The witness is explaining her answer.
        THE WITNESS: May I complete my answer?`,
        highlights: ['CROSS-EXAMINATION', 'exemplar products', 'manufacturing batch', 'reasonable engineering certainty', 'federal safety standards', 'Move to strike'],
        aiAnnotations: {
          gpt4: ['Aggressive cross-examination', 'Challenge to testing methodology', 'Witness maintaining position', 'Objection noted'],
          claude: ['Potential weakness in not testing actual product', 'Witness provides reasonable explanation', 'Federal standards defense raised', 'Strategic objection by defense']
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
        page: 1,
        section: 'Agreement Terms',
        content: `MASTER SERVICES AGREEMENT

        This Master Services Agreement ("Agreement") is entered into as of February 1, 2025 ("Effective Date")
        by and between Global Solutions Inc., a New York corporation ("Provider"), and Enterprise Partners LLC,
        a Texas limited liability company ("Client").

        RECITALS

        WHEREAS, Provider specializes in providing enterprise software development, cloud infrastructure,
        and managed IT services;

        WHEREAS, Client desires to engage Provider to provide certain technology services as more fully
        described in one or more Statements of Work to be executed pursuant to this Agreement;

        WHEREAS, the Parties wish to set forth the general terms and conditions that will govern the
        provision of such services;

        NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth
        and for other good and valuable consideration, the receipt and sufficiency of which are hereby
        acknowledged, the Parties agree as follows:`,
        highlights: ['MASTER SERVICES AGREEMENT', 'enterprise software development', 'cloud infrastructure', 'Statements of Work'],
        aiAnnotations: {
          gpt4: ['Clear service categories defined', 'SOW structure established', 'Standard MSA format'],
          claude: ['Consider adding specific technology stack', 'SOW governance needs detail', 'Broad service scope may need refinement']
        }
      },
      {
        page: 8,
        section: 'Service Levels',
        content: `5. SERVICE LEVELS AND PERFORMANCE STANDARDS

        5.1 Service Availability. Provider shall ensure that the Services maintain an availability of
        99.9% measured on a monthly basis ("Service Level Agreement" or "SLA"), excluding scheduled
        maintenance windows.

        5.2 Performance Metrics:
        (a) Response Time: Critical issues - 15 minutes; High priority - 1 hour; Medium priority - 4 hours;
        Low priority - 24 hours
        (b) Resolution Time: Critical issues - 4 hours; High priority - 24 hours; Medium priority - 72 hours;
        Low priority - best effort
        (c) System Performance: Page load times not to exceed 3 seconds for 95% of requests
        (d) Data Processing: Batch processing completion within agreed windows 98% of the time

        5.3 Service Credits. If Provider fails to meet the SLA in any given month:
        - 99.5% to 99.89% availability: 5% service credit
        - 99.0% to 99.49% availability: 10% service credit
        - 95.0% to 98.99% availability: 25% service credit
        - Below 95.0% availability: 50% service credit

        5.4 Measurement and Reporting. Provider shall provide Client with monthly service level reports
        within five (5) business days after the end of each month.`,
        highlights: ['99.9%', 'Service Level Agreement', '15 minutes', 'service credit', 'monthly service level reports'],
        aiAnnotations: {
          gpt4: ['Detailed SLA metrics', 'Clear response/resolution times', 'Graduated service credits', 'Regular reporting required'],
          claude: ['99.9% SLA is aggressive', 'Service credits cap at 50%', 'Consider adding root cause analysis requirement', 'Measurement methodology needs detail']
        }
      },
      {
        page: 14,
        section: 'Payment Terms',
        content: `8. FEES AND PAYMENT TERMS

        8.1 Service Fees. Client shall pay Provider a monthly service fee of $200,000 ("Monthly Service Fee")
        for the Services provided under this Agreement, totaling $2,400,000 annually.

        8.2 Additional Services. Services requested by Client beyond the scope specified in applicable SOWs
        shall be provided at the following rates:
        - Senior Architect/Consultant: $350/hour
        - Project Manager: $250/hour
        - Senior Developer: $225/hour
        - Developer: $175/hour
        - Support Specialist: $125/hour

        8.3 Payment Terms. Provider shall invoice Client monthly in arrears. Payment is due within
        thirty (30) days of invoice date. Late payments shall accrue interest at the lesser of 1.5%
        per month or the maximum rate permitted by law.

        8.4 Disputed Charges. Client may dispute charges in good faith by providing written notice within
        fifteen (15) days of invoice receipt. Parties shall work together in good faith to resolve disputes.
        Undisputed amounts must be paid when due.

        8.5 Annual Adjustment. Beginning on the first anniversary of the Effective Date, fees may be
        adjusted annually by the lesser of 3% or the CPI increase.`,
        highlights: ['$200,000', '$2,400,000 annually', '$350/hour', 'thirty (30) days', '1.5% per month', '3% or the CPI'],
        aiAnnotations: {
          gpt4: ['Clear fee structure', 'Detailed hourly rates', 'Standard payment terms', 'Annual escalation capped'],
          claude: ['High monthly commitment', 'Interest rate may exceed state limits', 'Dispute process needs timeline', 'Consider adding volume discounts']
        }
      }
    ]
  },

  'discovery-merger': {
    title: 'FIRST REQUEST FOR PRODUCTION OF DOCUMENTS',
    case: 'MegaCorp Inc. v. Global Dynamics LLC',
    caseNumber: '2024-CV-9876',
    propoundingParty: 'Plaintiff MegaCorp Inc.',
    respondingParty: 'Defendant Global Dynamics LLC',
    pages: 156,
    snippets: [
      {
        page: 1,
        section: 'Caption and Introduction',
        content: `UNITED STATES DISTRICT COURT
        SOUTHERN DISTRICT OF NEW YORK

        MEGACORP INC.,
            Plaintiff,
        v.                                    Case No. 2024-CV-9876
        GLOBAL DYNAMICS LLC, et al.,
            Defendants.

        PLAINTIFF'S FIRST REQUEST FOR PRODUCTION OF DOCUMENTS TO DEFENDANT GLOBAL DYNAMICS LLC

        Pursuant to Federal Rules of Civil Procedure 26 and 34, Plaintiff MegaCorp Inc. ("Plaintiff")
        hereby requests that Defendant Global Dynamics LLC ("Defendant") produce for inspection and
        copying the following documents and electronically stored information ("ESI") within thirty (30)
        days of service of this request at the offices of Plaintiff's counsel.

        DEFINITIONS

        1. "Document" means all written, printed, typed, recorded, or graphic matter of any kind,
        including but not limited to: emails, text messages, instant messages, memoranda, notes,
        correspondence, reports, studies, analyses, contracts, agreements, drafts, calendars,
        appointment books, telephone logs, meeting minutes, presentations, spreadsheets, databases,
        and any electronically stored information in any format.`,
        highlights: ['FIRST REQUEST FOR PRODUCTION', 'Federal Rules of Civil Procedure 26 and 34', 'thirty (30) days', 'electronically stored information'],
        aiAnnotations: {
          gpt4: ['Standard federal discovery request', 'Broad document definition', 'ESI specifically included', '30-day response time'],
          claude: ['Very broad document definition', 'May be overly burdensome', 'Consider proportionality objections', 'ESI protocol needed']
        }
      },
      {
        page: 15,
        section: 'Financial Documents',
        content: `REQUEST NO. 12: All documents relating to the valuation of Global Dynamics LLC or any of its
        subsidiaries, divisions, or product lines from January 1, 2020 to present, including but not
        limited to:
        a) Valuation reports, fairness opinions, and solvency opinions
        b) Financial projections, budgets, and forecasts
        c) Board presentations regarding valuation
        d) Communications with investment bankers, financial advisors, or appraisers
        e) Comparable company analyses and precedent transaction analyses

        REQUEST NO. 13: All documents concerning any actual or potential merger, acquisition, sale,
        joint venture, strategic alliance, or other business combination involving Global Dynamics
        or any of its assets from January 1, 2019 to present.

        REQUEST NO. 14: All financial statements, including but not limited to:
        a) Annual audited financial statements for 2019-2024
        b) Quarterly unaudited financial statements for all quarters from Q1 2019 to present
        c) Monthly management reports and flash reports
        d) All audit work papers and management letters
        e) All restatements or corrections to financial statements`,
        highlights: ['valuation', 'January 1, 2020 to present', 'merger, acquisition', 'financial statements', 'audit work papers'],
        aiAnnotations: {
          gpt4: ['Extensive financial document requests', 'Multi-year time frame', 'Includes privileged materials', 'Very broad scope'],
          claude: ['Likely to trigger privilege objections', 'Time frame may be disproportionate', 'Work papers may be protected', 'Consider breaking into subparts']
        }
      },
      {
        page: 47,
        section: 'Email and Communications',
        content: `REQUEST NO. 38: All emails, text messages, instant messages, Slack messages, Teams messages,
        or other electronic communications between or among any of the following individuals concerning
        the proposed merger, acquisition, or any competitive business practices:

        a) John Smith (CEO)
        b) Jane Doe (CFO)
        c) Robert Johnson (General Counsel)
        d) Sarah Williams (VP of Strategy)
        e) Michael Chen (Board Chairman)
        f) Any member of the Board of Directors
        g) Any member of the Executive Committee

        REQUEST NO. 39: All documents reflecting, referring, or relating to any communication with
        any government agency, regulator, or official concerning:
        a) The proposed merger or acquisition
        b) Antitrust or competition issues
        c) Hart-Scott-Rodino filings
        d) Market share or market concentration
        e) Competitive effects or consumer harm

        REQUEST NO. 40: All documents that were provided to or received from the Department of Justice,
        Federal Trade Commission, or any state attorney general regarding the proposed transaction.`,
        highlights: ['All emails', 'Slack messages, Teams messages', 'Board of Directors', 'government agency', 'Department of Justice', 'Federal Trade Commission'],
        aiAnnotations: {
          gpt4: ['Targets key executives', 'Includes modern communication platforms', 'Government investigation focus', 'Antitrust concerns evident'],
          claude: ['Attorney-client privilege issues', 'Very broad email request', 'Government communications may be protected', 'Consider search term limitations']
        }
      }
    ]
  }
};

// Export for use in React components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sampleDocuments;
}