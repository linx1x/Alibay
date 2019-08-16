import React, { Component } from "react";
import "./Item.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemDetails from "./ItemDetails.jsx";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: "",
      items: this.props.items,
      displayFilters: false,
      filterCost: "",
      filterInStock: "",
      itemName: "",
      email: "",
      itemFound: "",
      quantity: 0,
      item: {}
    };
  }
  componentDidMount = () => {
    let updateItems = async () => {
      // get all items from the server
      let response = await fetch("/items");
      let responseBody = await response.text();
      //   console.log("responseBody", responseBody);
      let parsed = JSON.parse(responseBody);
      console.log("parsed", parsed);
      this.props.dispatch({ type: "set-items", items: parsed });
    };
    setInterval(updateItems, 500);
  };

  //   renderGridItem = item => {
  //     return (
  //       <Link to={"/all-items" + item.id}>
  //         <GridItem item={item} />
  //       </Link>
  //     );
  //   };

  //   handleSubmit = () => {};
  gotoCart = () => {
    this.props.history.push("/cart");
  };
  //   handleOnChangeSearch = event => {};

  logout = async () => {
    console.log("clicked logout");
    let response = await (await fetch("/logout", { method: "POST" })).text();
    let body = JSON.parse(response);

    if (body.success) {
      this.props.history.push("/login");
    }
  };
  displayFilters = () => {
    this.setState({
      ...this.state,
      displayFilters: !this.state.displayFilters
    });
    console.log("this.state.displayFilters", this.state.displayFilters);
  };

  handleOnChangeSearch = event => {
    event.preventDefault();
    console.log("searched item", event.target.value);
    this.setState({ ...this.state, itemFound: event.target.value });
    // this.props.dispatch({
    //   type: "search-item",
    //   itemFound: event.target.value
    // });
  };
  submitFilters = event => {
    // fetch this '/filter-items'
  };
  maxCostOnChange = event => {
    event.preventDefault();
  };
  minCostOnChange = event => {
    event.preventDefault();
  };
  inStockOnChange = event => {
    event.preventDefault();
  };

  render = () => {
    console.log("rendering items");
    let displayedItems = this.props.items;
    console.log("this.props.items", this.props.items);
    console.log("this.state.itemFound", this.state.itemFound);
    if (this.state.itemFound !== "") {
      console.log("I am filtering");
      displayedItems = displayedItems.filter(item => {
        return item.name.includes(this.state.itemFound);
      });
      console.log("displayedItems", displayedItems);
    }

    return (
      <div>
        <video
          src="images/ast_days_of_summer.mp4"
          width="1400"
          height="690"
          controls="controls"
          autoplay="true"
        />
        <div className="Wrapper">
          {/* NavBar includes : SearchBar, Logout/Login(if not connected)
         , cart and User Display */}

          <header className="HeaderNavBar">
            <div className="SearchBar">
              Search bar
              <input
                className="InputSearchBar"
                type="text"
                onChange={this.handleOnChangeSearch}
                placeholder="Search item"
              />
            </div>
            <button className="LogoutButton" onClick={this.logout}>
              Logout
            </button>

            <div className="UserDisplay">user: {this.props.email}</div>
          </header>
          {/* Filter goes here  */}
          <div className="FilterArea">
            <button className="FilterButton" onClick={this.displayFilters}>
              {this.state.displayFilters ? "less filters" : "more filters"}
            </button>
            <div
              className="FiltersArea"
              style={{ display: this.state.displayFilters ? "block" : "none" }}
            >
              min cost:
              <input
                className="MinCostForm"
                type="text"
                onChange={this.minCostOnChange}
                value={this.state.filterCost}
              />
              max cost:
              <input
                className="MaxCostForm"
                type="text"
                onChange={this.maxCostOnChange}
                value={this.state.filterCost}
              />
              In stock{" "}
              <input
                className="InStockCheckBox"
                type="checkbox"
                onChange={this.inStockOnChange}
                value={this.state.filterInStock}
              />
            </div>
          </div>
          <div className="ItemsField">
            {displayedItems.map(item => {
              return (
                <div className="ItemFields">
                  <img
                    className="ItemPicture"
                    src={item.filePath}
                    height="290px"
                    width="260px"
                  />
                  <div className="ItemName">{item.name}</div>
                  <div className="ItemDescription">{item.description}</div>
                  <div className="ItemPrice">{item.cost + "$ "} </div>
                  <button className="ItemDescriptionLink">
                    <Link to={"/item/" + item._id}>Item Details</Link>
                  </button>

                  <div />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    email: state.email,
    items: state.items,
    itemFound: state.itemFound
  };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
// let GridItem = connect(mapStateToProps)(UnconnectedGridItem);
export default Items;
// export { Items, GridItem };
