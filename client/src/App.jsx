import React from 'react'
import './App.css'
import { Nav } from './components/Nav/Nav'
import { Welcome } from './components/Welcome/Welcome'
import {Directions} from './components/Directions/Directions'
import {Gallery} from './components/Gallery/Gallery'
import { Create } from './components/Create/Create'

function App() {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Nav />
        <Welcome />
      </div>
      <div className="blue_bg">
        <Directions />
      </div>
      <div className="blue_bg">
        <Gallery />
      </div>
      <Create />
    </div>
  )
}

export default App
