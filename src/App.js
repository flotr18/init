import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      mail: "",
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (window.location.href === "localhost") {
      axios
        .post("http://localhost:5000", this.state)
        .then((res) => this.props.history.push("/"))
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("/", this.state)
        .then((res) => this.props.history.push("/"))
        .catch((error) => {
          console.log(error);
        });
    }
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
