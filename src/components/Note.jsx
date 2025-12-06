const Note = ({note, toggleImportance }) => {
    const label = note.important
    ? 'make not important' : 'make important'
    return(
        <li className="note">
            Your awesome note: {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

const Notification = ({message}) => {
    if(message === null){
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}
export default Note
export { Notification }