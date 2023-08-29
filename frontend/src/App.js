import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import { BrowserRouter, Outlet, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Outlet />
      </div>
      {/* <Header /> */}
      {/* <NotesListPage/> */}
    </div>
  );
}

export default App;
