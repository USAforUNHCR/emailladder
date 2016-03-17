import React                                from "react";
import ShareImage                           from "./ShareImage.jsx";
import _                                    from "lodash";
import Signup                               from "./Signup.jsx";
import Querystring                          from "query-string";

export default class Share extends React.Component {
   
    constructor(props) {
        super(props);
        this.displayName = 'Share';
        this.handleShare = this.handleShare.bind(this);
        this.formatName = this.formatName.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.identified = Querystring.parse(this.props.location.search).uid ? true : false;
        this.uid = querystring.parse(this.props.location.search).uid;
        this.state = {
          shareImages: [
            { 
              id: 1,
              url: "/images/graphic1.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic1.html",
              tw: "https://twitter.com/intent/tweet?text=Only+1+in+2+refugee+children+is+in+primary+school.+Join+me+and+spread+the+word+to+%23supportrefugees.&url=http%3a%2f%2fbit.ly%2f1S4H2CN",
            },
            { 
              id: 2,
              url: "/images/graphic2.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic2.html",
              tw: "https://twitter.com/intent/tweet?text=Did+you+know%3f+50%25+of+all+%23refugees+are+women+%26+children.+Join+me+%26+spread+the+word+to+%23supportrefugees.&url=http%3a%2f%2fbit.ly%2f1pMcqg3"
            },
            {
              id: 3,
              url: "/images/graphic3.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic3.html",
              tw: "https://twitter.com/intent/tweet?text=1+in+122+people+is+either+internally+displaced%2c+seeking+asylum%2c+or+a+%23refugee.+Spread+the+word.+%23supportrefugees&url=http%3a%2f%2fbit.ly%2f1U8EyHi"
            }
          ],
          identified: this.identified,
          uid: this.uid
        }
    }

    handleShare(id, type, position) {
      let data = {};
      if (this.state.identified && this.state.uid) {
        data.externalId = this.state.uid;
      } 

      if (this.state.email) {
        data.email = this.state.email;
      }
      
      data.source = "CAEET share " + type + " image " + id; 
      data.tags = {
        send_email: 0,
        shareType: type,
        imageId: id,
        imagePosition: position
      };

      this.props.groundwork.supporters.create(data)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
    }

    handleSignup(name, email){
      let data = {};
      let namesObj = this.formatName(name);
      _.merge(data, namesObj);
      data.source = "CAAEET share email signup";
      this.setState({email: email});
      this.props.groundwork.supporters.create(data)
      .then((response) =>{
        console.log(response);
        this.setState({
          identified: true,
          signedUp: true
        });
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          signupMessage: response.data.error.msg
        });
      });
    }

    formatName(name){
        var nameArr = name.split(" ");
        let firstName = nameArr[0];
        if (nameArr.length > 1) {
          var familyName = "";

          for (let i = 1; i < nameArr.length; i++) {
            familyName = familyName + " " + nameArr[i];
          }
        }
        
        let names = {};
        names.givenName = firstName;
          (typeof familyName !== 'undefined' && familyName !== null) ? names.familyName = familyName : null;
        return names;
    }

    render() {
        let shuffledImages = _.shuffle(this.state.shareImages);
        let shareImages =  shuffledImages.map((image,index) => {
          return <ShareImage key={index + 1} pos={index +1} id={image.id} fb={image.fb} tw={image.tw} share={image.share} url={image.url} handleShare={this.handleShare}/>
        });
        let signup = this.state.identified ? null : <Signup handleSignup={this.handleSignup} signupMessage={this.state.signupMessage}/>;
        let thanks = this.state.signedUp ? <p className="thanks-message">Thanks for signing up!</p> : null;
        return ( 
              <div className="share_container">
                {signup}
                {thanks}
                <div className="pic_container">
                  {shareImages}
                </div>                
              </div>
              )
    }
}
