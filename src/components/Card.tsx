"use client";

import { CardProps } from "@/context/interface";
import { checkEmail, deleteUser, updateUser } from "@/utils/handleRequests";
import { FloppyDisk, NotePencil, Trash, X } from "@phosphor-icons/react";
import { useState } from "react";

export default function Card({
  id,
  name,
  email,
  onUpdate,
  onDelete,
}: CardProps) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: name,
    email: email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      console.log("Preencha todos os campos!");
      return;
    } else if (formData.email != email) {
      const isEmailValid: boolean = await checkEmail(formData.email);
      if (isEmailValid) {
        console.log("Email já cadastrado");
        return;
      }
    }
    const newContact = await updateUser(id, formData);
    setEdit(false);
    onUpdate(newContact);
    return;
  };

  const handleDelete = async () => {
    await deleteUser(id);
    onDelete(id);
  };

  return (
    <div className="w-full border-t-1 border-gray-100 h-10">
      <div></div>
      {edit ? (
        <>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex items-center justify-between w-full h-full gap-2"
          >
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={formData.name}
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
              <button type="button" onClick={() => setEdit(false)}>
                <X className="hover:cursor-pointer" size={25} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center gap-2 justify-between w-full h-full text-center">
          <p className="flex-1 px-3 ">{name}</p>
          <p className="flex-1 px-3 ">{email}</p>
          <div className="flex items-center justify-center flex-1 gap-2">
            <button type="button" onClick={() => setEdit(true)}>
              <NotePencil
                className="hover:cursor-pointer hover:text-blue-400"
                size={25}
              />
            </button>
            <button type="button" onClick={handleDelete}>
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
