import { Alert, AlertIcon, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/services/user";

function FormLogin() {
    const navigate = useNavigate()
    const [login, { isLoading, isError, error }] = useLoginMutation()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const updateField = (name, value) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(form).unwrap()
            .then(() => {
                navigate('/')
            })
            .catch(() => { })
    }
    return (
        <form onSubmit={handleSubmit}>
            {isError && <Alert status='error'><AlertIcon /> {error.data.error}</Alert>}
            <FormControl my="5">
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' required value={form.email}
                    onChange={(e) => updateField('email', e.target.value)} />
            </FormControl>
            <FormControl my="5">
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password' required
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                />
            </FormControl>
            <Button type="submit" isLoading={isLoading} colorScheme='orange'>Login</Button>
        </form>
    )
}

export default FormLogin