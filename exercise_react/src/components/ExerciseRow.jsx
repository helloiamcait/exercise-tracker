import '../App.css';
import { MdDeleteForever, MdEdit } from "react-icons/md";

function ExerciseRow({ exercise, onDelete, onEdit }) {
    return (
        <>
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.unit}</td>
                <td>{exercise.date}</td>
                <td><a href="/" onClick={e => {e.preventDefault(); onEdit(exercise)}}><MdEdit /></a></td>
                <td><a href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id)}}><MdDeleteForever /></a></td>
            </tr>
        </>
    )
}

export default ExerciseRow;