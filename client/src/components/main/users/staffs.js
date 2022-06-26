import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/context';
import Card from '../card';



export default function Staffs() {
    const [allStaff, setAllStaff] = useState(null);
    const {token} = useContext(Context)
    useEffect(() => {
        async function fetch() {

            axios.get('http://localhost:5000/getAllStaff',
            { headers: {
                Authorization: 'Bearer ' + token
            }}).then(resp => {
                resp = resp.data
                console.log(resp.staffData);
                setAllStaff(resp.staffData);

            }).catch(err => {
                console.log(err)
            })

        }
        fetch();
    }, [])

    let content = null;
    console.log(allStaff)
    if (allStaff) {
        console.log(allStaff)
        content = allStaff.map((user) => {

            return <Card type={"staff"} user={user} />
        })
    }

    return (
        <>
            {content}
        </>
    )
}
