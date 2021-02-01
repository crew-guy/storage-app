import React,{useRef, useState} from 'react'
import {Alert, Card, Form, Button } from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'
export default function Login()
{
    const emailRef = useRef()
    const { resetPassword } = useAuth();
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) =>
    {        
        e.preventDefault()
        try
        {
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            console.log('Login Successful !')
            setMessage('Password reset email sent')
        } catch (error) {
            console.log(error.message)
            setMessage('Failed to reset password')
        }
        setLoading(false)
    } 


    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {message && <Alert variant="info" >{message}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required >
                            </Form.Control>
                        </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    <Link to ="/login">Login</Link>
                    </Form>
                </Card.Body>
            </Card>
            <div className="mt-2 w-100 text-center">
                Need an account ? <Link to="/signup">Sign Up.</Link>
            </div>      
        </CenteredContainer>
    )
}

