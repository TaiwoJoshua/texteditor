import React from "react"

export default function Sidebar(props) {

    function escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    }
    function trimSpecialChar(string) {
        const remove = ["*","\"","~","#","[](url)",">","`","![](https://example.com/your-image.png)","-", "[", "]", "(", ")"];
        for (let i = 0; i < remove.length; i++) {
            const pattern = new RegExp(escapeRegExp(remove[i]), 'g');
            string = string.replace(pattern, "");
        }
        return string;
    }

    const noteElements = props.notes.map((note, index) => {
        let title = note.body.split("\n")[0];
        title = title === "# Type your markdown note's title here" ? "Note " + (index + 1) : title;
        title = trimSpecialChar(title);

        return <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{title}</h4>

                <button onClick={(event) => props.handleClick(event, note.id)} className="trash-btn">
                    <i className="trash"></i>
                </button>
            </div>
        </div>
    })

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
