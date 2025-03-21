import axios from "axios";
import { Product } from "../model/product.model";

export async function getProducts(page: number, limit: number): Promise<Product[]> {
    console.log("getProducts: ", page, limit);
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
    return (response.data as { products: Product[] }).products;
}

export async function getProductsByCategory(page: number, limit: number, category: string): Promise<Product[]> {
    console.log("getProductsByCategory: ", page, limit, category);
    const response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${(page - 1) * limit}`);
    return (response.data as { products: Product[] }).products;
}

export async function getProduct(id: number): Promise<Product> {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data as Product;
}

export async function getProductCategories(): Promise<string[]> {
    const response = await axios.get(`https://dummyjson.com/products/category-list`);
    return response.data as string[];
}
