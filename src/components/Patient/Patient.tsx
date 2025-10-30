import React, { useState } from 'react';
import { AddPatient } from "../../services/PatientService";

const Patient = () => {
   const [formData, setFormData] = useState({
    patientName: "",
    username: "",
    email: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("patient submit", Patient)
    AddPatient()
    .then(Patient)
    .catch((err) => err.message)
    .finally(() => false);
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <React.Fragment>
        <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Add Patient</h2>

        <label className="label">
            <span className="label-text">Patient Name</span>
        </label>
        <input
            type="text"
            name="patientName"
            placeholder="Enter patient name"
            className="input input-bordered w-full mb-4"
            value={formData.patientName}
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

        <button type="submit" className="btn btn-primary w-full">
            Submit
        </button>
        </form>
    </React.Fragment>
  );
};
export default Patient;