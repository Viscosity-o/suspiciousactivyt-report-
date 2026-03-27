import { Upload, CheckCircle, FileJson, FileText, Users, CreditCard, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface TransactionDataInputProps {
  onDataLoaded?: () => void;
}

interface UploadedFile {
  name: string;
  size: number;
  uploaded: boolean;
  file: File;
}

export function TransactionDataInput({ onDataLoaded }: TransactionDataInputProps) {

  const [files, setFiles] = useState<{
    transactionData: UploadedFile | null;
    caseExports: UploadedFile | null;
    customerKYC: UploadedFile | null;
    accountDetails: UploadedFile | null;
  }>({
    transactionData: null,
    caseExports: null,
    customerKYC: null,
    accountDetails: null,
  });

  const [uploadConfirmed, setUploadConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const transactionInputRef = useRef<HTMLInputElement>(null);
  const caseInputRef = useRef<HTMLInputElement>(null);
  const kycInputRef = useRef<HTMLInputElement>(null);
  const accountInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'transactionData' | 'caseExports' | 'customerKYC' | 'accountDetails'
  ) => {

    const file = event.target.files?.[0];

    if (file) {

      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        uploaded: true,
        file: file,
      };

      setFiles(prev => ({ ...prev, [type]: uploadedFile }));
    }
  };

  const handleUploadConfirm = async () => {

    if (!allFilesUploaded) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("transactionData", files.transactionData!.file);
    formData.append("caseExports", files.caseExports!.file);
    formData.append("customerKYC", files.customerKYC!.file);
    formData.append("accountDetails", files.accountDetails!.file);

    try {

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      console.log("Upload Success:", data);

      setUploadConfirmed(true);

      setTimeout(() => {
        onDataLoaded?.();
      }, 300);

    } catch (error) {

      console.error("Upload Error:", error);

    }

    setLoading(false);
  };

  const handleRemoveFile = (type: 'transactionData' | 'caseExports' | 'customerKYC' | 'accountDetails') => {
    setFiles(prev => ({ ...prev, [type]: null }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const allFilesUploaded = Object.values(files).every(f => f !== null);
  const uploadedCount = Object.values(files).filter(f => f !== null).length;

  const fileUploadSections = [
    {
      id: 'transactionData',
      title: 'Transaction Data',
      description: 'Upload CSV, JSON, or Excel file with transaction records',
      icon: FileJson,
      color: '#00AEEF',
      bgColor: '#E0F2FE',
      ref: transactionInputRef,
      file: files.transactionData,
    },
    {
      id: 'caseExports',
      title: 'Case Exports',
      description: 'Upload case investigation and export data',
      icon: FileText,
      color: '#0284c7',
      bgColor: '#DBEAFE',
      ref: caseInputRef,
      file: files.caseExports,
    },
    {
      id: 'customerKYC',
      title: 'Customer KYC',
      description: 'Upload Know Your Customer verification documents',
      icon: Users,
      color: '#0369a1',
      bgColor: '#BFDBFE',
      ref: kycInputRef,
      file: files.customerKYC,
    },
    {
      id: 'accountDetails',
      title: 'Account Details',
      description: 'Upload account information and banking details',
      icon: CreditCard,
      color: '#075985',
      bgColor: '#BAE6FD',
      ref: accountInputRef,
      file: files.accountDetails,
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto py-10 px-8">

      <div className="mb-8">
        <h2 className="text-[28px] text-[#003366] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          Upload Required Documents
        </h2>
        <p className="text-[15px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
          Please upload all 4 required files to generate the SAR report
        </p>
      </div>

      <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 600 }}>
            Upload Progress
          </span>
          <span className="text-[14px] text-[#00AEEF]" style={{ fontWeight: 600 }}>
            {uploadedCount} / 4 files uploaded
          </span>
        </div>

        <div className="w-full bg-[#F5F5F5] rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#00AEEF] to-[#0284c7] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(uploadedCount / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {fileUploadSections.map((section) => {
          const Icon = section.icon;
          const isUploaded = section.file !== null;

          return (
            <div key={section.id} className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden hover:border-[#00AEEF]/40 transition-all">

              <div className="p-6 border-b border-[#E8E8E8]" style={{ backgroundColor: section.bgColor }}>
                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: section.color }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[16px] text-[#003366] mb-0.5" style={{ fontWeight: 600 }}>
                      {section.title}
                    </h3>
                    <p className="text-[12px] text-[#6B6B6B]">
                      {section.description}
                    </p>
                  </div>

                  {isUploaded && (
                    <CheckCircle className="w-6 h-6 text-[#10B981]" />
                  )}

                </div>
              </div>

              <div className="p-6">

                {!isUploaded ? (
                  <>
                    <input
                      ref={section.ref}
                      type="file"
                      accept=".csv,.json,.xlsx,.xls,.pdf"
                      onChange={(e) => handleFileUpload(e, section.id as any)}
                      className="hidden"
                    />

                    <button
                      onClick={() => section.ref.current?.click()}
                      className="w-full h-[120px] border-2 border-dashed border-[#E8E8E8] rounded-lg hover:border-[#00AEEF] flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-[#CCCCCC]" />
                      <span className="text-[13px] text-[#6B6B6B]">
                        Click to upload
                      </span>
                    </button>
                  </>
                ) : (
                  <div className="bg-[#F5F5F5] border border-[#E8E8E8] rounded-lg p-4">
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-[13px] text-[#1A1A1A] font-semibold">
                          {section.file?.name}
                        </p>

                        <p className="text-[11px] text-[#6B6B6B]">
                          {section.file && formatFileSize(section.file.size)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoveFile(section.id as any)}
                        className="w-8 h-8 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-[#6B6B6B]" />
                      </button>

                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {allFilesUploaded && !uploadConfirmed && (
        <div className="bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border border-[#10B981]/30 rounded-xl p-6 flex items-center gap-4 mt-6">

          <div className="w-12 h-12 bg-[#10B981] rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <h4 className="text-[15px] text-[#1A1A1A] font-semibold">
              All Files Uploaded Successfully
            </h4>

            <p className="text-[13px] text-[#6B6B6B]">
              Ready to configure and generate SAR report • 4 files loaded
            </p>
          </div>

          <button
            onClick={handleUploadConfirm}
            className="w-24 h-10 bg-[#10B981] rounded-lg text-white font-bold hover:bg-[#047857]"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </div>
      )}

    </div>
  );
}