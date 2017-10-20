import React from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Rule from "./rule/components/Rule";

import json from './rules.json';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ruleEngineResult: [],
            ruleParam: 1
        };

    }

    componentWillMount() {

        this.ruleEngine = {

            rulesObj: undefined,

            rulesList: undefined,

            start: function (ruleParam) {

                this.rulesList = this.process(json);

                return this.run(ruleParam);
            },

            process: function (rules) {
                var listOfRules = {};

                rules.forEach((rule) => {
                    listOfRules[rule.id] = rule;
                });

                return listOfRules;
            },

            run: function (ruleParam) {

                var ruleToBeExecuted,
                    result;
                var ruleEngineResult = [];
                var nextRuleId = 1;
                var isRulePassed = false;
                var currentRuleId;

                while (nextRuleId !== null) {

                    currentRuleId = nextRuleId;
                    ruleToBeExecuted = this.rulesList[currentRuleId].rule;
                    result = (new Function('param', ruleToBeExecuted))(ruleParam);

                    if (result) {
                        isRulePassed = true;
                        nextRuleId = this.rulesList[currentRuleId].true_id;

                    } else {
                        isRulePassed = false;
                        nextRuleId = this.rulesList[currentRuleId].false_id;
                    }

                    ruleEngineResult.push(<Rule                        
                        ruleId= {this.rulesList[currentRuleId].id}
                        ruleTitle= {this.rulesList[currentRuleId].title}
                        isRulePassed= {isRulePassed}
                        ruleBody= {ruleToBeExecuted}
                        true_id= {this.rulesList[currentRuleId].true_id}
                        false_id= {this.rulesList[currentRuleId].false_id} />);

                }

                return ruleEngineResult;
                
            }

        };

        

    }

    startRuleEngine() {
    
        console.log(this.textInput.value);
        let ruleEngineResult = this.ruleEngine.start(this.textInput.value);
        
        this.setState(
            {
                ruleEngineResult: ruleEngineResult
            }
        );
    }

    render() {

        return (
            <div>

                <Header title="Rule Engine"/>

                <div className="rules">
                     <div className="rule-param">
                        <label>Rule Param</label>
                        <input type="number" placeholder="1" 
                        ref={(input) => {this.textInput = input;}}/>
                        <input type="button" onClick={() => this.startRuleEngine()} value="Start Rule Engine"/>
                     </div>
                     {this.state.ruleEngineResult}
                </div>

                <Footer year={2017} company="Home"/>

            </div>
        );

    }

}