import React,{Component} from "react"
import Comment from "./Comment"
import PropTypes from "prop-types"

class CommentList extends Component{
	static propTypes ={
		comments:PropTypes.array,
		onDeleteComment:PropTypes.func
	}
	static defaultProps={
		comments:[]
	}
	handleDeleteComment(){
		if(this.props.onDeleteComment){
			this.props.onDeleteComment(this);
		}
	}
	render(){
		return(
			<div>
				{this.props.comments.map((comment,i)=>
					<Comment comment={comment} key={i} index={i} onDeleteComment={this.handleDeleteComment.bind(this)}/>
				)
				}
			</div>
		)
	}
}

export default CommentList;