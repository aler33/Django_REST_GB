import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({project}) => {
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
                {project.users.map(item => item.username)}
            </td>
        </tr>
    )
}

const TodoProjectList = ({projects}) => {
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
                {projects.map((project) => <ProjectItem project={project} />)}
            </table>
        </div>
    )
}
export default TodoProjectList