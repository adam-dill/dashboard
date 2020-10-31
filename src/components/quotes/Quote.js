import React from 'react';
import get from 'lodash-es/get';

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: undefined,
            author: undefined
        }
    }

    componentDidMount() {
        this.fetchData();
        setInterval(()=>this.fetchData(), 3600000);
    }

    fetchData() {
        fetch("https://quotes.rest/qod?language=en")
            .then(response => response.json())
            .then(data => {
                const quote = get(data, 'contents.quotes.0.quote');
                const author = get(data, 'contents.quotes.0.author');
                this.setState({quote, author});
            })
            .catch(e => setTimeout(this.fetchData, 1000));
    }
    renderQuote() {
        return (
            <blockquote className="blockquote pb-1">
                <p className="mb-0">{this.state.quote}</p>
                <footer className="blockquote-footer">{this.state.author}</footer>
            </blockquote>
        )
    }

    render() { 
        const display = !this.state.quote 
            ? <em>loading quote...</em> 
            : this.renderQuote();
        return ( 
            <div className="mt-5 quote-container">
                {display}
            </div>
         );
    }
}
 
export default Quote;