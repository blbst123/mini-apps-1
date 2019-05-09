// import { userInfo } from "os";

// import React from 'react';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      info: {},
      address: {},
      payment: {}
    };
    this.changeView = this.changeView.bind(this);
    this.sendToDB = this.sendToDB.bind(this);
    this.updateFields = this.updateFields.bind(this);
  }

  changeView(num) {
    this.setState({
      page: num,
    });
  }

  sendToDB() {
    $.ajax({
      url: '/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        info: this.state.info,
        address: this.state.address,
        payment: this.state.payment
      }),
      success: function (data) {
        console.log('successful post request!');
      },
      error: function (error) {
        console.log('failed post request!', error);
      }
    });
  }

  updateFields(data, bool = false) {
    this.setState(data, () => {
      if (bool) this.sendToDB();
    });
  }

  render() {
    let pageView;
    if (this.state.page === 0) pageView = <Intro changeView={this.changeView} />;
    else if (this.state.page === 1) pageView = <UserInfo changeView={this.changeView} updateFields={this.updateFields} />;
    else if (this.state.page === 2) pageView = <UserAddress changeView={this.changeView} updateFields={this.updateFields} />;
    else pageView = <UserPayment changeView={this.changeView} updateFields={this.updateFields} />;
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
        <div>Checkout Page</div>
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
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  submitInfo(event) {
    let stateObj = {};
    stateObj[event.target.name] = event.target.value;
    this.setState(stateObj);
  }

  nextPage() {
    this.props.changeView(2);
    this.props.updateFields({ info: this.state });
  }

  prevPage() {
    this.props.changeView(0);
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

        <button type="button" className="back-btn" onClick={this.prevPage}>Back</button>
        <button type="button" className="next-btn" onClick={this.nextPage}>Next</button>
      </div>
    );
  }
}

class UserAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: ""
    };
    this.submitInfo = this.submitInfo.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  submitInfo(event) {
    let stateObj = {};
    stateObj[event.target.name] = event.target.value;
    this.setState(stateObj);
  }

  nextPage() {
    this.props.changeView(3);
    this.props.updateFields({ address: this.state });
  }

  prevPage() {
    this.props.changeView(1);
  }

  render() {
    return (
      <div className="userAddress">
        <div className="input-group">
          <label>Address Line 1</label>
          <input type="text" name="address1" className="login-input" placeholder="Address line 1" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>Address Line 2</label>
          <input type="text" name="address2" className="login-input" placeholder="Optional" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>City</label>
          <input type="text" name="city" className="login-input" placeholder="City" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>State</label>
          <input type="text" name="state" className="login-input" placeholder="State" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>Zip Code</label>
          <input type="text" name="zip" className="login-input" placeholder="Zip Code" onChange={this.submitInfo} />
        </div>

        <button type="button" className="back-btn" onClick={this.prevPage}>Back</button>
        <button type="button" className="next-btn" onClick={this.nextPage}>Next</button>
      </div>
    );
  }
}

class UserPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: "",
      expiryDate: "",
      cvv: "",
      billingZip: ""
    };
    this.submitInfo = this.submitInfo.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  submitInfo(event) {
    let stateObj = {};
    stateObj[event.target.name] = event.target.value;
    this.setState(stateObj);
  }

  nextPage() {
    this.props.changeView(0);
    this.props.updateFields({ payment: this.state }, true);
  }

  prevPage() {
    this.props.changeView(2);
  }

  render() {
    return (
      <div className="userPayment">
        <div className="input-group">
          <label>Credit Card Number</label>
          <input type="text" name="creditCard" className="login-input" placeholder="Credit Card Number" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>Expiry Date</label>
          <input type="text" name="expiryDate" className="login-input" placeholder="Expiry Date" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>CVV</label>
          <input type="password" name="cvv" className="login-input" placeholder="CVV" onChange={this.submitInfo} />
        </div>

        <div className="input-group">
          <label>Billing Zip</label>
          <input type="password" name="billingZip" className="login-input" placeholder="Billing Zip Code" onChange={this.submitInfo} />
        </div>

        <button type="button" className="back-btn" onClick={this.prevPage}>Back</button>
        <button type="button" className="complete-btn" onClick={this.nextPage}>Complete</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));