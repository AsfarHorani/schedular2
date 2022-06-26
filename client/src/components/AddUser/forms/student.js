import React, { useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { Context } from '../../../context/context';

function Student({ edit, student }) {
    const { token } = useContext(Context);
    const formik = useFormik({
        initialValues: {

            name: student ? student.name : "",
            email: student ? student.email : "",
            depart: student ? student.depart : "",
            rollNo: student ? student.rollNo : 0,
            password: null,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().max(30, "Must be 15 charaters or less").min(3, "Name must have atleast 3 characters").required("Required"),
            password: yup.string(),
            email: yup.string().email("Please enter a vaid email").required("Required"),
            depart: yup.string().max(20, "Must be 15 charaters or less").min(3, "Name must have atleast 3 characters").required("Required"),
            rollNo: yup.number().required()

        }),
        onSubmit: (values) => {

            console.log(values)
            const body = {
                name: values.name,
                email: values.email,
                password: values.password,
                depart: values.depart,
                rollNo: values.rollNo

            }

            console.log(body)
            async function postReq() {
                try {
                    let resp = await axios.post("http://localhost:5000/student-signup", body,
                        {
                            headers: {
                                Authorization: 'Bearer ' + token
                            }
                        });
                    console.log(resp.data);
                } catch (err) {
                    console.log(err)
                }
            }
            async function putReq() {
                try {
                    let resp = await axios.put("http://localhost:5000/editStudent/" + student._id, body,
                        {
                            headers: {
                                Authorization: 'Bearer ' + token
                            }
                        });
                    console.log(resp.data);
                } catch (err) {
                    console.log(err)
                }
            }

            if (edit) {
                putReq();
            }
            else {
                postReq();
            }



        }

    }

    )





    return (

        // for teacher
        <form onSubmit={formik.handleSubmit}>
            <h4 className="pb-2">Add Student</h4>

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
                <input type="text" id="depart" className="form-control"
                    placeholder="Department"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.depart} />
                {formik.touched.depart && formik.errors.depart ? <p className='text-danger'>*{formik.errors.depart} </p> : null}

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
                <input type="password" id="password" className="form-control" placeholder='Password'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? <p className='text-danger'>*{formik.errors.password} </p> : null}
                <p>Update password only if u want to change it otherwise ignore it</p>

            </div>
            <div className="form-outline mb-4">
                <input type="text" id="rollNo" className="form-control" placeholder='RollNo'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.rollNo} />
                {formik.touched.rollNo && formik.errors.rollNo ? <p className='text-danger'>*{formik.errors.rollNo} </p> : null}

            </div>
            <div className="text-center pt-1  pb-1">
                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Add</button>

            </div>



        </form>



    )
}

export default Student