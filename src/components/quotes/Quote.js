import React from 'react';
import get from 'lodash-es/get';

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: undefined,
            author: undefined,
            error: undefined
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
                this.setState({quote, author, error: undefined});
            })
            .catch(e => {
                this.setState({error: e.message});
                setTimeout(this.fetchData, 1000);
            });
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
        if (this.state.error !== undefined)
            return <div className='mt-5'>{this.state.error}</div>;
        
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