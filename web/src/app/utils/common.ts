export type ItemViewType = 'list' | 'grid';

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
