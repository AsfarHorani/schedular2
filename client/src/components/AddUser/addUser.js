import React,{useState} from 'react'
import AdminForm from "./forms/admin";
import StudentForm from "./forms/student";
import StaffForm from "./forms/staff";
function AddUser() {

    const [userSelected, setuserSelected] = useState("");
   let formelement= null;
    if(userSelected==="staff"){
      formelement = (<StaffForm edit={false} staff={null}/>)
   }else if(userSelected==="student"){
    formelement = (<StudentForm/>)
 }else if(userSelected==="admin"){
    formelement = (<AdminForm/>)
 }


    return (
        <div className="content col-lg-6">
            <div className="card-body px-md-5  py-md-3 mx-md-4 my-md-4 my-3">
                <h4 className="pb-2 font-weight-bold ">Add new users</h4>
                <h5>Who you want to add?</h5>
                <select onChange={(e) => setuserSelected(e.target.value)} className="form-select w-70 mb-4" aria-label="Default select example">
                    <option selected className="font-weight-bold ">---Open this to select---</option>
                    <option value="staff">Staff</option>
                    <option value="student">Sudent</option>
                    <option value="admin">Admin</option>
                </select>
                {formelement}

            </div>
        </div>
    )
}

export default AddUser