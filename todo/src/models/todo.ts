export type Todo = {
  id?: string;
  username?: string;
  titulo: string;
  status: boolean;
  importante: boolean;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
};
