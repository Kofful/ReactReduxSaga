import {baseUrl} from "./baseUrl";
import axios from "axios";

export const getAllUsers = () => axios.get(baseUrl + "users");
export const getUserById = (id) => axios.get(baseUrl + "users/" + id);
export const deleteUserById = (id) => axios.delete(baseUrl + "users/" + id);
export const login = (data) => axios.post(baseUrl + "login", {...data});
export const registration = (createAccountData) =>
    axios.post(baseUrl + "register", createAccountData);

export const getAllProjects = () => axios.get(baseUrl + "projects");
export const getProjectById = (id) => axios.get(baseUrl + "projects/" + id);