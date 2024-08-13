import { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/auth/login', {
                email: data.email,
                password: data.password
            });

            if (response.data.success) {
                toast.success('Login successful');
                navigate('/');
            } else {
                toast.error(response.data.error || 'Login failed');
            }
        } catch (error) {
            setError("Login failed. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
