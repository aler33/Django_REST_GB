import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    const users = [
      {
        'username': 'User_1',
        'firstname': 'Ivan',
        'lastname': 'Ivanov',
        'email': 'user1@test.com'
      },
      {
        'username': 'User_2',
        'firstname': 'Vasya',
        'lastname': 'Petrov',
        'email': 'user2@test.com'
      },
    ]
    this.setState(
      {
        'users': users
      }
    )
  }

  render () {
    return (
      <div>
        <UserList users={this.state.users} />
      </div>
      )
  }
}

export default App;
