import React from 'react';

export const Button: React.FC = () => (<div className="p-4 text-gray-700">Button</div>);
export const Input: React.FC = () => (<div className="p-4 text-gray-700">Input</div>);

const Ui: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Ui</h1>
      <p className="text-gray-500">Welcome to your application</p>
    </div>
  </div>
);
export default Ui;
