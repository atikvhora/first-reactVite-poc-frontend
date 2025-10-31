import React from "react";

type props = {
  Message: string;
  Type : string
};

const Toaster : React.FC<props> = ({Message, Type}) => {
    console.log("toaster", Message, Type);
    return (
        <React.Fragment>
            <div className="toast toast-center">
                
                {(Type == "success") &&
                    <div className="alert alert-success">
                        <span>{Message}</span>
                    </div>
                }
                {(Type == "failed") &&
                    <div className="alert alert-error">
                        <span>{Message}</span>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}
export default Toaster;