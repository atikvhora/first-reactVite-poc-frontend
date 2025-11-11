import React from "react";
import { Route, Routes } from "react-router-dom";
import Enums from "../components/CommonEnum";
import Patient from "../components/Patient/Patient.tsx";
import PatientList from "../components/Patient/PatientList.tsx";
import Address from "../components/Address/Address.tsx";
import { Applayout } from "../components/Layout/Applayout.tsx";
import { Dashboard } from "../components/Dashboard.tsx";
import ViewPatient from "../components/Patient/ViewPatient.tsx";

export const RoutingMiddleware : React.FC = () => {

    return (
        <React.Fragment>
            <Applayout>
                {/* <AppHeader /> */}
                {/* <SubHeader /> */}
                    <Routes>
                        <Route path="/" element={<PatientList />}></Route>
                        <Route path={Enums.Patient_Enum.Patient_Add} element={<Patient />}></Route>
                        <Route path={Enums.Patient_Enum.Patient_Address_Add} element={<Address />}></Route>
                        <Route path={Enums.Patient_Enum.Patient_List} element={<PatientList />}></Route>
                        <Route path={Enums.Common_Routes.home} element={<Dashboard />}></Route>
                        <Route path={Enums.Patient_Enum.Patient_View} element={<ViewPatient id={0} />}></Route>
                    </Routes>
                {/* <Footer /> */}
            </Applayout>
        </React.Fragment>
    );
};