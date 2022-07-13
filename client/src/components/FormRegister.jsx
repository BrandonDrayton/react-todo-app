import { Alert, AlertIcon, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

function FormRegister() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const updateField = (name, value) => {
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')
        fetch('/api/v1/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                if (data.error) {
                    setError(data.error)
                } else {
                    setSuccess('Registered Successfully')
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <Alert status='error'><AlertIcon /> {error}</Alert>}
            {success && <Alert status='success'><AlertIcon /> {success}</Alert>}
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
            <Button type="submit" isLoading={isLoading} colorScheme='orange'>Register</Button>
        </form>
    )
}

export default FormRegister