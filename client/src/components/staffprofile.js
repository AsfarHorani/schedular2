import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, Table } from 'react-bootstrap';
import './userprofile.css'
import { useParams } from "react-router-dom";
import StaffForm from "./AddUser/forms/staff";
import { BsFillTrashFill } from 'react-icons/bs';
import { Context } from '../context/context';

function Userprofile() {
    let { id } = useParams();
    const [staff, setStaff] = useState([]);
    const [edit, setEdit] = useState(false);
    const [addObjSel, setAddObjSel] = useState({ add: false, day: '' });
    const [newRow, setNewRow] = useState({ time: null, text: null })
    const {token} = useContext(Context);
    console.log(setEdit)
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

    const deleteHandler = async () => {
        try {
            let resp = await axios.delete("http://localhost:5000/deleteStaff/" + staff._id,
            { headers: {
                Authorization: 'Bearer ' + token
            }});
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
            let resp = await axios.post("http://localhost:5000/staff-deleteRow/" + staff._id, body,
            { headers: {
                Authorization: 'Bearer ' + token
            }}
            );
            console.log(resp.data);
            setStaff(resp.data.staff);
        } catch (err) {
            console.log(err)
        }
    }
    const addRowHandler = async () => {
        try {
            let body = { ...newRow, day: addObjSel.day }
            console.log(body);
            let resp = await axios.post("http://localhost:5000/addStaffRow/" + staff._id, body,
            { headers: {
                Authorization: 'Bearer ' + token
            }}
            );
            console.log(resp.data);
            setStaff(resp.data.staff);
        } catch (err) {
            console.log(err)
        }
    }

    if (staff.timetable) {
        monrows = staff.timetable.monday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "monday")}><BsFillTrashFill /></td>

                </tr>)
        })

        tuerows = staff.timetable.tuesday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "tuesday")}><BsFillTrashFill /></td>
                </tr>)
        })

        wedrows = staff.timetable.wednesday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "wednesday")}><BsFillTrashFill /></td>
                </tr>)
        })

        thurows = staff.timetable.thursday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "thursday")}><BsFillTrashFill /></td>
                </tr>)
        })


        frirows = staff.timetable.friday.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td onClick={() => deleteRowHandler(i, "friday")}><BsFillTrashFill /></td>
                </tr>)
        })






    }
    let infoCard = (<Card className="card-horizontal">
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
            <Button onClick={() => setEdit(prev => !prev)} variant="primary">Edit</Button>
            {/* deleteHandler */}
            <Button onClick={() => deleteHandler()} variant="danger">Delete this user</Button>



        </Card.Body>
    </Card>)
    if (edit) {
        infoCard = (<Card className="card-horizontal">
            <Card.Header as="h5">Staff Information</Card.Header>
            <Card.Body>
                <StaffForm edit={edit} staff={staff} />
                <Button onClick={() => setEdit(prev => !prev)} variant="primary">Edit his info</Button>
            </Card.Body>
        </Card>)
    }

    console.log(addObjSel)
    return (
        <div className="userprofile content">
            {infoCard}
            <h3>Monday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Time</th>
                        <th>??</th>
                        <th>delete</th>



                    </tr>
                </thead>
                <tbody>
                    {monrows}
                    {addObjSel.add && addObjSel.day === "monday" ? <tr>
                        <td><input onChange={(e) => setNewRow(prev => { return { ...prev, time: e.target.value } })} type="text" value={newRow.time} /></td>
                        <td><input type="text" onChange={(e) => setNewRow(prev => { return { ...prev, text: e.target.value } })} value={newRow.text} /></td>
                        <td onClick={addRowHandler}>AddIcon</td>
                    </tr> : <tr onClick={() => setAddObjSel({ ...addObjSel, day: 'monday', add: true })} >Click here add new row</tr>}
                </tbody>
            </Table>
            <h3>Tuesday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Time</th>
                        <th>??</th>
                        <th>delete</th>

                    </tr>
                </thead>
                <tbody>

                    {tuerows}
                    {addObjSel.add && addObjSel.day === "tuesday"? <tr>
                        <td><input onChange={(e) => setNewRow(prev => { return { ...prev, time: e.target.value } })} type="text" value={newRow.time} /></td>
                        <td><input type="text" onChange={(e) => setNewRow(prev => { return { ...prev, text: e.target.value } })} value={newRow.text} /></td>
                        <td onClick={addRowHandler}>AddIcon</td>
                    </tr> : <tr onClick={() => setAddObjSel({ ...addObjSel, day: 'tuesday', add: true })} >Click here add new row</tr>}

                </tbody>
            </Table>
            <h3>Wednesday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Time</td>
                        <td>??</td>
                        <th>delete</th>



                    </tr>
                </thead>
                <tbody>

                    {wedrows}

                    {addObjSel.add && addObjSel.day === "wednesday" ? <tr>
                        <td><input onChange={(e) => setNewRow(prev => { return { ...prev, time: e.target.value } })} type="text" value={newRow.time} /></td>
                        <td><input type="text" onChange={(e) => setNewRow(prev => { return { ...prev, text: e.target.value } })} value={newRow.text} /></td>
                        <td onClick={addRowHandler}>AddIcon</td>
                    </tr> : <tr onClick={() => setAddObjSel({ ...addObjSel, day: 'wednesday', add: true })} >Click here add new row</tr>}



                </tbody>
            </Table>
            <h3>Thursday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <td>Day</td>
                        <td>Mark</td>
                        <th>delete</th>


                    </tr>
                </thead>
                <tbody>

                    {thurows}

                    {addObjSel.add && addObjSel.day === "thursday"? <tr>
                        <td><input onChange={(e) => setNewRow(prev => { return { ...prev, time: e.target.value } })} type="text" value={newRow.time} /></td>
                        <td><input type="text" onChange={(e) => setNewRow(prev => { return { ...prev, text: e.target.value } })} value={newRow.text} /></td>
                        <td onClick={addRowHandler}>AddIcon</td>
                    </tr> : <tr onClick={() => setAddObjSel({ ...addObjSel, day: 'thursday', add: true })} >Click here add new row</tr>}



                </tbody>
            </Table>
            <h3>Friday</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Time</th>
                        <th>??</th>
                        <th>delete</th>



                    </tr>
                </thead>
                <tbody>

                    {frirows}
                    {addObjSel.add && addObjSel.day === "friday"?<tr>
                        <td><input onChange={(e) => setNewRow(prev => { return { ...prev, time: e.target.value } })} type="text" value={newRow.time} /></td>
                        <td><input type="text" onChange={(e) => setNewRow(prev => { return { ...prev, text: e.target.value } })} value={newRow.text} /></td>
                        <td onClick={addRowHandler}>AddIcon</td>
                    </tr> : <tr onClick={() => setAddObjSel({ ...addObjSel, day: 'friday', add: true })} >Click here add new row</tr>}



                </tbody>
            </Table>



        </div>
    )
}

export default Userprofile