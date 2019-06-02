import React, { Component } from 'react';

export class LateralMenu extends Component {
    changeMenu = (event, menu) => {
        this.props.onChangeMenu(menu);
        event.preventDefault();
    }
    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Comida +</h3>
                </div>

                <ul className="list-unstyled components">
                    <li className={this.props.menu === "home" ? "active" : ""}>
                        <a href="#" onClick={(event) => this.changeMenu(event, "home")}>Home</a>
                    </li>
                    <li className={this.props.menu === "my" ? "active" : ""}>
                        <a href="#" onClick={(event) => this.changeMenu(event, "my")} style={{ display: this.props.user ? "block" : "none" }}>My Recipes</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export class TopMenu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <button type="button" id="sidebarCollapse" className="btn btn-info">
                        <i className="fas fa-align-left"></i>
                    </button>
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item active">
                                {this.props.user ? <a className="nav-link" href="#">{this.props.user.user}</a> : <a className="nav-link" href="#" onClick={this.props.handleLogInShow}>Log In</a>}
                            </li>
                            <li className="nav-item" style={this.props.user ? {display: "none"} : {display:"block"}}>
                                <a className="nav-link" href="#" onClick={this.props.handleSignInShow}>Sign Up</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
