import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator.jsx";

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();


        try {
            const res = await api.post(route, { username, password })
               
            if (method === "login" ) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");  
            } else {
                if (method === "register" && res.status === 201) {
                alert("Registration successful! Please log in.");
                navigate("/login");
            } else {
                alert("An unexpected error occurred. Please try again.");   
            }
            };

        } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>

        <input 
            type="text" 
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input 
            type="password" 
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        {loading && <LoadingIndicator />}
        <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Please wait..." : name}
        </button>

        </form>
}

export default Form
        