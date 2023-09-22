import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "https://inotes-mern-backend.onrender.com/";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const getAllNotes = async() => {
    
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json(); 
    setNotes(json);
  }

  const addNote = async (title, description, tag) => {
    
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}), 
    });
    
    const note = await response.json();
    setNotes(notes.concat(note))
  }


  const editNote = async (id, title, description, tag) => {
    
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}), 
    });
     
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  const deleteNote = async(id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes)
    console.log("deleting node with the id " + id);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider >

  )
}



export default NoteState;