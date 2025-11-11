import React, { useEffect, useState } from "react";
import { DeletePatient } from "../../services/PatientService";
import withLoader from "../Common/Loader/LoaderHOC";
import Loader from "../Common/Loader/Loader";

const WithLoader = withLoader(Loader);

type props = {
  Id: number;
};

const PatientDeleteItem : React.FC<props> = (props) => {
    const [deleteLoading, setDeleteLoading] = useState(false)
    useEffect(() => {
    }, []);

    const deletePatient = (id: number) => { 
        setDeleteLoading(true);
        DeletePatient(id).then(() =>
            {
                setDeleteLoading(false);
            }
        );
    }
    return (
        <React.Fragment>
            {deleteLoading &&
                <WithLoader loading={deleteLoading} />
            }
            {!deleteLoading &&
                <button key={props.Id} onClick={() => deletePatient(props.Id)} >
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 0 L20 20 M20 0 L0 20" stroke="black" strokeWidth="4"/>
                    </svg>
                </button>
            }
        </React.Fragment>
    );
}
export default PatientDeleteItem;