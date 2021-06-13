import React, { Component } from "react";

//Other components import
import Header from "../../common/header/Header";

class Details extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header baseUrl={this.props.baseUrl} />
        <h2>Details Page</h2>
      </div>
    );
  }
}

export default Details;
