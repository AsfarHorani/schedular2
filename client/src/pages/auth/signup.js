import React, { useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { Context } from '../../context/context';
import { Link, useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            username: "",
            adminId: "",
            password: "",

        },
        validationSchema: yup.object({
            name: yup.string().max(30, "Must be 15 charaters or less").min(3, "Name must have atleast 3 characters").required("Required"),
            username: yup.string().max(12, "Username must be between 10 and 5 characters").min(5, "Username must be between 10 and 5 characters").required("Required"),
            password: yup.string().required("password cannot be empty").min(8, "password must be of min 8 char"),
            email: yup.string().email("Please enter a vaid email").required("Required"),
            adminId: yup.number()

        }),
        onSubmit: (values) => {

            const body = {
                name: values.name,
                email: values.email,
                username: values.username,
                password: values.password,
                userId: values.adminId
            }
            async function postReq() {
                try {
                    let resp = await axios.post("http://localhost:5000/admin-signup", body);
                    console.log(resp.data);
                    navigate("/signin");

                } catch (err) {
                    console.log(err)
                }
            }


            postReq();







        }

    }

    )





    return (
        <section className="auth h-100 gradient-form">
            <div className="px-2 py-1">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-11">
                        <div className=" rounded-3 text-black">
                            <div className="row card-row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body px-md-5  py-md-3 mx-md-4 my-md-4 my-3">
                                        <h4 className="pb-2 font-weight-bold ">Please Sign to your account</h4>
                                       <form onSubmit={formik.handleSubmit}>
                                            <h4 className="pb-2">Add Admin</h4>

                                            <div className="form-outline mb-4">
                                                <input type="text"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.name} />
                                                {formik.touched.name && formik.errors.name ? <p className='text-danger'>*{formik.errors.name} </p> : null}



                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="adminId" className="form-control"
                                                    placeholder="adminId"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.adminId} />
                                                {formik.touched.adminId && formik.errors.adminId ? <p className='text-danger'>*{formik.errors.adminId} </p> : null}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="email" className="form-control"
                                                    placeholder="Email address"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email} />
                                                {formik.touched.email && formik.errors.email ? <p className='text-danger'>*{formik.errors.email} </p> : null}

                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="username" className="form-control"
                                                    placeholder="Username"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.username} />
                                                {formik.touched.username && formik.errors.username ? <p className='text-danger'>*{formik.errors.username} </p> : null}
                                            </div>


                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" className="form-control" placeholder='Password'
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.password} />
                                                {formik.touched.password && formik.errors.password ? <p className='text-danger'>*{formik.errors.password} </p> : null}

                                            </div>

                                            <div className="text-center pt-1  pb-1">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Add</button>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                <p className="mb-0 me-2">Already have an account?</p>
                <Link type="button" to="/signin" className="btn btn-outline-danger">Create new Admin if have no one(You can remove this option later)</Link>
            </div>


                                        </form>


                                    </div>
                                </div>
                                <div className="col-lg-6 row d-flex align-items-center gradient-custom-2">

                                    <div className="text-center">
                                        <img className="img" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" />
                                        <h2 className="mt-1 mb-5 pb-1">University meeting schedular</h2>
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

export default Admin