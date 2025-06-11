import axios from "axios";

export const login = async (email :string, password :string) => {
    try {   
        const response = await axios.post("http://localhost:3000/login", {
            email,
            password
        },
        {
            withCredentials: true
        });

        if(response.status === 200) {
            location.href = "/";
        };
        
    } catch (error) {
        throw error;
    };
};