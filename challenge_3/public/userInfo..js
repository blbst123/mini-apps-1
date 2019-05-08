class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      { className: "userInfo" },
      React.createElement(
        "div",
        { className: "input-group" },
        React.createElement(
          "label",
          { htmlFor: "username" },
          "Username"
        ),
        React.createElement("input", { type: "text", name: "username", className: "login-input", placeholder: "Username" })
      ),
      React.createElement(
        "div",
        { className: "input-group" },
        React.createElement(
          "label",
          { htmlFor: "email" },
          "Email"
        ),
        React.createElement("input", { type: "text", name: "email", className: "login-input", placeholder: "Email" })
      ),
      React.createElement(
        "div",
        { className: "input-group" },
        React.createElement(
          "label",
          { htmlFor: "password" },
          "Password"
        ),
        React.createElement("input", { type: "password", name: "password", className: "login-input", placeholder: "Password" })
      ),
      React.createElement(
        "button",
        { type: "button", className: "back-btn" },
        "Back"
      ),
      React.createElement(
        "button",
        { type: "button", className: "next-btn" },
        "Next"
      )
    );
  }
}

// export default UserInfo;