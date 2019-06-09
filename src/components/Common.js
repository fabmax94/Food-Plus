import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import React, { Component } from 'react';

export class Carousel extends Component {
    render() {
        return (
            <div className="carousel slide col-md-12" data-ride="carousel" id="carouselExampleControls">
                <div className="carousel-inner">
                    {this.props.files.map((file, index) =>
                        <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                            <img className="d-block w-100" src={file} />
                        </div>
                    )}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>)
    }
}


export class ImageForm extends Component {
    componentDidMount() {
        this.setState({
            files: this.props.files
        })
    }
    state = {
        files: []
    }

    handleUploadSuccess = (filename) => {
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
            this.setState(prevState => ({
                files: [...prevState.files, url]
            }));
            this.props.handleAddImage(url);
        });
    };

    render() {
        return (
            <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                <div style={{ padding: "10px", marginBottom: "5px", minHeight: "200px", backgroundColor: "#e7e7e7" }}>
                    {this.state.files.map((file, index) =>
                        <img src={file} key={index} style={{ width: "20%", float: "left", marginRight: "5px", marginBottom: "5px" }} />
                    )}
                </div>
                <label className="btn btn-primary" htmlFor="image" style={{ width: "100%" }}>
                    Add Image
                        <FileUploader
                        hidden
                        multiple
                        randomizeFilename
                        id="image"
                        accept="image/*"
                        storageRef={firebase.storage().ref('images')}
                        onUploadSuccess={this.handleUploadSuccess} />
                </label>
            </div>
        )
    }
}

export class ListForm extends Component {
    componentDidMount() {
        this.setState({
            items: this.props.items
        })
    }
    state = {
        items: []
    }
    handleAdd = (event) => {
        event.preventDefault();
        this.setState(prevState => ({ items: [...prevState.items, ""] }));
    }
    handleChange = (event, index) => {
        const { items } = this.state;
        items[index] = event.target.value;
        this.setState({ items: items })
        this.props.handleChange(items);
    }
    render() {
        return (
            <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                <div style={{ padding: "10px", marginBottom: "5px", height: "400px", backgroundColor: "#e7e7e7", overflowY: "auto" }}>
                    <ul className="list-group">
                        {this.state.items.map((item, index) =>
                            <li key={index} className="list-group-item">
                                <span style={{ marginRight: "5px" }} className="badge badge-primary badge-pill">{index + 1}</span>
                                <input style={{ display: "inline-block", width: "90%" }} type={Text} className="form-control" value={item} onChange={(event) => this.handleChange(event, index)} />
                            </li>
                        )}
                    </ul>
                </div>
                <button style={{ width: "100%" }} type="button" className="btn btn-primary" onClick={this.handleAdd}>{this.props.title}</button>
            </div>
        )
    }
}