import { FloppyDisk, NotePencil, Trash, X } from "@phosphor-icons/react";
import { useState } from "react";

type CardType = {
  nome: string;
  email: string;
};

export default function Card({ nome, email }: CardType) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });

  const handleSubmit = () => {};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full border-t-1 border-gray-100 h-10">
      <div></div>
      {edit ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between w-full h-full gap-2"
          >
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder={formData.nome}
              className="flex-1 px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={formData.email}
              className="flex-1 px-3 py-2 border rounded-lg"
              required
            />
            <div className="flex items-center justify-center flex-1 gap-2">
              <button type="submit">
                <FloppyDisk className="hover:cursor-pointer" size={25} />
              </button>
              <button onClick={() => setEdit(false)}>
                <X className="hover:cursor-pointer" size={25} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center gap-2 justify-between w-full h-full text-center">
          <p className="flex-1 px-3 ">{nome}</p>
          <p className="flex-1 px-3 ">{email}</p>
          <div className="flex items-center justify-center flex-1 gap-2">
            <button onClick={() => setEdit(true)}>
              <NotePencil
                className="hover:cursor-pointer hover:text-blue-400"
                size={25}
              />
            </button>
            <button>
              <Trash
                size={25}
                className="hover:cursor-pointer hover:text-red-500"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
