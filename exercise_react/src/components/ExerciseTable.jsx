import ExerciseRow from "./ExerciseRow";

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return(
        <>
            <table className="app-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, _id) => <ExerciseRow exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={exercise._id}/>)}
                </tbody>
            </table>
        </>

            

    )
}

export default ExerciseTable;