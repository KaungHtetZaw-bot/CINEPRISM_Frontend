import React, { useRef, useState, useEffect } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete  }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    // Only allow numbers
    const char = value.replace(/[^0-9]/g, "").slice(-1);
    if (!char && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-focus next
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger completion check
    const combinedCode = newOtp.join("");
    if (combinedCode.length === length) onComplete(combinedCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move back and clear previous
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // NEW: Handle Paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim().slice(0, length);
    if (!/^\d+$/.test(data)) return; // Only numbers

    const newOtp = [...otp];
    data.split("").forEach((char, idx) => {
      newOtp[idx] = char;
      if (inputRefs.current[idx]) inputRefs.current[idx]!.value = char;
    });
    setOtp(newOtp);
    
    // Focus last filled or next empty
    const lastIdx = Math.min(data.length, length - 1);
    inputRefs.current[lastIdx]?.focus();

    if (data.length === length) onComplete(data);
  };

  return (
    <div className="flex justify-between gap-2 md:gap-3 my-8" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-full max-w-12 aspect-square text-2xl font-black text-center 
                    bg-surface-2 border-2 border-border rounded-xl
                    focus:border-accent focus:ring-4 focus:ring-accent/10
                    outline-none transition-all duration-200 text-main"
        />
      ))}
    </div>
  );
};

export default OTPInput;