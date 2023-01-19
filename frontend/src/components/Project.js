import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
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
    )
}
export default TodoProjectList