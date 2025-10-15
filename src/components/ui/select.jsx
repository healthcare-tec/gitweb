import React from "react";

export function Select({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children }) {
  return <div>{children}</div>; // placeholder compatível com seu código
}

export function SelectContent({ children }) {
  return <>{children}</>; // compatível com componentes complexos
}

export function SelectValue({ value }) {
  return <span>{value}</span>;
}
