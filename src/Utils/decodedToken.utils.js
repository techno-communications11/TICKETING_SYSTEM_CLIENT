import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const getToken = () => Cookies.get('token');
export const decodeToken = () => {
    const token = getToken();
    return token ? jwtDecode(Cookies.get('token')) : null;

};