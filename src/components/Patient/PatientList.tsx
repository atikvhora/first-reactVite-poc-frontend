import React from "react";

interface Props {
    Patients: string[]
}

const PatientList : React.FC<Props> = ({ Patients }) => {
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
                        <tr>
                            <td>testtest</td>
                            <td>Quality Control Specialist</td>
                            <td>Male</td>
                            <td>849949</td>
                            <td>a, test</td>
                        </tr>
                    </React.Fragment>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}
export default PatientList;