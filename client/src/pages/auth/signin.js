import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from '../../context/context';

function Signin({ type }) {

    const { adminSigninHandler, studnetSigninHandler, isAuth, loading, authError } = useContext(Context)

    useEffect(() => {
        console.log("rendering...")
    }, [])
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
            email: yup.string().email("Please enter a vaid email").required("Required")
        }),
        onSubmit: (values) => {
            console.log(values)
            if (type === "admin") {
                adminSigninHandler({ email: values.email, password: values.password })
            } else if (type === "student") {

                studnetSigninHandler({ email: values.email, password: values.password })
            }
            else if (type === "staff") {
                console.log(values)
            }
        }

    }

    )



    return (
        <form onSubmit={formik.handleSubmit}>


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

            </div>

            <div className="text-center pt-1 mb-5 pb-1">
                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" key="submit" type="submit">Signin</button>
                <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex align-items-center justify-content-center pb-4">
                <p className="mb-0 me-2">Don't have an account?</p>
                <button type="button" className="btn btn-outline-danger">Create new</button>
            </div>

        </form>
    )
}

export default Signin