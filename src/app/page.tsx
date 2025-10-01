"use client";

import { useEffect, useState } from "react";

import Card from "@/components/Card";
import { UsersType } from "@/context/interface";
import { addContact, checkEmail, getUsers } from "@/utils/handleRequests";

export default function Home() {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      const data: UsersType[] = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = (updatedUser: UsersType) => {
    setUsers((prev) =>
      prev.map((c) => (c.id === updatedUser.id ? updatedUser : c))
    );
  };

  const handleDeleteUser = (deletedUserID: string) => {
    setUsers((prev) => prev.filter((c) => c.id !== deletedUserID));
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid: boolean = await checkEmail(formData.email);
    if (isEmailValid) {
      console.log("Email já cadastrado");
      return;
    } else {
      const newContact = await addContact(formData);
      setUsers((prev) => [...prev, newContact]);
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <main className="min-h-screen max-w-5xl m-auto ">
      <div className=" mt-5 bg-white border border-gray-100 p-4 rounded-xl shadow">
        <form
          onSubmit={handleAddUser}
          noValidate
          className="w-full h-full items-center gap-3 flex justify-center"
        >
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            className="flex-1 px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="flex-1 px-3 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:cursor-pointer transition text-sm"
          >
            Enviar
          </button>
        </form>
        <div className="mt-5">
          <div className="flex items-center justify-between w-full h-full text-center">
            <h2 className="flex-1">Nome</h2>
            <h2 className="flex-1">Email</h2>
            <h2 className="flex-1">Editar</h2>
          </div>
          {users?.length > 0
            ? users.map((user: UsersType) => {
                return (
                  <Card
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    onUpdate={handleUpdateUser}
                    onDelete={handleDeleteUser}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </main>
  );
}
