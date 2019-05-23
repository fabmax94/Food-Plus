import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FirebaseService } from './services/FirebaseService';
import { Modal, Button } from 'react-bootstrap';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import Cookies from 'js.cookie';

class RecipeDetail extends Component {
  renderDetail() {
    return <>
      <div className="card-container bg-light">
        <div className="row">
          <h2 className="col-md-12" style={{ textAlign: "start" }}>{this.props.recipe.name}</h2>
          <div className="carousel slide col-md-8" data-ride="carousel" id="carouselExampleControls">
            <div className="carousel-inner">
              {this.props.recipe.files.map((file, index) =>
                <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
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

          <div className="col-md-3" style={{ paddingLeft: "28px", paddingRight: "28px", backgroundColor: "#f0f0f0" }}>
            <div className="col-md-12 recipe-info-container" style={{ borderBottom: "solid grey 1px" }}>
              <span className="recipe-info">Categoria</span>
              <span className="recipe-info recipe-info-value">{this.props.recipe.foodType}</span>
            </div>
            <div className="col-md-12 recipe-info-container">
              <span className="recipe-info">Rendimento</span>
              <span className="recipe-info recipe-info-value">{this.props.recipe.portion} porções</span>
            </div>
            <div className="col-md-12 recipe-info-container" style={{ borderTop: "solid grey 1px" }}>
              <span className="recipe-info">Preparo</span>
              <span className="recipe-info recipe-info-value">{this.props.recipe.timeToPrepare} min</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-container bg-light">
        <h2 className="col-md-12" style={{ textAlign: "start" }}>Ingredientes</h2>
        <ul className="detail-list">
          {this.props.recipe.ingredients.map(ingredient =>
            <li>{ingredient}</li>
          )}
        </ul>
      </div>
      <div className="card-container bg-light">
        <h2 className="col-md-12" style={{ textAlign: "start" }}>Modo de Preparo</h2>
        <ol className="detail-list">
          {this.props.recipe.steps.map((step, index) =>
            <li><span>{step}</span></li>
          )}
        </ol>
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


class SignIn extends Component {
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
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <input type={Text} placeholder="User" className="form-control mb-1" value={this.state.user} onChange={(event) => this.setState({ user: event.target.value })} />
            <input type="password" placeholder="Password" className="form-control mb-1" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSubmit}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
  }
}

class LogIn extends Component {
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
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <input type={Text} placeholder="User" className="form-control mb-1" value={this.state.user} onChange={(event) => this.setState({ user: event.target.value })} />
            <input type="password" placeholder="Password" className="form-control mb-1" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSubmit}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
  }
}

class RecipeForm extends Component {
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

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
    this.loadRecipes();
  }

  loadRecipes = () => {
    FirebaseService.offDataList('comida/recipe');
    if(this.props.menuActive === "my") {
      FirebaseService.getDataList('comida/recipe', (dataReceived) => this.setState({
        recipes: dataReceived
      }), null, this.props.user.user);
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

class LateralMenu extends Component {
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
            <a href="#" onClick={(event) => this.changeMenu(event, "my")} style={{display: this.props.user ? "block" : "none"}}>My Recipes</a>
          </li>
        </ul>
      </nav>
    );
  }
}

class TopMenu extends Component {
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
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.props.handleSignInShow}>Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

class App extends Component {
  state = {
    itemDetail: null,
    menuActive: "list",
    lateralMenu: "home",
    visibleNewButton: true,
    visibleLogIn: false,
    visibleSignIn: false,
    user: Cookies.get('user')
  };
  showDetail = (item) => {
    this.setState({
      itemDetail: item
    });
    this.changeMenu("detail");
  };
  addItem = (item) => {
    item.user = this.state.user.user;
    FirebaseService.pushData('comida/recipe', item);
    this.changeMenu("list");
  };
  
  loadMenu = () => {
    if (this.state.menuActive === "list") {
      return <RecipeList key={this.state.lateralMenu} showDetail={this.showDetail} user={this.state.user} menuActive={this.state.lateralMenu} />
    } else if (this.state.menuActive === "new") {
      return <RecipeForm onSubmit={this.addItem} />
    } else if (this.state.menuActive === "detail") {
      return <RecipeDetail recipe={this.state.itemDetail} />
    }
  }

  changeLateralMenu = (menu) => {
    this.setState({
      lateralMenu: menu,
      menuActive: "list"
    })
  }

  changeMenu = (menu) => {
    this.setState({
      menuActive: menu,
      visibleNewButton: menu === "new" ? false : true
    })
  }

  showNewButton = () => {
    return this.state.visibleNewButton && this.state.user;
  }

  handleLogInClose = () => {
    this.setState({ visibleLogIn: false });
  }

  handleLogInShow = (event) => {
    this.setState({ visibleLogIn: true });
    event.preventDefault();
  }

  handleSignInClose = () => {
    this.setState({ visibleSignIn: false });
  }

  handleSignInShow = (event) => {
    this.setState({ visibleSignIn: true });
    event.preventDefault();
  }

  handleLogIn = (state) => {
    FirebaseService.getDataList('comida/user', (dataReceived) => {
      dataReceived = dataReceived.filter(item => item.user === state.user);
      if(dataReceived.length > 0) {
        if(dataReceived[0].password === state.password) {
          this.setState({ user: dataReceived[0], visibleLogIn: false });
          Cookies.set('user', dataReceived[0], { expires: 500 })
          return;
        }
      }
      alert("Dados inválidos.");
    }, null);
  }

  handleSignIn = (state) => {
    FirebaseService.getDataList('comida/user', (dataReceived) => {
      FirebaseService.offDataList('comida/user');
      dataReceived = dataReceived.filter(item => item.user === state.user);
      if(dataReceived.length > 0) {
        alert("Usuário já existe");
        return;
      }
      FirebaseService.pushData('comida/user', state);
      this.setState({ user: state, visibleSignIn: false });
      Cookies.set('user', state, { expires: 500 })
      return;
    }, null);
  }

  render() {
    return (
      <div className="wrapper">
        <LateralMenu onChangeMenu={this.changeLateralMenu} user={this.state.user} menu={this.state.lateralMenu} />
        <div id="content">
          <TopMenu user={this.state.user} handleLogInShow={this.handleLogInShow} handleSignInShow={this.handleSignInShow} />

          <div className="App">
            {this.loadMenu()}
            <a href="#" onClick={() => this.changeMenu("new")} className="float" style={{ display: this.showNewButton() ? "block" : "none" }}>
              <i className="fa fa-plus my-float"></i>
            </a>
            <LogIn onSubmit={this.handleLogIn} onHide={this.handleLogInClose} show={this.state.visibleLogIn} />
            <SignIn onSubmit={this.handleSignIn} onHide={this.handleSignInClose} show={this.state.visibleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
