import React from 'react'
import { useParams } from 'react-router-dom'


const TodoItem = ({todo}) => {
    console.log('todo', todo, TodoItem)
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
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
            <td>
                {todo.is_active}
            </td>
        </tr>
    )
}

const TodoUser = ({items}) => {
    let { id } = useParams();
    // console.log(id)
    let filtered_items = items.filter((item) => item.user.id == id)
    console.log(items)
    // let filtered_items = items.filter((item => item.user.includes(parseInt(id))))
    console.log('filtered_items', filtered_items)
    return (
        <table>
            <tr>
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
                Is_active
            </th>
            </tr>
            {filtered_items.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}
export default TodoUser