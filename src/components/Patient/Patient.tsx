import React, { useState } from 'react';
import { AddPatient } from "../../services/PatientService";
import Toaster from '../Common/Toaster';
import { useNavigate } from 'react-router-dom';
import Enums from '../CommonEnum';

const Patient = () => {
   const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    phone: "",
    address1: "",
    city: "",
    pincode: "",
    country: "",
  });

  interface toastObj {
    Type : string,
    Message: string
  }
    const [Toast, setShowToast] = useState<toastObj>({ Type : "", Message : ""});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("patient submit", formData)
        AddPatient(formData)
        .then((response) => {
            if(response.id > 0) {
                setShowToast( {Message : Enums.CommonMessage_Enum.Patient_Added_Message, Type: Enums.StatusTypes.Success });
                setTimeout(() => setShowToast({Message : "", Type: "" }), 3000);
                // navigate(Enums.Patient_Enum.Patient_List);
            }
        })
        .catch((err) => err.message)
        .finally(() => false);
    };

    return (
        <React.Fragment>
            <div className="max-h-lg mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
            {Toast.Message != '' && 
                <Toaster Message={Toast.Message} Type={Toast.Type} />
            }
            <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Add Patient</h2>
            <input
                type="text"
                name="name"
                placeholder="Enter patient name"
                className="input border w-full mb-4 p-2"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="input border w-full mb-4 p-2"
                value={formData.username}
                onChange={handleChange}
                min="3"
                max="30"
                title="Only letters, numbers or dash"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="input border w-full mb-4 p-2"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <select
                name="gender"
                className="select border w-full mb-4 p-2"
                value={formData.gender}
                onChange={handleChange}
                required
            >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                className="input border w-full mb-4 p-2"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="address1"
                placeholder="Enter address"
                className="input border w-full mb-4 p-2"
                value={formData.address1}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="city"
                placeholder="Enter city"
                className="input border w-full mb-4 p-2"
                value={formData.city}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="pincode"
                placeholder="Enter pin code"
                className="input border w-full mb-4 p-2"
                value={formData.pincode}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="country"
                placeholder="Enter country"
                className="input border w-full mb-4 p-2"
                value={formData.country}
                onChange={handleChange}
                required
            />
            <button type="submit" className="bg-blue-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 w-full">
                Submit
            </button>
            </form>
            </div>
        </React.Fragment>
    );
};
export default Patient;