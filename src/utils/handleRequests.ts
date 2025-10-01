import { CardType } from "@/context/interface";
import { api } from "../libs/api";

export async function checkEmail(email: string) {
  try {
    const response = await api.get("/", { params: { email } });
    return response.data.exists;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getContacts() {
  try {
    const response = await api.get("/");
    const users = response.data;
    return users;
  } catch (e) {
    console.log(e);
  }
}

export async function addContact(data: CardType) {
  try {
    await api.post("/", {
      name: data.nome,
      email: data.email,
    });
    return getContacts();
  } catch (e) {
    console.error(e);
    return getContacts();
  }
}

export async function updateContact(id: string, data: CardType) {
  try {
    await api.put(`/${id}`, data);
    return getContacts();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteContact(id: string) {
  try {
    await api.delete(`/${id}`);
    return getContacts();
  } catch (e) {
    console.error(e);
    return null;
  }
}
