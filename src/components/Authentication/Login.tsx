import React, { useState } from 'react';
import Toaster from '../Common/Toaster';
import { useNavigate } from 'react-router-dom';
import { encryptData, LoginUser } from '../../services/AuthenticationService';

const Login = () => {
   const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  interface toastObj {
    Type : string,
    Message: string
  }
    const navigate = useNavigate();
    const [Toast, setShowToast] = useState<toastObj>({ Type : "", Message : ""});
    // const [loginMessage, setLoginMessage] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        LoginUser(formData)
        .then((response) => {
            console.log("login response", response);
            if(response.data.success == true) {
                setShowToast({Message: "Login Successful", Type: "success" });
                localStorage.setItem("token", encryptData(response.data.authToken));
                localStorage.setItem("role", encryptData(response.data.role));
                localStorage.setItem("user", encryptData(response.data.email));
                // navigate(Enums.Common_Routes.home);
            }
            else {
                setShowToast({ Message: "Login Failed, Please try again", Type: "failed" });
            }
        })
        .catch((err) => err.message)
        .finally(() => 
            setTimeout(() => {
                setShowToast({ Message: "", Type: "" })                
            }, 3000)
        );
    };

    return (
        <React.Fragment>
            <div className="max-h-lg mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
            {Toast.Message != '' && 
                <Toaster Message={Toast.Message} Type={Toast.Type} />
            }
            <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <input
                type="text"
                name="email"
                placeholder="Enter Email"
                className="input border w-full mb-4 p-2"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="password"
                placeholder="Enter Password"
                className="input border w-full mb-4 p-2"
                value={formData.password}
                onChange={handleChange}
                min="3"
                max="30"
                required
            />
            <button type="submit" className="bg-blue-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 w-full">
                Submit
            </button>
            </form>
            {/* {loginMessage &&
                <div className="mt-4 text-center text-green-600 font-semibold">
                    {loginMessage}
                </div>
            } */}
            </div>
        </React.Fragment>
    );
};
export default Login;