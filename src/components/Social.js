import React, { Component } from 'react';
import { FirebaseService } from '../services/FirebaseService';

export class Forum extends Component {
    render() {
        return (
            <div>
                <Feed parent={this.props.recipe.key} />
                <Message parent={this.props.recipe.key} user={this.props.user} />
            </div>
        )
    }
}

export class Feed extends Component {
    constructor(props) {
        super(props);
        this.loadComments();
    }

    state = {
        comments: []
    }


    loadComments = () => {
        FirebaseService.offDataList('comida/comment');
        FirebaseService.getComments((dataReceived) => this.setState({
            comments: dataReceived
        }), this.props.parent);
    }
    render() {
        return (

            <div className="col-md-6 col-xl-8 pl-md-3 px-lg-auto px-0">

                <div className="chat-message">

                    <ul className="list-unstyled chat">
                        {this.state.comments.map(item=> 
                        <li className="d-flex justify-content-between" key={item.key}>
                            <div className="chat-body white p-3 ml-2 z-depth-1">
                                <div className="header" style={{textAlign: "start"}}>
                                    <strong className="primary-font">{item.user}</strong>
                                </div>
                                <hr className="w-100"></hr>
                                    <p className="mb-0">
                                        {item.comment}
                                    </p>
                            </div>
                        </li>
                        )}
                    </ul>

                </div>

            </div>
        )
    }
}

export class Message extends Component {

    state = {
        parent: this.props.parent,
        comment: "",
        user: this.props.user
    }
    handleSubmit = (event) => {
        event.preventDefault();
        FirebaseService.pushData('comida/comment', this.state);
        this.refresh();
    }

    refresh() {
        this.setState({ comment: "" })
    }

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group basic-textarea row">
                        <textarea className="form-control col-md-10 col-sm-12 comment-field" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} placeholder="Type your message here..."></textarea>
                        <button className="btn btn-info col-md-1 col-sm-12">Send</button>
                    </div>
                    
                    
                </form>
            </div>
        )
    }
}