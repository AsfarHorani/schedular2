import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Table } from 'react-bootstrap';
import './userprofile.css'
import { useParams } from "react-router-dom";
function Userprofile() {
    let { id } = useParams();
    const [staff, setStaff] = useState([]);
    useEffect(() => {
        async function fetch() {

            if (id) {
                console.log(id)
                axios.get('http://localhost:5000/getStaff/' + id).then(resp => {

                    setStaff(resp.data.staff)


                }).catch(err => {
                    console.log(err)
                })
            }

        }
        fetch();
    }, [id])
    console.log(staff.timetable)

    let monrows = null
    let tuerows = null
    let wedrows = null;
    let thurows = null;
    let frirows = null;
    if (staff.timetable) {
        monrows = staff.timetable.monday.map(e => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })

        tuerows = staff.timetable.tuesday.map(e => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })

        wedrows = staff.timetable.wednesday.map(e => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })

        thurows = staff.timetable.thursday.map(e => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })


        frirows = staff.timetable.friday.map(e => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })






    }

    return (
        <div className="userprofile content">
            <Card className="card-horizontal">
                <Card.Header as="h5">Staff Information</Card.Header>
                <Card.Body>
                    <Card.Title>{staff.name}</Card.Title>
                    <Card.Text>
                        Id: {staff.userId}
                    </Card.Text>
                    <Card.Text>
                        Username: {staff.username}
                    </Card.Text>
                    <Card.Text>
                        Qualification : {staff.qualification}
                    </Card.Text>
                    <Card.Text>
                        Department: {staff.depart}
                    </Card.Text>
                    <Card.Text>
                        Email: {staff.email}
                    </Card.Text>
                    <Button variant="primary">Edit his info</Button>
                </Card.Body>
            </Card>
            <h3>Monday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Time</th>
                        <th>??</th>



                    </tr>
                </thead>
                <tbody>
                    {monrows}

                </tbody>
            </Table>
            <h3>Tuesday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Time</th>
                        <th>??</th>

                    </tr>
                </thead>
                <tbody>

                    {tuerows}




                </tbody>
            </Table>
            <h3>Wednesday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Time</td>
                        <td>??</td>



                    </tr>
                </thead>
                <tbody>

                    {wedrows}



                </tbody>
            </Table>
            <h3>Thursday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <td>Day</td>
                        <td>Mark</td>


                    </tr>
                </thead>
                <tbody>

                    {thurows}




                </tbody>
            </Table>
            <h3>Friday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Time</th>
                        <th>??</th>



                    </tr>
                </thead>
                <tbody>

                    {frirows}



                </tbody>
            </Table>



        </div>
    )
}

export default Userprofile