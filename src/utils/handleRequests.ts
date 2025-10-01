import { CardType } from "@/context/interface";
import { api } from "../libs/api";

export async function checkEmail(email: string) {
  try {
    const response = await api.get("/checkEmail", { params: { email } });
    return response.data.exists;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getUsers() {
  try {
    const response = await api.get("/");
    const users = response.data;
    console.log(users);
    return users;
  } catch (e) {
    console.log(e);
  }
}

export async function addContact(data: CardType) {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function updateUser(id: string, data: CardType) {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
