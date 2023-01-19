import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import TodoList from './components/Todo.js'
import ProjectList from './components/Project.js';
import TodoUser from './components/TodoUser.js';
import axios from 'axios'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import './bootstrap.min.css';


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
      'projects': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo')
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/project')
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <div class="btn-group" role="group" aria-label="Vertical button group">
              <button type="button" ><Link class="btn btn-primary" to='/'>Users</Link></button>
              <button type="button" ><Link class="btn btn-primary" to='/todo'>Todo</Link></button>
              <button type="button" ><Link class="btn btn-primary" to='/project'>Project</Link></button>
            </div>
          </nav>
          <Switch>
            <Route exact path='/' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} />} />
            <Route exact path='/project' component={() => <ProjectList projects={this.state.projects} />} />
            <Route path='/user/:id'> <TodoUser items={this.state.todos} /></Route>
            <Redirect from='/user' to='/' />
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
