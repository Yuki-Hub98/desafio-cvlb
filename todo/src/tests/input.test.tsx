import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Input } from '../components/input';

type FormType = {
  nome: string;
  aceita: boolean;
  descricao: string;
};

describe('Input component', () => {
  it('renderiza um input de texto e atualiza o valor corretamente', () => {
    const form = { nome: '', aceita: false, descricao: '' };
    const setForm = vi.fn();

    render(
      <Input<FormType>
        name="nome"
        form={form}
        setForm={setForm}
        placeholder="Seu nome"
        type="text"
      />,
    );

    const input = screen.getByPlaceholderText('Seu nome');
    fireEvent.change(input, { target: { value: 'João' } });

    expect(setForm).toHaveBeenCalledWith({ ...form, nome: 'João' });
  });

  it('renderiza um textarea e atualiza o valor corretamente', () => {
    const form = { nome: '', aceita: false, descricao: '' };
    const setForm = vi.fn();

    render(
      <Input<FormType>
        name="descricao"
        form={form}
        setForm={setForm}
        placeholder="Descrição"
        type="textarea"
      />,
    );

    const textarea = screen.getByPlaceholderText('Descrição');
    fireEvent.change(textarea, { target: { value: 'Texto longo' } });

    expect(setForm).toHaveBeenCalledWith({ ...form, descricao: 'Texto longo' });
  });

  it('renderiza um checkbox e atualiza corretamente', () => {
    const form = { nome: '', aceita: false, descricao: '' };
    const setForm = vi.fn();

    render(
      <Input<FormType>
        name="aceita"
        form={form}
        setForm={setForm}
        placeholder="Aceita os termos?"
        type="checkbox"
      />,
    );

    const checkbox = screen.getByLabelText('Aceita os termos?') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(setForm).toHaveBeenCalledWith({ ...form, aceita: true });
  });
});
