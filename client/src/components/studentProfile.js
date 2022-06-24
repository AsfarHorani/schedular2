import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Table } from 'react-bootstrap';
import './userprofile.css'
import { useParams } from "react-router-dom";
import StudentForm from "./AddUser/forms/student";
import { BsFillTrashFill } from 'react-icons/bs';


function Userprofile() {
    let { id } = useParams();
    const [student, setstudent] = useState([]);
    const [edit, setEdit] = useState(false);
    console.log(setEdit)
    useEffect(() => {
        async function fetch() {

            if (id) {
                console.log(id)
                axios.get('http://localhost:5000/getStudent/' + id).then(resp => {

                    setstudent(resp.data.student)


                }).catch(err => {
                    console.log(err)
                })
            }

        }
        fetch();
    }, [id])
    console.log(student.timetable)

    let monrows = null
    let tuerows = null
    let wedrows = null;
    let thurows = null;
    let frirows = null;

    const deleteHandler = async () => {
        try {
            let resp = await axios.delete("http://localhost:5000/deleteStudent/" + student._id);
            console.log(resp.data);
        } catch (err) {
            console.log(err)
        }
    }
    const deleteRowHandler = async (id, day) => {
        console.log(id, day)
        const body = { id: id, day: day }
        console.log(body)
        try {
            let resp = await axios.post("http://localhost:5000/student-deleteRow/" + student._id, body 
            );
            console.log(resp.data);
            setstudent(resp.data.student);
        } catch (err) {
            console.log(err)
        }
    }
      
    if (student.timetable) {
        monrows = student.timetable.monday.map((e,i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "monday")}><BsFillTrashFill /></td>

                </tr>)
        })

        tuerows = student.timetable.tuesday.map((e,i)  => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "tuesday")}><BsFillTrashFill /></td>

                </tr>)
        })

        wedrows = student.timetable.wednesday.map((e,i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "wednesday")}><BsFillTrashFill /></td>

                </tr>)
        })

        thurows = student.timetable.thursday.map((e,i)  => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "thursday")}><BsFillTrashFill /></td>

                </tr>)
        })


        frirows = student.timetable.friday.map((e,i) => {
            return (
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "friday")}><BsFillTrashFill /></td>

                </tr>)
        })






    }
    let infoCard = (<Card className="card-horizontal">
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
            <Button onClick={() => setEdit(prev => !prev)} variant="secondary">Cancel</Button>
            {/* deleteHandler */}
            <Button onClick={() => deleteHandler()} variant="danger">Delete this User</Button>



        </Card.Body>
    </Card>)
    if (edit) {
        infoCard = (<Card className="card-horizontal">
            <Card.Header as="h5">Student Information</Card.Header>
            <Card.Body>
                <StudentForm edit={edit} student={student} />
                <Button onClick={() => setEdit(prev => !prev)} variant="primary">Edit his info</Button>
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
                        <th>Delete</th>


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
                        <th>Delete</th>

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

                        <th>Delete</th>


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
                        <th>Delete</th>


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
                        <th>Delete</th>



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