import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import HomeContent from './containers/HomeContent/HomeContent';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <HomeContent/>
        </Layout>
      </div>
    );
  }
}

export default App;
