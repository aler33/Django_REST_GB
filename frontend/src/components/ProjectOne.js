import React from 'react'
import { useParams } from 'react-router-dom'


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

const ProjectOne = ({items}) => {
    let { name } = useParams();
    let filtered_items = items.filter((item) => item.name == name)
    return (
        <div>
            <h1>Информация по проекту</h1>
            <h1>{name}</h1>
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
            {filtered_items.map((project) => <ProjectItem project={project}/>)}
        </table>
        </div>
    )
}

export default ProjectOne