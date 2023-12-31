import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';



const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fas fa-edit" onClick={()=>{updateNote(note)}} style={{color: "#000000"}}></i>
                        <i className="fas fa-trash-alt mx-3" style={{color: "#000000"}} onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success");}}></i>
                        
                        
                        
                        
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
