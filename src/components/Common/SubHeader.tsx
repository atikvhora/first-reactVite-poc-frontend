import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Enums from "../CommonEnum";

export const SubHeader : React.FC = () => {
    const currentPath = useLocation();
    const [subHeaderName, setSubHeaderName] = useState("");

    useEffect(() => {
        setHeaderName();
    }, [currentPath]);

    const setHeaderName = () => {
        if(currentPath.pathname == Enums.Patient_Enum.Patient_Add) {
            setSubHeaderName("Add Patient");
        }
        if(currentPath.pathname == Enums.Patient_Enum.Patient_List) {
            setSubHeaderName("Patient List");
        }
    }

    return (
        <React.Fragment>
            <div className="max-h-100 p-4 bg-base-500">
                <div className="navbar bg-base-100 shadow-sm">
                    <a className="btn btn-ghost text-xl">{subHeaderName}</a>
                </div>
            </div>
        </React.Fragment>
    );
};