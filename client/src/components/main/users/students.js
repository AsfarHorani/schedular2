import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/context';
import Card from '../card';

export default function Students() {

    const [allstudents, setAllstudents] = useState(null);
    const{token} = useContext(Context);
    useEffect(() => {

        async function fetch() {

            axios.get('http://localhost:5000/getStudents',
            { headers: {
                Authorization: 'Bearer ' + token
            }}).then(resp => {
                resp = resp.data
                console.log(resp);
                setAllstudents(resp.students);

            }).catch(err => {
                console.log(err)
            })

        }
        fetch();
    }, [])

    let content = null;
    console.log(allstudents)
    if (allstudents) {
        console.log(allstudents)
        content = allstudents.map((user) => {

            return <Card type={"students"} user={user} />
        })
    }

    return (
        <>
            {content}
        </>
    )
}
