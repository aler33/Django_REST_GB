import React from 'react'
import { Link } from 'react-router-dom'

import App from '../App'


const ProjectItem = ({project, users, deleteProject}) => {
    return (
        <tr>
            <td>
                {/* {project.name} */}
                <Link to={`project/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.url}
            </td>
            <td>
                {project.users.map(item => users.find((user) => user.id == item).username + " ")}
                {/* {project.users.map(item => item.username)} */}
            </td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoProjectList = ({projects, users, deleteProject}) => {
    return (
        <div>
            <h2>Projects</h2>
            <table>
                <th>
                    Name
                </th>
                <th>
                    Url
                </th>
                <th>
                    Users
                </th>
                <th></th>
                {projects.map((project) => <ProjectItem project={project} users={users} deleteProject={deleteProject}/>)}
            </table>
            {/* <Link to='/project/create'>Create</Link> */}
            <div class="btn-group" role="group" aria-label="Vertical button group">              
                <button type="button" ><Link class="btn btn-primary" to='/project/create'>Create</Link></button>
                <button type="button" ><Link class="btn btn-primary" to='/project/find'>Find</Link></button>
            </div>
        </div>
    )
}

export default TodoProjectList