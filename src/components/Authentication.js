import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export class SignIn extends Component {
    state = {
        user: "",
        password: ""
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.refresh()
    }
    refresh = () => {
        this.setState({
            user: "",
            password: ""
        })
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <input type={Text} placeholder="User" className="form-control mb-1" value={this.state.user} onChange={(event) => this.setState({ user: event.target.value })} />
                            <input type="password" placeholder="Password" className="form-control mb-1" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Cadastrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export class LogIn extends Component {
    state = {
        user: "",
        password: ""
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.refresh()
    }
    refresh = () => {
        this.setState({
            user: "",
            password: ""
        })
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Entrar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <input type={Text} placeholder="User" className="form-control mb-1" value={this.state.user} onChange={(event) => this.setState({ user: event.target.value })} />
                            <input type="password" placeholder="Password" className="form-control mb-1" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Entrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
