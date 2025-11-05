class Enums {
    static Patient_Enum = class {
        static readonly Patient_Add = "/patient/add";
        static readonly Patient_Address_Add = "/patient/address/add";
        static readonly Patient_List = "/patient/list";
    }
    static CommonMessage_Enum = class {
        static readonly Patient_Added_Message = "Patient Added Successfully";
    }
    static StatusTypes = class {
        static readonly Success = "success";
    }
}
export default Enums;