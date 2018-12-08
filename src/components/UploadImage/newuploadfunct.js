import React, {Component} from 'react';
import { storage } from '../../firebase/firebase.js';
import Uploadedwrapper from '../imagesdashboard/imagedash.js';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ['http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300',
              'http://via.placeholder.com/400x300'],
      url: '',
      progress: 0
    }

    // this.handleChange = this
    //   .handleChange
    //   .bind(this);
    //   this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount(){
      console.log(this.props.user);
  };


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
      <div >
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" ref="uploadImg" onChange={this._onChange} style={{ display: 'none' }}/>
        {/*<button onClick={this.handleUpload} >Upload</button>*/}
        <br/>
        <Uploadedwrapper Click = {this.handleClick} img =  {this.state.image} />
      </div>
    )
  }
}

export default ImageUpload;
