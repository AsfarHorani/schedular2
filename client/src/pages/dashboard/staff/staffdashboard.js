import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Card, InputGroup, Button, FormControl, Table } from 'react-bootstrap';
import '../../../components/userprofile.css';
import { useParams } from "react-router-dom";
import { Context } from '../../../context/context';
import { useNavigate } from 'react-router-dom';

function Userprofile() {
    let { id } = useParams();
    const [staff, setStaff] = useState([]);
    const [edit, setEdit] = useState(false);
    const [hours, setHours] = useState(null);
    const { userInfo,isAuth,token } = useContext(Context);
    const navigate = useNavigate();
    console.log(token)
    console.log(setEdit)
    useEffect(() => {
          if(!isAuth){
          navigate("/signin");
          }
        async function fetch() {

            if (true) {

                axios.get('http://localhost:5000/getStaff/' + userInfo._id).then(resp => {

                    setStaff(resp.data.staff)


                }).catch(err => {
                    console.log(err)
                })
            }

        }
        fetch();
    }, [id,isAuth])
    console.log(staff.timetable)
    const addHoursHandler = () => {
        if (userInfo) {

            axios.post('http://localhost:5000/addOfficeHours/'+userInfo._id, { hours },{ headers: {
                Authorization: 'Bearer ' + token
            }}).then(resp => {
                console.log(resp.data);
                setStaff(resp.data.staff)


            }).catch(err => {
                console.log(err)
            })
        }
    }

    let monrows = null
    let tuerows = null
    let wedrows = null;
    let thurows = null;
    let frirows = null;


    if (staff.timetable) {
        monrows = staff.timetable.monday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                </tr>)
        })

        tuerows = staff.timetable.tuesday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                </tr>)
        })

        wedrows = staff.timetable.wednesday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                </tr>)
        })

        thurows = staff.timetable.thursday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                </tr>)
        })


        frirows = staff.timetable.friday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                </tr>)
        })






    }
    let infoCard = null
    if (staff) {
        infoCard = (

            <Card className="card-horizontal">
                <Card.Header as="h5">Staff Information</Card.Header>
                <Card.Body>
                    <Card.Title>{staff.name}</Card.Title>
                    <Card.Text>
                        Id: {staff.userId}
                    </Card.Text>
                    <Card.Text>
                        Hours available : {staff.officeHours}
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


                </Card.Body>
            </Card>)
    }



    return (
        <div className="userprofile content">

            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Add office hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                />
                <Button onClick={addHoursHandler} variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
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

export default Userprofile