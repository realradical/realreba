import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Dropzone from "react-dropzone";
import {isMobile} from "react-device-detect";
import {Elements, StripeProvider} from 'react-stripe-elements';


import overallImg from "../../assets/images/test_overall.png";
import classes from "./StartAuth.module.css";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import OrderSummary from "../OrderSummary/OrderSummary";


const IMAGEMAXSIZE = 10000000;
const ACCEPTEDFILETYPES = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = ACCEPTEDFILETYPES.split(",").map((item) => item.trim());

class StartAuth extends Component {
    state = {
        checkout: false,
        currentuser: this.props.user,
        itemName: '',
        itemDescription: '',
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
        valid: false,
    };

    _isSubmitted = false;

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.dropItems.forEach(file => URL.revokeObjectURL(file.placeholder));
    }

    onTypeInputHandler = (event, inputId) => {
        this.setState({[inputId] : event.target.value});
    };

    checkItemNameValidity(itemName) {
        return itemName.trim() !== ''
    }

    checkDropItemValidity(dropItems) {
        const requiredItems = dropItems.filter(item => item.optional === false);
        const hasFileItems =requiredItems.filter(item => item.hasFile);
        return hasFileItems.length === requiredItems.length
    }

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

    onDropHandler = (files, rejectedFiles, selectedLabel) => {
        if (files && files.length>0) {
            let foundIndex = this.state.dropItems.findIndex(x => x.label === selectedLabel);
            const newDropItems = [...this.state.dropItems];
            newDropItems[foundIndex] = {
                ...newDropItems[foundIndex],
                hasFile: true,
                placeholder: URL.createObjectURL(files[0]),
                file: files[0]
            };
            this.setState({dropItems: newDropItems});
        }
        if (rejectedFiles && rejectedFiles.length>0) {
          this.verifyFile(rejectedFiles);
        }
    };

    onClickRemoveHandler = (selectedLabel) => {
        let foundIndex = this.state.dropItems.findIndex(x => x.label === selectedLabel);
        const newDropItems = [...this.state.dropItems];

        if (newDropItems[foundIndex].optional) {
            newDropItems.splice(foundIndex,1);
            this.setState({dropItems: newDropItems});

        } else {
            newDropItems[foundIndex] = {...newDropItems[foundIndex], hasFile: false, placeholder: overallImg};
            this.setState({dropItems: newDropItems});
        }
    };

    onClickAddHandler = () => {
        const newDropItems = [...this.state.dropItems];
        const additionalLabelArray = newDropItems.map((i) => i.label).filter(x => x.startsWith('additional'));
        let largestLabelNr = 0;
        if (additionalLabelArray.length > 0) {
            largestLabelNr = +additionalLabelArray.sort()[additionalLabelArray.length - 1].substring(10);
        }

        newDropItems.push({
            label: 'additional' + (largestLabelNr + 1),
            hasFile: false,
            placeholder: overallImg,
            optional: true
        });
        this.setState({dropItems: newDropItems});
    };

    onClickProceedHandler = (event) => {
        event.preventDefault();

        let valid = this.checkItemNameValidity(this.state.itemName) && this.checkDropItemValidity(this.state.dropItems);
        this._isSubmitted = true;
        valid ? this.setState({checkout: true, valid: valid}) : this.setState({valid});
        //this.setState({checkout: true});
    };


    render() {
        let valid = this._isSubmitted ? this.checkItemNameValidity(this.state.itemName) : true;

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
                                          const dropItem = this.state.dropItems.find(obj => obj.label === i.label);
                                          let dropItemValid = this._isSubmitted ? dropItem.hasFile : true;
                                          if (!dropItemValid && !dropItem.optional) {
                                              dragZoneCss = `${classes["dropzone-wrap"]} ${classes.invalid}`;
                                          };
                                          if (isDragReject) {
                                              dragZoneCss = `${classes["dropzone-wrap"]} ${classes["dropzone-wrap-reject"]}`;
                                          } else if (isDragActive) {
                                              dragZoneCss = `${classes["dropzone-wrap"]} ${classes["dropzone-wrap-active"]}`;
                                          }

                                          return (
                                              <div {...getRootProps()}
                                                   className={dragZoneCss}
                                              >
                                                  <input {...getInputProps()}/>
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

        const checkoutForm = (
            <div>
                <Elements>
                    <CheckoutForm state={this.state}
                    />
                </Elements>
            </div>
        );

        const payForm = (
            <StripeProvider apiKey="pk_test_8N728o3SWuoCjeXHczqnetIK">
                <>
                    <OrderSummary/>
                    {checkoutForm}
                </>
            </StripeProvider>
        );

        const userForm = (
            <Form>
                <FormGroup>
                    <Label for="itemName">Item Name</Label>
                    <Input type="text"
                           onChange = {(event) => this.onTypeInputHandler(event,'itemName')}
                           name="itemName" id="itemName"
                           placeholder="e.g. Air Jordan 11 Concord"
                           invalid={!valid}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea"
                           name ="description" id="description"
                           onChange={(event) => this.onTypeInputHandler(event,'itemDescription')}
                           maxLength={200}
                           rows={3}
                           placeholder="Anything you think is worth mentioning"
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
