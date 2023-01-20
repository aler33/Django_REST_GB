import React from 'react'
import { Link } from 'react-router-dom'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`user/${user.id}`}>{user.username}</Link>
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                email
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}
export default UserList