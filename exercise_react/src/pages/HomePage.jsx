import ExerciseTable from '../components/ExerciseTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const navigate = useNavigate();

    // load exercises from the database
    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const data = await response.json();
        setExercises(data);
    }

    useEffect( () => {
        loadExercises()
        }, []);

    // delete exercise with the given _id from the database
    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        )
        if (response.status === 204){
            setExercises(exercises.filter( exerciseItem => exerciseItem._id !== _id))
        } else {
            alert(`Failed to delete the exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // navigate to the edit exercise page for the given exercise
    const onEdit = (exercise) => {
        setExerciseToEdit(exercise)
        navigate('/edit-exercise')
    }

    return(
        <>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
        </>
    )
}

export default HomePage;