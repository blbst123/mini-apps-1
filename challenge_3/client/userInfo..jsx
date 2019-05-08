class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="userInfo">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="login-input" placeholder="Username" />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" className="login-input" placeholder="Email" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="login-input" placeholder="Password" />
        </div>

        <button type="button" className="back-btn">Back</button>
        <button type="button" className="next-btn">Next</button>
      </div>
    );
  }
}

// export default UserInfo;