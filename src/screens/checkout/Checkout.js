import React, { Component, Fragment } from "react";

//Header component Import
import Header from "../../common/header/Header";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Header baseUrl={this.props.baseUrl} />
        <h2>Checkout Page</h2>
      </Fragment>
    );
  }
}

export default Checkout;
