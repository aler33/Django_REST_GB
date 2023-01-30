import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import TodoList from './components/Todo.js'
import ProjectList from './components/Project.js';
import TodoUser from './components/TodoUser.js';
import ProjectOne from './components/ProjectOne.js';
import axios from 'axios'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import './bootstrap.min.css';
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'todos': [],
      'projects': [],
      'token': '',
      'login': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    const logi = localStorage.getItem("login")
    this.setState({'login': logi})
    this.setState({'token': token}, ()=>this.load_data())
  }

  is_authenticated() {
    return this.state.token != ''
  }
    
  logout() {
    this.set_token('')
    localStorage.setItem("login", "")
    this.setState({'login': ""}) // TEST LOGIN
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const logi = localStorage.getItem("login")
    this.setState({'login': logi})
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
    password: password})
    .then(response => {
      this.setState({'login': username}) // TEST LOGIN
      localStorage.setItem("login", username);
      this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated())
      {
        headers['Authorization'] = 'Token ' + this.state.token
      }
    return headers
  }

  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', {headers})
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo', {headers})
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({todos: []})
})

    axios.get('http://127.0.0.1:8000/api/project', {headers})
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))
  }


  componentDidMount() {
    this.get_token_from_storage()
    // this.load_data()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
          <h4 align="right">{this.state.login}</h4>
            <div class="btn-group" role="group" aria-label="Vertical button group">              
              <button type="button" ><Link class="btn btn-primary" to='/'>Users</Link></button>
              <button type="button" ><Link class="btn btn-primary" to='/todo'>Todo</Link></button>
              <button type="button" ><Link class="btn btn-primary" to='/project'>Project</Link></button>
              {this.is_authenticated() ? <button type="button" onClick={()=>this.logout()} class="btn btn-primary" >Logout</button> : <button type="button" ><Link class="btn btn-primary" to='/login'>Login</Link></button>}
            </div>
            
          </nav>
          <Switch>
            <Route exact path='/' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} />} />
            <Route exact path='/project' component={() => <ProjectList projects={this.state.projects} users={this.state.users} />} />
            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            <Route path='/user/:id'> <TodoUser items={this.state.todos} /></Route>
            <Route path='/project/:name'> <ProjectOne items={this.state.projects} /></Route>
            <Redirect from='/user' to='/' />
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
