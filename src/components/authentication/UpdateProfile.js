import React,{useRef, useState} from 'react'
import {Alert, Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
import CenteredContainer from './CenteredContainer'
export default function UpdatePassword()
{
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser,updateEmail,updatePassword } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    const handleSubmit = async (e) =>
    {
        
        e.preventDefault()
        console.log('Form was just submitted !')
        if (passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError('Passwords do not match')
        }

        const promises = [];
        if (emailRef.current.value !== currentUser.email)
        {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value)
        {
            promises.push(updatePassword(passwordRef.current.value))
        }

        promises.all(promises)
            .then(() => { history.push('/') })
            .catch((error) => {console.log(error); setError('Failed to update account')})

        try
        {
            setError('')
            setLoading(true)
            history.push('/')
        } catch (error)
        {
            console.log(error.message)
            setError('Failed to create an account for you')
        }
        setLoading(false)
    } 


    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder='Leave blank to keep the same' type="password" ref={passwordRef} required >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control placeholder='Leave blank to keep the same' type="password" ref={passwordConfirmRef} required >
                            </Form.Control>
                        </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="mt-2 w-100 text-center">
                <Link to="/">Cancel</Link>
            </div>      
        </CenteredContainer>
    )
}
