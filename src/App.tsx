import Header from './layout/Header'
import Navigation from './layout/Navigation'

const App = () => {
  return (
    <>
      <Header />

      <div className='grid contenedor contenido-principal'>
        <Navigation />
      </div>
    </>
  )
}

export default App
