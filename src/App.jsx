import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/login'
import Register from './pages/register'
import Principal from './pages/principal'
import Proyecto from './pages/Proyectos/CrearProyecto'
import EditarProyecto from './pages/Proyectos/EditarProyecto'
import CrearFicha from './pages/Fichas/CrearFicha'
import Fichas from './pages/Fichas/Fichas'
import Usuarios from './pages/Usuarios/Usuario'
import EditarFicha from './pages/Fichas/EditarFicha'
import DetalleProyecto from './pages/Proyectos/Detalles'
import EditarUsuario from './pages/Usuarios/EditU'
import Gestores from './pages/Gestores/Gestores'
import CrearGestor from './pages/Gestores/CrearGestor'
import EditarGestor from './pages/Gestores/EditarGestor'
import CrearProyectoSem from './pages/ProyectoSem/CrearProyectoSem'
import CrearProyectoSeno from './pages/ProyectoSeno/CrearProyectoSeno'
import Principal2 from './pages/principal2/principal2'
import ProyectoSeno from './pages/ProyectoSeno/ProyectoSeno'
import ProyectoSem from './pages/ProyectoSem/ProyectoSem'
import Crear from './pages/Crear/CatProyectos'
import DetalleProyectoSeno from './pages/ProyectoSeno/Detalles'
import DetalleProyectoSem from './pages/ProyectoSem/Detalles'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Principal2} />
        <Route path='/proyectos' Component={Principal} />
        <Route path='/login/register' Component={Register} />
        <Route path='/login' Component={Login} />
        <Route path='/proyecto' Component={Proyecto} />
        <Route path='/edel' Component={EditarProyecto} />
        <Route path='/ficha' Component={CrearFicha} />
        <Route path='/fichas' Component={Fichas} />
        <Route path='/users' Component={Usuarios} />
        <Route path='/editarFicha/:id' Component={EditarFicha} />
        <Route path="/details/:id" Component={DetalleProyecto} />
        <Route path='/login/:id' Component={EditarUsuario} />
        <Route path='/gestor' Component={Gestores} />
        <Route path='/Cgestor' Component={CrearGestor} />
        <Route path='/editarGestor/:id' Component={EditarGestor} />
        <Route path='/Cproyectosem' Component={CrearProyectoSem} />
        <Route path='/Cproyectoseno' Component={CrearProyectoSeno} />
        <Route path='/proyectoseno' Component={ProyectoSeno} />
        <Route path='/proyectosem' Component={ProyectoSem} />
        <Route path='/crear' Component={Crear} />
        <Route path='/detailsse/:id' Component={DetalleProyectoSeno} />
        <Route path='/detailssem/:id' Component={DetalleProyectoSem} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
