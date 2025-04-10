import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newExercise)
                }
        );
        if (response.status === 201) {
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to create the exercise, status code = ${response.status}`)
        }
        navigate('/')
    }

    return(
        <div className="app-form">
            <h2>Create a New Exercise</h2>
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
                        <td><input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} /></td>
                        <td><input type="number" placeholder="Reps" value={reps} onChange={e => setReps(e.target.valueAsNumber)} /></td>
                        <td><input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.valueAsNumber)} /></td>
                        <td>
                            <select defaultValue={'DEFAULT'} onChange={e => setUnit(e.target.value)}>
                                <option value='DEFAULT' disabled>--</option>
                                <option value='lbs'>lbs</option>
                                <option value='kgs'>kgs</option>
                            </select>
                        </td>
                        <td><input type="text" placeholder="MM-DD-YY" value={date} onChange={e => setDate(e.target.value)} /></td>
                        <td><button onClick={createExercise}>Add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CreateExercisePage;