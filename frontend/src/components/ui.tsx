import React from 'react';

export function Button({ children, onClick, variant = 'primary', disabled = false, fullWidth = false }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${variants[variant]} ${fullWidth ? 'w-full' : ''} font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}>
      {children}
    </button>
  );
}

export function Input({ label, value, onChange, type = 'text', placeholder = '', error = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={`border-2 ${error ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors bg-white text-gray-900`} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ text, color = 'blue' }: { text: string; color?: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return <span className={`${colors[color] || colors.blue} text-xs font-semibold px-2.5 py-1 rounded-full`}>{text}</span>;
}

export function Spinner() {
  return <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">📭</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
}

export function Alert({ message, type = 'error' }: { message: string; type?: 'error' | 'success' | 'warning' | 'info' }) {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  };
  return <div className={`${styles[type]} border rounded-xl px-4 py-3 text-sm font-medium`}>{message}</div>;
}