import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student", // Default role set to 'student'
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        // Input validation
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (data.password.length < 8) {
            setError("Password must be at least 8 characters long!");
            return;
        }

        if (!data.role) {
            setError("Please select a role!");
            return;
        }
        console.log(data);
        try {
            const response = await axios.post('http://localhost:5002/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role,
            });
                console.log(response);
            // Assuming the backend response has a success property
            if (response.data.success) {
                toast.success('User registered successfully');
                setData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "student",
                });
                navigate('/login');
            } else {
                // Handle any error messages sent by the backend
                toast.error(response.data.error || 'Registration failed');
            }
        } catch (error) {
            setError("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div>
            <form onSubmit={registerUser}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={data.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />

                <label htmlFor="password">Password</label>
                <div>
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {passwordVisible ? "🙈" : "👁️"}
                    </button>
                </div>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <div>
                    <input
                        id="confirmPassword"
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Confirm password"
                        value={data.confirmPassword}
                        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                        required
                    />
                    <button type="button" onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordVisible ? "🙈" : "👁️"}
                    </button>
                </div>

                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    required
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
