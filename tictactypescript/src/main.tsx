import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function Game() {
  function handleRefresh() {
    window.location.reload();
  }
  return (
    <>
      <App />
      <button onClick={handleRefresh}>Refresh</button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
      }}>
      <Game />
    </div>
  </React.StrictMode>,
);
