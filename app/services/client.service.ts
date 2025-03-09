import axios from "axios";
import { Client } from "../model/client.model";

export async function getClients(page: number, limit: number): Promise<Client[]> {
    const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`);
    return (response.data as { users: Client[] }).users;
}

export async function getClient(id: number): Promise<Client> {
    console.log("getClient " + id);
    const response = await axios.get(`https://dummyjson.com/users/${id}`);
    return response.data as Client;
}