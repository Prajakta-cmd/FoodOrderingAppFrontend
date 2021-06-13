import React, { Component } from "react";

//importing the header component
import Header from "../../common/header/Header";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header showSearchBox={true} baseUrl={this.props.baseUrl} />
        <h2>Home Page</h2>
      </div>
    );
  }
}

export default Home;
