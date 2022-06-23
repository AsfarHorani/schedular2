import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../card';



export default function Staffs() {
    const [allStaff, setAllStaff] = useState(null);
    useEffect(() => {
        async function fetch() {

            axios.get('http://localhost:5000/getAllStaff').then(resp => {
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

            return <Card user={user} />
        })
    }

    return (
        <>
            {content}
        </>
    )
}
