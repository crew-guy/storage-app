import  { useReducer, useEffect } from 'react'
import database from '../firebase'
import {useAuth} from '../contexts/AuthContext'

export const ROOT_FOLDER = {
    name: 'Root',
    id: null,
    path:[]
}


const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER:'update-folder',
    SET_CHILD_FOLDERS:'set-child-folders'
}

const reducer = (state, { type, payload }) =>
{
    switch (type)
    {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders:[]
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder:payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders:payload.childFolders
            }
        default:
            return state
    }
}

export default function useFolder(folderId = null, folder=null) {
    const {currentUser} = useAuth()
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles:[]
    })

    useEffect(() =>
    {
        dispatch({type:ACTIONS.SELECT_FOLDER, payload:{folder,folderId}})        
    }, [folderId, folder])
    
    useEffect(() =>
    {
        if (folderId == null)
        {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: {
                    folder:ROOT_FOLDER
                }
            })
        }
        database.folders.doc().get().then(doc =>
        {
            console.log(database.formatDoc(doc))
        }).catch(() =>
        {
            dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } })
        })
    },[folderId])

    useEffect(() =>
    {
        const cleanup = database.folders.where("parentId", "==", folderId)
            .where("userId", "==", currentUser.uid)
            .orderBy("createdAt")
            .onSnapshot(snapshot =>
            {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload:{childFolders:snapshot.docs.map(database.formatDoc)}
                })
            })
        
        return cleanup
    },[folderId, currentUser])

    return state
}
