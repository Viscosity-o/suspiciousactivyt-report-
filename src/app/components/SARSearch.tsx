import { useState } from 'react';
import { Search, ArrowLeft, Edit3, Download, TrendingUp, BarChart3 } from 'lucide-react';
import React from 'react';
import { AuditTrail } from './AuditTrail';
import { Visualization } from './Visualization';

interface SARSearchProps {
  // No props needed for now
}

interface SARRecord {
  sarId: string;
  caseId: string;
  subjectName: string;
  subjectId: string;
  accountNumber: string;
  dateGenerated: string;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Submitted';
  analyst: string;
  totalTransactions: number;
  aggregateValue: string;
}

export function SARSearch({}: SARSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SARRecord[]>([]);
  const [viewingSarId, setViewingSarId] = useState<string | null>(null);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);

  // Mock SAR data
  const mockSARs: SARRecord[] = [
    {
      sarId: 'SAR-1023',
      caseId: 'CASE-2026-0001',
      subjectName: 'John Doe',
      subjectId: 'CUS-2026-A4421',
      accountNumber: 'ACC-004A421',
      dateGenerated: '2026-03-18',
      status: 'Approved',
      analyst: 'analyst_01',
      totalTransactions: 5,
      aggregateValue: '£43,250.00'
    },
    {
      sarId: 'SAR-1022',
      caseId: 'CASE-2026-0002',
      subjectName: 'Jane Smith',
      subjectId: 'CUS-2026-B5532',
      accountNumber: 'ACC-005B532',
      dateGenerated: '2026-03-17',
      status: 'Submitted',
      analyst: 'analyst_02',
      totalTransactions: 8,
      aggregateValue: '£67,890.00'
    },
    {
      sarId: 'SAR-1021',
      caseId: 'CASE-2026-0003',
      subjectName: 'Robert Johnson',
      subjectId: 'CUS-2026-C6643',
      accountNumber: 'ACC-006C643',
      dateGenerated: '2026-03-16',
      status: 'Pending Review',
      analyst: 'analyst_03',
      totalTransactions: 12,
      aggregateValue: '£125,400.00'
    },
    {
      sarId: 'SAR-1020',
      caseId: 'CASE-2026-0004',
      subjectName: 'Emily Brown',
      subjectId: 'CUS-2026-D7754',
      accountNumber: 'ACC-007D754',
      dateGenerated: '2026-03-15',
      status: 'Draft',
      analyst: 'analyst_01',
      totalTransactions: 6,
      aggregateValue: '£52,300.00'
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = mockSARs.filter(sar => 
      sar.sarId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sar.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sar.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sar.subjectId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-[#ECFDF5] text-[#10B981] border-[#D1FAE5]';
      case 'Submitted':
        return 'bg-[#EFF6FF] text-[#0284c7] border-[#DBEAFE]';
      case 'Pending Review':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#FDE68A]';
      case 'Draft':
        return 'bg-[#F5F5F5] text-[#6B6B6B] border-[#E8E8E8]';
      default:
        return 'bg-[#F5F5F5] text-[#6B6B6B] border-[#E8E8E8]';
    }
  };

  // SAR Narrative HTML for display
  const sarNarrativeHTML = `<div class="sar-report">
<div class="breadcrumb">SAR Dashboard > SAR/2026/BARCL/00047</div>

<h1 class="main-title">Suspicious Activity Report</h1>

<div class="section-card">
  <div class="section-header">1. Subject Details</div>
  <div class="section-content">
    <p>This report concerns <strong>John Doe</strong>, customer reference CUS-2026-A4421, a British national born on 15 March 1978. The subject holds a Personal Retail Banking account (Account Number: ACC-004A421) which was opened on 14 September 2025. The customer's KYC risk rating is classified as Medium-High. The subject is not identified as a Politically Exposed Person. As of the date of this report, the account status is Active with an average monthly balance of £4,200.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">2. Grounds for Suspicion</div>
  <div class="section-content">
    <h3 class="subsection-title">2.1 Overview</h3>
    <p>Suspicious transaction activity was identified between 16 November 2025 and 02 February 2026, indicative of potential structuring behavior designed to avoid mandatory reporting thresholds. The pattern of transactions, their timing, amounts, and lack of legitimate commercial justification raise significant concerns regarding possible money laundering activity contrary to the Proceeds of Crime Act 2002 and Money Laundering Regulations 2017.</p>
    
    <div class="divider"></div>
    
    <h3 class="subsection-title">2.2 Transaction Activity</h3>
    <p>During the relevant period, a total of five transactions were identified across the subject's account. On 16 November 2025 at 20:51 hours, a debit transaction of £8,900.00 was processed involving a UK individual counterparty, with the transaction value falling below the £10,000 reporting threshold. On 17 November 2025 at 15:51 hours, a credit transaction of £8,730.00 was received from a UK individual, again below threshold. On 20 December 2025 at 23:51 hours, a debit of £8,340.00 was processed to a UK individual counterparty, maintaining the pattern of sub-threshold transactions. On 01 January 2026 at 22:51 hours, a debit of £8,810.00 was made to a UK individual. Finally, on 02 February 2026 at 06:51 hours, a credit of £8,430.00 was received from a UK individual. Each transaction was deliberately structured to remain below the £10,000 mandatory reporting threshold.</p>
    
    <div class="divider"></div>
    
    <h3 class="subsection-title">2.3 Pattern Analysis</h3>
    <p>Analysis of the transaction pattern reveals characteristics consistent with deliberate structuring or "smurfing" behavior. The transactions demonstrate a calculated approach with amounts ranging narrowly between £8,340.00 and £8,900.00, showing a standard deviation of £236. This consistency in value, combined with the deliberate positioning of all amounts below regulatory thresholds, suggests intentional fragmentation of larger sums to evade detection and reporting requirements. The timing of transactions occurring during out-of-hours periods (late evening and early morning) further supports the assessment of deliberate concealment activity. The aggregate value of all identified transactions totals £43,250.00, representing substantial movement of funds through structured means.</p>
    
    <div class="divider"></div>
    
    <h3 class="subsection-title">2.4 Absence of Legitimate Explanation</h3>
    <p>The subject has failed to provide adequate commercial or personal justification for the identified transaction pattern. The frequency, timing, amount consistency, and counterparty relationships do not align with the customer's stated occupation, income profile, or normal account usage patterns as established during customer due diligence procedures. Despite the subject's cooperation with routine account inquiries, no satisfactory explanation has been forthcoming regarding the specific structuring behavior observed. The absence of legitimate business purpose, combined with the deliberate threshold avoidance, reinforces the assessment that these activities are suspicious in nature and warrant formal reporting to the relevant authorities.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">3. Financial Summary</div>
  <div class="section-content">
    <p>The financial analysis of the subject's account activity during the relevant period reveals a total transaction value of <strong>£43,250.00</strong> across five separate transactions. The average transaction value is calculated at <strong>£8,650.00</strong>, with a standard deviation of <strong>£236</strong>, demonstrating unusually consistent transaction sizing. The account activity shows four transfers classified as out-of-hours transactions, occurring outside normal banking hours. Analysis of transaction direction reveals a balanced pattern with no sanctions check matches identified against any counterparties. The consistency in transaction values, combined with the temporal distribution and threshold avoidance behavior, presents a statistical profile consistent with structured money laundering activity rather than legitimate commercial or personal banking behavior.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">4. Regulatory & Legal Basis</div>
  <div class="section-content">
    <p>This Suspicious Activity Report is submitted in accordance with the statutory obligations imposed under the <strong>Proceeds of Crime Act 2002 (POCA)</strong>, specifically sections 330-332 relating to failure to disclose knowledge or suspicion of money laundering. The report is made pursuant to the <strong>Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017)</strong>, which mandate the reporting of suspicious activity to the National Crime Agency. This disclosure is consistent with the National Crime Agency's SAR submission guidelines and aligns with the Joint Money Laundering Steering Group (JMLSG) Guidance, Part I, Chapter 5. This report is made in good faith and in the reasonable belief that the information disclosed tends to show that a person has engaged in money laundering as defined under POCA 2002. The submitting institution acknowledges the prohibition against tipping off as specified under section 333A of POCA 2002 and confirms that no disclosure of this report or its contents has been made to the subject or any related parties.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">5. Conclusion</div>
  <div class="section-content">
    <p>Based on the comprehensive analysis of the identified transaction patterns, the deliberate structuring behavior to avoid regulatory thresholds, and the absence of any legitimate commercial or personal justification, it is the professional assessment of this institution that the subject's account activity presents a credible suspicion of money laundering. The consistency in transaction amounts, the timing of transfers during out-of-hours periods, and the systematic threshold avoidance demonstrate sophisticated financial behavior inconsistent with the customer's profile and stated business activities. This Suspicious Activity Report is therefore submitted to the National Crime Agency for further investigation and appropriate action in accordance with regulatory requirements.</p>
    
    <div class="signature-section">
      <div class="signature-block">
        <div class="signature-line"></div>
        <div class="signature-label">Analyst Signature</div>
        <div class="signature-name">A. Sharma (ANL-0042)</div>
        <div class="signature-date">19 March 2026</div>
      </div>
      <div class="signature-block">
        <div class="signature-line"></div>
        <div class="signature-label">Manager Signature</div>
        <div class="signature-name">S. Turner</div>
        <div class="signature-date">19 March 2026</div>
      </div>
    </div>
  </div>
</div>

<div class="footer-section">
  <span>Report Ref: SAR/2026/BARCL/00047</span>
  <span>Case Ref: CASE-2026-0001</span>
  <span>Page 1 of 3</span>
  <span>STRICTLY CONFIDENTIAL</span>
</div>
</div>`;

  // If showing Audit Trail or Visualization, render them instead
  if (showAuditTrail) {
    return <AuditTrail onBack={() => setShowAuditTrail(false)} />;
  }

  if (showVisualization) {
    return <Visualization onBack={() => setShowVisualization(false)} />;
  }

  // If viewing a SAR, show the SAR detail view
  if (viewingSarId) {
    return (
      <>
        <div className="h-full bg-[#FAFAFA] overflow-y-auto">
          <div className="max-w-[1600px] mx-auto py-6 sm:py-10 px-4 sm:px-8">
            {/* Back Button */}
            <button
              onClick={() => setViewingSarId(null)}
              className="mb-6 flex items-center gap-2 px-4 h-[36px] bg-white border border-[#E8E8E8] hover:border-[#00AEEF] text-[#1A1A1A] hover:text-[#00AEEF] text-[13px] rounded-lg transition-all"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SAR Search
            </button>

            {/* SAR Header */}
            <div className="mb-6">
              <h1 className="text-[22px] sm:text-[28px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                SAR Narrative Viewer
              </h1>
              <p className="text-[13px] sm:text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                Viewing SAR: {viewingSarId}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <button
                className="px-4 h-[36px] bg-white border border-[#D1D5DB] text-[#2C2C2C] hover:bg-[#F9FAFB] text-[13px] rounded-md transition-all flex items-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                <Edit3 className="w-[14px] h-[14px]" />
                Edit Report
              </button>
              <button
                className="px-4 h-[36px] bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[13px] rounded-md transition-all flex items-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                <Download className="w-[14px] h-[14px]" />
                Export PDF
              </button>
            </div>

            {/* Document Container */}
            <div 
              className="bg-white rounded-lg shadow-sm"
              style={{ boxShadow: '0px 1px 3px rgba(0,0,0,0.05)' }}
              dangerouslySetInnerHTML={{ __html: sarNarrativeHTML }}
            />

            {/* Action Buttons - View Audit Trail & Visualization */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowAuditTrail(true)}
                className="px-5 h-[40px] bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[14px] rounded-lg transition-all flex items-center gap-2.5 shadow-sm"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                <TrendingUp className="w-[16px] h-[16px]" />
                View Audit Trail
              </button>
              <button
                onClick={() => setShowVisualization(true)}
                className="px-5 h-[40px] bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[14px] rounded-lg transition-all flex items-center gap-2.5 shadow-sm"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                <BarChart3 className="w-[16px] h-[16px]" />
                Visualization
              </button>
            </div>
          </div>
        </div>

        {/* Professional Banking UI Styling */}
        <style>{`
          .sar-report {
            font-family: 'Inter', sans-serif;
            padding: 24px;
          }
          
          .breadcrumb {
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            font-weight: 400;
            color: #6B7280;
            margin-bottom: 16px;
          }
          
          .main-title {
            font-family: 'Inter', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #1F3A5F;
            margin-bottom: 16px;
            letter-spacing: 0.2px;
          }
          
          .section-card {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            margin-bottom: 20px;
            overflow: hidden;
            box-shadow: 0px 1px 3px rgba(0,0,0,0.05);
          }
          
          .section-header {
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: #1F3A5F;
            background: #F1F5F9;
            padding: 10px 16px;
            border-bottom: 1px solid #E5E7EB;
            letter-spacing: 0.2px;
          }
          
          .section-content {
            padding: 16px;
          }
          
          .section-content p {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 400;
            color: #2C2C2C;
            line-height: 1.6;
            margin-bottom: 12px;
            max-width: 700px;
            letter-spacing: 0.2px;
          }
          
          .section-content p:last-child {
            margin-bottom: 0;
          }
          
          .section-content strong {
            font-weight: 600;
            color: #1F3A5F;
          }
          
          .subsection-title {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #1F3A5F;
            margin-top: 12px;
            margin-bottom: 6px;
            letter-spacing: 0.2px;
          }
          
          .divider {
            height: 1px;
            background: #E5E7EB;
            margin: 12px 0;
          }
          
          .signature-section {
            display: flex;
            gap: 60px;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #E5E7EB;
          }
          
          .signature-block {
            flex: 1;
          }
          
          .signature-line {
            height: 1px;
            background: #2C2C2C;
            margin-bottom: 8px;
          }
          
          .signature-label {
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 400;
            color: #6B7280;
            margin-bottom: 4px;
          }
          
          .signature-name {
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #1F3A5F;
            margin-bottom: 2px;
          }
          
          .signature-date {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 400;
            color: #6B7280;
          }
          
          .footer-section {
            display: flex;
            justify-content: space-between;
            padding: 12px 16px;
            background: #F9FAFB;
            border-top: 1px solid #E5E7EB;
            margin-top: 24px;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 400;
            color: #6B7280;
          }
        `}</style>
      </>
    );
  }

  return (
    <div className="h-full bg-[#FAFAFA] overflow-y-auto">
      <div className="max-w-[1600px] mx-auto py-6 sm:py-10 px-4 sm:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[22px] sm:text-[28px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
            SAR Search by ID
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
            Search for Suspicious Activity Reports by SAR ID, Case ID, or Subject Name.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter SAR ID, Case ID, Subject Name, or Customer ID..."
                className="w-full h-11 pl-10 pr-4 bg-[#F8F8F8] border border-transparent rounded-lg text-[13px] placeholder:text-[#999999] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 h-11 bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[14px] rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {searchResults.map((sar) => (
              <div 
                key={sar.sarId} 
                className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF] hover:shadow-md transition-all"
              >
                {/* SAR Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] text-[#1A1A1A] mb-1" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                      {sar.sarId}
                    </h3>
                    <p className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                      {sar.caseId}
                    </p>
                  </div>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] border ${getStatusColor(sar.status)}`} style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    {sar.status}
                  </span>
                </div>

                {/* Subject Details */}
                <div className="space-y-2 mb-4 pb-4 border-b border-[#F5F5F5]">
                  <div className="flex items-start gap-2">
                    <span className="text-[12px] text-[#999999] w-28 flex-shrink-0" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      Subject Name:
                    </span>
                    <span className="text-[12px] text-[#1A1A1A] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                      {sar.subjectName}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[12px] text-[#999999] w-28 flex-shrink-0" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      Subject ID:
                    </span>
                    <span className="text-[12px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      {sar.subjectId}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[12px] text-[#999999] w-28 flex-shrink-0" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      Account Number:
                    </span>
                    <span className="text-[12px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      {sar.accountNumber}
                    </span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[11px] text-[#999999] mb-0.5" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      Transactions
                    </p>
                    <p className="text-[14px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                      {sar.totalTransactions}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#999999] mb-0.5" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      Aggregate Value
                    </p>
                    <p className="text-[14px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                      {sar.aggregateValue}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F5]">
                  <div className="text-[11px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                    Generated: {sar.dateGenerated}
                  </div>
                  <button
                    onClick={() => setViewingSarId(sar.sarId)}
                    className="px-4 h-[32px] bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[13px] rounded-lg transition-all"
                    style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {searchQuery && searchResults.length === 0 && (
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#999999]" />
            </div>
            <h3 className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
              No Results Found
            </h3>
            <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
              No SARs match your search query. Try a different SAR ID or subject name.
            </p>
          </div>
        )}

        {/* Empty State - No Search Yet */}
        {!searchQuery && searchResults.length === 0 && (
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-[#F0F9FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#00AEEF]" />
            </div>
            <h3 className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
              Search for SAR Records
            </h3>
            <p className="text-[13px] text-[#6B6B6B] max-w-md mx-auto" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
              Enter a SAR ID, Case ID, Subject Name, or Customer ID to search through submitted Suspicious Activity Reports.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}