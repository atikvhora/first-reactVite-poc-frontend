import React, { useState } from 'react';
import { AddPatient } from "../../services/PatientService";
import Toaster from '../Common/Toaster';
import { useNavigate } from 'react-router-dom';
import { Patient_List } from '../CommonEnum';

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
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("patient submit", formData)
        AddPatient(formData)
        .then((response) => {
            if(response.id > 0) {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                navigate(Patient_List);
            }
        })
        .catch((err) => err.message)
        .finally(() => false);
    };

    return (
        <React.Fragment>
            {showToast && 
                <Toaster Message='Patient Added Successfully' Type='success' />
            }
            <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Add Patient</h2>

            <label className="label">
                <span className="label-text">Patient Name</span>
            </label>
            <input
                type="text"
                name="name"
                placeholder="Enter patient name"
                className="input input-bordered w-full mb-4"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <label className="label">
                <span className="label-text">Username</span>
            </label>
            <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="input input-bordered w-full mb-4"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <label className="label">
                <span className="label-text">Email</span>
            </label>
            <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="input input-bordered w-full mb-4"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <label className="label">
                <span className="label-text">Gender</span>
            </label>
            <select
                name="gender"
                className="select select-bordered w-full mb-4"
                value={formData.gender}
                onChange={handleChange}
                required
            >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label className="label">
                <span className="label-text">Phone</span>
            </label>
            <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                className="input input-bordered w-full mb-6"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <label className="label">
                <span className="label-text">Address</span>
            </label>
            <input
                type="text"
                name="address1"
                placeholder="Enter address"
                className="input input-bordered w-full mb-4"
                value={formData.address1}
                onChange={handleChange}
                required
            />
            <label className="label">
                <span className="label-text">City</span>
            </label>
            <input
                type="text"
                name="city"
                placeholder="Enter city"
                className="input input-bordered w-full mb-4"
                value={formData.city}
                onChange={handleChange}
                required
            />
            <label className="label">
                <span className="label-text">Pin Code</span>
            </label>
            <input
                type="text"
                name="pincode"
                placeholder="Enter pin code"
                className="input input-bordered w-full mb-4"
                value={formData.pincode}
                onChange={handleChange}
                required
            />

            <label className="label">
                <span className="label-text">Country</span>
            </label>
            <input
                type="text"
                name="country"
                placeholder="Enter country"
                className="input input-bordered w-full mb-6"
                value={formData.country}
                onChange={handleChange}
                required
            />
            <button type="submit" className="btn btn-primary w-full">
                Submit
            </button>
            </form>
        </React.Fragment>
    );
};
export default Patient;