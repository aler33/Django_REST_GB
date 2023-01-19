import React from 'react'
import { useParams } from 'react-router-dom'


const TodoItem = ({todo}) => {
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
    let filtered_items = items.filter((item) => item.user.id == id)
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