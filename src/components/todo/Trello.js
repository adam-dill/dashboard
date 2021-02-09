import React from 'react';


class Trello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: []
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        setInterval(this.fetchData, 60000 * 60);
    }

    fetchData() {
        debugger;
        fetch(`https://api.trello.com/1/lists/${this.props.api.LIST}/cards?key=${this.props.api.API_KEY}&token=${this.props.api.TOKEN}`)
            .then(response => response.json())
            .then(data => {
                const todo = data.map(value => value.name);
                this.setState({todo});
            })
            .catch(e => setTimeout(this.fetchData, 1000));;
    }

    render() { 
        const items = this.state.todo.map((value, index) => {
            return (<li key={index}>{value}</li>);
        });
        return (
            <div className="mt-5">
                <div className="title">To-Do</div>
                <ul className="todo-list">{items}</ul>
            </div>
        );
    }
}
 
export default Trello;