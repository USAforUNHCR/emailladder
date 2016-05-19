import React                                from "react";
import ShareImage                           from "./ShareImage.jsx";
import _                                    from "lodash";
import Signup                               from "./Signup.jsx";
import Querystring                          from "query-string";
import {merge}                              from "ramda";

export default class Share extends React.Component {
   
    constructor(props) {
        super(props);
        this.displayName = 'Share';
        this.handleShare = this.handleShare.bind(this);
        this.formatName = this.formatName.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.identified = Querystring.parse(this.props.location.search).uid ? true : false;
        this.uid = querystring.parse(this.props.location.search).uid;
        this.source = querystring.parse(this.props.location.search).src;
        this.state = {
          shareImages: [
            { 
              id: 1,
              url: "/images/graphic1.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic1.html",
              tw: "https://twitter.com/intent/tweet?text=Did%20you%20know%3F%20Children%20make%20up%20over%2050%25%20of%20the%20world%27s%20%23refugees.%20Join%20me%20%26%20share%20the%20facts%3A%20%23supportrefugees%20&url=http%3A%2F%2Fbit.ly%2F1U8EyHi",
            },
            { 
              id: 2,
              url: "/images/graphic2.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic2.html",
              tw: "https://twitter.com/intent/tweet?text=Did%20you%20know%3F%2053%25%20of%20%23refugees%20come%20from%20Syria%2C%20Afghanistan%20%26%20Somalia.%20Join%20me%20%26%20share%20the%20facts%3A%20%23supportrefugees%20&url=http%3A%2F%2Fbit.ly%2F1S4H2CN"
            },
            {
              id: 3,
              url: "/images/graphic3.jpg",
              fb: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frefugeesurvey.com%2Fgraphic3.html",
              tw: "https://twitter.com/intent/tweet?text=Did%20you%20know%3F%20Every%205%20min%2C%20150%20new%20people%20are%20forced%20to%20flee.%20Join%20me%20%26%20share%20the%20facts%3A%20%23supportrefugees%20&url=http%3A%2F%2Fbit.ly%2F1pMcqg3"
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
      
      data.source = "ladder share " + (this.source ? this.source : "") + " " + type + " image " + id; 
      data.tags = {
        send_email: 0,
        shareType: type,
        imageId: id,
        imagePosition: position
      };
      this.sendData(data);
    }

    handleSignup(name, email){
      let data = {};
      let namesObj = this.formatName(name);
      _.merge(data, namesObj);
      data.source = "CAAEET share email signup";
      this.setState({email: email});
      this.sendData(data);
    }

    sendData(payload) {
      
      this.props.groundwork.supporters.create(payload)
      .then((response) =>{
        if(response.data.email){
          this.setState({
            identified: true,
            signedUp: true
          });
        }
        console.log(response);
      })
      .catch((response) => {
        this.setState({
          signupMessage: response.data.error.msg
        });
        console.log(response);
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
