import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', url: '', users: [] }
    }

    handleChange(event) {
        // this.setState(
        //     {
        //         [event.target.name]: event.target.value
        //     }
        // );
        console.log(event.target.selectedOptions)
        if ([event.target.name] == 'users') {   
            
                    let users = []
                    
                for (let i =0; i < event.target.selectedOptions.length; i++) {
                    users.push(event.target.selectedOptions.item(i).value)
                }
                this.setState(
                    {
                        users: users
                    }
                )
         
        }
        else {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
        // console.log(this.state)
        // console.log(this.state.users)
    }

    handleSubmit(event) {
        // console.log(this.state.name)
        // console.log(this.state.url)
        // console.log(this.state.users)
        this.props.createProject(this.state.name, this.state.url, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" className="form-control" name="name"
                        value={this.state.name} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="url">URL</label>
                    <input type="text" className="form-control" name="url"
                        value={this.state.url} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="users">Users</label>
                    <select multiple="multiple" name="users" className='form-control'
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option
                            value={item.id}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm