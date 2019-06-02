import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import { FirebaseService } from '../services/FirebaseService';
import { Forum } from './Social'

export class RecipeDetail extends Component {
    renderDetail() {
        return <>
            <div className="card-container bg-light">
                <div className="row">
                    <h2 className="col-md-12" style={{ textAlign: "start" }}>{this.props.recipe.name}</h2>
                    <div className="carousel slide col-md-12" data-ride="carousel" id="carouselExampleControls">
                        <div className="carousel-inner">
                            {this.props.recipe.files.map((file, index) =>
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
                    </div>
                    <div className="col-md-12 recipe-info-master-container">                
                    <div className="col-md-12 recipe-info-master-child-container">
                        <div className="row">
                        <div className="col-md-3 recipe-info-container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="rating-block">
                                        <h4>Average user rating</h4>
                                        <h2 class="bold padding-bottom-7">4.3 <small>/ 5</small></h2>
                                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 recipe-info-container">
                            <span className="recipe-info">Categoria</span>
                            <span className="recipe-info recipe-info-value">{this.props.recipe.foodType}</span>
                        </div>
                        <div className="col-md-3 recipe-info-container">
                            <span className="recipe-info">Rendimento</span>
                            <span className="recipe-info recipe-info-value">{this.props.recipe.portion} porções</span>
                        </div>
                        <div className="col-md-3 recipe-info-container">
                            <span className="recipe-info">Preparo</span>
                            <span className="recipe-info recipe-info-value">{this.props.recipe.timeToPrepare} min</span>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-container bg-light">
                <h2 className="col-md-12" style={{ textAlign: "start" }}>Ingredientes</h2>
                <ul className="detail-list">
                    {this.props.recipe.ingredients.map((ingredient, index) =>
                        <li key={index}>{ingredient}</li>
                    )}
                </ul>
            </div>
            <div className="card-container bg-light">
                <h2 className="col-md-12" style={{ textAlign: "start" }}>Modo de Preparo</h2>
                <ol className="detail-list">
                    {this.props.recipe.steps.map((step, index) =>
                        <li key={index}><span>{step}</span></li>
                    )}
                </ol>
            </div>

            <div className="card-container bg-light">
                <h2 className="col-md-12" style={{ textAlign: "start" }}>Comentários</h2>
                <Forum recipe={this.props.recipe} user={this.props.user.user} />
            </div>

        </>
    }
    render() {
        return (
            <div>
                {this.props.recipe ? this.renderDetail() : <h1>Click to see</h1>}
            </div>
        )
    }
}

export class RecipeForm extends Component {
    state = {
        name: "",
        steps: [],
        ingredients: [],
        files: [],
        timeToPrepare: "",
        portion: "",
        foodType: ""

    }
    handleAddStep = (event) => {
        event.preventDefault();
        this.setState(prevState => ({ steps: [...prevState.steps, ""] }));
    }
    handleAddIngredient = (event) => {
        event.preventDefault();
        this.setState(prevState => ({ ingredients: [...prevState.ingredients, ""] }));
    }
    handleChangeStep = (event, index) => {
        const { steps } = this.state;
        steps[index] = event.target.value;
        this.setState({ steps: steps })
    }
    handleChangeIngredient = (event, index) => {
        const { ingredients } = this.state;
        ingredients[index] = event.target.value;
        this.setState({ ingredients: ingredients })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.refresh()
    }
    refresh = () => {
        this.setState({
            name: "",
            ingredients: [],
            steps: [],
            files: []
        })
    }

    handleUploadSuccess = (filename) => {
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState(prevState => ({
            files: [...prevState.files, url]
        }
        )));
    };

    render() {
        return (
            <div className="card-container bg-light">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-12">
                        <input className="form-control" placeholder="Recipe Name" type={Text} value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                    </div>
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
                                onUploadSuccess={this.handleUploadSuccess}
                            />
                        </label>
                    </div>
                    <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                        <div style={{ paddingTop: "50px", paddingBottom: "50px", marginBottom: "5px", minHeight: "200px", backgroundColor: "#e7e7e7" }}>
                            <div className="form-group col-md-6" style={{ display: "inline-block", borderRight: "groove" }}>
                                <h5>Prepare time (minutes)</h5>
                                <input type={Text} className="form-control" value={this.state.timeToPrepare} onChange={(event) => this.setState({ timeToPrepare: event.target.value })} />
                            </div>
                            <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                                <h5>Portions</h5>
                                <input type={Text} className="form-control" value={this.state.portion} onChange={(event) => this.setState({ portion: event.target.value })} />
                            </div>
                        </div>
                        <select className="form-control" value={this.state.foodType} onChange={(event) => this.setState({ foodType: event.target.value })}>
                            <option value="">Escolha uma categoria</option>
                            <option value="Bolos e tortas doces">Bolos e tortas doces</option>
                            <option value="Carnes">Carnes</option>
                            <option value="Aves">Aves</option>
                            <option value="Peixes e frutos do mar">Peixes e frutos do mar</option>
                            <option value="Saladas, molhos e acompanhamentos">Saladas, molhos e acompanhamentos</option>
                            <option value="Sopas">Sopas</option>
                            <option value="Massas">Massas</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Doces e sobremesas">Doces e sobremesas</option>
                            <option value="Lanches">Lanches</option>
                            <option value="Prato Único">Prato Único</option>
                            <option value="Light">Light</option>
                            <option value="Alimentação Saudável">Alimentação Saudável</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                        <div style={{ padding: "10px", marginBottom: "5px", height: "400px", backgroundColor: "#e7e7e7", overflowY: "auto" }}>
                            <ul className="list-group">
                                {this.state.ingredients.map((ingredient, index) =>
                                    <li key={index} className="list-group-item">
                                        <span style={{ marginRight: "5px" }} className="badge badge-primary badge-pill">{index + 1}</span>
                                        <input style={{ display: "inline-block", width: "90%" }} type={Text} className="form-control" value={ingredient} onChange={(event) => this.handleChangeIngredient(event, index)} />
                                    </li>
                                )}
                            </ul>
                        </div>
                        <button style={{ width: "100%" }} type="button" className="btn btn-primary" onClick={this.handleAddIngredient}>Add Ingredient</button>
                    </div>
                    <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                        <div style={{ padding: "10px", marginBottom: "5px", height: "400px", backgroundColor: "#e7e7e7", overflowY: "auto" }}>
                            <ul className="list-group">
                                {this.state.steps.map((step, index) =>
                                    <li key={index} className="list-group-item">
                                        <span style={{ marginRight: "5px" }} className="badge badge-primary badge-pill">{index + 1}</span>
                                        <input style={{ display: "inline-block", width: "90%" }} type={Text} className="form-control" value={step} onChange={(event) => this.handleChangeStep(event, index)} />
                                    </li>
                                )}
                            </ul>
                        </div>
                        <button style={{ width: "100%" }} type="button" className="btn btn-primary" onClick={this.handleAddStep}>Add Step</button>
                    </div>
                    <a href="#" onClick={this.handleSubmit} className="float">
                        <i className="fa fa-check my-float"></i>
                    </a>
                </form>
            </div>
        );
    }
}

export class RecipeList extends Component {
    _isMounted = false;

    state = {
        recipes: []
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount = () => {
        this._isMounted = true;
        FirebaseService.offDataList('comida/recipe');
        if (this.props.menuActive === "my") {
            FirebaseService.getDataList('comida/recipe', (dataReceived) => {
                if (this._isMounted) {
                    this.setState({
                        recipes: dataReceived
                    })
                }
            }, null, this.props.user.user);
        } else {
            FirebaseService.getDataList('comida/recipe', (dataReceived) => this.setState({
                recipes: dataReceived
            }), null);
        }
    }

    handleDetail = (event, recipe) => {
        event.preventDefault();
        this.props.showDetail(recipe);
    }
    render() {
        return (
            <div className="card-container bg-light">
                {this.state.recipes.map((recipe, index) =>
                    <div key={index} className="card" style={{ width: "18rem", display: "inline-block", marginRight: "10px", marginBottom: "10px" }}>
                        <img className="card-img-top" src={recipe.files[0]} alt="Card image cap" width={286} height={180} />
                        <div className="card-body">
                            <h5 className="card-title">{recipe.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{recipe.foodType}</h6>
                            <p className="card-text">Tempo de preparo: {recipe.timeToPrepare} Porções: {recipe.portion}</p>
                            <a href="#" className="btn btn-primary" onClick={(event) => this.handleDetail(event, recipe)}>Detail</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
