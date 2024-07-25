import './global.css';
import FlipCircle from './FlipCircle';

const App = () => {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="flex justify-center items-center space-x-20 mb-8">
                <img src="/perenanobg.svg" alt="Perena no bg" className='mr-8 enlarged-image' />
                <img src='/logo.svg' alt='Perana' className='enlarged-image mr-5' />
            </div>
                <FlipCircle />
            <h1 className="text-2xl font-bold text-center text-indigo-900 leading-tight">
                Infrastructure <br />for Money
            </h1>
        </main>
    )
}

export default App