import React from "react";
import { Route, Routes } from "react-router-dom";
import Enums from "../components/CommonEnum";
import Patient from "../components/Patient/Patient.tsx";
import PatientList from "../components/Patient/PatientList.tsx";
import Address from "../components/Address/Address.tsx";
import AppHeader from "../components/Common/AppHeader.tsx";
import Footer from "../components/Common/Footer.tsx";

export const RoutingMiddleware : React.FC = () => {

    return (
        <React.Fragment>
            <AppHeader />
            <Routes>
                <Route path="/" element={<PatientList />}></Route>
                <Route path={Enums.Patient_Enum.Patient_Add} element={<Patient />}></Route>
                <Route path={Enums.Patient_Enum.Patient_Address_Add} element={<Address />}></Route>
                <Route path={Enums.Patient_Enum.Patient_List} element={<PatientList />}></Route>
            </Routes>
            <Footer />
        </React.Fragment>
    );
};