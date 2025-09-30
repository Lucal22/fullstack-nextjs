"use client";

import { useState } from "react";

import Card from "@/components/Card";

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  return (
    <main className="min-h-screen max-w-5xl m-auto ">
      <div className=" mt-5 bg-white border border-gray-100 p-4 rounded-xl shadow">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full items-center gap-3 flex justify-center"
        >
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
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
          <Card nome="Luís Carlos" email="lucal@gmail.com" />
          <Card nome="Luís Carlos" email="lucal@gmail.com" />
          <Card nome="Luís Carlos" email="lucal@gmail.com" />
        </div>
      </div>
    </main>
  );
}
