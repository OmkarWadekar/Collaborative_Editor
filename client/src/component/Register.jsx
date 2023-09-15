import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    // const history = useHistory();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                // Registration successful, you can handle it accordingly
                // history.push('/login'); // Redirect to the login page after successful registration
                navigate('/login');// Redirect to the login page after successful registration
            } else {
                // Handle registration error, e.g., username already taken
                const errorData = await response.json();
                console.error("Registration error:", errorData.error);
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };


    return (
        <div>
            <Typography variant="h5">Register</Typography>
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
                <Button variant="contained" onClick={handleRegister}>
                    Register
                </Button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Register;



// const response = await axios.post('http://localhost:9000/api/users/register', formData, {
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     // console.log("in post method "),
// });






// import { useState } from 'react';
// import { TextField, Button, Typography } from '@mui/material';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleRegister = () => {
//         // Send registration data to the server
//         // You can use the fetch API or axios to make a POST request
//     };

//     return (
//         <div>
//             <Typography variant="h5">Register</Typography>
//             <form>
//                 <TextField
//                     label="Username"
//                     variant="outlined"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Button variant="contained" onClick={handleRegister}>
//                     Register
//                 </Button>
//             </form>
//         </div>
//     );
// };

// export default Register;


// // import React from 'react'

// // const Register = () => {
// //     return (
// //         <div>

// //         </div>
// //     )
// // }

// // export default Register
