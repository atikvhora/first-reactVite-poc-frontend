import React from "react";
import { Route, Routes } from "react-router-dom";
import { Patient_Address_Add, Patient_List, Patient_Add } from "../components/CommonEnum";
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
                <Route path="/" element={<PatientList Patients={[]} />}></Route>
                <Route path={Patient_Add} element={<Patient />}></Route>
                <Route path={Patient_Address_Add} element={<Address />}></Route>
                <Route path={Patient_List} element={<PatientList Patients={[]} />}></Route>
            </Routes>
            <Footer />
        </React.Fragment>
    );
};