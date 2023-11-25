export type ContextMenuSettings = {
  x: number;
  y: number;
  isVisible: boolean;

  data: {
    name: string;
    action: () => void;
  }[];
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
};
