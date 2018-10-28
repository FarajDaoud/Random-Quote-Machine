import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            quotes: [],
            quoteText: '',
            quoteAuthor: '',
            twitterHREF: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp',
        };
        this.getQuote = this.getQuote.bind(this);
    }
    
    componentDidMount() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    quotes: result.quotes,
                });
                this.getQuote();
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }

    getRandomQuote() {
        return this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];
    }

    getQuote() {
        const { error, isLoaded } = this.state;
        if (error) {
            this.setState({
                quoteText: 'Error retrieving quote',
                quoteAuthor: '',
            });
        } else if (!isLoaded) {
            this.setState({
                quoteText: 'Loading...',
                quoteAuthor: '',
            });
        } else {
            let randomQuote = this.getRandomQuote();
            this.setState({
                quoteText: randomQuote.quote,
                quoteAuthor: '- ' + randomQuote.author,
                twitterHREF: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + randomQuote.quote + '" - ' + randomQuote.author)
            });
        }
    }

    render() {
        
        return(
            <div id="quote-wrapper">
                <div id="quote-box">
                    <div id="quote-container">
                        <span id="quote-text">"{this.state.quoteText}"</span>
                        <span id="quote-author">{this.state.quoteAuthor}</span>
                    </div>
                    <div id="button-container">
                        <a href={this.state.twitterHREF} id="tweet-quote">Tweet this quote</a>
                        <button id="new-quote" onClick={this.getQuote}>Get a new quote</button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

/*

*/