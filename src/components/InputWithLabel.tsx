import React from "react";

interface InputWithLabelProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
  className?: string;
}

export const InputWithLabel = ({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: InputWithLabelProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
