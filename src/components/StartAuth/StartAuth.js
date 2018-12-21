import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Dropzone from "react-dropzone";
import {isMobile} from "react-device-detect";
import {Elements, StripeProvider} from 'react-stripe-elements';

import overallImg from "../../assets/images/test_overall.png";
import classes from "./StartAuth.module.css";
import { storage, db } from '../../firebase/firebase.js';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import OrderSummary from "../OrderSummary/OrderSummary";

const IMAGEMAXSIZE = 10000000;
const ACCEPTEDFILETYPES = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = ACCEPTEDFILETYPES.split(",").map((item) => item.trim());

class StartAuth extends Component {

    state = {
        checkout: false,
        dropItems: [
            {
                label: 'overall',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'itemlabel',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'stitching',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'insole',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'boxlabel',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'seal',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            }
        ],
        dropItems2: [
            {
                label: 'overall',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'itemlabel',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'stitching',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'insole',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'boxlabel',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            },
            {
                label: 'seal',
                hasFile: false,
                placeholder: overallImg,
                optional: false
            }
        ],
        currentuser: this.props.user,
        imagefile: [null,null,null,null,null,null],
        filename:[],
        ItemName:null,
        ItemDescription:null
    };

    onTypeInputItemName = (event) => {
        this.setState({ItemName : event.target.value});
        console.log(this.state.ItemName);
    };
    onTypeInputItemDescription = (event) => {
        this.setState({ItemDescription: event.target.value});
        console.log(this.state.ItemDescription);
    };

    verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("Only images are allowed.");
                return false;
            }
            if (currentFileSize > IMAGEMAXSIZE) {
                alert("This image is too large. Image size should be less than 10MB.");
                return false;
            }
            return true;
        }
    };

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.dropItems.forEach(file => URL.revokeObjectURL(file.placeholder));
    }

    componentDidMount(){
      console.log(this.state.currentuser.providerData[0].displayName);
    };


    onDropHandler = (files, rejectedFiles, selectedLabel) => {
        if (files && files.length>0) {
          let foundIndex = this.state.dropItems.findIndex(x => x.label === selectedLabel);
          const newdropItems = [...this.state.dropItems];
          newdropItems[foundIndex] = {...newdropItems[foundIndex], hasFile: true, placeholder: URL.createObjectURL(files[0])};
          this.setState({dropItems: newdropItems});

          const newimagefile = [...this.state.imagefile];
          newimagefile[foundIndex] = {...files};
          this.setState({imagefile: newimagefile }, () =>{
          console.log(this.state.imagefile);});

          const newimagefilename = [...this.state.filename];
          if (newimagefilename.includes(files[0].name)) {
              alert("this file exist already.");
              console.log("this file exist already");
              const newimagefiledrop = [...this.state.imagefile];
              newimagefiledrop.splice(foundIndex, 1);
              this.setState({imagefile: newimagefiledrop}, () =>{
              console.log(this.state.imagefile);});

          const newdropItems = [...this.state.dropItems];
            newdropItems.splice(foundIndex,1);
            console.log(newdropItems);
            this.setState({dropItems: newdropItems});
            }

          else{
          newimagefilename.push(files[0].name);
          this.setState({filename: newimagefilename }, () =>{
          console.log(this.state.filename);});}
        }

        if (rejectedFiles && rejectedFiles.length>0) {
          this.verifyFile(rejectedFiles);
        }
    };

    onClickRemoveHandler = (selectedLabel) => {
        let foundIndex = this.state.dropItems.findIndex(x => x.label === selectedLabel);
        const newdropItems = [...this.state.dropItems];

            const newimagefiledrop = [...this.state.imagefile];
            newimagefiledrop.splice(foundIndex, 1);
            this.setState({imagefile: newimagefiledrop}, () =>{
            console.log(this.state.imagefile);});

        if (newdropItems[foundIndex].optional) {
            console.log(foundIndex);
            newdropItems.splice(foundIndex,1);
            console.log(newdropItems);
            this.setState({dropItems: newdropItems});

        } else {
            newdropItems[foundIndex] = {...newdropItems[foundIndex], hasFile: false, placeholder: overallImg};
            this.setState({dropItems: newdropItems});
        }
    };

    onClickAddHandler = () => {
        const newdropItems = [...this.state.dropItems];
        const additionalLabelArray = newdropItems.map((i) => i.label).filter(x => x.startsWith('additional'));
        let largestLabelNr = 0;
        if (additionalLabelArray.length > 0) {
            largestLabelNr = +additionalLabelArray.sort()[additionalLabelArray.length - 1].substring(10);
        }

        newdropItems.push({
            label: 'additional' + (largestLabelNr + 1),
            hasFile: false,
            placeholder: overallImg,
            optional: true
        });
        console.log(newdropItems);
        this.setState({dropItems: newdropItems});
    };

    onClickProceedHandler = () => {
        // if (this.state.filename.length > 5) {
        //     db.collection("testing").add({
        //         name: this.state.currentuser.providerData[0].displayName,
        //         itemName: this.state.ItemName,
        //         itemdescription: this.state.ItemDescription
        //     })
        //         .then((docRef) => {
        //             console.log("Document written with ID: ", docRef.id);
        //             const filteredimages = this.state.imagefile.filter( (el) => {
        //                 return el != null;
        //             });
        //             const storageRef = storage.ref(docRef.id);
        //             filteredimages.forEach((file) => {
        //                 console.log(file[0].name);
        //                 storageRef.child(`${file[0].name}`).put(file[0])  ;
        //                 });
        //                 this.setState({dropItems: this.state.dropItems2,
        //                 imagefile: [null,null,null,null,null,null],
        //                 filename: [], ItemName: null,
        //                 ItemDescription: null}, () =>{console.log("upload request completed");});
        //         })
        //         .catch((error) => {
        //             console.error("Error adding document: ", error);
        //         });
        // }
        // else{
        //     alert("Please upload more images");
        // }
        this.setState({checkout: true});
    };


    render() {
        let rowArray = this.state.dropItems.map(
          (item, index) => {
              return index % 6 === 0 ? this.state.dropItems.slice(index, index + 6) : null;
          }).filter(x => x != null);

        const dropItems = rowArray.map(
          (item, index) => {
              return (
                  <Row form key={index}>
                      {item.map((i) => (
                          <Col sm={12} md={6} lg={6} xl={4} key={i.label}>
                              <FormGroup>
                                  <Dropzone onDrop={(file, rejectedFiles) => this.onDropHandler(file, rejectedFiles, i.label)}
                                            onDropRejected={this.onDropRejectedHandler}
                                            accept={ACCEPTEDFILETYPES}
                                            multiple={false}
                                            maxSize={IMAGEMAXSIZE}
                                            disableClick={false}

                                  >
                                      {({getRootProps, getInputProps,isDragActive,isDragReject}) => {
                                          let dragZoneCss = classes["dropzone-wrap"];
                                          if (isDragReject) {
                                              dragZoneCss = `${classes["dropzone-wrap"]} ${classes["dropzone-wrap-reject"]}`;
                                          } else if (isDragActive) {
                                              dragZoneCss = `${classes["dropzone-wrap"]} ${classes["dropzone-wrap-active"]}`;
                                          }

                                          return (
                                              <div {...getRootProps()}
                                                   className={dragZoneCss}
                                              >
                                                  <input {...getInputProps()} />
                                                  <img src={i.placeholder} alt=" "/>
                                              </div>
                                          )
                                      }}
                                  </Dropzone>
                                  { (i.hasFile || i.optional) ?
                                  <span className={classes["dropzone-remove-icon"]}
                                        onClick={()=> this.onClickRemoveHandler(i.label)}>
                                      <i className="far fa-times-circle"></i>
                                  </span> : null}
                              </FormGroup>
                          </Col>
                      ))}
                  </Row>
              )
          }
        );

        const payForm = (
            <StripeProvider apiKey="pk_test_8N728o3SWuoCjeXHczqnetIK">
                <>
                    <OrderSummary/>
                    <div>
                        <Elements>
                            <CheckoutForm/>
                        </Elements>
                    </div>
                </>
            </StripeProvider>
        );

        const userForm = (
            <Form>
                <FormGroup>
                    <Label for="itemName">Item Name</Label>
                    <Input type="text"
                           onChange = {this.onTypeInputItemName}
                           name="itemName" id="itemName"
                           placeholder="e.g. Air Jordan 11 Concord"
                           style={{
                               '::placeholder': {
                                   fontStyle: 'italic'
                               }
                           }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea"
                           name ="description" id="description"
                           onChange={this.onTypeInputItemDescription}
                           maxLength={200}
                           rows={3}
                           placeholder="Anything you think is worth mentioning"
                           style={{
                               '::placeholder': {
                                   fontStyle: 'italic'
                               }
                           }}
                    />

                </FormGroup>
                <Label>{isMobile ? "Upload Pictures" : "Drag and Drop Picture or Click to Upload"}</Label>
                {dropItems}
                <FormGroup className={classes["add-item"]}>
                      <span onClick={this.onClickAddHandler}>
                          <i className="fas fa-plus"></i>
                      </span>
                </FormGroup>
                <FormGroup style={{textAlign:'center'}}>
                    <Button onClick={this.onClickProceedHandler} block size="lg" color="info">Proceed</Button>
                </FormGroup>
            </Form>
        );

        return (
          <div className={classes["form-wrap"]}>
              {this.state.checkout ? payForm : userForm}
          </div>
        )
    }
}

export default StartAuth;
