import React, { Component } from 'react';
import { FirebaseService } from '../services/FirebaseService';
import { Forum } from './Social'
import { Carousel, ListForm, ImageForm } from './Common'



export class RecipeRate extends Component {
    render() {
        return (
            <div className="col-md-3 recipe-info-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="rating-block">
                            <h4>Average user rating</h4>
                            <h2 className="bold padding-bottom-7">4.3 <small>/ 5</small></h2>
                            <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </button>
                            <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </button>
                            <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </button>
                            <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </button>
                            <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


export class RecipeBasicInformation extends Component {
    render() {
        return (
            <div className="col-md-12 recipe-info-master-container">
                <div className="col-md-12 recipe-info-master-child-container">
                    <div className="row">
                        <RecipeRate />
                        <div className="col-md-3 recipe-info-container">
                            <span className="recipe-info">Category</span>
                            <span className="recipe-info recipe-info-value">{this.props.foodType}</span>
                        </div>
                        <div className="col-md-3 recipe-info-container">
                            <span className="recipe-info">Portions</span>
                            <span className="recipe-info recipe-info-value">{this.props.portion} portions</span>
                        </div>
                        <div className="col-md-3 recipe-info-container">
                            <span className="recipe-info">Preparation time</span>
                            <span className="recipe-info recipe-info-value">{this.props.timeToPrepare} min</span>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


export class ListDetail extends Component {
    loadUlList() {
        return <ul className="detail-list">
            {this.loadItems()}
        </ul>
    }

    loadOlList() {
        return <ol className="detail-list">
            {this.loadItems()}
        </ol>
    }

    loadItems() {
        return <>
            {this.props.items.map((item, index) =>
                <li key={index}><span>{item}</span></li>
            )}
        </>
    }

    render() {
        return (<div className="card-container bg-light">
            <h2 className="col-md-12" style={{ textAlign: "start" }}>{this.props.title}</h2>
            {this.props.listType == "ul" ? this.loadUlList() : this.loadOlList()}
        </div>)
    }
}


export class RecipeDetail extends Component {

    handleDelete = () => {
        if (window.confirm(`Are you sure you wish to delete ${this.props.recipe.name}?`)) {
            FirebaseService.removeData("comida/recipe", this.props.recipe.key);
            this.props.backToList();
        }
    }

    handleEdit = () => {
        this.props.handleEdit(this.props.recipe);
    }

    options = () => {
        return (
            <>
                <a href="#" onClick={this.handleDelete} className="float" style={{ backgroundColor: "rgb(204, 0, 27)", marginBottom: "70px" }}>
                    <i className="fa fa-trash my-float"></i>
                </a>

                <a href="#" onClick={this.handleEdit} className="float">
                    <i className="fa fa-pencil-alt my-float"></i>
                </a>
            </>
        )
    }
    render() {
        return <>
            <div className="card-container bg-light">
                <div className="row">
                    <h2 className="col-md-12" style={{ textAlign: "start" }}>{this.props.recipe.name}</h2>
                    <Carousel files={this.props.recipe.files} />
                    <RecipeBasicInformation foodType={this.props.recipe.foodType} timeToPrepare={this.props.recipe.timeToPrepare} portion={this.props.recipe.portion} />
                </div>
            </div>

            <ListDetail title={"Ingredients"} items={this.props.recipe.ingredients} listType={"ul"} />

            <ListDetail title={"Preparion Mode"} items={this.props.recipe.steps} listType={"ol"} />

            <div className="card-container bg-light">
                <h2 className="col-md-12" style={{ textAlign: "start" }}>Comments</h2>
                <Forum recipe={this.props.recipe} user={this.props.user.user} />
            </div>

            {this.props.recipe.user == this.props.user.user ? this.options() : ""}


        </>
    }
}


export class RecipeBasicInformationForm extends Component {
    render() {
        return (
            <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                <div style={{ paddingTop: "50px", paddingBottom: "50px", marginBottom: "5px", minHeight: "200px", backgroundColor: "#e7e7e7" }}>
                    <div className="form-group col-md-6" style={{ display: "inline-block", borderRight: "groove" }}>
                        <h5>Prepare time (minutes)</h5>
                        <input type={Text} className="form-control" value={this.props.timeToPrepare} onChange={(event) => this.props.handleBasicInformation({ timeToPrepare: event.target.value })} />
                    </div>
                    <div className="form-group col-md-6" style={{ display: "inline-block" }}>
                        <h5>Portions</h5>
                        <input type={Text} className="form-control" value={this.props.portion} onChange={(event) => this.props.handleBasicInformation({ portion: event.target.value })} />
                    </div>
                </div>
                <select className="form-control" value={this.props.foodType} onChange={(event) => this.props.handleBasicInformation({ foodType: event.target.value })}>
                    <option value="">Choose a category</option>
                    <option value="Sweet cakes and pies">Sweet cakes and pies</option>
                    <option value="Meat">Meat</option>
                    <option value="Birds">Birds</option>
                    <option value="Fishes and sea food">Fishes and sea food</option>
                    <option value="Salads, sauces and side dishes">Salads, sauces and side dishes</option>
                    <option value="Soups">Soups</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Sweets and desserts">Sweets and desserts</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Single Plate">Single Plate</option>
                    <option value="Light">Light</option>
                    <option value="Healthy eating">Healthy eating</option>
                </select>
            </div>
        )
    }
}


export class RecipeForm extends Component {
    componentWillMount() {
        if (this.props.recipe) {
            this.setState(this.props.recipe);
        }
    }
    state = {
        name: "",
        steps: [],
        ingredients: [],
        files: [],
        timeToPrepare: "",
        portion: "",
        foodType: "",
        user: this.props.user.user
    }

    handleChangeIngredients = (items) => {
        this.setState({ ingredients: items })
    }

    handleChangeSteps = (items) => {
        this.setState({ steps: items })
    }

    handleAdd = () => {
        FirebaseService.pushData('comida/recipe', this.state);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.validate()) {
            alert("Please, fill the fields");
            return;
        }
        this.handleAdd();
        this.props.backToList();
    }

    validate = () => {
        return this.state.name && this.state.files.length && this.state.timeToPrepare && this.state.portion && this.state.foodType;
    }

    handleAddImage = (url) => {
        this.setState(prevState => ({
            files: [...prevState.files, url]
        }));
    }

    render() {
        return (
            <div className="card-container bg-light">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-12">
                        <input className="form-control" placeholder="Recipe Name" type={Text} value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                    </div>
                    <ImageForm handleAddImage={this.handleAddImage} files={this.state.files} />
                    <RecipeBasicInformationForm handleBasicInformation={(data) => this.setState(data)} foodType={this.state.foodType} timeToPrepare={this.state.timeToPrepare} portion={this.state.portion} />
                    <ListForm handleChange={this.handleChangeIngredients} title={"Add Ingredients"} items={this.state.ingredients} />
                    <ListForm handleChange={this.handleChangeSteps} title={"Add Steps"} items={this.state.steps} />
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
        //to clean the state to see detail about recipe
        this.props.cleanDetail();

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
                            <p className="card-text">Prepare time: {recipe.timeToPrepare} min </p>
                            <p>Portions: {recipe.portion}</p>
                            <a href="#" className="btn btn-primary" onClick={(event) => this.handleDetail(event, recipe)}>Detail</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
