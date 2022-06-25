import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../card';

export default function Admins() {

    const [alladmins, setAlladmins] = useState(null);
    useEffect(() => {

        async function fetch() {

            axios.get('http://localhost:5000/getAdmins').then(resp => {
                resp = resp.data
                console.log(resp);
                setAlladmins(resp.admins);

            }).catch(err => {
                console.log(err)
            })

        }
        fetch();
    }, [])

    let content = null;
    console.log(alladmins)
    if (alladmins) {
        console.log(alladmins)
        content = alladmins.map((user) => {

            return <Card type={"admins"} user={user} />
        })
    }

    return (
        <>
            {content}
        </>
    )
}
