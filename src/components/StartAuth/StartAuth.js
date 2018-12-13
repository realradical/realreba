import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Dropzone from "react-dropzone";
import {isMobile} from "react-device-detect";

import overallImg from "../../assets/images/test_overall.png";
import classes from "./StartAuth.module.css";


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

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.dropItems.forEach(file => URL.revokeObjectURL(file.placeholder));
    }

    componentDidMount(){
      console.log(this.props.user);
    };

    onDropHandler = (file, rejectedFiles, label) => {
      console.log(file);
      console.log(rejectedFiles);
      console.log(label);
      let foundIndex = this.state.dropItems.findIndex(x => x.label === label);
      const newdropItems = [...this.state.dropItems];
      newdropItems[foundIndex] = {...newdropItems[foundIndex], placeholder: URL.createObjectURL(file[0])};
      this.setState({dropItems:newdropItems});
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
                                            accept="image/*"
                                            multiple={false}
                                            maxSize={1000000}
                                            disableClick={false}
                                  >
                                      {({getRootProps, getInputProps,isDragActive}) => {
                                          return (
                                              <div {...getRootProps()}
                                                   className={classes["dropzone-wrap"]}
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
              </Form>
          </div>
        )
    }
}

export default StartAuth;
