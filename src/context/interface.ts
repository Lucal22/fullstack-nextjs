export type CardType = {
  name: string;
  email: string;
};

export type UsersType = CardType & {
  id: string;
};

export type changingList = {
  onUpdate: (updatedUser: UsersType) => void;
  onDelete: (id: string) => void;
};

export type CardProps = UsersType & changingList;
