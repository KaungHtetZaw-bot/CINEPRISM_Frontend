import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Upload, ChevronDown, Check, Loader2, X, CreditCard, Copy, Sparkles } from "lucide-react";
import { useCreatePurchase } from "../hooks/subscription/usePurchase";
import { useGetPlans } from "../hooks/subscription/useGetPlans";
import { useGetPayments } from "../hooks/subscription/useGetPayments";

const VIPPurchasePage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const planRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const { data: plans } = useGetPlans();
  const { data: payments } = useGetPayments();
  const createPurchase = useCreatePurchase();

  const handleSubmit = async () => {
    if (!selectedPlan || !file) return;

    const formData = new FormData();
    formData.append('plan_id', selectedPlan.id.toString());
    formData.append('photo', file);
    
    if (selectedAccount) {
      // Sending payment_account_id to match Laravel validation
      formData.append('payment_account_id', selectedAccount.id.toString());
    }

    createPurchase.mutate(formData, {
      onSuccess: () => {
        setIsSuccess(true);
      }
    });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (planRef.current && !planRef.current.contains(e.target as Node)) setIsPlanOpen(false);
      if (paymentRef.current && !paymentRef.current.contains(e.target as Node)) setIsPaymentOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center p-6 animate-in zoom-in-95 duration-500">
        <div className="w-full max-w-md bg-surface-1 border border-accent/30 rounded-[2.5rem] p-10 text-center shadow-2xl">
          <div className="relative mx-auto w-20 h-20 mb-8">
            <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative flex items-center justify-center w-full h-full bg-accent rounded-full border-4 border-app">
              <Check size={40} className="text-black" strokeWidth={4} />
            </div>
          </div>
          <h2 className="text-3xl font-heading font-black uppercase italic tracking-tightest mb-2">
            Request <span className="text-accent">Sent</span>
          </h2>
          <p className="text-dim text-[10px] font-black uppercase tracking-[0.2em] mb-8 leading-relaxed">
            Purchase submitted. <br /> Awaiting admin approval.
          </p>
          <button
            onClick={() => navigate('/browse')}
            className="w-full py-5 bg-accent text-black font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN FORM VIEW ---
  return (
    <div className="min-h-screen bg-app text-main flex items-center justify-center p-3 md:p-6 font-sans">
      <div className="w-full max-w-xl bg-surface-1 border border-border rounded-4xl md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-hidden relative">
        
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-10">
          <div className="p-3 md:p-4 bg-accent/10 rounded-2xl border border-accent/20">
            <Crown className="text-accent" size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-black uppercase italic tracking-tightest leading-none">
              VIP <span className="text-accent">Access</span>
            </h1>
            <p className="text-[9px] md:text-[10px] font-black text-dim uppercase tracking-[0.3em] mt-1 md:mt-2 ml-1 flex items-center gap-2">
              <Sparkles size={10} className="text-accent" /> Premium Membership
            </p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          
          {/* 01. Payment Provider */}
          <div className="relative" ref={paymentRef}>
            <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-accent mb-2 md:mb-3 block ml-1">
              01. Select Provider
            </label>
            <button
              type="button"
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
              className="w-full flex justify-between items-center p-4 md:p-5 rounded-2xl border border-border bg-surface-2 hover:border-accent transition-all duration-300"
            >
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <CreditCard size={20} className={selectedAccount ? "text-accent shrink-0" : "text-muted shrink-0"} />
                <span className={`text-sm md:text-base font-bold tracking-tight truncate ${selectedAccount ? "text-main" : "text-muted"}`}>
                  {selectedAccount 
                    ? `${selectedAccount.payment_type.name} — ${selectedAccount.name}` 
                    : "Choose Payment Method"}
                </span>
              </div>
              <ChevronDown size={18} className={`text-muted shrink-0 transition-transform duration-300 ${isPaymentOpen ? "rotate-180 text-accent" : ""}`} />
            </button>

            {isPaymentOpen && (
              <div className="absolute z-50 w-full mt-2 bg-surface-2 border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="max-h-[40vh] overflow-y-auto no-scrollbar">
                  {payments?.map((acc: any) => (
                    <div
                      key={acc.id}
                      onClick={() => { setSelectedAccount(acc); setIsPaymentOpen(false); }}
                      className="p-4 md:p-5 hover:bg-accent hover:text-black cursor-pointer flex justify-between items-center border-b border-border last:border-0 transition-colors group"
                    >
                      <div className="overflow-hidden">
                        <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-70 group-hover:text-black/60">{acc.payment_type.name}</p>
                        <p className="text-sm md:text-base font-black tracking-tight truncate">{acc.name}</p>
                      </div>
                      {selectedAccount?.id === acc.id && <Check size={18} className="font-bold shrink-0 ml-2" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Account Number Display */}
          {selectedAccount && (
            <div className="p-5 md:p-6 rounded-2xl bg-accent/5 border-2 border-accent/20 animate-in zoom-in-95">
              <p className="text-[9px] font-black text-accent uppercase tracking-[0.2em] mb-2">Account Number</p>
              <div className="flex justify-between items-center gap-2">
                <span className="text-xl md:text-3xl font-mono font-bold tracking-widest text-main break-all">
                  {selectedAccount.number}
                </span>
                <button 
                  type="button"
                  onClick={() => navigator.clipboard.writeText(selectedAccount.number)}
                  className="p-2.5 md:p-3 bg-accent text-black rounded-xl hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  <Copy strokeWidth={3} className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* 02. Plan Selection */}
          <div className="relative" ref={planRef}>
            <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-accent mb-2 md:mb-3 block ml-1">
              02. Subscription Plan
            </label>
            <button
              type="button"
              onClick={() => setIsPlanOpen(!isPlanOpen)}
              className="w-full flex justify-between items-center p-4 md:p-5 rounded-2xl border border-border bg-surface-2 hover:border-accent transition-all duration-300"
            >
              <span className={`text-sm md:text-base font-bold tracking-tight ${selectedPlan ? "text-main" : "text-muted"}`}>
                {selectedPlan ? selectedPlan.name : "Select Duration"}
              </span>
              {selectedPlan && <span className="text-lg md:text-xl font-black text-accent ml-auto mr-3 md:mr-4">${selectedPlan.amount}</span>}
              <ChevronDown size={18} className={`text-muted shrink-0 transition-transform duration-300 ${isPlanOpen ? "rotate-180 text-accent" : ""}`} />
            </button>
            {isPlanOpen && (
              <div className="absolute z-40 w-full mt-2 bg-surface-2 border border-border rounded-2xl shadow-2xl overflow-hidden">
                {plans?.map((plan: any) => (
                  <div
                    key={plan.id}
                    onClick={() => { setSelectedPlan(plan); setIsPlanOpen(false); }}
                    className="p-4 md:p-5 hover:bg-accent hover:text-black cursor-pointer flex justify-between items-center transition-colors"
                  >
                    <span className="text-sm md:text-base font-black uppercase tracking-tighter">{plan.name}</span>
                    <span className="text-base md:text-lg font-black">${plan.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 03. Proof Upload */}
          <div className="space-y-2 md:space-y-3">
             <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-accent ml-1 block">
              03. Upload Proof
            </label>
            <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-accent/5 hover:border-accent/30 transition-all group overflow-hidden bg-surface-2">
              {!preview ? (
                <div className="flex flex-col items-center">
                  {/* Fixed Responsive Icon Size with className */}
                  <Upload 
                    strokeWidth={2} 
                    className="w-6 h-6 md:w-8 md:h-8 text-muted group-hover:text-accent mb-3 transition-colors" 
                  />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-main">Tap to upload slip</span>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img src={preview} className="w-full h-full object-cover" alt="slip" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={28} className="text-white" onClick={(e) => { e.preventDefault(); setPreview(null); setFile(null); }} />
                  </div>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { setFile(file); setPreview(URL.createObjectURL(file)); }
              }} />
            </label>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedAccount || !selectedPlan || !file || createPurchase.isPending}
            className="w-full py-5 md:py-6 bg-accent text-black text-lg md:text-xl font-black uppercase tracking-widest rounded-2xl 
            hover:brightness-110 active:scale-[0.98] transition-all 
            disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-3 shadow-xl mt-4"
          >
            {createPurchase.isPending ? <Loader2 className="animate-spin" size={24} /> : "Confirm & Pay"}
          </button>

          {createPurchase.isError && (
            <p className="text-center text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-2 animate-pulse">
              Upload Failed. Please check file size.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VIPPurchasePage;