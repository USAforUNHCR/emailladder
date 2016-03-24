import React                                             from "react";
import ReactDOM                                          from "react-dom";
import Poll                                              from './Poll.jsx';
import Share                                             from './Share.jsx';
import Quiz                                              from './Quiz.jsx';
import { Router, Route, IndexRoute, Link, hashHistory}   from 'react-router';


window.testColor = {};

window.testColor.setColor = function(){
  let color = querystring.parse().col;
  if(color === "r"){
    testColor.colName = "red";
    testColor.hex = "#dd2e2e";
  }
  else {
    testColor.colName = "green";
    testColor.hex = "#39bf28"
  }
}();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
          gw: new Groundwork ({ 'api_url': 'https://api.thegroundwork.com',
            'oauth_client_id': 'pub-un-test.caeet--l5KRHVi1lzqT3mwtfOvRffZa28dKyOEzWFOc_c7NZJwDrOYT5n9lcMlG0.kg7QN9cpeKpe4x2ymN6M54AWLJbw'
          }),
        }
    }
    render() {
        return (
        <div className="wrapper">
          <div className="inner-content">
            <div className="header" style={{background: "#dd2e2e"}}>
              <span><h1>ACT NOW</h1><img className="arrowdown" src="/images/arrow.png"/></span><span><h1>SPEAK UP</h1><img className="arrowup" src="/images/arrow.png"/></span>
            </div>
              {React.cloneElement(this.props.children, {groundwork: this.state.gw})}
           </div>
          <footer className="site-footer" style={{background: "#dd2e2e"}} >Powered by <a href="http://unrefugees.org" target="_blank"><img src="/images/U4Ulogo.png"/></a></footer>
        </div>
        )
    }
}

export default App;


ReactDOM.render(      
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Poll}/>
        <Route path="share" component={Share}/>
        <Route path="quiz" component={Quiz}/>
      </Route>
    </Router>
, document.getElementById('root')
);





