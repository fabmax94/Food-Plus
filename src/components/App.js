import React, { Component } from 'react';
import '../App.css';
import { FirebaseService } from '../services/FirebaseService';
import Cookies from 'js.cookie';
import { RecipeDetail, RecipeForm, RecipeList } from './Recipe'
import { LogIn, SignIn } from './Authentication'
import { TopMenu, LateralMenu } from './Menu'



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

  cleanDetail = () => {
    this.setState({
      itemDetail: null
    })
  }

  loadMenu = () => {
    if (this.state.menuActive === "list") {
      return <RecipeList key={this.state.lateralMenu} showDetail={this.showDetail} user={this.state.user} menuActive={this.state.lateralMenu} cleanDetail={this.cleanDetail} />
    } else if (this.state.menuActive === "new") {
      return <RecipeForm handleSumit={() => this.changeMenu("list")} user={this.state.user} recipe={this.state.itemDetail} backToList={() => this.changeMenu("list")} />
    } else if (this.state.menuActive === "detail") {
      return <RecipeDetail recipe={this.state.itemDetail} user={this.state.user} handleEdit={() => this.changeMenu("new")} backToList={() => this.changeMenu("list")} />
    }
  }

  changeLateralMenu = (menu) => {
    this.setState({
      lateralMenu: menu
    })
    this.changeMenu("list");
  }

  changeMenu = (menu) => {
    this.setState({
      menuActive: menu,
      visibleNewButton: menu === "list" ? true : false
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
      if (dataReceived.length > 0) {
        if (dataReceived[0].password === state.password) {
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
      if (dataReceived.length > 0) {
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
