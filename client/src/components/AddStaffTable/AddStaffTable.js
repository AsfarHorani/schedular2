import React,{useContext, useState}from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


import "./AddStaffTable.css"
import { Context } from '../../context/context';
function AddStaffTable() {
    const [file,setFile] = useState(null);
    const {token} = useContext(Context);
    
    const submitFile=(e)=>{
      e.preventDefault();
        let formData = new FormData();
        formData.append('file', file);
        console.log(formData,file)
        async function postReq(){
            try{
            let resp = await axios.post("http://localhost:5000/admin-uploadTimeTable",formData,{ headers: {
                Authorization: 'Bearer ' + token
            }});
            console.log(resp.data);
            }catch(err){
                console.log(err)
            }
           }
           postReq();
    }

    return (
        <div className="content">
            <Form className="form-cus">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Choose File</Form.Label>
                    <input id="input-file"
                        onChange={(e) =>  { setFile(e.target.files[0]); }}
                        type={"file"}
                        name={"file"}
                        accept={".csv"}
                        placeholder='Upload File' />                    <Form.Text className="text-muted">
                        Make sure to choose a .csv file                    </Form.Text>
                </Form.Group>


                <Button type="submit" onClick={(e)=>submitFile(e)} variant="primary" >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default AddStaffTable