import React, { useEffect, useState } from "react";
import { GetPatientData } from "../../services/PatientService";
import type { PatientData } from "../../services/PatientService";

const PatientList = () => {
    const [patientData, setPatientList] = useState<PatientData[]>([]);
    useEffect(() => {
        GetPatientData().then((data) => 
        {
            setPatientList(data);
        });
    }, []);
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