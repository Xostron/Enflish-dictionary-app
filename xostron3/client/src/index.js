import './index.css'
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';


const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

console.log(process.env.REACT_APP_API_URL)
root.render(<App />)

