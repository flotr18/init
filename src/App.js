import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    // the form fields are stored in a state
    this.state = {
      firstname: "",
      lastname: "",
      mail: "",
      message: "",
    };

    //this binding is necessary to make `this` work in the callback
    //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //once the input boxes are changed, update the state to match the value
  handleChange(event) {
    //name of the input boxes must match the property names in the state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    //preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
    event.preventDefault();

    //use axios to send a POST request to the server which includes the state information for the new user to be created


    axios
        .post("/", this.state)
        //on success go to home
        .then((res) => this.props.history.push("/"))
        .catch((error) => {
          console.log(error);
        });



  }

  render() {
    return (
        <div>
          <p className="form_title h1 text-center">CONTACT US</p>
          <form onSubmit={this.handleSubmit}>
            <div className="container-fluid text-center w-75 form_contact">
              <div className="row mt-3">
                <div className="col-6">
                  <input
                      className={"contact_input w-50 mt-5"}
                      placeholder={"firstname"}
                      name={"firstname"}
                      value={this.state.firstname}
                      onChange={this.handleChange}
                  />
                </div>
                <div className="col-6">
                  <input
                      className={"contact_input w-50 mt-5"}
                      placeholder={"lastname"}
                      name={"lastname"}
                      value={this.state.lastname}
                      onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-12 email">
                  <input
                      className={"contact_input w-75 mt-3"}
                      placeholder={"Email"}
                      name={"mail"}
                      value={this.state.mail}
                      onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 message">
                <textarea
                    className={"contact_input-message w-75 mt-3"}
                    placeholder={"Message"}
                    name={"message"}
                    value={this.state.message}
                    onChange={this.handleChange}
                />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 submit">
                  <input
                      className="submit-button w-25"
                      type="submit"
                      value="Submit"
                  />
                </div>
              </div>
            </div>
          </form>


        </div>
    );
  }
}

export default App;