import React from 'react';

type InputProps<T> = {
  name: keyof T;
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  placeholder: string;
  type?: string;
  className?: string;
};

export const Input = <T extends Record<string, any>>({
  name,
  form,
  setForm,
  placeholder,
  type = 'text',
  className,
}: InputProps<T>) => {
  return (
    <input
      type={type}
      name={name as string}
      placeholder={placeholder}
      value={form[name as keyof T]}
      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      className={className}
    />
  );
};
