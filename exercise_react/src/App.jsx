import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EditExercisePage from './pages/EditExercisePage'
import CreateExercisePage from './pages/CreateExercisePage'
import { useState } from 'react'
import Navigation from './components/Navigation'

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className='app'>
      <Router>
        <header className='app-header'>
          <h1>Exercise Tracker</h1>
          <p>The Exercise Tracker makes it easy to track your workouts.</p>
        </header>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
          <Route path="/create-exercise" element={<CreateExercisePage />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
        </Routes>
        <footer className="app-footer">
          <p>© 2025 Caitlin Martin Newnham</p>
        </footer>
      </Router>
    </div>
  )
}

export default App
