import React from 'react'
import NavbarComponent from './Navbar'
import {Container} from 'react-bootstrap'
import AddFolderButton from '../drive/AddFolderButton'
import useFolder from '../../hooks/useFolder'
import Folder from './Folder'
import {useParams} from 'react-router-dom'

export default function Dashboard()
{
    const { folderId } = useParams();
    const {folder,childFolders} = useFolder()
    return (
        <>
            <NavbarComponent />
            <AddFolderButton currentFolder={folder} />
            {folder && <Folder folder={folder}></Folder>}
            {childFolders.length > 0 && (
                <div className="d-flex flex-wrap" >
                    {childFolders.map(childFolder => (
                        <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                            <Folder folder={childFolder}>
                                 
                            </Folder>
                        </div> 
                    ))}
                </div>
            )}
            <Container fluid>
                Content
            </Container>
        </>
    )
}
