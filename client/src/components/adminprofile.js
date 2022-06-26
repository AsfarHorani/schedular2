import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, Table } from 'react-bootstrap';
import './userprofile.css'
import { useParams } from "react-router-dom";
import AdminForm from "./AddUser/forms/admin";
import { Context } from '../context/context';


function Userprofile() {
    let { id } = useParams();
    const [admin, setadmin] = useState([]);
    const [edit, setEdit] = useState(false);
    const {token} = useContext(Context)
    useEffect(() => {
        async function fetch() {

            if (id) {
                axios.get('http://localhost:5000/getAdmin/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(resp => {
                    console.log(resp.data)
                    setadmin(resp.data.admin)

                }).catch(err => {
                    console.log(err)
                })
            }

        }
        fetch();
    }, [id])

    const deleteHandler = async () => {
        try {
            let resp = await axios.delete("http://localhost:5000/deleteAdmin/" + admin._id,
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


    let infoCard = null
    console.log(admin)
    if (admin) {
        infoCard = (<Card className="card-horizontal">
            <Card.Header as="h5">Admin Information</Card.Header>
            <Card.Body>
                <Card.Title>{admin.name}</Card.Title>
                <Card.Text>
                    username: {admin.username}
                </Card.Text>


                <Card.Text>
                    Email: {admin.email}
                </Card.Text>
                <Button onClick={() => setEdit(prev => !prev)} variant="secondary">Edit thisi user</Button>
                {/* deleteHandler */}
                <Button onClick={() => deleteHandler()} variant="danger">Delete this User</Button>



            </Card.Body>
        </Card>)
    }
    if (edit && admin) {
        infoCard = (<Card className="card-horizontal">
            <Card.Header as="h5">Admin Information</Card.Header>
            <Card.Body>
                <AdminForm edit={edit} admin={admin} />
                <Button onClick={() => setEdit(prev => !prev)} variant="primary">Edit his info</Button>
            </Card.Body>
        </Card>)
    }


    return (
        <div className="userprofile content">
            {infoCard}


        </div>
    )
}

export default Userprofile