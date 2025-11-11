import React, { Fragment, useEffect, useState } from "react"
import { GetPatientDetail } from "../../services/PatientService";
import { useParams } from "react-router-dom";
import Loader from "../Common/Loader/Loader";

export default function ViewPatient() {
    const [patientData, setPatientData] = useState(null)
    const [loading, setLoading] = useState(false)

    const params = useParams<{ id : any }>();

    useEffect(() => {
        setLoading(true);
        GetPatientDetail(params.id).then((res) => {
            if(res.statusCode != 404) {
                setPatientData(res.data);
            }
        }).catch((exc) => {
            console.log("catch", exc);
            alert(exc.message);
        }).finally (() => {
            setLoading(false);
        });
    }, []);

    console.log("patientdata",params ,patientData);
    return (
        <React.Fragment>
            {patientData && !loading &&
                <div className="max-h-lg mx-auto p-6 bg-base-200">
                <ul className="list bg-base-100 rounded-box shadow-md">
                    <li className="list-row">
                        <div><img className="size-10 rounded-box" src="/favicon.ico" alt="Profile Image"/></div>
                        <div>
                            <div className="font-bold">{patientData.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">({patientData.username})</div>
                        </div>
                        <p className="list-col-wrap text-xs">
                            <span className="font-bold">Address: </span>
                            {patientData.address?.address1 + '' + patientData.address?.city + ', ' + patientData.address?.country + ', ' + patientData.address?.pincode}
                            <br />
                            <span className="font-bold">Phone: </span>
                            {patientData.phone}
                            <br />
                            <span className="font-bold">Gender: </span>
                            {patientData.gender}
                        </p>
                    </li>
                    </ul>
                </div>
            }
            {loading && 
                <Fragment>
                    <div className="max-h-lg mx-auto p-6 bg-base-200 text-center">
                        <Loader />
                    </div>
                </Fragment>
            }
            {!patientData && loading == false &&
                <Fragment>
                    <div className="text-center font-bold">No Data Found</div>
                </Fragment>
            }
        </React.Fragment>
    )
}