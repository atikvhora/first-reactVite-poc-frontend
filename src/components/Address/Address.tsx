import React, { useState } from "react";

const Address = () => {
    const [form, setForm] = useState({
    patient: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <React.Fragment>
        <form
        className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}
        >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Patient Address</h2>

        <label className="label">
            <span className="label-text">Select Patient</span>
        </label>
        <select
            name="patient"
            className="select select-bordered w-full mb-4"
            value={form.patient}
            onChange={handleChange}
            required
        >
            <option value="" disabled>
            Choose a patient
            </option>
            <option value="patient1">Patient 1</option>
            <option value="patient2">Patient 2</option>
            <option value="patient3">Patient 3</option>
        </select>

        <label className="label">
            <span className="label-text">Address</span>
        </label>
        <input
            type="text"
            name="address"
            placeholder="Enter address"
            className="input input-bordered w-full mb-4"
            value={form.address}
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
            value={form.city}
            onChange={handleChange}
            required
        />

        <label className="label">
            <span className="label-text">Pin Code</span>
        </label>
        <input
            type="text"
            name="pinCode"
            placeholder="Enter pin code"
            className="input input-bordered w-full mb-4"
            value={form.pinCode}
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
            value={form.country}
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
export default Address;