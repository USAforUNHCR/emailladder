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

        this.state = {
          pledgeCompleted: false,
          givenName: "",
          familyName: "",
          address1: "",
          address2: "",
          postalCode: "",
        }
    }

    update(event) {
      let newValue = {};

      newValue[event.target.name] = event.target.value;

      const newState = R.merge(this.state, newValue);
      this.setState(newState);
    }

    getUid() {
      let uid = {};
      const externalId = Querystring.parse(location.hash).uid;
      if (externalId) { uid.externalId = externalId };
      return uid;
    }

    submitForm(event){
      event.preventDefault();

      let data = {
        source: "CAEET Advocacy",
        tags: {
          send_email: 0
        }
      };

      const stateFiltered = R.pickBy((val, key) => key !== "pledgeCompleted", this.state);

      this.groundwork.supporters.create(R.mergeAll([data, stateFiltered, this.getUid()]))
      .then((r) => {
        console.log(r);
        this.setState({formCompleted: true});
      })
      .catch((r) => console.log(r));
    }

    render() {

      const pledgeThanks = (
          <div className="pledge_thanks">
            <p>
              Thank you for adding your name to the pledge!
            </p>
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
                <input type="text" name="givenName" required onChange={(e) => this.update(e)} value={this.state.givenName}/>
                <label>Last Name<span style={{color: 'red'}}>*</span></label>
                <input type="text" name="familyName" required onChange={(e) => this.update(e)} value={this.state.familyName}/>
                <label>Address<span style={{color: 'red'}}>*</span></label>
                <input type="text" name="address1" required onChange={(e) => this.update(e)} value={this.state.address1}/>
                <label>Address2</label>
                <input type="text" name="address2" onChange={(e) => this.update(e)} value={this.state.address2}/>
                <label>Zip<span style={{color: 'red'}}>*</span></label>
                <input type="text" name="postalCode" max-length="5" required onChange={(e) => this.update(e)} value={this.state.postalCode}/>
                <button onClick={(e) => this.submitForm(e)}>Submit</button>
              </form>
            </div>
          </div>
        )
      
      return (
        <div>
          {this.state.formCompleted ? pledgeThanks : makePledge}
        </div>
      )
    }
}

export default Pledge;
