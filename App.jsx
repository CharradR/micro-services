import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AttendanceTable from "./components/AttendanceTable.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="App">
            <AttendanceTable />
        </div>
    </>
  )
}

export default App
