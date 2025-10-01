export type CardType = {
  nome: string;
  email: string;
};

export type ContactsType = CardType & {
  id: string;
};
