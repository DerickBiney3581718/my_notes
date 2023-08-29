import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const NotePage = () => {
    let { noteId } = useParams()
    const [note, setNote] = useState(null)
    let nav = useNavigate()

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const userCookie = getCookie("csrftoken");

    let getNote = async () => {
        if (noteId === 'new') return
        console.log('getting note');
        let res = await fetch(`/api/notes/${noteId}`)
        let data = await res.json()
        setNote(data)
    }
    let createNote = async () => {
        if (note?.body) {
            console.log('creating note');

            await fetch(`/api/notes/new`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': userCookie.toString()

                    },
                    body: JSON.stringify(note)

                })
        }
        nav(-1)
        // let data = await res.json()
    }
    useEffect(() => {
        getNote()
    }, [])

    //  update
  
    //   console.log(userCookie);
    let updateNote = async () => {
        console.log('updating...');
        return fetch(`/api/notes/${noteId}/update`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': userCookie.toString()
                },
                body: JSON.stringify(note)
            }
        )
    }
    let deleteNote = async () => {
        console.log('deleting');
        fetch(`/api/notes/${noteId}/delete`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': userCookie.toString()

                }
            })
        nav(-1)

    }
    let handleSubmit = () => {
        if (noteId !== 'new' && !note?.body) {
            deleteNote()
        }
        else if (note?.body) {
            updateNote()
        }
        nav(-1)

    }

    return (

        <div className='note'>
            <div className="note-header">
                <h3>
                    <MdKeyboardArrowLeft onClick={handleSubmit} />
                </h3>
                {noteId !== 'new' && <button onClick={deleteNote}>Delete</button>}
                {noteId === 'new' && <button onClick={createNote} >Done</button>}


            </div>
            <textarea onChange={(e) => setNote({ ...note, 'body': e.target.value })} defaultValue={note?.body}></textarea>
            {/* {note?.body} */}
        </div>
    )
}

export default NotePage