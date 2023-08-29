import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route index element={<Header />
      } /> */}
      <Route index element={<NotesListPage />
      } />
      <Route path='note/:noteId' element = {<NotePage/>} />
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
