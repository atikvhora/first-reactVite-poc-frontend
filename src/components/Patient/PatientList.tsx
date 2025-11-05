import React, { useEffect, useState } from "react";
import { GetPatientData, DeletePatient } from "../../services/PatientService";
import type { PatientData } from "../../services/PatientService";
import withLoader from "../Common/Loader/LoaderHOC";
import Loader from "../Common/Loader/Loader";
import PatientDeleteItem from "./PatientDeleteItem";

const WithLoader = withLoader(Loader);

const PatientList = () => {
    const [loading, setLoading] = React.useState(true)
    const [patientData, setPatientList] = useState<PatientData[]>([]);
    useEffect(() => {
        getPatientData();
    }, []);


    const getPatientData = () => {
        GetPatientData().then((data) => 
        {
            setPatientList(data);
            setLoading(false);
        });
    }
    console.log("patiendata", patientData);
    return (
        <React.Fragment>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                {loading &&
                    <WithLoader loading={loading} />
                }
                {!loading &&
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
                                    <td key={item.id} className="text-center">
                                        <React.Fragment>
                                            <PatientDeleteItem Id={item.id} />
                                        </React.Fragment>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                        </tbody>
                    </table>
                }
            </div>
        </React.Fragment>
    );
}
export default PatientList;