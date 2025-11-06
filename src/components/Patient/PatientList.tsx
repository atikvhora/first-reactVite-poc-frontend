import React, { Fragment, useEffect, useState } from "react";
import { GetPatientData } from "../../services/PatientService";
import type { PatientData } from "../../services/PatientService";
import withLoader from "../Common/Loader/LoaderHOC";
import Loader from "../Common/Loader/Loader";
import PatientDeleteItem from "./PatientDeleteItem";
import { Link } from "react-router-dom";
import Enums from "../CommonEnum";

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
                    {/* Add Button */}
      <div className="mb-4 flex-end text-right w-full">
        <Link to={Enums.Patient_Enum.Patient_Add} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 p-5">+ Add Patient</Link>
      </div>
            {/* <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"> */}
            {/* <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"> */}
            <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-100 p-4">
                {loading &&
                    <WithLoader loading={loading} />
                }
                {!loading &&
                <Fragment>
                    <table className="table table-zebra table-bordered w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <React.Fragment>
                                {patientData.map((item) => 
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address.address1 + ", " + item.address.city + ", " + item.address.country + ", " + item.address.pincode}</td>
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
                </Fragment>
                }
            </div>
        </React.Fragment>
    );
}
export default PatientList;