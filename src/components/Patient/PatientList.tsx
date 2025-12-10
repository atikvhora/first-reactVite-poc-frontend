import React, { Fragment, useEffect, useState } from "react";
import { GetPatientData } from "../../services/PatientService";
import type { PatientData } from "../../services/PatientService";
import withLoader from "../Common/Loader/LoaderHOC";
import Loader from "../Common/Loader/Loader";
import PatientDeleteItem from "./PatientDeleteItem";
import { generatePath, Link } from "react-router-dom";
import Enums from "../CommonEnum";
import { trace } from "@opentelemetry/api";
import { CerboseCheckPermission, decryptData } from "../../services/AuthenticationService";

const WithLoader = withLoader(Loader);
const tracer = trace.getTracer("frontend-patient-list");

const PatientList = () => {
  const [loading, setLoading] = React.useState(true);
  const [patientData, setPatientList] = useState<PatientData[]>([]);
  const [addPatientAllowed, setPatientAddAllowed] = useState(false);
  useEffect(() => {
    getPatientData();

    let CurrentRole = decryptData(localStorage.getItem("role") ?? "");
    let user = decryptData(localStorage.getItem("user") ?? "");
    const principal = {
      id: user, // user ID
      roles: [CurrentRole], // user roles
    };
    const resource = {
      kind: "patient", // must match your policy: resource
      id: "1", // resource id
      attr: {
        owner: user,
      },
    };
    const createPatientAllowed = CerboseCheckPermission({
      principal: principal,
      resource: resource,
      actions: [],
      action: "create",
    });
    createPatientAllowed.then((res) => {
      setPatientAddAllowed(res);
    });
  }, []);

  const getPatientData = () => {
    return tracer.startActiveSpan("get_patient_list", async (span) => {
      try {
        GetPatientData()
          .then((data) => {
            span.addEvent("patient_data_received", {
              size: JSON.stringify(data).length,
            });
            setPatientList(data);
            setLoading(false);
          })
          .catch((exc) => {
            setLoading(false);
            console.log("catch", exc);
          });
      } catch (err: any) {
        span.recordException(err);
        span.setStatus({ code: 2, message: err.message ?? "error" }); // 2 = ERROR
        throw err;
      } finally {
        span.end();
      }
    });
  };
  
  return (
    <React.Fragment>
      {addPatientAllowed && (
        <div className="mb-4 flex-end text-right w-full">
          <Link
            to={Enums.Patient_Enum.Patient_Add}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 p-5"
          >
            + Add Patient
          </Link>
        </div>
      )}
      {/* <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"> */}
      {/* <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"> */}
      <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-100 p-4">
        {loading && <WithLoader loading={loading} />}
        {!loading && (
          <Fragment>
            <table className="table table-zebra table-bordered table-fixed w-full">
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
                  {patientData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>
                      <td>{item.phone}</td>
                      {item.address && (
                        <td>
                          {item.address.address1 +
                            ", " +
                            item.address.city +
                            ", " +
                            item.address.country +
                            ", " +
                            item.address.pincode}
                        </td>
                      )}
                      <td
                        key={item.id}
                        className="flex justify-center items-center text-center"
                      >
                        <React.Fragment>
                          <Link
                            className="pr-2"
                            key={item.id}
                            to={generatePath(Enums.Patient_Enum.Patient_View, {
                              id: item.id.toString(),
                            })}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </Link>
                          <PatientDeleteItem Id={item.id} />
                        </React.Fragment>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              </tbody>
            </table>
          </Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default PatientList;
