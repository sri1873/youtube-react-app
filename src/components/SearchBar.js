import React from 'react'

class SearchBar extends React.Component{

    state={term:''}
    onChange = (e) => {
        this.setState({ term: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault(); 
        this.props.onSearch(this.state.term);
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} placeholder='Search' type={'text'}/>
            </form>
        )
    }
}
export default SearchBar