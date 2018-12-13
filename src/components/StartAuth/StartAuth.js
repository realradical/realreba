import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Dropzone from "react-dropzone";


import { storage } from '../../firebase/firebase.js';
import classes from "./StartAuth.module.css";

import Uploadedwrapper from '../imagesdashboard/imagedash.js';

class StartAuth extends Component {

    state = {
      image: ['http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300'],
      url: '',
      progress: 0
    };


  componentDidMount(){
      console.log(this.props.user);
  };

  onDropHandler = (file, rejectedFiles) => {
      console.log(file)
  }

  // handleChange = e => {
  //   if (e.target.files[0]) {
  //     const image = e.target.files[0];
  //     this.setState(() => ({image}));
  //   }
  // }


    _onChange = (e) => {

    const file    = this.refs.uploadImg.files[0]
    const reader  = new FileReader();
    const img1 = {...this.state.image}
    console.log(file)
    reader.onloadend = () => {
        this.setState({
            image: [reader.result, reader.result, reader.result,reader.result,reader.result]
        })
    }
    if (file) {
        reader.readAsDataURL(file);
        this.setState({
            image: [reader.result, reader.result, reader.result,reader.result,reader.result]
        })
    }
    else {
        this.setState({
            image: ""
        })
    }
}

handleClick = (e) => {
    this.refs.uploadImg.click();
}

  handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref("images").child(`${image.name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      },
      (error) => {
           // error function ....
        console.log(error);
      });}
    // () => {
    //     // complete function ....
    //     storage.ref('images').child(image.name).getDownloadURL().then(url => {
    //         console.log(url);
    //         this.setState({url});
    //     })
    // });
// }

  render() {
    return (
      <div className={classes["form-wrap"]}>
          <Form>
              <FormGroup>
                  <Label for="itemName">Item Name</Label>
                  <Input type="text" name="itemName" id="itemName" placeholder="e.g. Air Jordan 11 Concord" />
              </FormGroup>
              <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="textarea" name="description" id="description"
                         maxLength={200}
                         rows={3}
                         placeholder="Anything you think is worth mentioning" />
              </FormGroup>
              <FormGroup>
                  <Dropzone onDrop={this.onDropHandler}>
                          {({getRootProps, getInputProps, isDragActive}) => {
                              return (
                                  <div
                                      {...getRootProps()}
                                  >
                                      <input {...getInputProps()} />
                                      {
                                          isDragActive ?
                                              <p>Drop files here...</p> :
                                              <p>Try dropping some files here, or click to select files to upload.</p>
                                      }
                                  </div>
                              )
                          }}
                      </Dropzone>
              </FormGroup>
          </Form>



      <br/>
        <input type="file" ref="uploadImg" onChange={this._onChange} style={{ display: 'none' }}/>
        {/*<button onClick={this.handleUpload} >Upload</button>*/}
        <br/>
        <Uploadedwrapper Click = {this.handleClick} img =  {this.state.image} />
      </div>
    )
  }
}

export default StartAuth;
