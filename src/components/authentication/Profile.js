import React,{useState} from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import CenteredContainer from './CenteredContainer'

export default function Dashboard()
{
    const [error, setError] = useState()
    const { logout,currentUser } = useAuth();
    const history = useHistory()

    const handleLogout = async (e) => {
        try {
            await logout();
            history.push('/login');
        } catch(error)
        {
            setError('Failed to log you out')
            console.log(error.message)
        }
    }

    return (
        <CenteredContainer>
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2> 
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email :</strong> {currentUser.email}
                    <Link to='/update-profile' className="btn btn-primary w-100" >Update Profile</Link>
                </Card.Body>
            </Card>
            <div>
                <Button to="/login" variant="link" onClick={handleLogout} >Log Out</Button>
            </div>
        </div>
        </CenteredContainer>
    )
}
