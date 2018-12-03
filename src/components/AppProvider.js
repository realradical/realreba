import React, {
    Component,
    createContext
} from 'react';

import { firebase } from '../firebase';

export const {
    Provider,
    Consumer
} = createContext();

class AppProvider extends Component {
    state = {
        currentUser: JSON.parse(localStorage.getItem('authUser')),
        message: AppProvider.defaultProps.message
    };

    componentDidMount() {
        this.listener = firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                this.setState({currentUser: JSON.parse(localStorage.getItem('authUser'))});
            } else {
                localStorage.removeItem('authUser')
            }
            }
        )
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <Provider value={{
                state: this.state,
                destroySession: () => this.setState({
                    currentUser: AppProvider.defaultProps.currentUser
                }),
                setMessage: message => this.setState({ message }),
                clearMessage: () => this.setState({
                    message: AppProvider.defaultProps.message
                }),
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

AppProvider.defaultProps = {
    currentUser: null,
    message: null
};

export default AppProvider;