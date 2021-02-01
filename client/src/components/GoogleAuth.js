import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "876179067525-49th783gbnhsscrvj1qcpd28qhtd1khe.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // onAuthChange = (isSignedIn) => {
  //   if (isSignedIn) {
  //     this.props.signIn();
  //   } else {
  //     this.props.signOut();
  //   }
  // };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };
  consoleLog = () => {
    console.log("clicked");
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" /> Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div className="item"> {this.renderAuthButton()}</div>;
  }
}

export default connect(null, {signIn, signOut})(GoogleAuth);
