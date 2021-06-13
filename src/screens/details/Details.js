import React, { Component, Fragment } from "react";

//Import of stylesheet
import "./Details.css";

//Other components import
import CustomizedSnackbar from "../../common/customizedsnackbar/CustomizedSnackBar";
import Header from "../../common/header/Header";

//Material UI component imports
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      restaurant_name: null,
      photo_URL: null,
      customer_rating: null,
      average_price: null,
      number_customers_rated: null,
      locality: null,
      categories: [],
      open: false,
      totalAmount: 0,
      totalItems: 0,
      cartEmpty: false,
      orderItems: { id: null, items: [], total: 0 },
      cartItems: [],
      cartItem: {},
      itemQuantityDecreased: false,
      nonloggedIn: false,
      itemRemovedFromCart: false,
      itemQuantityIncreased: false,
      itemAddedFromCart: false,
    };
  }

  componentDidMount() {
    // Get profile
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          id: JSON.parse(this.responseText).id,
          restaurant_name: JSON.parse(this.responseText).restaurant_name,
          photo_URL: JSON.parse(this.responseText).photo_URL,
          customer_rating: JSON.parse(this.responseText).customer_rating,
          average_price: JSON.parse(this.responseText).average_price,
          number_customers_rated: JSON.parse(this.responseText)
            .number_customers_rated,
          locality: JSON.parse(this.responseText).address.locality,
          categories: JSON.parse(this.responseText).categories,
          orderItems: { id: JSON.parse(this.responseText).id },
        });
      }
    });

    let url = this.props.baseUrl + "restaurant/";

    xhr.open("GET", url + this.props.match.params.restaurantId);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
  }

  //Function to get the index of the item
  getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  };

  closeHandler = () => {
    this.setState({ open: false });
    this.setState({ cartEmpty: false });
    this.setState({ nonloggedIn: false });
    this.setState({ itemQuantityDecreased: false });
    this.setState({ itemRemovedFromCart: false });
    this.setState({ itemAddedFromCart: false });
    this.setState({ itemQuantityIncreased: false });
  };

  //Function used to capitalize the string
  Capitalize(str) {
    var arr = str.split(" ");
    var pascalCasedString = "";
    arr.map(
      (a) => (pascalCasedString += a.charAt(0).toUpperCase() + a.slice(1) + " ")
    );
    return pascalCasedString;
  }

  render() {
    return (
      <div>
        <Header baseUrl={this.props.baseUrl} />
        {this.state.text}
        <div className="main-container-body">
          <div className="restaurant-details-container">
            <div className="restaurant-left-container">
              <img
                src={this.state.photo_URL}
                alt="none"
                className="restaurant-image"
              />
            </div>
            <div className="restaurant-right-container">
              <div
                style={{
                  fontWeight: "medium",
                  fontSize: "30px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                {this.state.restaurant_name}
              </div>
              <div
                style={{
                  fontWeight: "medium",
                  fontSize: "16px",
                  paddingBottom: "10px",
                }}
              >
                {this.state.locality}
              </div>
              <div style={{ fontSize: "14px", paddingBottom: "20px" }}>
                {this.state.categories.map((category, index) => (
                  <span key={category.id + "category"}>
                    {category.category_name}
                    {index < this.state.categories.length - 1 ? ", " : " "}{" "}
                  </span>
                ))}
              </div>
              <div className="rating-section">
                <div className="rating-section-left">
                  <i
                    className="fa fa-star"
                    aria-hidden="true"
                    style={{
                      paddingRight: "3px",
                      paddingBottom: "3px",
                      paddingLeft: "2px",
                    }}
                  />
                  {this.state.customer_rating}
                  <div style={{ color: "gray", fontSize: "12px" }}>
                    AVERAGE RATING BY
                  </div>
                  <div
                    style={{
                      color: "gray",
                      fontSize: "12px",
                    }}
                  >
                    {this.state.number_customers_rated} CUTOMERS
                  </div>
                </div>
                <div className="rating-section-right">
                  <i
                    className="fa fa-inr"
                    aria-hidden="true"
                    style={{
                      paddingRight: "4px",
                      paddingBottom: "3px",
                      paddingLeft: "2px",
                    }}
                  />
                  {this.state.average_price}
                  <div style={{ color: "gray", fontSize: "12px" }}>
                    AVERAGE COST FOR
                  </div>
                  <div style={{ color: "gray", fontSize: "12px" }}>
                    TWO PEOPLE
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="category-items-cart-container">
            <div className="category-items-container">
              {this.state.categories.map((category) => (
                <div className="category" key={"category" + category.id}>
                  <span
                    style={{
                      color: "grey",
                      fontWeight: "bolder",
                    }}
                  >
                    {category.category_name.toUpperCase()}
                  </span>{" "}
                  <Divider
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "90%",
                    }}
                  />
                  {category.item_list.map((item) => (
                    <Grid container key={item.id} style={{ marginBottom: 5 }}>
                      <Grid item xs={1} lg={1}>
                        {item.item_type === "VEG" ? (
                          <span
                            className="fa fa-circle"
                            aria-hidden="true"
                            style={{ fontSize: "12px", color: "green" }}
                          />
                        ) : (
                          <span
                            className="fa fa-circle"
                            aria-hidden="true"
                            style={{ fontSize: "12px", color: "red" }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={5} lg={6}>
                        <Typography>
                          <span className="item-name">
                            {" "}
                            {this.Capitalize(item.item_name)}{" "}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={3} lg={2}>
                        <div className="pricePerItem">
                          <span>
                            <i className="fa fa-inr" aria-hidden="true" />
                            <span style={{ paddingLeft: "2px" }}>
                              {item.price.toFixed(2)}
                            </span>
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={1} lg={1} />
                      <Grid item xs={2} lg={2}>
                        <IconButton style={{ padding: 0, float: "left" }}>
                          <AddIcon style={{ padding: 0 }} fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
