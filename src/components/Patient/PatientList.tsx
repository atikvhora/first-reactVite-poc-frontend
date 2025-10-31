import React, { useEffect, useState } from "react";
import { GetPatientData, DeletePatient } from "../../services/PatientService";
import type { PatientData } from "../../services/PatientService";

const PatientList = () => {
    const [patientData, setPatientList] = useState<PatientData[]>([]);
    useEffect(() => {
        getPatientData();
    }, []);


    const getPatientData = () => {
        GetPatientData().then((data) => 
        {
            setPatientList(data);
        });
    }
    const deletePatient = (id: number) => { 
        DeletePatient(id).then(() =>
            {
                getPatientData();
            }
        );
    }
    console.log("patiendata", patientData);
    return (
        <React.Fragment>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <React.Fragment>
                        {patientData.map((item) => 
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>{item.phone}</td>
                                <td></td>
                                <td>{
                                    <button className="tooltip" data-tip="Delete" onClick={() => deletePatient(item.id)} >
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <path d="M0 0 L20 20 M20 0 L0 20" stroke="black" stroke-width="4"/>
                                        </svg>
                                    </button>
                                    }</td>
                            </tr>
                        )}
                    </React.Fragment>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}
export default PatientList;