import React                                from "react";

class shareImage extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'shareImage';
    }
    handleShare(type) {
      this.props.handleShare(this.props.id, type);
    }
    render() {
        return (
        <div className="share_wrapper">
          <img className="share_image" src={this.props.url}/>
          <a onClick={(e) => {this.handleShare("facebook")}} className="fbShare" href={this.props.fb} target="_blank"><i className="fa fa-facebook-square"></i></a>
          <a onClick={(e) => {this.handleShare("twitter")}} className="twShare" href={this.props.tw} target="_blank"><i className="fa fa-twitter-square"></i></a>
        </div>
        )
    }
}

export default shareImage;