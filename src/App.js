import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function App() {
    // const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes")) || []);
    
    // The above code will work fine. The only problem is that when an EXECUTABLE CODE is passed as the initial value of useState (giving an actual value won't cause this), it would rerun it each time there is a rerender which would lead to a waste in resources. The solution would be to pass the executable code as a function's return value. This concept is known as LAZY INITIALIZATION

    // const [notes, setNotes] = React.useState(function(){
    //     return JSON.parse(localStorage.getItem("notes"));
    // } || []);
    
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []);

    React.useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here",
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
          const updateNotes = [];
          for (let i = 0; i < oldNotes.length; i++) {
            oldNotes[i].id === currentNoteId ? updateNotes.unshift({...oldNotes[i], body: text}) : updateNotes.push(oldNotes[i]);
          }
          return updateNotes;
        })
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    function deleteNote(event, id){
      event.stopPropagation();
    //   setNotes(oldNotes => {
    //     const updateNotes = [];
    //     for (let i = 0; i < oldNotes.length; i++) {
    //       if(oldNotes[i].id === id){
    //         continue;
    //       }else{
    //         updateNotes.push(oldNotes[i]);
    //       }
    //     }
    //     return updateNotes;
    //   })

      setNotes(oldNotes => oldNotes.filter(oldNote => oldNote.id !== id));
    }

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    handleClick={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no Notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create New Note
                </button>
            </div>
            
        }
        </main>
    )
}