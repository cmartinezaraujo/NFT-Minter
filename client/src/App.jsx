import {React} from 'react'
import './App.css'
import { Nav } from './components/Nav/Nav'
import { Welcome } from './components/Welcome/Welcome'
import {Directions} from './components/Directions/Directions'
import {Gallery} from './components/Gallery/Gallery'
import { Create } from './components/Create/Create'

function App() {
  return (
    <div className="App">
        <Nav />
        <Welcome />
      <div className="blue-bg2">
        <Directions />
      </div>
      <div >
        <Create />
      </div>
      <div className="blue-bg2">
        <Gallery />
      </div>
    </div>
  )
}

export default App
