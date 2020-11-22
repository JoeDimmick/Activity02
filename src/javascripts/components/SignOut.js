import React from 'react'
import { useCookies } from 'react-cookie';

export default function SignOut(){
    console.log(`Sign out Method in components>SignOut.js`)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    removeCookie('token')

    document.location ='/movies'

    return <></>
}