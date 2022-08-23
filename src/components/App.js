import React from 'react'
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';


class App extends React.Component {
    state = { videos: [], selectedVideo: null };
    onFormSubmit = async (term) => {
        const response = await youtube.get('/search', { params: { q: term } })
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] })
    }
    onVideoSelect = video => {
        this.setState({ selectedVideo: video })
    }
    render() {
        return (
            <div className='grid-container'>
                <div className='grid-item item1'><SearchBar onSearch={this.onFormSubmit} /></div>
                <div className='grid-item item2'><VideoDetail video={this.state.selectedVideo} /></div>
                <div className='grid-item item3'><VideoList data={this.state.videos} onVideoSelect={this.onVideoSelect} /></div>
            </div>
        );
    }
}

export default App