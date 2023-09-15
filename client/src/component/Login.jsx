
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid'; // Import UUID

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'authorization': '',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.token);


                // Create a new document with a UUID and redirect to the editor
                // localStorage.setItem('token', data.token);
                const newDocumentId = uuid(); // Generate a new UUID
                localStorage.setItem('uuid', newDocumentId);
                // console.log(newDocumentId, '\n');
                navigate(`/docs/${newDocumentId}`); // Redirect to the new document
            } else {
                // Handle login error
                const errorData = await response.json();
                console.error('Login error:', errorData.error);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <Typography variant="h5">Login</Typography>
            <form>
                <TextField
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;

















// import React, { useState } from 'react';
// import { TextField, Button, Typography, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';

// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({ username: '', password: '' });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleLogin = async () => {
//         try {
//             const response = await fetch('/api/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 localStorage.setItem('token', data.token);

//                 // Create a new document with a UUID and redirect to the editor
//                 const newDocumentId = uuid(); // Generate a new UUID
//                 navigate(`/docs/${newDocumentId}`); // Redirect to the new document
//             } else {
//                 // Handle login error
//                 const errorData = await response.json();
//                 console.error('Login error:', errorData.error);
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//         }
//     };






//     return (
//         <div>
//             <Typography variant="h5">Login</Typography>
//             <form>
//                 <TextField
//                     label="Username"
//                     variant="outlined"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                 />
//                 <Button variant="contained" onClick={handleLogin}>
//                     Login
//                 </Button>
//             </form>
//             <p>Don't have an account? <Link to="/register">Register</Link></p>
//         </div>
//     );
// };

// export default Login;




















    // const handleLogin = async () => {
    //     try {
    //         const response = await fetch('/api/users/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             // Store the JWT token in your application (e.g., using localStorage or state management) and handle successful login
    //             // Example: localStorage.setItem('token', data.token);
    //             localStorage.setItem('token', data.token);
    //             // history.push('/'); // Redirect to the main page or a protected route
    //             navigate('/');
    //         } else {
    //             // Handle login error, e.g., invalid credentials
    //             const errorData = await response.json();
    //             console.error('Login error:', errorData.error);
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //     }
    // };