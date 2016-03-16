import React                                from "react";



export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Signup';
        this.state = {
          name: "test guy",
          email: "test@test.com"
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field,event){

      let nextState = {
        [field]: event.target.value
      }
      this.setState(nextState);
    }

    handleSubmit(event){
      event.preventDefault();
      this.props.handleSignup(this.state.name, this.state.email);
    }

    render() {
      
        return (
                  <div className="signup">
                  <p>Sign up to receive updates</p>
                    <form className="signup_form">
                      <label>Name<span style={{color: "red"}}>*</span></label>
                      <input type="text" required value={this.state.name} onChange={(e) => {this.update("name",e)}}/>
                      <label>Email<span style={{color: "red"}}>*</span></label>
                      <input type="email" required value={this.state.email} onChange={(e) => {this.update("email",e)}}/>
                      <button onClick={(e) => {this.handleSubmit(e)}}>Sign Up</button>
                    </form>
                    {this.props.signupMessage ? <p>{this.props.signupMessage}</p> : null}
                  </div>
          )
    }
}
