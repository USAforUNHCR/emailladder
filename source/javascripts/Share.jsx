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
              tw: "https://twitter.com",
            },
            { 
              id: 2,
              url: "/images/graphic2.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic2.html",
              tw: "http://google.com"
            },
            {
              id: 3,
              url: "/images/graphic3.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic3.html",
              tw: "http://google.com"
            }
          ],
          identified: this.identified,
          uid: this.uid
        }
    }

    handleShare(id, type) {
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
        imageId: id
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
        this.setState({
          identified: true,
          signedUp: true
        });
      })
      .catch((response) => {
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
          return <ShareImage key={index + 1} id={image.id} fb={image.fb} tw={image.tw} share={image.share} url={image.url} handleShare={this.handleShare}/>
        });
        let signup = this.state.identified ? null : <Signup handleSignup={this.handleSignup} signupMessage={this.state.signupMessage}/>;
        let thanks = this.state.signedUp ? <p className="thanks-message">Thanks for signing up!</p> : null;
        return ( 
              <div className="share_container">
                {signup}
                <div className="pic_container">
                  {shareImages}
                </div>
                {thanks}
                
              </div>
              )
    }
}
