import React                                from "react";
import Querystring                          from "query-string";
import QuizResults                          from "Results.jsx";
import QuizQuestions                        from "Questions.jsx";
import R                                    from "ramda";

class Pledge extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Pledge';
        this.groundwork = this.props.groundwork;
        this.submitForm = this.submitForm.bind(this);
        this.uid = Querystring.parse(location.hash).uid || undefined;
        this.mapWithIndex = R.addIndex(R.map);

        this.state = {
          pledgeCompleted: false,
          formFields: {
          givenName: "",
          familyName: "",
          address1: "",
          address2: "",
          postalCode: "",
          email: "",
          externalId: this.uid
          },
          errors: undefined

        }
    }

    update(event) {
      let newValue = {};

      newValue[event.target.name] = event.target.value;

      const newState = R.merge(this.state.formFields, newValue);
      this.setState({formFields: newState});
    }

    submitForm(event){
      event.preventDefault();

      if(!this.validateForm()) {
        return
      }

      let data = {
        source: "CAEET Advocacy",
        tags: {
          send_email: 0
        }
      };

      const stateFiltered = R.reject((val) => (val == false) || (val == null), this.state.formFields);

      this.groundwork.supporters.create(R.mergeAll([data, stateFiltered]))
      .then((r) => {
        console.log(r);
        this.setState({pledgeCompleted: true});
      })
      .catch((r) => console.log(r));
    }

    validateForm() {

      const fields = this.state.formFields;
      const pushError = (message) => newErrors.push(message);
      let newErrors = [];

      if(R.isEmpty(fields.givenName)) { pushError("Please enter your First Name") };
      if(R.isEmpty(fields.familyName)) { pushError("Please enter your Last Name")};
      if(R.isEmpty(fields.address1)) { pushError("Please enter your Address")};

      if(R.isEmpty(fields.postalCode)) {
        pushError("Please enter your Zip")
      }
      else if( (!R.isEmpty(fields.postalCode)) && (R.isEmpty(R.match(/^[0-9]*$/, fields.postalCode)))) {
        { pushError("Zip code can only contain numbers")};
      };

      if((fields.externalId == undefined) && (R.isEmpty(fields.email))){ 
          pushError("please enter your email address")
      }
      else if( (!R.isEmpty(fields.email)) && (R.isEmpty(R.match(/.+@.+/, fields.email)))){
        pushError("Please enter a valid email address");
      }

      if(R.isEmpty(newErrors)) {
        return true;
      }

      this.setState({errors: newErrors});
      return false;
    }

    emailField() {
      return (
           <div>
            <label>Email<span style={{color: 'red'}}>*</span></label>
            <input type="email" name="email" required onChange={(e) => this.update(e)} value={this.state.formFields.email}/>
          </div>
        );
    }

    errors() {
      const errors = this.state.errors;

      if(R.or(R.isEmpty(errors), R.isNil(errors))) { return undefined }

      const errorMessages = this.mapWithIndex( (errorMessage, index) => <p key={index} className="error_message">{errorMessage}</p>)

      return (
        <div className="errors">
          {errorMessages(errors)}
        </div>
      )
    }

    render() {

      const pledgeThanks = (
          <div className="pledge_thanks">
            <p>
              Thank you for adding your name to the pledge!
            </p>
            <p className="pledge_share_text">
              Share with your friends so that we can continue to grow this commitment to refugees.
            </p>
            <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20took%20a%20stand%20in%20support%20of%20%23refugees.%20It%20is%20the%20right%20thing%20to%20do.%20Will%20you%20join%20me%3F%20http%3A%2F%2Fbit.ly%2F235C7qd%20%20%23supportrefugees"><i className="fa fa-twitter-square"></i></a>
            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2F%23%2Fpledge" target="_blank"><i className="fa fa-facebook-square"></i></a>
          </div>
        );

      const makePledge = (
        <div className="pledge_container">
          <div className="pledge_intro">
              <h2>PLEDGE YOUR SUPPORT FOR REFUGEES</h2>
              <p className="bold_paragraph">
                Would you be willing to sign your name to a pledge today to show the world what American values are all about? 
              </p>
              <p className="bold_paragraph">
                Sign your name to the pledge today.
              </p>
              <div className="body_copy">
                <p>
                  In times of unrest and uncertainty, it can be hard to know what you can do to make a difference. You can make a difference today by pledging your support for the 60 million men, women and children that have been forced from their homes around the world.
                </p>
                <p>
                  Together, we can be torchbearers for compassion in a time when it is so desperately needed.
                </p>
                <p className="bold_paragraph">
                  Thank you for your support!
                </p>
              </div>
            </div>
            <div className="pledge_form">
              <form>
                <label>First Name<span style={{color: 'red'}}>*</span></label>
                <input type="text" name="givenName" required onChange={(e) => this.update(e)} value={this.state.formFields.givenName}/>
                <label>Last Name<span style={{color: 'red'}}>*</span></label>
                <input type="text" name="familyName" required onChange={(e) => this.update(e)} value={this.state.formFields.familyName}/>
                {
                  this.state.formFields.externalId == undefined ? this.emailField() : undefined
                }
                <label>Address<span style={{color: 'red'}}>*</span></label>
                <input type="text" name="address1" required onChange={(e) => this.update(e)} value={this.state.formFields.address1}/>
                <label>Address2</label>
                <input type="text" name="address2" onChange={(e) => this.update(e)} value={this.state.formFields.address2}/>
                <label>Zip<span style={{color: 'red'}}>*</span></label>
                <input type="text" name="postalCode" max-length="5" required onChange={(e) => this.update(e)} value={this.state.formFields.postalCode}/>
                <button type="submit" onClick={(e) => this.submitForm(e)}>Submit</button>
                {this.errors()}
              </form>
            </div>
          </div>
        )
      

      return (
        <div>
          {this.state.pledgeCompleted ? pledgeThanks : makePledge}
        </div>
      )
    }
}

export default Pledge;
