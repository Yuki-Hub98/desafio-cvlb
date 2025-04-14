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
  // Função para lidar com as mudanças no input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      // Garantir que o target é um HTMLInputElement e é um checkbox
      const inputElement = e.target as HTMLInputElement;
      setForm({ ...form, [name]: inputElement.checked });
    } else {
      // Para os outros tipos de input (textarea, text)
      setForm({ ...form, [name]: value });
    }
  };

  if (type === 'textarea') {
    return (
      <textarea
        name={name as string}
        placeholder={placeholder}
        value={form[name as keyof T]}
        onChange={handleChange}
        className={className}
      />
    );
  }

  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name={name as string}
          checked={form[name as keyof T] as boolean}
          onChange={handleChange}
          className={className}
        />
        {placeholder}
      </label>
    );
  }

  return (
    <input
      type={type}
      name={name as string}
      placeholder={placeholder}
      value={form[name as keyof T]}
      onChange={handleChange}
      className={className}
    />
  );
};
