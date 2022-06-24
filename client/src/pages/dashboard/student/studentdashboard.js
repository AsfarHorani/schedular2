import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Table } from 'react-bootstrap';
import '../../../components/userprofile.css';
import { useParams } from "react-router-dom";



function StudentDashboard() {
    let { id } = useParams();
    const [student, setstudent] = useState([]);

    useEffect(() => {
        async function fetch() {

            if (true) {
         axios.get('http://localhost:5000/getStudent/62b4ddbb6395442e1ed2710f').then(resp => {
                    console.log(resp)

                    setstudent(resp.data.student)


                }).catch(err => {
                    console.log(err)
                })
            }

        }
        fetch();
    }, [id])
    console.log(student)

    let monrows = null
    let tuerows = null
    let wedrows = null;
    let thurows = null;
    let frirows = null;


    if (student.timetable) {
        monrows = student.timetable.monday.map((e, i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })

        tuerows = student.timetable.tuesday.map((e, i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })

        wedrows = student.timetable.wednesday.map((e, i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })

        thurows = student.timetable.thursday.map((e, i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })


        frirows = student.timetable.friday.map((e, i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>

                </tr>)
        })






    }
    let infoCard = null
    if (student) {
        infoCard=(<Card className="card-horizontal">
            <Card.Header as="h5">Student Information</Card.Header>
            <Card.Body>
                <Card.Title>{student.name}</Card.Title>
                <Card.Text>
                    Id: {student.userId}
                </Card.Text>
                <Card.Text>
                    RollNo: {student.rollNo}
                </Card.Text>

                <Card.Text>
                    Email: {student.email}
                </Card.Text>



            </Card.Body>
        </Card>)
    }

    return (
        <div className="userprofile content">
            {infoCard}
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

export default StudentDashboard