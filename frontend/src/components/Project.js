import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({project, users, deleteProject}) => {
    // console.log(project.users, users)
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
    console.log(projects)
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
        </div>
    )
}
export default TodoProjectList