import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        console.log(editedExercise, exerciseToEdit._id)
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editedExercise)
                }
        );
        if (response.status === 200) {
            alert("Successfully edited the exercise");
        } else {
            alert(`Failed to edit the exercise with _id = ${exerciseToEdit._id}, status code = ${response.status}`)
        }
        navigate('/')
    }

    return(
        <div className="app-form">
            <table className="app-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text"  value={name} onChange={e => setName(e.target.value)} /></td>
                        <td><input type="number" value={reps} onChange={e => setReps(e.target.valueAsNumber)} /></td>
                        <td><input type="number" value={weight} onChange={e => setWeight(e.target.valueAsNumber)} /></td>
                        <td>
                            <select  onChange={e => setUnit(e.target.value)}>
                                <option value='lbs'>lbs</option>
                                <option value='kgs'>kgs</option>
                            </select>
                        </td>
                        <td><input type="text" placeholder="MM-DD-YY" value={date} onChange={e => setDate(e.target.value)} /></td>
                        <td><button onClick={editExercise}>Save</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EditExercisePage;