import React from 'react'


class ProjectSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {searchStr: ''}
    }

    handleChange (event)
    {    
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }    

    handleSubmit(event) {
        this.props.search_project(this.state.searchStr)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="search">Search</label>
                    <input type="text" className="form-control" name="searchStr"
                    value={this.state.searchStr} onChange={(event) => this.handleChange (event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
            );
        }
    }

export default ProjectSearch