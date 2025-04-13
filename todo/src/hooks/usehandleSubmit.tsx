import { useState } from 'react';

type UseHandleSubmitParams<T> = {
  isRegistering: boolean;
  onRegister?: (form: T) => Promise<any>;
  onAuth?: (form: T) => Promise<any>;
  onSuccess?: () => void;
  onError?: (err: any) => void;
};

export const useHandleSubmit = <T extends Record<string, any>>({
  isRegistering,
  onRegister,
  onAuth,
  onSuccess,
  onError,
}: UseHandleSubmitParams<T>) => {
  const [status, setStatus] = useState<boolean | null>(null);

  const handleSubmitLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    form: T
  ) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (onRegister) {
          const created = await onRegister(form);
          if (created) {
            setStatus(true);
            onSuccess?.();
          } else {
            setStatus(false);
          }
        } else {
          console.warn('onRegister não foi fornecido!');
        }
      } else {
        if (onAuth) {
          await onAuth(form);
          setStatus(true);
          onSuccess?.();
        } else {
          console.warn('onAuth não foi fornecido!');
        }
      }
    } catch (err) {
      setStatus(false);
      onError?.(err);
    }
  };

  return { handleSubmitLogin, status };
};
