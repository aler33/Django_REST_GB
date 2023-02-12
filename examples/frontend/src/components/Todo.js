import React from 'react'
import {Link} from 'react-router-dom'


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user.username}
                {/* {todo.user} */}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
            <td>
                {todo.isActive ? '+' : '-'}
                {/* {todo.isActive} */}
            </td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <h2>Todo</h2>
            <table>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    User
                </th>
                <th>
                    Created
                </th>
                <th>
                    Updated
                </th>
                <th>
                    IsActive
                </th>
                <th></th>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
            </table>
            {/* <Link to='/todo/create'>Create</Link> */}
            <div class="btn-group" role="group" aria-label="Vertical button group">              
              <button type="button" ><Link class="btn btn-primary" to='/todo/create'>Create</Link></button>
            </div>
        </div>
    )
}
export default TodoList