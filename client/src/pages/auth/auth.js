import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';
import Signin from './signin';


function Auth() {

    const [userType,setUserType] = useState(null);
    console.log(userType)
    return (<section className="auth h-100 gradient-form">
        <div className="px-2 py-1">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-11">
                    <div className=" rounded-3 text-black">
                        <div className="row card-row g-0">
                            <div className="col-lg-6">
                                <div className="card-body px-md-5  py-md-3 mx-md-4 my-md-4 my-3">
                                <h4 className="pb-2 font-weight-bold ">Please login to your account</h4>
                                    <h5>What you want to login as?</h5>
                                    <select onChange={(e) => setUserType(e.target.value)} className="form-select w-70 mb-4" aria-label="Default select example">
                                        <option selected className="font-weight-bold ">---Open this to select---</option>
                                        <option value="staff">Staff</option>
                                        <option value="student">Sudent</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <Signin type={userType}/>

                                </div>
                            </div>
                            <div className="col-lg-6 row d-flex align-items-center gradient-custom-2">

                                <div className="text-center">
                                    <img className="img" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" />
                                    <h2 className="mt-1 mb-5 pb-1">We are The Lotus Team</h2>
                                </div>
                                <div className="text-white px-3  p-md-5 mx-md-4">
                                    <h4 className="mb-4">We are more than just a company</h4>
                                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Auth