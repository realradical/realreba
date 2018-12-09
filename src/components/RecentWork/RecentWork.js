import React,{Component} from 'react';

import { Container, Row, Col } from 'reactstrap/lib';
import Image from "./Image/Image";
import Spinner from "../Spinner/Spinner";
import OnImagesLoaded from "react-on-images-loaded";


// import classes from './RecentWork.module.css';

class RecentWork extends Component {
    state = {
        loading: true
    };

    render() {
        const imgArray = [
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: false,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: false,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            },
            {
                legit: true,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/realreba-c557f.appspot.com/o/test%2Fair-jordan.jpeg?" +
                    "alt=media&token=35d581b4-f66c-4b71-a1f9-d52707a02231"
            }
        ];

        let rowArray = imgArray.map(
            (item, index) => {
                return index % 12 === 0 ? imgArray.slice(index, index + 12) : null;
            }).filter(x => x != null);

        let gallery = rowArray.map(
            (item, index) => {
                return (
                    <Row key={index}>
                        {item.map((i, k) => (
                            <Col sm={6} md={4} lg={4} xl={3} key={k}>
                                <Image imglink={i.imgLink} legit={i.legit}/>
                            </Col>
                        ))}
                    </Row>
                )
            }
        );


        return (
            <Container>
                {this.state.loading ? <Spinner/> : null}
                <OnImagesLoaded onLoaded={() => this.setState({loading: false})}>
                    {gallery}
                </OnImagesLoaded>
            </Container>
        );
    };
}

export default RecentWork;