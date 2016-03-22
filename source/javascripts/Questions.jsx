import React                                from "react";
import Rx                                   from "rx";
import R                                    from "ramda";

class QuizQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QuizQuestions';
    }

    handleAnswer(event,question){
      this.props.handleAnswer(parseInt(event.target.id), question);
    }

    render() {
      const Question = (questions) => createQuestionEl(R.head(questions));

      const createQuestionEl = (question) => {
        return (
          <div className="question_container" onClick={(e) => this.handleAnswer(e,question.q)}>
            <p className="question_text">
              {question.q}
            </p>
            <div className="answers_container">
              {createAnswers(question.answers)}
            </div>
          </div>
        )
      }

      const createAnswers = (answers) => {
        const mapWithIndex = R.addIndex(R.map);
        return mapWithIndex((val,idx) => createAnswerEl(val,idx), answers);
      }

      const createAnswerEl = (answer,index) => {
        return(
          <div className="answer_container" key={index} >
            <button className="answer_button" id={index} value={answer}>{answer}</button>
        </div>
        )
      }
        return <div>{Question(this.props.questions)}</div>;
    }
}
export default QuizQuestions;
