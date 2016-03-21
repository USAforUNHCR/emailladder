import React                                from "react";
import Querystring                          from "query-string";
import Signup                               from "./Signup.jsx";
import R                                    from "ramda";

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Results';
        this.answers = this.props.answers;
        this.questions = this.props.questions;
    }


    render() {
        const resultsZip = R.zipWith((question,answer) => {
          question.yourAns = answer;
          return question;
        })
        const mapWithIndex = R.addIndex(R.map);
        const resultEl = mapWithIndex((question,index) => question.yourAns == question.a ? correctEl(question,index) : wrongEl(question,index));

        const correctEl = (question,index) => {
          return (
            <div key={index} className="correct_answer">
              <p>The Question was: {question.q}</p>
              <p>The Answer was: {question.answers[question.a]}</p>
              <p>You were correct!</p>
            </div>
            )
        }

        const wrongEl = (question,index) => {
          return (
            <div key={index} className="wrong_answer">
              <p>The Question was: {question.q}</p>
              <p>The Answer was: {question.answers[question.a]}</p>
              <p>Your Answer was: {question.answers[question.yourAns]}</p>
              <p>You were incorrect :(</p>
            </div>
            )
        }

        const results = R.compose(resultEl,resultsZip)

        return (
            <div>
              {results(this.questions,this.answers)}
             </div>
             )
    }
}

export default Results;
