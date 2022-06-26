import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/context';
import Card from '../card';

export default function Admins() {

    const [alladmins, setAlladmins] = useState(null);
    const {token} = useContext(Context);
    useEffect(() => {

        async function fetch() {

            axios.get('http://localhost:5000/getAdmins',
            { headers: {
                Authorization: 'Bearer ' + token
            }}).then(resp => {
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
