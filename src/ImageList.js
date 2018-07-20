import React, { Component } from 'react';
import "./ImageList.css"

class ImageList extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.getImages();
    }
        
    getImages = () => {
        return fetch('https://s3-upload-tutorial.herokuapp.com/files')
        .then(response => response.json())
        .then(data => {
        this.setState({images: data.files}, () => {
        })
      })
    }

    render() {
    return (
        <ul> 
          {(this.state.images
          ? this.state.images.map(image => 
                <li>
                    <img width="200px" src={image.file_upload_url}/>
                    <h2>{image.name}</h2>
                    <p>{image.description}</p>
                </li>)
          : null
        )}
        </ul>
    );
  }
}

export default ImageList;