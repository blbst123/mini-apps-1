// import { userInfo } from "os";

// import React from 'react';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(num) {
    this.setState({
      page: num
    });
  }

  render() {
    let pageView;
    if (this.state.page === 0) pageView = <Intro changeView={this.changeView}/>;
    else if (this.state.page === 1) pageView = <UserInfo changeView={this.changeView}/>;
    else if (this.state.page === 2) pageView = <UserAddress changeView={this.changeView}/>;
    else pageView = <UserPayment changeView={this.changeView}/>;
    return (
      pageView
    );
  }
}

class Intro extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div>I am App</div>
        <button onClick={() => { this.props.changeView(1) }}>CheckOut</button>
      </div>
    );
  }
}

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.submitInfo = this.submitInfo.bind(this);
    this.sendToDB = this.sendToDB.bind(this);
  }

  submitInfo(event) {
    let stateObj = {};
    stateObj[event.target.name] = event.target.value;
    this.setState(stateObj);
  }

  sendToDB() {
    $.ajax({
      url: '/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }),
      success: function (data) {
        console.log('successful post request!');
      },
      error: function (error) {
        console.log('failed post request!', error);
      }
    });
  }

  render() {
    return (
      <div className="userInfo">
        <div className="input-group">
          <label>Name</label>
          <input type="text" name="name" className="login-input" placeholder="Name" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="text" name="email" className="login-input" placeholder="Email" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.submitInfo} />
        </div>

        <button type="button" className="back-btn" onClick={this.sendToDB}>Submit</button>
        <button type="button" className="next-btn" onClick={() => { this.props.changeView(2) }}>Next</button>
      </div>
    );
  }
}

class UserAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="userAddress">
        <div className="input-group">
          <label>Address Line 1</label>
          <input type="text" name="address1" className="login-input" placeholder="Address line 1" />
        </div>

        <div className="input-group">
          <label>Address Line 2</label>
          <input type="text" name="address2" className="login-input" placeholder="Optional" />
        </div>

        <div className="input-group">
          <label>City</label>
          <input type="text" name="city" className="login-input" placeholder="City" />
        </div>

        <div className="input-group">
          <label>State</label>
          <input type="text" name="state" className="login-input" placeholder="State" />
        </div>

        <div className="input-group">
          <label>Zip Code</label>
          <input type="text" name="zipcode" className="login-input" placeholder="Zip Code" />
        </div>

        <button type="button" className="back-btn" onClick={() => { this.props.changeView(1) }}>Back</button>
        <button type="button" className="next-btn" onClick={() => { this.props.changeView(3) }}>Next</button>
      </div>
    );
  }
}

class UserPayment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="userPayment">
        <div className="input-group">
          <label>Credit Card Number</label>
          <input type="text" name="creditCard" className="login-input" placeholder="Credit Card Number" />
        </div>

        <div className="input-group">
          <label>Expiry Date</label>
          <input type="text" name="expiryDate" className="login-input" placeholder="Expiry Date" />
        </div>

        <div className="input-group">
          <label>CVV</label>
          <input type="password" name="cvv" className="login-input" placeholder="CVV" />
        </div>

        <div className="input-group">
          <label>Billing Zip</label>
          <input type="password" name="billingZip" className="login-input" placeholder="Billing Zip Code" />
        </div>

        <button type="button" className="back-btn" onClick={() => { this.props.changeView(2) }}>Back</button>
        <button type="button" className="next-btn" onClick={() => { this.props.changeView(0) }}>Next</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));