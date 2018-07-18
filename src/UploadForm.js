import React, { Component } from 'react';
import './UploadForm.css';


class UploadForm extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('The following file was submitted ' + this.state.value);
        event.preventDefault();

        const URL = "";
        const formData = new FormData(event.target);
        fetch(URL, {
            method: "POST",
            // This contains the file to be uploaded
            body: new FormData(event.target)
        }).then(response => response.json())
        .then(({data, error}) => {
            const message = error
            // If there was an error, show it
            ? console.log(`There was an error: ${error}`)
            // Otherwise, show the URL of the uploaded file
            : console.log(`File was uploaded to: <a href="${data}">${data}</a>`)
        }).catch(error => {
            // If there was a problem, show the error message
            console.log(`<p>There was an error: ${error.message}`);
        });


    }
  
    render() {
    return (
    <div className="s3">
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <label htmlFor="file">File</label>
            <input id="file" name="file" type="file" value = {this.state.value} onChange={this.handleChange} required />
            <input type="submit" value="Submit" />
        </form>
    </div>
    );
  }
}

export default UploadForm;