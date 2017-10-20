import React, {Component} from "react";

export default class Header extends Component {

  constructor(props) {
     super(props);
  }

  componentWillMount() {
   
  }

  render() {

    let length = this.props.cartLength;
    return (
        <div className="header">
            <h2>{this.props.title}</h2>
        </div>
    )
   }


}
