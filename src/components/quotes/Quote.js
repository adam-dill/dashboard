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
        const hour = 1000 * 60 * 60;
        setInterval(this.fetchData, hour);
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
            <blockquote class="blockquote">
                <p class="mb-0">{this.state.quote}</p>
                <footer class="blockquote-footer">{this.state.author}</footer>
            </blockquote>
        )
    }

    render() { 
        const display = !this.state.quote 
            ? <em>loading quote...</em> 
            : this.renderQuote();
        return ( 
            <div className="mt-5">
                {display}
            </div>
         );
    }
}
 
export default Quote;