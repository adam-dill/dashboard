import React from 'react';

const API_KEY = "6e172ee2ccbd154c25835eb87ef2af21";
const TOKEN = "c75b85695ff9f47549826d4e973ef6eb14a4621e72f102dd98bcb34141582ec9";
const BOARD = "fK1MXPw7";
const LIST = "5f0658643a56a01b9f39652c";

// https://api.trello.com/1/boards/fK1MXPw7/lists?key=6e172ee2ccbd154c25835eb87ef2af21&token=c75b85695ff9f47549826d4e973ef6eb14a4621e72f102dd98bcb34141582ec9
// https://api.trello.com/1/lists/5f0658643a56a01b9f39652c/cards?key=6e172ee2ccbd154c25835eb87ef2af21&token=c75b85695ff9f47549826d4e973ef6eb14a4621e72f102dd98bcb34141582ec9

class Trello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: []
        }
    }

    componentDidMount() {
        this.getData();
        setInterval(this.getData.bind(this), 60000 * 60);
    }

    getData() {
        fetch(`https://api.trello.com/1/lists/${LIST}/cards?key=${API_KEY}&token=${TOKEN}`)
            .then(response => response.json())
            .then(data => {
                const todo = data.map(value => value.name);
                this.setState({todo});
            });
    }

    render() { 
        const items = this.state.todo.map(value => {
            return (<div className="border-bottom py-3">{value}</div>);
        });
        return (
            <div className="mt-5">
                <div className="title">To-Do</div>
                {items}
            </div>
        );
    }
}
 
export default Trello;