import React from 'react'

class SearchBar extends React.Component{

    state = { term: '', listening: false }

    onChange = (e) => {
        this.setState({ term: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault(); 
        this.props.onSearch(this.state.term);
    }

    onMicClick = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            this.setState({ listening: true });
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.setState({ term: transcript, listening: false }, () => {
                this.props.onSearch(transcript);
            });
        };
        recognition.onerror = (event) => {
            this.setState({ listening: false });
            console.error('Speech recognition error:', event.error);
        };
        recognition.onend = () => {
            this.setState({ listening: false });
        };
        recognition.start();
    }

    render() {
        const { listening, term } = this.state;
        return (
            <form onSubmit={this.onSubmit} className='search-form'>
                <input
                    onChange={this.onChange}
                    value={term}
                    placeholder='Search'
                    type='text'
                />
                <button
                    type='button'
                    onClick={this.onMicClick}
                    className={`mic-btn${listening ? ' mic-active' : ''}`}
                    title='Search by voice'
                >
                    🎤
                </button>
            </form>
        )
    }
}
export default SearchBar