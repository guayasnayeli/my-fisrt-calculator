import React from 'react';

// TypeScript: Strict props definition
interface PrimaryButtonProps {
  onTrigger: () => void;
  children: React.ReactNode;
  customClass?: string;
}

export default function PrimaryButton({ onTrigger, children, customClass = '' }: PrimaryButtonProps) {
  return (
    <button 
      onClick={onTrigger} 
      className={`px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow hover:bg-indigo-700 transition-all ${customClass}`}
    >
      {children}
    </button>
  );
}