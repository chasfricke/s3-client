import React, { Component } from 'react';
import './App.css';
import UploadForm from './UploadForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">S3 Upload</h1>
        </header>
        <br/>
       <UploadForm />
      </div>
    );
  }
}

export default App;
