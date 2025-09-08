import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const GlobalContext = createContext();

const useGlobalState = () => useContext(GlobalContext);

const defaultTicketData = {
    name: "",
    email: "",
    phone: "",
    creatordepartment: "",
    category: '',
    market: '',
    store: '',
    ticketDescription: '',
    department: '',
    managerName: '',
    managerID: "",
    files: [],
    userId: "",
    priority: "Low",
    storeId: "",
    dm_name: "",
    dm_email: "",
    dm_phone: "",
    market_manager_name: "",
    market_manager_email: "",
    market_manager_phone: "",
    department_email: "",
    managerName_email: "",
    store_email: "",
    store_phone: "",
    store_detail: [],
    store_id: "",
    store_Tech_id: "",
    districtManager_id: "",
    marketManager_id: "",
    categoryId: "",
};


const GlobalStates = ({ children }) => {
    const [token, setToken] = useState("");
    const [id, setId] = useState("");
    const [currentUserData, setCurrentUserData] = useState({
        userData: {},
        name: "",
        email: "",
        phone: "",
        department: "",
        id: "",
        markets: "",
        store_name: ""
    });
    const [ticketData, setTicketData] = useState(defaultTicketData);
    const [formData, setFormData] = useState({
        bdi_id: '',
        dm_name: '',
        door_code: '',
        market: '',
        store_addres: '',
        store_name: '',
        stroe_email: '',
        store_phone: '',
        market: '',
        name: '',
        title: '',
        ntid: '',
        tmobile_email: '',
        company_email: '',
        contact_numbers: '',
    });
    const [mmdmformData, setMMDMFormData] = useState({
        market: '',
        name: '',
        title: '',
        ntid: '',
        tmobile_email: '',
        company_email: '',
        contact_numbers: '',
    });
    const [ccformData, setccFormData] = useState({
        username: '',
        password: '',
        name: '',
        website_url: '',
    });

    const [filterationsData, setFilterationsData] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const totalTickets = useRef(null);
    const [ticketErrors, setTicketErrors] = useState({});
    const reset = () => setTicketData(defaultTicketData)
    const contextValue = useMemo(() => ({
        token,
        id,
        currentUserData,
        setCurrentUserData,
        uploadFiles,
        setUploadFiles,
        ticketData,
        setTicketData,
        totalTickets,
        setTicketErrors,
        ticketErrors,
        formData,
        setFormData,
        errors,
        setErrors,
        mmdmformData,
        setMMDMFormData,
        ccformData,
        setccFormData,
        filterationsData,  
        setFilterationsData,
        reset,
    }), [token, id, currentUserData, mmdmformData,filterationsData, ccformData, uploadFiles, ticketData, ticketErrors, formData, errors]);

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalStates, useGlobalState };
