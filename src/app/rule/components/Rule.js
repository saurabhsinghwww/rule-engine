import React from "react";

export default class Rule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       
        showRuleContent: false

    };    

  }

  toggleRuleContent(){
    this.setState( { showRuleContent : !this.state.showRuleContent } );
  }

   render() {

       return (

        <div className="rule">

            <div className="rule-heading" onClick={ () => this.toggleRuleContent() }>            
             <label className={this.props.isRulePassed ? "rule-number": "rule-number rule-number-failure"}>{this.props.ruleId}</label><label className={this.props.isRulePassed ? "rule-title": "rule-title rule-title-failure"}>{this.props.ruleTitle}</label>
            </div>

            <div className={this.state.showRuleContent ? "rule-content" :"rule-content hide"}>
            
                <div className="rule-body">
                    <label for="ruleBodyId">Rule Body</label>
                    <textarea id="ruleBodyId" rows="4">{this.props.ruleBody}</textarea>
                </div>
                
                <div className="rule-passed">
                    <label>Next rule-id if passed</label> 
                    <label className="rule-output">{this.props.true_id}</label>
                </div>
                
                <div className="rule-failed">
                    <label>Next rule-id if failed</label>
                    <label className="rule-output">{this.props.false_id}</label>
                </div>
            
            </div>
        </div>
       );

   }

}
