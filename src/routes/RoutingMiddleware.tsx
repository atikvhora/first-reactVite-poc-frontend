import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Enums from "../components/CommonEnum";
import Patient from "../components/Patient/Patient.tsx";
import PatientList from "../components/Patient/PatientList.tsx";
import Address from "../components/Address/Address.tsx";
import { Applayout } from "../components/Layout/Applayout.tsx";
import { Dashboard } from "../components/Dashboard.tsx";
import ViewPatient from "../components/Patient/ViewPatient.tsx";
import Login from "../components/Authentication/Login.tsx";
import AppHeader from "../components/Common/AppHeader.tsx";

export const RoutingMiddleware: React.FC = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenlocal = localStorage.getItem("token");
    if (tokenlocal != null) {
      setToken(tokenlocal);
    } else {
      navigate("login");
    }
  }, []);

  return (
    <React.Fragment>
      {token && (
        <Applayout>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route
              path={Enums.Patient_Enum.Patient_Add}
              element={<Patient />}
            ></Route>
            <Route
              path={Enums.Patient_Enum.Patient_Address_Add}
              element={<Address />}
            ></Route>
            <Route
              path={Enums.Patient_Enum.Patient_List}
              element={<PatientList />}
            ></Route>
            <Route
              path={Enums.Common_Routes.home}
              element={<Dashboard />}
            ></Route>
            <Route
              path={Enums.Patient_Enum.Patient_View}
              element={<ViewPatient />}
            ></Route>
          </Routes>
          {/* <Footer /> */}
        </Applayout>
      )}
      {token == "" && (
        <React.Fragment>
          <AppHeader />
          <Routes>
            <Route path={"login"} element={<Login />}></Route>
          </Routes>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
