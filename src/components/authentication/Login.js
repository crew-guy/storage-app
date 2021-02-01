import React,{useRef, useState} from 'react'
import {Alert, Card, Form, Button } from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import { Link,useHistory } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'
export default function Login()
{
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleSubmit = async (e) =>
    {        
        e.preventDefault()
        try
        {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            console.log('Login Successful !')
            history.push('/user')
        } catch (error) {
            console.log(error.message)
            setError('Failed to log you in')
        }
        setLoading(false)
    } 


    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required >
                            </Form.Control>
                        </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Submit</Button>
                    <Link to ="/forgot-password">Forgot Password ?</Link>
                    </Form>
                </Card.Body>
            </Card>
            <div className="mt-2 w-100 text-center">
                Need an account ? <Link to="/signup">Sign Up.</Link>
            </div>      
        </CenteredContainer>
    )
}

