import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Dropzone from "react-dropzone";
import {isMobile} from "react-device-detect";

import overallImg from "../../assets/images/test_overall.png";
import classes from "./StartAuth.module.css";

const IMAGEMAXSIZE = 10000000;
const ACCEPTEDFILETYPES = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = ACCEPTEDFILETYPES.split(",").map((item) => item.trim());

class StartAuth extends Component {

    state = {
        dropItems: [
            {
                label: 'overall',
                placeholder: overallImg
            },
            {
                label: 'itemlabel',
                placeholder: overallImg
            },
            {
                label: 'stitching',
                placeholder: overallImg
            },
            {
                label: 'insole',
                placeholder: overallImg
            },
            {
                label: 'boxlabel',
                placeholder: overallImg
            },
            {
                label: 'seal',
                placeholder: overallImg
            }
        ]
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
      console.log(this.props.user);
    };

    onDropHandler = (files, rejectedFiles, label) => {
        if (files && files.length>0) {
          let foundIndex = this.state.dropItems.findIndex(x => x.label === label);
          const newdropItems = [...this.state.dropItems];
          newdropItems[foundIndex] = {...newdropItems[foundIndex], placeholder: URL.createObjectURL(files[0])};
          this.setState({dropItems: newdropItems});
        }
        if (rejectedFiles && rejectedFiles.length>0) {
          this.verifyFile(rejectedFiles);
        }
    };

    onDropRejectedHandler = (rejectedFiles) => {
        console.log(rejectedFiles);
    };

    render() {
        let rowArray = this.state.dropItems.map(
          (item, index) => {
              return index % 6 === 0 ? this.state.dropItems.slice(index, index + 6) : null;
          }).filter(x => x != null);

        let dropItems = rowArray.map(
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
                              </FormGroup>
                          </Col>
                      ))}
                  </Row>
              )
          }
        );

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
                  <Label>{isMobile ? "Upload pictures" : "Drag and drop picture or click to upload"}</Label>
                  {dropItems}
                  <Button>Proceed</Button>
              </Form>
          </div>
        )
    }
}

export default StartAuth;
