// Complete Legal Documents for Demo
export interface DocumentPage {
  pageNumber: number
  title: string
  content: string
  aiAnnotations: {
    gptVision: Array<{
      text: string
      position: { x: number; y: number }
    }>
    claude: Array<{
      text: string
      type: 'positive' | 'warning' | 'recommendation'
    }>
  }
}

export interface FullDocument {
  id: string
  name: string
  title: string
  parties: string[]
  date: string
  totalPages: number
  documentType: string
  pages: DocumentPage[]
  analysisResults: {
    gptVisionSummary: {
      documentsScanned: number
      keyTermsExtracted: number
      signaturesDetected: number
      tablesFound: number
      executionTime: string
      confidence: number
    }
    claudeAnalysis: {
      riskLevel: string
      keyRisks: string[]
      recommendations: string[]
      contractScore: number
      executionTime: string
    }
    timeSaved: string
    costSaved: string
    accuracy: string
  }
}

// Complete NDA Document for Demo
export const techCoNDA: FullDocument = {
  id: 'nda-techco',
  name: 'Non-Disclosure Agreement - TechCo',
  title: 'MUTUAL NON-DISCLOSURE AGREEMENT',
  parties: ['TechCo Inc.', 'DataFlow Systems LLC'],
  date: 'January 15, 2025',
  totalPages: 8,
  documentType: 'Non-Disclosure Agreement',

  pages: [
    {
      pageNumber: 1,
      title: 'MUTUAL NON-DISCLOSURE AGREEMENT',
      content: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of January 15, 2025 ("Effective Date") by and between TechCo Inc., a Delaware corporation with its principal place of business at 100 Innovation Drive, San Francisco, CA 94105 ("TechCo"), and DataFlow Systems LLC, a California limited liability company with its principal place of business at 500 Data Center Way, San Jose, CA 95110 ("DataFlow"). TechCo and DataFlow may be referred to individually as a "Party" and collectively as the "Parties."

RECITALS

WHEREAS, the Parties desire to explore a potential business relationship concerning artificial intelligence and machine learning technologies ("Purpose"); and

WHEREAS, in connection with the Purpose, each Party may disclose to the other Party certain confidential and proprietary information; and

WHEREAS, the Parties desire to protect such confidential and proprietary information in accordance with the terms of this Agreement;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:`,

      aiAnnotations: {
        gptVision: [
          { text: 'Clear identification of parties', position: { x: 50, y: 120 } },
          { text: 'Purpose well-defined', position: { x: 50, y: 280 } },
          { text: 'Standard recitals structure', position: { x: 50, y: 400 } }
        ],
        claude: [
          { text: 'Mutual obligations established', type: 'positive' },
          { text: 'Jurisdiction clearly stated', type: 'positive' },
          { text: 'Consider adding specific AI/ML IP provisions', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 2,
      title: 'DEFINITIONS',
      content: `1. DEFINITIONS

1.1 "Confidential Information" means any and all information or data, in any form or medium, that is disclosed by one Party (the "Disclosing Party") to the other Party (the "Receiving Party"), whether before or after the Effective Date, including but not limited to:

(a) Technical information, including software, source code, object code, algorithms, data structures, APIs, databases, models, training data, neural network architectures, and documentation;

(b) Business information, including customer lists, supplier information, pricing data, financial information, business plans, marketing strategies, and product roadmaps;

(c) Legal information, including contracts, agreements, regulatory filings, and compliance documentation;

(d) Any other information that is marked as "Confidential," "Proprietary," or with similar designation, or that would reasonably be considered confidential given the nature of the information and the circumstances of disclosure.

1.2 "Representatives" means a Party's employees, officers, directors, advisors, attorneys, accountants, consultants, and agents who have a need to know the Confidential Information for the Purpose.

1.3 "AI Systems" means any artificial intelligence, machine learning, deep learning, or neural network systems, models, or technologies developed, used, or disclosed by either Party.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Comprehensive definition scope', position: { x: 50, y: 150 } },
          { text: 'AI-specific provisions included', position: { x: 50, y: 350 } }
        ],
        claude: [
          { text: 'Strong coverage of technical IP', type: 'positive' },
          { text: 'AI Systems specifically defined - excellent for tech companies', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 3,
      title: 'CONFIDENTIALITY OBLIGATIONS',
      content: `2. PURPOSE
The Parties are exploring a potential business relationship regarding the development, integration, and deployment of AI-powered data analytics solutions.

3. CONFIDENTIALITY OBLIGATIONS

3.1 Each Party agrees to maintain the Confidential Information of the other Party in strict confidence and not to disclose such Confidential Information to third parties or use such Confidential Information for any purpose except as necessary to accomplish the Purpose.

3.2 The term of confidentiality shall be three (3) years from the date of disclosure of the specific Confidential Information.

3.3 The Receiving Party shall:
(a) Use the same degree of care to protect the Confidential Information as it uses to protect its own confidential information, but in no event less than reasonable care;
(b) Limit access to Confidential Information to its Representatives who have a need to know for the Purpose;
(c) Inform such Representatives of the confidential nature of the Confidential Information and ensure their compliance with this Agreement;
(d) Be responsible for any breach of this Agreement by its Representatives.

3.4 Special Provisions for AI Systems:
(a) No training of AI models using the other Party's Confidential Information without explicit written consent;
(b) No reverse engineering of disclosed AI models or algorithms;
(c) Immediate deletion of any AI-generated outputs derived from Confidential Information upon request.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard confidentiality period', position: { x: 50, y: 200 } },
          { text: 'Clear obligations defined', position: { x: 50, y: 350 } }
        ],
        claude: [
          { text: 'Three years may be insufficient for ML models', type: 'warning' },
          { text: 'AI-specific restrictions are well-crafted', type: 'positive' },
          { text: 'Consider adding data retention limitations', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 4,
      title: 'EXCEPTIONS',
      content: `4. EXCEPTIONS TO CONFIDENTIALITY

The obligations set forth in Section 3 shall not apply to any Confidential Information that:

4.1 Was rightfully known by the Receiving Party prior to disclosure by the Disclosing Party, as evidenced by written records;

4.2 Is or becomes generally available to the public through no breach of this Agreement by the Receiving Party;

4.3 Is rightfully received by the Receiving Party from a third party without breach of any confidentiality obligation;

4.4 Is independently developed by the Receiving Party without use of or reference to the Confidential Information, as evidenced by written records;

4.5 Is required to be disclosed by law, regulation, or court order, provided that:
(a) The Receiving Party provides prompt written notice to the Disclosing Party of such requirement;
(b) The Receiving Party cooperates with the Disclosing Party's efforts to seek a protective order;
(c) The Receiving Party discloses only the minimum information required.

5. OWNERSHIP AND NO LICENSE

5.1 All Confidential Information shall remain the exclusive property of the Disclosing Party. Nothing in this Agreement shall be construed as granting any rights, by license or otherwise, to any Confidential Information, except the limited right to use such Confidential Information solely for the Purpose.

5.2 No rights or licenses to patents, copyrights, trademarks, trade secrets, or other intellectual property rights are granted under this Agreement.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard exceptions clearly listed', position: { x: 50, y: 150 } },
          { text: 'Legal disclosure provisions included', position: { x: 50, y: 400 } }
        ],
        claude: [
          { text: 'Comprehensive exception coverage', type: 'positive' },
          { text: 'Consider adding "residual knowledge" clause for AI development', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 5,
      title: 'RETURN OF INFORMATION',
      content: `6. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION

6.1 Upon the written request of the Disclosing Party, or upon termination of this Agreement, the Receiving Party shall promptly:
(a) Return all Confidential Information and copies thereof to the Disclosing Party; or
(b) Destroy all Confidential Information and copies thereof and certify such destruction in writing.

6.2 Notwithstanding the foregoing, the Receiving Party may retain:
(a) One copy of Confidential Information in its legal files solely for archival purposes;
(b) Electronic copies in routine backup systems until such time as they are deleted in the ordinary course;
(c) Confidential Information that is required to be retained by applicable law or regulation.

6.3 Any retained Confidential Information shall remain subject to the confidentiality obligations of this Agreement.

7. NO REPRESENTATIONS OR WARRANTIES

7.1 ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS." NEITHER PARTY MAKES ANY WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

7.2 Neither Party shall be liable for any errors or omissions in any Confidential Information.

8. NO OBLIGATION

Nothing in this Agreement shall obligate either Party to:
(a) Disclose any particular information;
(b) Enter into any further agreement or transaction;
(c) Continue discussions or negotiations.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Clear return/destruction provisions', position: { x: 50, y: 150 } },
          { text: 'Disclaimer prominently displayed', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Return provisions are standard', type: 'positive' },
          { text: 'Consider addressing AI model deletion specifically', type: 'recommendation' },
          { text: 'Strong disclaimer language', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 6,
      title: 'REMEDIES',
      content: `9. REMEDIES

9.1 The Parties acknowledge that disclosure of Confidential Information in breach of this Agreement would cause irreparable harm for which monetary damages would be inadequate. Accordingly, the non-breaching Party shall be entitled to seek equitable relief, including injunction and specific performance, without prejudice to any other rights or remedies it may have.

9.2 The prevailing Party in any legal action to enforce this Agreement shall be entitled to recover its reasonable attorneys' fees and costs.

10. TERM AND TERMINATION

10.1 This Agreement shall commence on the Effective Date and continue for two (2) years, unless earlier terminated.

10.2 Either Party may terminate this Agreement at any time upon thirty (30) days' written notice to the other Party.

10.3 The confidentiality obligations in Section 3 shall survive termination for the period specified therein.

11. MISCELLANEOUS

11.1 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.

11.2 Entire Agreement. This Agreement constitutes the entire agreement between the Parties concerning the subject matter hereof and supersedes all prior or contemporaneous agreements, whether written or oral.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Equitable remedies addressed', position: { x: 50, y: 150 } },
          { text: 'Delaware law specified', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Strong remedies section', type: 'positive' },
          { text: 'Consider adding liquidated damages clause', type: 'recommendation' },
          { text: 'Delaware law favorable for corporations', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 7,
      title: 'MISCELLANEOUS (CONTINUED)',
      content: `11.3 Amendment. This Agreement may only be amended by a written instrument signed by both Parties.

11.4 Waiver. No waiver of any provision of this Agreement shall be effective unless in writing and signed by the Party against whom such waiver is sought to be enforced.

11.5 Severability. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

11.6 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party, except that either Party may assign this Agreement to an acquirer of all or substantially all of its assets or business.

11.7 Notices. All notices under this Agreement shall be in writing and deemed given when:
(a) Delivered personally;
(b) Sent by certified mail, return receipt requested;
(c) Sent by recognized overnight courier; or
(d) Sent by email with confirmation of receipt.

To TechCo:
TechCo Inc.
100 Innovation Drive
San Francisco, CA 94105
Attn: Legal Department
Email: legal@techco.com

To DataFlow:
DataFlow Systems LLC
500 Data Center Way
San Jose, CA 95110
Attn: General Counsel
Email: legal@dataflow.com`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard boilerplate provisions', position: { x: 50, y: 200 } },
          { text: 'Notice provisions complete', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Assignment clause appropriately limited', type: 'positive' },
          { text: 'Electronic notice provisions modern and practical', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 8,
      title: 'SIGNATURE PAGE',
      content: `11.8 Counterparts. This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument. Electronic signatures shall be deemed valid and binding.

11.9 Export Compliance. Each Party shall comply with all applicable export control laws and regulations in the performance of this Agreement.

11.10 No Partnership. Nothing in this Agreement shall be construed to create a partnership, joint venture, or agency relationship between the Parties.

IN WITNESS WHEREOF, the Parties have executed this Mutual Non-Disclosure Agreement as of the date first written above.

TECHCO INC.                           DATAFLOW SYSTEMS LLC


_______________________________       _______________________________
By: Jennifer Martinez                 By: Robert Chen
Title: Chief Legal Officer           Title: General Counsel
Date: January 15, 2025               Date: January 15, 2025


_______________________________       _______________________________
By: Michael Thompson                  By: Sarah Williams
Title: Chief Technology Officer      Title: VP of Engineering
Date: January 15, 2025               Date: January 15, 2025`,

      aiAnnotations: {
        gptVision: [
          { text: 'Signature blocks properly formatted', position: { x: 50, y: 400 } },
          { text: 'Dual signatures indicate high-value agreement', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Electronic signature provision included - modern approach', type: 'positive' },
          { text: 'Export compliance important for AI technology', type: 'positive' },
          { text: 'Consider adding data localization requirements', type: 'recommendation' }
        ]
      }
    }
  ],

  // Analysis Summary for the demo
  analysisResults: {
    gptVisionSummary: {
      documentsScanned: 8,
      keyTermsExtracted: 47,
      signaturesDetected: 4,
      tablesFound: 0,
      executionTime: '3.2s',
      confidence: 0.97
    },
    claudeAnalysis: {
      riskLevel: 'Medium',
      keyRisks: [
        'Three-year confidentiality period may be insufficient for AI models',
        'No liquidated damages clause for breaches',
        'Broad definition of confidential information could limit future development'
      ],
      recommendations: [
        'Add specific provisions for AI model training data',
        'Include residual knowledge clause for developers',
        'Consider longer confidentiality period for algorithms (5-7 years)',
        'Add data localization and deletion requirements'
      ],
      contractScore: 82,
      executionTime: '4.8s'
    },
    timeSaved: '7.8 hours',
    costSaved: '$1,365',
    accuracy: '99.2%'
  }
}

// Complete Deposition Document for Demo
export const williamsDeposition: FullDocument = {
  id: 'deposition-williams',
  name: 'Deposition - Williams v. Acme',
  title: 'DEPOSITION OF DR. SARAH WILLIAMS',
  parties: ['Jonathan Williams (Plaintiff)', 'Acme Corporation (Defendant)'],
  date: 'December 10, 2024',
  totalPages: 45,
  documentType: 'Deposition Transcript',

  pages: [
    {
      pageNumber: 1,
      title: 'CAPTION AND APPEARANCES',
      content: `IN THE UNITED STATES DISTRICT COURT
FOR THE DISTRICT OF DELAWARE

JONATHAN WILLIAMS,
    Plaintiff,
v.                                    Case No. 2024-CV-1847
ACME CORPORATION,
    Defendant.

DEPOSITION OF DR. SARAH WILLIAMS

DATE: December 10, 2024
TIME: 9:00 a.m.
LOCATION: Martinez & Associates, LLP
          1200 Market Street, Suite 2100
          Wilmington, Delaware 19801

APPEARANCES:

For the Plaintiff:
    JENNIFER MARTINEZ, ESQ.
    Martinez & Associates, LLP
    1200 Market Street, Suite 2100
    Wilmington, Delaware 19801
    jmartinez@martinezlaw.com

For the Defendant:
    ROBERT CHEN, ESQ.
    Chen, Smith & Partners
    300 Delaware Avenue, Suite 900
    Wilmington, Delaware 19801
    rchen@csplaw.com

Court Reporter:
    LISA ANDERSON, CSR
    Certified Court Reporter
    License No. DE-2847`,

      aiAnnotations: {
        gptVision: [
          { text: 'Proper caption format identified', position: { x: 50, y: 100 } },
          { text: 'All parties properly noted', position: { x: 50, y: 400 } },
          { text: 'Court reporter credentials verified', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Federal court jurisdiction confirmed', type: 'positive' },
          { text: 'All required parties present', type: 'positive' },
          { text: 'Proper venue for product liability case', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 2,
      title: 'STIPULATIONS',
      content: `STIPULATIONS

IT IS HEREBY STIPULATED AND AGREED by and between counsel for the respective parties that:

1. The deposition is being taken pursuant to the Federal Rules of Civil Procedure and the Local Rules of the District of Delaware.

2. All objections except as to the form of the question are reserved until the time of trial.

3. The reading and signing of the deposition transcript by the witness is not waived.

4. The original transcript shall be retained by the court reporter pending further order of the Court.

5. Counsel may stipulate on the record to any other agreements as necessary during the course of the deposition.

EXAMINATION INDEX
                                                    Page
Direct Examination by Ms. Martinez.................. 3
Cross-Examination by Mr. Chen...................... 127
Redirect Examination by Ms. Martinez............... 201
Recross-Examination by Mr. Chen.................... 215

EXHIBIT INDEX
Exhibit 1 - Dr. Williams' Curriculum Vitae.......... 15
Exhibit 2 - Expert Report dated November 1, 2024.... 28
Exhibit 3 - Test Results and Data................... 45
Exhibit 4 - Product Specifications.................. 67
Exhibit 5 - Failure Analysis Report................ 89
Exhibit 6 - Industry Standards Documentation....... 112`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard stipulations present', position: { x: 50, y: 150 } },
          { text: 'Comprehensive exhibit list', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'FRCP compliance noted', type: 'positive' },
          { text: 'Reading and signing not waived - important for accuracy', type: 'positive' },
          { text: '6 exhibits indicate thorough preparation', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 3,
      title: 'DIRECT EXAMINATION',
      content: `DIRECT EXAMINATION BY MS. MARTINEZ:

Q: Good morning, Dr. Williams. Could you please state your full name for the record?

A: Good morning. My name is Dr. Sarah Elizabeth Williams.

Q: Dr. Williams, what is your current occupation?

A: I am a Professor of Mechanical Engineering at MIT and a consulting engineer specializing in product failure analysis.

Q: How long have you been working in the field of mechanical engineering?

A: I have been working in mechanical engineering for 22 years, since completing my Ph.D. in 2002.

Q: Could you briefly describe your educational background?

A: Certainly. I received my Bachelor of Science in Mechanical Engineering from Stanford University in 1996, graduating summa cum laude. I then earned my Master's degree from MIT in 1998, and completed my Ph.D. in Mechanical Engineering, also from MIT, in 2002. My doctoral thesis focused on failure mechanisms in composite materials under cyclic loading conditions.

Q: Are you licensed as a Professional Engineer?

A: Yes, I am licensed as a Professional Engineer in Massachusetts, Delaware, California, and New York. I have maintained active licenses in all four states since 2004.

Q: Dr. Williams, have you previously testified as an expert witness?

A: Yes, I have testified as an expert witness in 47 cases over the past 15 years, primarily in product liability and patent infringement matters.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Expert qualifications established', position: { x: 50, y: 200 } },
          { text: 'Extensive experience noted', position: { x: 50, y: 350 } },
          { text: '47 prior testimonies documented', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Strong credentials for expert testimony', type: 'positive' },
          { text: 'May face Daubert challenge on methodology', type: 'warning' },
          { text: 'Multi-state licensure strengthens credibility', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 23,
      title: 'TECHNICAL ANALYSIS',
      content: `Q: Dr. Williams, based on your analysis, what conclusions did you reach regarding the product defect?

A: Based on my examination of the product and review of the testing data, I identified three critical design flaws that directly contributed to the failure.

Q: Could you describe the first design flaw?

A: The first critical flaw relates to the tensile strength of the primary support bracket. The specifications called for a minimum tensile strength of 65,000 PSI, but testing revealed the actual strength was only 48,000 PSI, which is approximately 26% below the required specification.

Q: How did you determine this deficiency?

A: I conducted destructive testing on three exemplar units using an Instron universal testing machine. All three samples failed at loads between 47,500 and 48,500 PSI, with an average failure point of 48,000 PSI. The testing was performed in accordance with ASTM E8 standards.

Q: What was the second design flaw you identified?

A: The second flaw involved the welding points at critical stress junctions. Metallographic examination revealed incomplete fusion penetration in 7 out of 12 critical weld joints. The penetration averaged only 60% of the base material thickness, whereas industry standards and the product specifications require a minimum of 85% penetration.

Q: And the third design flaw?

A: The third flaw was the failure of the safety mechanism to engage under normal operating conditions. The safety release was designed to activate at 120% of maximum rated load, but testing showed it failed to engage even at 150% of rated load in 4 out of 5 test scenarios.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Specific technical defects identified', position: { x: 50, y: 250 } },
          { text: 'Quantitative analysis provided', position: { x: 50, y: 400 } },
          { text: 'Testing methodology documented', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Strong technical foundation for causation', type: 'positive' },
          { text: 'Clear documentation of testing standards', type: 'positive' },
          { text: 'Multiple independent failures strengthen case', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 24,
      title: 'TECHNICAL ANALYSIS CONTINUED',
      content: `Q: Dr. Williams, how do these three design flaws relate to the incident involving the plaintiff?

A: The combination of these three flaws created what I would characterize as a "perfect storm" of failure conditions. The reduced tensile strength meant the bracket was operating much closer to its failure threshold during normal use. The incomplete welds created stress concentrations that further weakened the structure. When the load exceeded the diminished capacity, the safety mechanism that should have prevented catastrophic failure did not engage.

Q: In your opinion, to a reasonable degree of engineering certainty, would this incident have occurred if any one of these flaws had been corrected?

A: No. If any one of these defects had been properly addressed, the failure would not have occurred. The design incorporated multiple safety factors specifically to prevent single-point failures from causing incidents. However, with all three defects present simultaneously, those safety factors were effectively eliminated.

Q: Did you review Acme Corporation's quality control records?

A: Yes, I reviewed quality control records from January 2023 through December 2023, covering the period when the subject product was manufactured.

Q: What did those records reveal?

A: The records showed a pattern of failed inspections that were marked as "passed with deviation" or "conditionally approved." Specifically, I found 127 instances where products with measured tensile strength below specification were approved for shipment with a deviation notice that was never communicated to end users.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Causation clearly established', position: { x: 50, y: 200 } },
          { text: 'Quality control failures documented', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Perfect storm theory compelling for jury', type: 'positive' },
          { text: 'QC records could trigger punitive damages claim', type: 'warning' },
          { text: 'Pattern of deviations suggests systemic issues', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 127,
      title: 'CROSS-EXAMINATION',
      content: `CROSS-EXAMINATION BY MR. CHEN:

Q: Good afternoon, Dr. Williams. I'm Robert Chen, representing Acme Corporation. I have some questions about your testimony.

A: Good afternoon, Mr. Chen.

Q: Dr. Williams, you testified that you've been retained as an expert in 47 cases, correct?

A: That's correct.

Q: And in how many of those cases did you testify for plaintiffs versus defendants?

A: I would estimate approximately 35 for plaintiffs and 12 for defendants.

Q: So roughly 75% of your work is for plaintiffs in product liability cases?

A: That's approximately correct, yes.

Q: Are you being compensated for your time in this case?

A: Yes, I am being compensated at my standard rate.

Q: And what is that rate?

A: My rate is $650 per hour for review and analysis, and $850 per hour for deposition and trial testimony.

Q: How many hours have you spent on this case to date?

A: I've spent approximately 120 hours on this matter.

Q: So you've been paid approximately $78,000 so far?

A: That's approximately correct, though I haven't calculated the exact amount.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Bias exploration by defense', position: { x: 50, y: 300 } },
          { text: 'Compensation disclosed', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Standard bias attack on expert', type: 'warning' },
          { text: 'Compensation reasonable for complex case', type: 'positive' },
          { text: 'Consider redirect on objectivity', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 128,
      title: 'CROSS-EXAMINATION CONTINUED',
      content: `Q: Dr. Williams, you mentioned conducting destructive testing on three units. Who provided those units?

A: The units were provided by plaintiff's counsel.

Q: Were these the actual units involved in the incident?

A: No, these were exemplar units of the same model and manufacture date.

Q: So you never actually examined the specific unit that allegedly failed?

A: The actual unit was too damaged to conduct meaningful testing. However, the exemplar units were manufactured in the same batch, on the same production line, within days of the incident unit.

Q: But you can't say with certainty that the incident unit had the same tensile strength as your test units?

A: I cannot test a destroyed unit, but statistical quality control principles and batch production methods provide reasonable scientific certainty that units from the same batch share similar characteristics.

Q: Dr. Williams, isn't it true that the product met all applicable industry standards at the time of manufacture?

A: The product was certified as meeting industry standards, yes. However, my testing revealed it did not actually meet those standards.

Q: Are you suggesting that the certification bodies were wrong?

A: I'm stating that my testing, conducted under controlled laboratory conditions using calibrated equipment, showed the product did not meet the specified standards, regardless of what certifications were issued.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Challenge to testing methodology', position: { x: 50, y: 200 } },
          { text: 'Expert maintaining position', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Expert handling cross-examination well', type: 'positive' },
          { text: 'Exemplar testing is standard practice', type: 'positive' },
          { text: 'Certification challenge could backfire on defense', type: 'warning' }
        ]
      }
    },

    {
      pageNumber: 201,
      title: 'REDIRECT EXAMINATION',
      content: `REDIRECT EXAMINATION BY MS. MARTINEZ:

Q: Dr. Williams, Mr. Chen asked you about being retained primarily by plaintiffs. Does that affect your objectivity in any way?

A: No, it does not. I apply the same scientific methods and engineering principles regardless of who retains me. I have declined cases for both plaintiffs and defendants when the evidence didn't support their positions.

Q: Can you give an example?

A: Just last year, I was retained by a plaintiff's firm in a similar product liability case. After reviewing the evidence, I concluded the product was not defective and the incident was due to user misuse. I informed the attorneys of my findings, and they chose not to proceed with the case.

Q: Regarding the exemplar units you tested, is it standard practice to test exemplar units rather than the actual failed unit?

A: Yes, absolutely. In fact, it's often preferable because the failed unit may be too damaged to provide accurate test results. Using exemplar units from the same production batch is a widely accepted practice in failure analysis and is specifically endorsed by the American Society for Testing and Materials.

Q: Dr. Williams, what is your confidence level in your conclusions?

A: Based on the testing conducted, the documentation reviewed, and my 22 years of experience in failure analysis, I hold my opinions to a reasonable degree of engineering certainty, which in quantitative terms would be greater than 95% confidence.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Rehabilitation of expert credibility', position: { x: 50, y: 200 } },
          { text: 'Standard practices confirmed', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Effective redirect on bias issue', type: 'positive' },
          { text: 'Strong confidence level stated', type: 'positive' },
          { text: 'ASTM endorsement strengthens methodology', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 215,
      title: 'RECROSS-EXAMINATION',
      content: `RECROSS-EXAMINATION BY MR. CHEN:

Q: Dr. Williams, you mentioned 95% confidence. That means there's a 5% chance you're wrong?

A: In scientific terms, it means there's a 5% probability that the observed results could occur by chance alone. However, given the multiple independent failures I identified, the actual probability of error is much lower.

Q: But you acknowledge there is some possibility of error?

A: There is always some theoretical possibility of error in any scientific analysis. However, the convergence of multiple lines of evidence makes error highly unlikely in this case.

Q: Nothing further.

MS. MARTINEZ: No further questions.

THE COURT REPORTER: This concludes the deposition of Dr. Sarah Williams.

(Deposition concluded at 4:47 p.m.)`,

      aiAnnotations: {
        gptVision: [
          { text: 'Defense attempting final doubt', position: { x: 50, y: 150 } },
          { text: 'Expert maintains position', position: { x: 50, y: 300 } }
        ],
        claude: [
          { text: 'Expert handled uncertainty question well', type: 'positive' },
          { text: 'Strong close for plaintiff', type: 'positive' },
          { text: 'Consider motion in limine on 5% uncertainty', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 45,
      title: 'CERTIFICATE AND SIGNATURE',
      content: `CERTIFICATE OF COURT REPORTER

I, LISA ANDERSON, a Certified Court Reporter in and for the State of Delaware, do hereby certify that the witness, DR. SARAH WILLIAMS, was first duly sworn to testify the truth, the whole truth, and nothing but the truth in the above-entitled matter.

I further certify that the foregoing is a true and correct transcript of the testimony given by the witness at the deposition taken on December 10, 2024, at the offices of Martinez & Associates, LLP, Wilmington, Delaware.

I further certify that I am neither counsel for, related to, nor employed by any of the parties to this action, and further that I am not financially or otherwise interested in the outcome of this action.

                              _______________________________
                              LISA ANDERSON, CSR
                              Court Reporter
                              License No. DE-2847
                              Date: December 15, 2024

WITNESS ACKNOWLEDGMENT

I, DR. SARAH WILLIAMS, have read the foregoing transcript of my deposition taken on December 10, 2024, and the same is true and correct, save and except for the changes, if any, noted on the attached errata sheet.

                              _______________________________
                              DR. SARAH WILLIAMS
                              Date: December 20, 2024

ERRATA SHEET
Page    Line    Change                      Reason
None - No changes requested`,

      aiAnnotations: {
        gptVision: [
          { text: 'Proper certification present', position: { x: 50, y: 150 } },
          { text: 'Witness signature obtained', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'No errata - strengthens testimony', type: 'positive' },
          { text: 'Proper authentication for trial use', type: 'positive' }
        ]
      }
    }
  ],

  // Analysis Summary for the demo
  analysisResults: {
    gptVisionSummary: {
      documentsScanned: 45,
      keyTermsExtracted: 487,
      signaturesDetected: 2,
      tablesFound: 2,
      executionTime: '8.7s',
      confidence: 0.94
    },
    claudeAnalysis: {
      riskLevel: 'Low',
      keyRisks: [
        '75% plaintiff work could be used to show bias',
        'Exemplar testing rather than actual unit',
        'High compensation might affect jury perception'
      ],
      recommendations: [
        'File Daubert motion to establish methodology',
        'Prepare witness for aggressive cross on bias',
        'Consider motion in limine on prior cases',
        'Highlight QC violations for punitive damages',
        'Use demonstratives to explain technical concepts to jury'
      ],
      contractScore: 87,
      executionTime: '12.3s'
    },
    timeSaved: '14.5 hours',
    costSaved: '$2,175',
    accuracy: '96.8%'
  }
}

// Complete Master Services Agreement Document for Demo
export const masterServicesAgreement: FullDocument = {
  id: 'msa-global',
  name: 'Master Services Agreement - GlobalTech',
  title: 'MASTER SERVICES AGREEMENT',
  parties: ['Global Solutions Inc.', 'Enterprise Partners LLC'],
  date: 'February 1, 2025',
  totalPages: 24,
  documentType: 'Service Contract',

  pages: [
    {
      pageNumber: 1,
      title: 'MASTER SERVICES AGREEMENT',
      content: `MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is entered into as of February 1, 2025 ("Effective Date") by and between:

GLOBAL SOLUTIONS INC., a Delaware corporation with its principal place of business at 2000 Technology Parkway, Austin, TX 78701 ("Provider" or "Global Solutions")

and

ENTERPRISE PARTNERS LLC, a New York limited liability company with its principal place of business at 450 Park Avenue, New York, NY 10022 ("Client" or "Enterprise Partners")

Each a "Party" and collectively the "Parties"

RECITALS

WHEREAS, Provider specializes in enterprise cloud infrastructure, managed services, and digital transformation solutions;

WHEREAS, Client desires to engage Provider to provide certain technology services, including but not limited to cloud migration, infrastructure management, and 24/7 technical support;

WHEREAS, the Parties wish to establish the terms and conditions under which Provider will provide such services;

NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard MSA structure identified', position: { x: 50, y: 100 } },
          { text: 'Clear party identification', position: { x: 50, y: 250 } },
          { text: 'Services scope broadly defined', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Delaware corporation - favorable jurisdiction', type: 'positive' },
          { text: 'Broad service scope may lead to scope creep', type: 'warning' },
          { text: 'Consider adding specific deliverables list', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 2,
      title: 'DEFINITIONS AND SCOPE',
      content: `1. DEFINITIONS

1.1 "Services" means the technology services described in Exhibit A and any Statement of Work executed hereunder.

1.2 "Statement of Work" or "SOW" means a written agreement executed by both Parties describing specific Services, deliverables, timelines, and fees.

1.3 "Deliverables" means all work product, documentation, reports, and materials created by Provider in performance of the Services.

1.4 "Confidential Information" has the meaning set forth in Section 10.

1.5 "Service Levels" means the performance standards set forth in Section 5 and Exhibit B.

1.6 "System" means Client's technology infrastructure managed by Provider under this Agreement.

2. SCOPE OF SERVICES

2.1 Services. Provider shall provide the Services described in Exhibit A and any executed SOWs in accordance with the terms of this Agreement.

2.2 Additional Services. The Parties may agree to additional Services through executed SOWs, which shall be governed by this Agreement.

2.3 Performance Standards. Provider shall perform all Services:
(a) In a professional and workmanlike manner;
(b) In compliance with industry best practices;
(c) In accordance with the Service Levels;
(d) By qualified personnel with appropriate expertise.

2.4 Key Personnel. Provider shall assign the key personnel listed in Exhibit C. No substitution without Client's prior written consent.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Comprehensive definitions section', position: { x: 50, y: 150 } },
          { text: 'SOW structure allows flexibility', position: { x: 50, y: 300 } },
          { text: 'Key personnel provision included', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'SOW model provides good flexibility', type: 'positive' },
          { text: 'Key personnel clause protects client interests', type: 'positive' },
          { text: 'Industry best practices not defined - potential dispute', type: 'warning' }
        ]
      }
    },

    {
      pageNumber: 3,
      title: 'DELIVERABLES AND MILESTONES',
      content: `3. DELIVERABLES AND MILESTONES

3.1 Initial Deliverables. Within thirty (30) days of the Effective Date, Provider shall deliver:
   (a) Detailed project plan and timeline
   (b) System architecture documentation
   (c) Migration strategy and risk assessment
   (d) Key personnel assignments and contact matrix

3.2 Ongoing Deliverables. Provider shall provide monthly:
   (a) Performance reports against SLAs
   (b) Capacity and utilization reports
   (c) Security scan results and remediation status
   (d) Financial reconciliation and invoice detail

3.3 Acceptance Criteria. Deliverables deemed accepted if:
   (a) Client does not object within 10 business days of receipt
   (b) Deliverable meets specifications in applicable SOW
   (c) Client uses Deliverable in production environment

3.4 Rejection and Cure. If Client rejects Deliverable:
   (a) Client provides specific written deficiencies
   (b) Provider has 10 business days to cure
   (c) Process repeats maximum 2 times
   (d) Persistent failure constitutes material breach`,

      aiAnnotations: {
        gptVision: [
          { text: 'Clear deliverable timeline', position: { x: 50, y: 150 } },
          { text: 'Acceptance process defined', position: { x: 50, y: 350 } },
          { text: 'Cure period specified', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Deemed acceptance after 10 days is aggressive', type: 'warning' },
          { text: 'Only 2 cure attempts may be insufficient for complex issues', type: 'warning' },
          { text: 'Production use triggers acceptance - document carefully', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 4,
      title: 'PROVIDER RESPONSIBILITIES',
      content: `4. PROVIDER RESPONSIBILITIES AND OBLIGATIONS

4.1 General Responsibilities. Provider shall:
   (a) Maintain adequate staffing levels to meet Service commitments
   (b) Provide 24/7/365 support for Critical Issues
   (c) Maintain current technology certifications and partnerships
   (d) Comply with Client's reasonable security and access policies

4.2 Personnel Requirements.
   (a) All personnel undergo background checks
   (b) Drug screening for on-site personnel
   (c) Annual security training mandatory
   (d) Non-disclosure agreements required for all staff

4.3 Technology Standards. Provider maintains:
   (a) Current versions of all software (N-1 policy)
   (b) Redundant infrastructure with automatic failover
   (c) Geographically distributed backup facilities
   (d) Industry-standard change management processes

4.4 Reporting Obligations. Provider provides:
   (a) Executive dashboard with real-time metrics
   (b) Monthly service review meetings
   (c) Quarterly business reviews with C-level participation
   (d) Annual strategic planning sessions`,

      aiAnnotations: {
        gptVision: [
          { text: '24/7 support commitment', position: { x: 50, y: 150 } },
          { text: 'Background check requirements', position: { x: 50, y: 250 } },
          { text: 'N-1 version policy', position: { x: 50, y: 350 } }
        ],
        claude: [
          { text: '24/7 support increases operational costs', type: 'warning' },
          { text: 'Background checks add security value', type: 'positive' },
          { text: 'Ensure executive participation is feasible quarterly', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 5,
      title: 'CLIENT OBLIGATIONS',
      content: `5. CLIENT OBLIGATIONS AND RESPONSIBILITIES

5.1 Client Responsibilities. Client shall:
   (a) Provide timely access to systems and personnel
   (b) Designate authorized representatives for approvals
   (c) Maintain licenses for Client-provided software
   (d) Ensure data backups prior to major changes

5.2 Information and Access.
   (a) Provide accurate and complete information
   (b) Grant necessary system privileges and credentials
   (c) Facilitate badge access for on-site work
   (d) Respond to Provider requests within 2 business days

5.3 Client Dependencies. Provider performance excused if Client fails to:
   (a) Meet payment obligations
   (b) Provide required approvals or decisions
   (c) Make personnel available as agreed
   (d) Maintain prerequisite infrastructure

5.4 Change Requests.
   (a) All changes documented in writing
   (b) Impact assessment required for major changes
   (c) Additional fees for out-of-scope work
   (d) Change Advisory Board approval for critical systems`,

      aiAnnotations: {
        gptVision: [
          { text: 'Client dependencies documented', position: { x: 50, y: 300 } },
          { text: '2-day response requirement', position: { x: 50, y: 200 } },
          { text: 'Change control process', position: { x: 50, y: 400 } }
        ],
        claude: [
          { text: 'Provider performance excused clause is broad', type: 'warning' },
          { text: 'Change request fees not specified upfront', type: 'warning' },
          { text: 'Document all dependencies to avoid disputes', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 6,
      title: 'GOVERNANCE AND MANAGEMENT',
      content: `6. GOVERNANCE AND RELATIONSHIP MANAGEMENT

6.1 Governance Structure.
   (a) Joint Steering Committee with equal representation
   (b) Monthly operational meetings
   (c) Quarterly executive reviews
   (d) Annual strategic planning sessions

6.2 Escalation Matrix.
   Level 1: Service Delivery Manager - Operational issues
   Level 2: Account Director - SLA failures, disputes
   Level 3: VP Operations - Major service disruptions
   Level 4: C-Suite - Contract disputes, strategic issues

6.3 Communication Protocols.
   (a) Dedicated Slack/Teams channel for real-time communication
   (b) Ticketing system for all service requests
   (c) Monthly written status reports
   (d) Quarterly scorecards with KPIs

6.4 Continuous Improvement.
   (a) Quarterly service improvement plans
   (b) Annual benchmarking against industry standards
   (c) Technology refresh recommendations
   (d) Cost optimization reviews`,

      aiAnnotations: {
        gptVision: [
          { text: 'Clear governance structure', position: { x: 50, y: 100 } },
          { text: 'Defined escalation path', position: { x: 50, y: 250 } },
          { text: 'Continuous improvement commitment', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Strong governance model', type: 'positive' },
          { text: 'Multiple communication channels may cause confusion', type: 'warning' },
          { text: 'Benchmarking provides objective performance metrics', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 7,
      title: 'TRANSITION SERVICES',
      content: `7. TRANSITION AND TRANSFORMATION SERVICES

7.1 Transition Period. 90-day transition period includes:
   (a) Knowledge transfer from incumbent provider
   (b) System migration and data transfer
   (c) Process documentation and runbook creation
   (d) Parallel run period for critical systems

7.2 Transition Plan. Detailed plan delivered within 14 days including:
   (a) Task breakdown with dependencies
   (b) Resource allocation and responsibilities
   (c) Risk register and mitigation strategies
   (d) Rollback procedures for each phase

7.3 Success Criteria. Transition complete when:
   (a) All systems migrated and stable for 30 days
   (b) SLAs met for 2 consecutive months
   (c) Knowledge transfer certified by Client
   (d) All documentation delivered and accepted

7.4 Transformation Services.
   (a) Cloud migration and modernization
   (b) Automation and DevOps implementation
   (c) Security posture improvement
   (d) Cost optimization initiatives

7.5 Exit Assistance. Upon termination, Provider provides:
   (a) Up to 180 days transition assistance
   (b) Knowledge transfer to successor
   (c) Data export in industry-standard formats
   (d) License transfers where permitted`,

      aiAnnotations: {
        gptVision: [
          { text: '90-day transition period', position: { x: 50, y: 100 } },
          { text: 'Clear success criteria', position: { x: 50, y: 300 } },
          { text: 'Exit assistance provisions', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: '180-day exit assistance is generous', type: 'positive' },
          { text: 'Parallel run reduces transition risk', type: 'positive' },
          { text: 'Ensure data format specifications are detailed', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 8,
      title: 'SERVICE LEVELS',
      content: `5. SERVICE LEVELS AND PERFORMANCE

5.1 Service Availability. Provider shall ensure the System maintains 99.9% availability measured on a monthly basis ("Uptime Commitment").

5.2 Availability Calculation. Availability percentage = ((Total Minutes - Downtime Minutes) / Total Minutes) x 100
   - "Downtime" excludes scheduled maintenance windows and force majeure events
   - Scheduled maintenance limited to 4 hours monthly, between 2:00 AM - 6:00 AM ET

5.3 Service Credits for Availability Failures:
   - 99.5% to 99.89% availability: 5% monthly fee credit
   - 99.0% to 99.49% availability: 10% monthly fee credit
   - 98.0% to 98.99% availability: 25% monthly fee credit
   - Below 98.0% availability: 50% monthly fee credit

5.4 Response Time Commitments:
   - Critical Issues (System Down): 15 minutes
   - High Priority (Major Functionality Impact): 1 hour
   - Medium Priority (Limited Impact): 4 hours
   - Low Priority (No Impact): 24 hours

5.5 Resolution Time Targets:
   - Critical Issues: 4 hours
   - High Priority: 8 hours
   - Medium Priority: 24 hours
   - Low Priority: 72 hours

5.6 Service Credit Cap. Total service credits in any month shall not exceed 50% of monthly fees. Credits are Client's sole remedy for Service Level failures.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Detailed SLA metrics', position: { x: 50, y: 150 } },
          { text: 'Graduated service credits', position: { x: 50, y: 350 } },
          { text: 'Response time matrix clear', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: '99.9% SLA is aggressive for complex systems', type: 'warning' },
          { text: 'Service credits cap at 50% - limited remedy', type: 'warning' },
          { text: 'Consider negotiating termination right for chronic failures', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 9,
      title: 'STAFFING AND RESOURCES',
      content: `6. STAFFING AND PERSONNEL

6.1 Dedicated Team. Provider assigns:
   (a) Account Manager - Single point of contact
   (b) Technical Lead - Architecture and escalations
   (c) Service Delivery Manager - Day-to-day operations
   (d) Minimum 10 FTE technical resources

6.2 Offshore Resources.
   (a) Maximum 40% offshore resources permitted
   (b) All offshore personnel in secure facilities
   (c) Background checks required for all staff
   (d) English proficiency required for client-facing roles

6.3 Staff Continuity.
   (a) Key personnel committed for minimum 12 months
   (b) 30-day notice for planned departures
   (c) Equivalent replacement within 15 days
   (d) Knowledge transfer overlap required

6.4 Training and Certification.
   (a) Provider maintains current certifications
   (b) Annual training budget of 5% of contract value
   (c) Client-specific training as needed
   (d) Security awareness training quarterly`,

      aiAnnotations: {
        gptVision: [
          { text: 'Minimum 10 FTE commitment', position: { x: 50, y: 150 } },
          { text: '40% offshore cap', position: { x: 50, y: 250 } },
          { text: 'Key personnel continuity', position: { x: 50, y: 350 } }
        ],
        claude: [
          { text: '40% offshore may impact service quality', type: 'warning' },
          { text: 'FTE commitment ensures adequate resources', type: 'positive' },
          { text: 'Verify actual vs promised FTE allocation', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 10,
      title: 'CONFIDENTIALITY',
      content: `10. CONFIDENTIALITY AND NON-DISCLOSURE

10.1 Confidential Information. Includes all non-public information disclosed by either Party, including:
   (a) Business strategies and plans
   (b) Financial information
   (c) Technical data and trade secrets
   (d) Customer lists and pricing

10.2 Obligations. Receiving Party shall:
   (a) Maintain strict confidentiality
   (b) Use solely for Agreement purposes
   (c) Limit access to need-to-know personnel
   (d) Apply same protection as own confidential information

10.3 Exceptions. Obligations do not apply to information:
   (a) Publicly available through no breach
   (b) Independently developed without use of Confidential Information
   (c) Rightfully received from third party
   (d) Required to be disclosed by law (with notice)

10.4 Duration. Confidentiality obligations survive termination for:
   (a) Trade secrets: Indefinitely
   (b) Other Confidential Information: 5 years
   (c) Personal data: As required by law

10.5 Return of Information. Upon termination, return or destroy all Confidential Information within 30 days.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard confidentiality terms', position: { x: 50, y: 200 } },
          { text: '5-year survival period', position: { x: 50, y: 400 } },
          { text: 'Return obligations clear', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: '5-year term reasonable for this type of data', type: 'positive' },
          { text: 'Trade secret protection indefinite - good', type: 'positive' },
          { text: 'Ensure destruction certificates provided', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 11,
      title: 'WARRANTIES AND REPRESENTATIONS',
      content: `11. WARRANTIES AND REPRESENTATIONS

11.1 Mutual Warranties. Each Party warrants:
   (a) Full corporate authority to enter Agreement
   (b) No conflict with other obligations
   (c) Compliance with applicable laws
   (d) No pending litigation affecting performance

11.2 Provider Warranties. Provider warrants:
   (a) Services performed professionally and competently
   (b) Deliverables free from material defects
   (c) No unauthorized code or malware
   (d) Compliance with industry standards

11.3 Service Warranty. Provider warrants Services will:
   (a) Meet specifications and SLAs
   (b) Be performed by qualified personnel
   (c) Not infringe third-party rights
   (d) Comply with all security requirements

11.4 Warranty Remedies.
   (a) Re-performance of defective Services
   (b) Refund of fees for non-conforming Services
   (c) Root cause analysis for repeated failures
   (d) Service credits per Section 5

11.5 DISCLAIMER. EXCEPT AS EXPRESSLY SET FORTH, PROVIDER DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR PARTICULAR PURPOSE.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard warranty provisions', position: { x: 50, y: 150 } },
          { text: 'Service warranties included', position: { x: 50, y: 300 } },
          { text: 'Warranty disclaimer present', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Warranty disclaimer limits recourse', type: 'warning' },
          { text: 'Re-performance remedy may be insufficient', type: 'warning' },
          { text: 'Consider adding specific performance standards', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 12,
      title: 'CHANGE MANAGEMENT',
      content: `12. CHANGE MANAGEMENT AND CONTROL

12.1 Change Control Process.
   (a) All changes require Change Request (CR) documentation
   (b) Impact assessment mandatory for all changes
   (c) Client approval required for major changes
   (d) Emergency changes permitted with subsequent approval

12.2 Change Categories.
   - Standard: Pre-approved, low risk (auto-approved)
   - Normal: Scheduled, moderate risk (5-day approval)
   - Major: Significant impact (10-day approval)
   - Emergency: Critical issue resolution (verbal approval)

12.3 Change Advisory Board (CAB).
   (a) Meets weekly for normal changes
   (b) Emergency CAB available 24/7
   (c) Client and Provider representation required
   (d) Decisions documented and auditable

12.4 Change Windows.
   - Standard maintenance: Saturday 2 AM - 6 AM ET
   - Major changes: Scheduled quarterly
   - Emergency changes: As required
   - Freeze periods: Year-end, major holidays

12.5 Rollback Procedures. Every change must have:
   (a) Documented rollback plan
   (b) Success criteria defined
   (c) Maximum rollback time specified
   (d) Communication plan for failures`,

      aiAnnotations: {
        gptVision: [
          { text: 'Formal change control process', position: { x: 50, y: 100 } },
          { text: 'CAB structure defined', position: { x: 50, y: 300 } },
          { text: 'Rollback requirements', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Well-structured change management', type: 'positive' },
          { text: 'Emergency change process allows quick response', type: 'positive' },
          { text: 'Freeze periods protect critical times', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 13,
      title: 'BUSINESS CONTINUITY',
      content: `13. BUSINESS CONTINUITY AND DISASTER RECOVERY

13.1 Business Continuity Plan (BCP).
   (a) Comprehensive BCP maintained and tested annually
   (b) Recovery Time Objective (RTO): 4 hours
   (c) Recovery Point Objective (RPO): 1 hour
   (d) Alternative processing site available

13.2 Disaster Recovery.
   (a) Geographically dispersed data centers
   (b) Real-time data replication
   (c) Automated failover capabilities
   (d) Quarterly DR testing required

13.3 Backup Requirements.
   - Incremental backups: Daily
   - Full backups: Weekly
   - Retention: 90 days standard, 7 years for critical data
   - Offsite storage: Separate geographic region
   - Encryption: AES-256 minimum

13.4 Pandemic Response.
   (a) Remote work capabilities for all staff
   (b) VPN capacity for 100% workforce
   (c) Collaboration tools provided
   (d) No degradation of service levels

13.5 Testing and Validation.
   (a) Annual BCP test with Client participation
   (b) Quarterly DR drills
   (c) Monthly backup restoration tests
   (d) Results reported to Client within 5 days`,

      aiAnnotations: {
        gptVision: [
          { text: 'RTO: 4 hours, RPO: 1 hour', position: { x: 50, y: 150 } },
          { text: 'Comprehensive backup strategy', position: { x: 50, y: 350 } },
          { text: 'Pandemic provisions included', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Strong RTO/RPO commitments', type: 'positive' },
          { text: '4-hour RTO may be insufficient for critical systems', type: 'warning' },
          { text: 'Regular testing requirements ensure readiness', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 14,
      title: 'PAYMENT TERMS',
      content: `8. FEES AND PAYMENT

8.1 Service Fees. Client shall pay Provider a monthly service fee of TWO HUNDRED THOUSAND DOLLARS ($200,000) for a total annual commitment of TWO MILLION FOUR HUNDRED THOUSAND DOLLARS ($2,400,000).

8.2 Payment Terms.
   (a) Invoices issued monthly in advance on the first business day
   (b) Payment due within thirty (30) days of invoice date ("Net 30")
   (c) Payments via ACH or wire transfer to Provider's designated account

8.3 Late Payment.
   (a) Late payments accrue interest at 1.5% per month or maximum legal rate, whichever is less
   (b) Provider may suspend Services for payments overdue by 60+ days after written notice
   (c) Client responsible for collection costs including reasonable attorneys' fees

8.4 Annual Increase. Service fees increase annually by greater of:
   (a) 3% or
   (b) Consumer Price Index increase

8.5 Additional Services. Services outside scope billed at:
   (a) Standard hourly rate: $350/hour
   (b) Emergency/after-hours rate: $525/hour
   (c) Minimum 4-hour engagement for emergency calls

8.6 Expenses. Client reimburses pre-approved travel and expenses at cost plus 10% administrative fee.

8.7 Taxes. Fees exclusive of taxes. Client responsible for all applicable taxes except Provider's income taxes.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Clear fee structure identified', position: { x: 50, y: 100 } },
          { text: 'Standard payment terms', position: { x: 50, y: 200 } },
          { text: 'Automatic escalation clause', position: { x: 50, y: 400 } }
        ],
        claude: [
          { text: 'High monthly commitment locks in client', type: 'warning' },
          { text: '1.5% monthly interest may exceed state usury limits', type: 'warning' },
          { text: 'Annual increase compounds over multi-year term', type: 'warning' }
        ]
      }
    },

    {
      pageNumber: 15,
      title: 'TERM AND TERMINATION',
      content: `9. TERM AND TERMINATION

9.1 Initial Term. This Agreement commences on the Effective Date and continues for three (3) years ("Initial Term").

9.2 Renewal. Automatically renews for successive one (1) year terms unless either Party provides 90 days written notice of non-renewal.

9.3 Termination for Convenience.
   (a) Client may terminate after Initial Term with 180 days written notice
   (b) Early termination fee: remaining months in Initial Term x 50% of monthly fee

9.4 Termination for Cause. Either Party may terminate immediately upon written notice if:
   (a) Other Party materially breaches and fails to cure within 30 days of written notice
   (b) Other Party becomes insolvent, files for bankruptcy, or makes assignment for creditors
   (c) Other Party violates confidentiality or IP provisions

9.5 Effect of Termination.
   (a) Provider delivers all Client data within 30 days in industry-standard format
   (b) Transition assistance available at standard hourly rates
   (c) Client pays all outstanding fees and expenses
   (d) Confidentiality and IP provisions survive termination

9.6 Data Retention. Provider maintains Client data for 90 days post-termination, then securely deletes unless Client retrieves earlier.`,

      aiAnnotations: {
        gptVision: [
          { text: '3-year initial commitment', position: { x: 50, y: 100 } },
          { text: 'Auto-renewal provision', position: { x: 50, y: 200 } },
          { text: 'Early termination penalties', position: { x: 50, y: 300 } }
        ],
        claude: [
          { text: '3-year lock-in with penalties is aggressive', type: 'warning' },
          { text: '180-day notice period is excessive', type: 'warning' },
          { text: 'Data deletion after 90 days - ensure adequate backup', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 16,
      title: 'INTELLECTUAL PROPERTY',
      content: `10. INTELLECTUAL PROPERTY RIGHTS

10.1 Provider IP. Provider retains all rights in:
   (a) Pre-existing IP and methodologies
   (b) Generic improvements and know-how
   (c) Tools, templates, and frameworks
   (d) Any IP not specifically created for Client

10.2 Client IP. Client retains all rights in:
   (a) Client data and content
   (b) Pre-existing Client IP
   (c) Client Confidential Information

10.3 Work Product.
   (a) Custom Deliverables created exclusively for Client: Client owns upon full payment
   (b) Generic components and methodologies: Provider retains rights with license to Client
   (c) Joint improvements: Parties jointly own with unlimited use rights

10.4 License Grants.
   (a) Provider grants Client perpetual, non-exclusive license to use Provider IP incorporated in Deliverables
   (b) Client grants Provider license to use Client IP solely to perform Services
   (c) Provider may use anonymized learnings and metrics for improvement

10.5 Open Source. Provider may use open source subject to:
   (a) No copyleft/viral licenses without consent
   (b) Compliance with all license terms
   (c) Disclosure of open source components

10.6 Feedback. Client feedback and suggestions become Provider property without compensation.`,

      aiAnnotations: {
        gptVision: [
          { text: 'IP ownership clearly delineated', position: { x: 50, y: 150 } },
          { text: 'License grants documented', position: { x: 50, y: 400 } },
          { text: 'Open source provisions included', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Provider retains significant IP rights', type: 'warning' },
          { text: 'Feedback becomes Provider property - unfavorable', type: 'warning' },
          { text: 'Request list of open source components', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 18,
      title: 'LIABILITY AND INDEMNIFICATION',
      content: `12. LIABILITY AND INDEMNIFICATION

12.1 Limitation of Liability.
   (a) NEITHER PARTY LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES
   (b) PROVIDER'S TOTAL LIABILITY LIMITED TO TWELVE (12) MONTHS OF FEES
   (c) LIMITATIONS DO NOT APPLY TO: Confidentiality breaches, IP infringement, gross negligence, willful misconduct

12.2 Provider Indemnification. Provider defends and indemnifies Client against third-party claims that Services infringe IP rights, except for:
   (a) Client modifications or combinations
   (b) Use beyond scope of Agreement
   (c) Client's breach of Agreement

12.3 Client Indemnification. Client defends and indemnifies Provider against claims arising from:
   (a) Client data and content
   (b) Client's use of Deliverables
   (c) Client's business operations

12.4 Indemnification Process.
   (a) Prompt written notice of claim
   (b) Sole control of defense and settlement
   (c) Reasonable cooperation
   (d) No admission of liability without consent

12.5 Insurance. Provider maintains:
   (a) General Liability: $2,000,000 per occurrence
   (b) Professional Liability: $5,000,000 per claim
   (c) Cyber Liability: $5,000,000 per claim`,

      aiAnnotations: {
        gptVision: [
          { text: 'Liability cap at 12 months fees', position: { x: 50, y: 150 } },
          { text: 'Mutual indemnification', position: { x: 50, y: 350 } },
          { text: 'Insurance requirements specified', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: '12-month cap reasonable for this service type', type: 'positive' },
          { text: 'Carve-outs for confidentiality and IP appropriate', type: 'positive' },
          { text: 'Verify insurance certificates before signing', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 20,
      title: 'DATA SECURITY AND PRIVACY',
      content: `14. DATA SECURITY AND PRIVACY

14.1 Data Protection. Provider shall:
   (a) Implement industry-standard administrative, physical, and technical safeguards
   (b) Maintain SOC 2 Type II certification
   (c) Encrypt data in transit (TLS 1.2+) and at rest (AES-256)
   (d) Conduct annual penetration testing and vulnerability assessments

14.2 Security Incidents.
   (a) Provider notifies Client within 24 hours of confirmed breach
   (b) Provider provides: (i) incident description, (ii) affected data, (iii) remediation steps
   (c) Provider cooperates with forensic investigation
   (d) Provider bears costs of credit monitoring if breach due to Provider negligence

14.3 Data Processing.
   (a) Provider processes Client data solely per Client instructions
   (b) Data remains in designated geographic regions (US only unless approved)
   (c) No sale or unauthorized disclosure of Client data
   (d) Subprocessors subject to equivalent obligations

14.4 Compliance.
   (a) GDPR compliance for EU personal data
   (b) CCPA compliance for California residents
   (c) HIPAA Business Associate Agreement if applicable
   (d) Annual compliance attestation provided

14.5 Audit Rights. Client may audit Provider's security practices annually with 30 days notice, at Client's expense unless material deficiencies found.`,

      aiAnnotations: {
        gptVision: [
          { text: 'SOC 2 certification required', position: { x: 50, y: 150 } },
          { text: '24-hour breach notification', position: { x: 50, y: 300 } },
          { text: 'Audit rights included', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Strong security requirements', type: 'positive' },
          { text: '24-hour breach notice is aggressive but good', type: 'positive' },
          { text: 'Consider requiring cyber insurance proof', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 24,
      title: 'SIGNATURE PAGE',
      content: `IN WITNESS WHEREOF, the Parties have executed this Master Services Agreement as of the date first written above.

GLOBAL SOLUTIONS INC.


_________________________________
By: Jennifer Thompson
Title: Chief Executive Officer
Date: February 1, 2025

_________________________________
By: David Martinez
Title: Chief Legal Officer
Date: February 1, 2025


ENTERPRISE PARTNERS LLC


_________________________________
By: Michael Chen
Title: Managing Partner
Date: February 1, 2025

_________________________________
By: Sarah Williams
Title: General Counsel
Date: February 1, 2025


EXHIBITS:
Exhibit A - Description of Services
Exhibit B - Service Level Agreement Details
Exhibit C - Key Personnel
Exhibit D - Pricing Schedule
Exhibit E - Approved Subprocessors
Exhibit F - Security Requirements

Note: This Agreement has been reviewed and approved by both parties' legal counsel. Electronic signatures are deemed valid and binding pursuant to applicable law.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Dual signatures from each party', position: { x: 50, y: 200 } },
          { text: 'All exhibits referenced', position: { x: 50, y: 450 } },
          { text: 'Electronic signature provision', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Ensure all exhibits are attached', type: 'recommendation' },
          { text: 'Dual signatures show board approval likely', type: 'positive' },
          { text: 'Review exhibits for conflicts with main agreement', type: 'recommendation' }
        ]
      }
    }
  ],

  // Analysis Summary for the demo
  analysisResults: {
    gptVisionSummary: {
      documentsScanned: 24,
      keyTermsExtracted: 147,
      signaturesDetected: 4,
      tablesFound: 4,
      executionTime: '5.8s',
      confidence: 0.96
    },
    claudeAnalysis: {
      riskLevel: 'Medium-High',
      keyRisks: [
        '3-year commitment with significant early termination penalties',
        '99.9% SLA may be difficult to achieve consistently',
        'Service credits capped at 50% despite potential business impact',
        'Annual price increases compound over term',
        'Provider retains significant IP rights in work product',
        '180-day termination notice is excessive'
      ],
      recommendations: [
        'Negotiate reduction in Initial Term to 1-2 years',
        'Reduce termination notice period to 90 days',
        'Add right to terminate for chronic SLA failures',
        'Clarify IP ownership for custom developments',
        'Cap annual increases at CPI only',
        'Request Most Favored Nation clause',
        'Add benchmarking provision for rates'
      ],
      contractScore: 72,
      executionTime: '8.2s'
    },
    timeSaved: '12.5 hours',
    costSaved: '$3,125',
    accuracy: '98.4%'
  }
}

// Complete Discovery Request Document for Demo
export const discoveryRequest: FullDocument = {
  id: 'discovery-merger',
  name: 'Discovery Request - Merger Case',
  title: 'FIRST REQUEST FOR PRODUCTION OF DOCUMENTS',
  parties: ['Pinnacle Holdings, Inc.', 'Apex Corporation'],
  date: 'March 1, 2025',
  totalPages: 28,
  documentType: 'Discovery Documents',

  pages: [
    {
      pageNumber: 1,
      title: 'FIRST REQUEST FOR PRODUCTION',
      content: `UNITED STATES DISTRICT COURT
SOUTHERN DISTRICT OF NEW YORK

PINNACLE HOLDINGS, INC.,
    Plaintiff,
v.                                    Case No. 2024-CV-3821
APEX CORPORATION, et al.,
    Defendants.

PLAINTIFF'S FIRST REQUEST FOR PRODUCTION OF DOCUMENTS
TO DEFENDANT APEX CORPORATION

TO: APEX CORPORATION and its attorneys of record

Pursuant to Federal Rule of Civil Procedure 34, Plaintiff Pinnacle Holdings, Inc. ("Plaintiff") hereby requests that Defendant Apex Corporation ("Defendant" or "Apex") produce for inspection and copying the documents described below at the offices of Smith, Johnson & Associates LLP, 100 Wall Street, New York, NY 10005, within thirty (30) days of service of this request.

DEFINITIONS

1. "Document" means all written, recorded, or graphic matter of every kind, including but not limited to: emails, text messages, instant messages, Slack/Teams communications, memoranda, notes, contracts, agreements, recordings, data compilations, and electronically stored information.

2. "Merger" refers to the proposed acquisition of Pinnacle Holdings by Apex Corporation announced on January 15, 2024.

3. "Relevant Period" means January 1, 2020 to the present, unless otherwise specified.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Standard FRCP 34 format', position: { x: 50, y: 200 } },
          { text: 'Broad document definition', position: { x: 50, y: 450 } },
          { text: '5-year lookback period', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Very broad ESI definition - prepare for objections', type: 'warning' },
          { text: '5-year period may be disproportionate', type: 'warning' },
          { text: 'Consider narrowing time frame for efficiency', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 2,
      title: 'INSTRUCTIONS',
      content: `INSTRUCTIONS

1. These requests seek all responsive documents in your possession, custody, or control, including documents in the possession of your agents, attorneys, accountants, or representatives.

2. If any document is withheld under claim of privilege, provide a privilege log containing:
   (a) Date of document
   (b) Author(s) and recipient(s)
   (c) Type of document
   (d) Subject matter description
   (e) Privilege(s) claimed

3. Produce documents as they are kept in the usual course of business or organize and label them to correspond with the categories in the request.

4. For electronically stored information (ESI):
   (a) Produce in native format with metadata preserved
   (b) For emails, produce in PST or MSG format
   (c) For databases, provide in CSV or SQL format
   (d) Include all attachments and embedded documents

5. If any document has been destroyed, identify:
   (a) Date of destruction
   (b) Person who destroyed it
   (c) Reason for destruction
   (d) Whether copies exist

6. These requests are continuing in nature. Supplement your response as additional responsive documents become available.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Detailed ESI specifications', position: { x: 50, y: 350 } },
          { text: 'Privilege log required', position: { x: 50, y: 200 } },
          { text: 'Continuing obligation noted', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Native format requirement increases costs', type: 'warning' },
          { text: 'Metadata preservation is crucial', type: 'positive' },
          { text: 'Consider ESI protocol agreement', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 5,
      title: 'CORPORATE STRUCTURE',
      content: `DOCUMENT REQUESTS

REQUEST NO. 1:
All organizational charts for Apex Corporation and its subsidiaries from January 1, 2020 to present.

REQUEST NO. 2:
All documents relating to corporate structure, including but not limited to articles of incorporation, bylaws, operating agreements, and subsidiary ownership documents.

REQUEST NO. 3:
All board of directors meeting minutes, resolutions, and consent actions from January 1, 2022 to present.

REQUEST NO. 4:
All documents relating to changes in executive leadership, including appointments, resignations, and terminations of C-suite executives during the Relevant Period.

REQUEST NO. 5:
All documents relating to corporate governance policies, including codes of conduct, ethics policies, and compliance programs.

PRIVILEGE ANTICIPATED:
- Attorney-client communications regarding corporate structure
- Work product regarding potential reorganization
- Board executive session minutes may be privileged`,

      aiAnnotations: {
        gptVision: [
          { text: 'Targets corporate governance', position: { x: 50, y: 150 } },
          { text: 'Board minutes requested', position: { x: 50, y: 300 } },
          { text: 'Privilege issues noted', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Board minutes highly sensitive', type: 'warning' },
          { text: 'Executive changes relevant to merger', type: 'positive' },
          { text: 'Expect significant privilege claims', type: 'warning' }
        ]
      }
    },

    {
      pageNumber: 8,
      title: 'FINANCIAL DOCUMENTS',
      content: `REQUEST NO. 12:
All documents relating to the valuation of Apex Corporation or Pinnacle Holdings from January 1, 2020 to present, including but not limited to:
- Valuation reports and fairness opinions
- Financial projections and models
- Investment banker presentations
- Board presentations regarding valuation
- Comparable company analyses
- DCF models and assumptions

REQUEST NO. 13:
All audited and unaudited financial statements for Apex Corporation and all subsidiaries for fiscal years 2020 through present, including:
- Balance sheets
- Income statements
- Cash flow statements
- Statements of shareholders' equity
- All notes and schedules

REQUEST NO. 14:
All documents relating to due diligence conducted on Pinnacle Holdings, including:
- Due diligence reports
- Data room indices
- Q&A logs
- Expert reports
- Management presentations

REQUEST NO. 15:
All documents relating to financing for the proposed Merger, including loan agreements, commitment letters, and correspondence with lenders.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Extensive financial document requests', position: { x: 50, y: 200 } },
          { text: 'Multi-year time frame', position: { x: 50, y: 400 } },
          { text: 'Due diligence materials sought', position: { x: 50, y: 450 } }
        ],
        claude: [
          { text: 'Valuation documents are highly material', type: 'positive' },
          { text: 'Time frame may be overbroad for all financials', type: 'warning' },
          { text: 'Investment banker work likely privileged', type: 'warning' }
        ]
      }
    },

    {
      pageNumber: 15,
      title: 'COMMUNICATIONS',
      content: `REQUEST NO. 38:
All communications between any Apex executive and any Pinnacle executive concerning the Merger, including but not limited to:
- Emails
- Text messages (including WhatsApp, Signal, iMessage)
- Slack or Microsoft Teams messages
- Zoom/Teams recordings and transcripts
- Voicemails and call logs
- Calendar invitations and meeting notes

REQUEST NO. 39:
All internal Apex communications mentioning or concerning:
- "Project Thunder" (the Merger code name)
- Pinnacle Holdings
- Competitive advantages of the Merger
- Antitrust concerns
- Market share calculations
- Customer overlap analysis

REQUEST NO. 40:
All communications with investment bankers, including but not limited to Goldman Sachs, Morgan Stanley, or JPMorgan Chase regarding the Merger.

REQUEST NO. 41:
All communications with regulatory agencies regarding the Merger, including the SEC, DOJ Antitrust Division, and FTC.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Includes modern communication platforms', position: { x: 50, y: 200 } },
          { text: 'Targets key executives', position: { x: 50, y: 350 } },
          { text: 'Code name identified', position: { x: 50, y: 400 } }
        ],
        claude: [
          { text: 'Very broad email request - proportionality issues', type: 'warning' },
          { text: 'Personal device searches may be required', type: 'warning' },
          { text: 'Regulatory communications are critical', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 18,
      title: 'COMPETITIVE ANALYSIS',
      content: `REQUEST NO. 47:
All documents analyzing competitive effects of the Merger, including:
- Market share analyses
- HHI calculations
- Customer switching studies
- Pricing analyses
- Win/loss reports against Pinnacle
- Competitive intelligence reports

REQUEST NO. 48:
All documents relating to potential antitrust concerns, including:
- Antitrust risk assessments
- Communications with antitrust counsel
- HSR filing documents and correspondence
- Market definition studies
- Efficiency claims and substantiation

REQUEST NO. 49:
All documents relating to customer reactions to the Merger, including:
- Customer surveys or interviews
- Customer complaints or concerns
- Lost customer analyses
- Customer contract negotiations post-announcement

REQUEST NO. 50:
All documents relating to alternative transactions considered, including other potential acquisition targets or merger partners.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Antitrust focus evident', position: { x: 50, y: 200 } },
          { text: 'Market analysis requested', position: { x: 50, y: 150 } },
          { text: 'Alternative deals relevant', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Antitrust concerns suggest regulatory issues', type: 'positive' },
          { text: 'Attorney work product likely extensive', type: 'warning' },
          { text: 'Customer impact evidence is powerful', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 22,
      title: 'INTEGRATION PLANNING',
      content: `REQUEST NO. 58:
All documents relating to post-merger integration planning, including:
- Integration plans and timelines
- Synergy calculations and assumptions
- Cost savings projections
- Headcount reduction plans
- Facility consolidation plans
- Systems integration roadmaps
- Cultural integration assessments

REQUEST NO. 59:
All documents relating to retention of key employees, including:
- Retention bonus agreements
- Employment contracts
- Non-compete agreements
- Change in control provisions
- Severance plans

REQUEST NO. 60:
All documents relating to customer retention strategies post-merger, including:
- Customer communication plans
- Pricing strategies
- Service level commitments
- Contract renewal strategies

REQUEST NO. 61:
All documents relating to potential divestitures required for regulatory approval.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Integration planning details', position: { x: 50, y: 200 } },
          { text: 'Employment impact documented', position: { x: 50, y: 350 } },
          { text: 'Divestiture possibility noted', position: { x: 50, y: 500 } }
        ],
        claude: [
          { text: 'Headcount reduction plans are smoking guns', type: 'positive' },
          { text: 'Synergy calculations often overstated', type: 'positive' },
          { text: 'Employee retention concerns suggest problems', type: 'warning' }
        ]
      }
    },

    {
      pageNumber: 25,
      title: 'DAMAGES AND REMEDIES',
      content: `REQUEST NO. 67:
All documents relating to damages allegedly suffered by Pinnacle shareholders, including:
- Stock price impact analyses
- But-for pricing models
- Loss causation studies
- Damages calculations
- Expert reports on damages

REQUEST NO. 68:
All documents relating to the fairness of the merger consideration, including:
- Fairness opinions
- Comparable transaction analyses
- Premium paid analyses
- Minority shareholder considerations

REQUEST NO. 69:
All documents relating to any complaints, lawsuits, or regulatory investigations concerning the Merger.

REQUEST NO. 70:
All insurance policies that may provide coverage for claims arising from the Merger, including D&O policies and representations and warranties insurance.

REQUEST NO. 71:
All documents sufficient to show Apex's financial ability to complete the Merger at the announced price.`,

      aiAnnotations: {
        gptVision: [
          { text: 'Damages calculations requested', position: { x: 50, y: 150 } },
          { text: 'Insurance coverage identified', position: { x: 50, y: 450 } },
          { text: 'Financial capacity questioned', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Damages theories being developed', type: 'positive' },
          { text: 'D&O insurance suggests director liability concerns', type: 'warning' },
          { text: 'Financial capacity crucial for specific performance', type: 'positive' }
        ]
      }
    },

    {
      pageNumber: 27,
      title: 'PRESERVATION AND PRODUCTION',
      content: `REQUEST NO. 72:
All documents relating to document retention and legal hold notices issued in connection with the Merger or this litigation, including:
- Litigation hold notices
- Document preservation instructions
- Custodian lists
- Data maps
- Backup tape recycling suspensions

REQUEST NO. 73:
All documents sufficient to identify:
- All custodians likely to have responsive documents
- All data sources searched
- Search terms used
- Date ranges applied
- Any documents destroyed after notice of this litigation

CERTIFICATION

The undersigned certifies that reasonable inquiry has been made regarding the discovery sought, and that the discovery is not sought for harassment, delay, or improper purpose.

Dated: March 1, 2025

SMITH, JOHNSON & ASSOCIATES LLP

By: _______________________________
    Jennifer Martinez
    Attorney for Plaintiff
    State Bar No. 123456
    jmartinez@sjalawfirm.com`,

      aiAnnotations: {
        gptVision: [
          { text: 'Preservation obligations addressed', position: { x: 50, y: 150 } },
          { text: 'Spoliation concerns evident', position: { x: 50, y: 350 } },
          { text: 'Proper certification included', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: 'Spoliation inquiry suggests suspected destruction', type: 'warning' },
          { text: 'Legal hold compliance will be scrutinized', type: 'positive' },
          { text: 'Consider forensic imaging of key custodians', type: 'recommendation' }
        ]
      }
    },

    {
      pageNumber: 28,
      title: 'CERTIFICATE OF SERVICE',
      content: `CERTIFICATE OF SERVICE

I hereby certify that on March 1, 2025, I served a true and correct copy of the foregoing PLAINTIFF'S FIRST REQUEST FOR PRODUCTION OF DOCUMENTS TO DEFENDANT APEX CORPORATION on the following counsel of record via electronic service through the Court's CM/ECF system:

Robert Chen, Esq.
Chen, Smith & Partners LLP
300 Park Avenue
New York, NY 10022
rchen@csplaw.com
Attorney for Defendant Apex Corporation

I further certify that I have conferred with opposing counsel regarding the scope and burden of these requests pursuant to Federal Rule of Civil Procedure 26(g), and we have been unable to resolve our disputes regarding:

1. The temporal scope of the requests (Defendant contends 5 years is overbroad)
2. The breadth of ESI sought (Defendant objects to personal devices)
3. The burden of searching backup systems
4. The scope of privilege logging requirements

These issues are reserved for Court resolution if necessary.

                              _______________________________
                              Jennifer Martinez
                              Date: March 1, 2025

TOTAL REQUESTS: 73
ESTIMATED DOCUMENTS: 2.4 million
ESTIMATED REVIEW TIME: 3,200 hours
ESTIMATED COST: $875,000`,

      aiAnnotations: {
        gptVision: [
          { text: 'Meet and confer completed', position: { x: 50, y: 250 } },
          { text: 'Disputes documented', position: { x: 50, y: 350 } },
          { text: 'Massive document volume', position: { x: 50, y: 550 } }
        ],
        claude: [
          { text: '2.4M documents suggests scorched earth approach', type: 'warning' },
          { text: 'Cost burden may support proportionality objections', type: 'positive' },
          { text: 'Court intervention likely needed', type: 'recommendation' }
        ]
      }
    }
  ],

  analysisResults: {
    gptVisionSummary: {
      documentsScanned: 28,
      keyTermsExtracted: 73,
      signaturesDetected: 2,
      tablesFound: 0,
      executionTime: '7.2s',
      confidence: 0.93
    },
    claudeAnalysis: {
      riskLevel: 'Extremely High - Disproportionate Burden',
      keyRisks: [
        '2.4 million documents estimated',
        '$875,000 estimated review cost',
        '5-year temporal scope likely overbroad',
        'Personal device searches required',
        'Backup system searches unreasonable',
        'Excessive privilege logging burden'
      ],
      recommendations: [
        'File motion for protective order immediately',
        'Propose phased discovery approach',
        'Negotiate ESI protocol before production',
        'Seek cost-shifting for broad requests',
        'Request sampling for email searches',
        'Propose predictive coding for review',
        'Challenge temporal scope as disproportionate',
        'Object to personal device searches',
        'Limit custodians to key executives'
      ],
      contractScore: 28,
      executionTime: '11.4s'
    },
    timeSaved: '32 hours',
    costSaved: '$9,600',
    accuracy: '94.7%'
  }
}

// Export all full documents
export const fullDocuments: Record<string, FullDocument> = {
  'nda-techco': techCoNDA,
  'deposition-williams': williamsDeposition,
  'msa-global': masterServicesAgreement,
  'contract-services': masterServicesAgreement, // Alias for upload page compatibility
  'discovery-merger': discoveryRequest
}