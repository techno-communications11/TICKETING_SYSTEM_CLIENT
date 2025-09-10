import Cookies from "js-cookie";

export const isAuthenticated = () => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    return !!(token && id);
};