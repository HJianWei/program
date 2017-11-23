import React,{Component} from "react"

class Test extends Component{
	handleClick(){
		console.log(this.p.clientHeight);
	}
	render(){
		return(<p onClick={this.handleClick.bind(this)} ref={(p)=>this.p=p}>{this.props.sentence}</p>)
	}
}
export default Test;