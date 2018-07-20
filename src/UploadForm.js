import React, { Component } from 'react';
import './UploadForm.css';
import axios from 'axios';


class UploadForm extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleChange(event) {
        event.preventDefault()
		const value = event.target.value;
		const name = event.target.name;
		
		this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        window.scroll(0,0)
        const data = this.state;
        (this.state.file_upload_url ? this.uploadImage() : this.addItemData())
    }

    addItemData = (data) => {
        console.log("add item data started")
        var formData = this.state
        console.log(formData)
        fetch('https://s3-upload-tutorial.herokuapp.com/files', {
            method: 'POST',
            body:JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })  
            .then(res => res.json())
            .catch(error => console.error('Error:', error.response))
    }

    handleImageChange = (event) => {
        console.log(event.target.files[0])
        const file = event.target.files[0];
        this.setState({"file_upload_url": event.target.files[0]})
    }

    uploadImage = (event) => {
        const formData = new FormData();
        formData.append('enctype', 'multipart/form-data');
        formData.append('file', this.state.file_upload_url );
        console.log(formData)
        axios.post('https://s3-upload-tutorial.herokuapp.com/upload', formData)
          .then(resp => {
              this.setState({file_upload_url: resp.data.data}, () => {
                  this.addItemData()
              })
          })
        .catch(error=>console.log(error.response))
      }
      
    
  
    render() {
    return (
    <div className="s3">
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <input type="text" name ="name" placeholder="image title" value={this.state.name} onChange={this.handleChange} required />
            <br/><br/>
            <textarea type="text" name ="description" placeholder="description" value={this.state.description} onChange={this.handleChange} required />
            <br/><br/>
            <input id="file" name="file" type="file" value={this.state.file} onChange={this.handleImageChange} required />
            <br/><br/>
            <input type="submit" value="Upload" />
        </form>
    </div>
    );
  }
}

export default UploadForm;