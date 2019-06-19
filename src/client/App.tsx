import * as React from 'react';
import './scss/app';
import generate from './utils/generate';


export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.key = 1;
        this.state = {
            users: [],
            command: 'SELECT * FROM management_rights',
            numbgener: 10,
            response: null,
        };

        this.buttonclick = this.buttonclick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sentclick = this.sentclick.bind(this);
        this.generclick = this.generclick.bind(this);
    }

    async componentWillMount() {
        let r = await fetch('/api/users');
        let users = await r.json();
        this.setState({ users })
        $("#hide").fadeOut(0);
    }

    async componentDidMount() {
        const {
            command
        } = this.state;
        let r = await fetch(`/api/selector?selection=${command}`)
        let data = await r.json();
        this.setState({
            response: data,
        });
    }

    buttonclick() {
        if (this.key == 1) {
            $("#hide").fadeIn("slow");
            this.key = this.key * (-1);

        } else if (this.key == -1) {
            $("#hide").fadeOut("slow");
            this.key = this.key * (-1);
        }

    }

    sentclick() {
        this.componentDidMount();
        this.render();
        this.componentWillMount();
    }

    handleChange(event) {
        this.setState({
            command: event.target.value,
        })
    }

    handleNumber = (event) => {
        this.setState({
            numbgener: event.target.value,
        });
    }

    generclick() {
        const{
            numbgener,
            users
        } = this.state;
        let first= users.length;
        generate(numbgener, first);
        this.state.command='LOAD DATA INFILE "D:/generateData.txt" INTO TABLE users FIELDS TERMINATED BY ";" LINES TERMINATED BY "."';
        this.componentDidMount();
    }

    render() {
        const {
            command,
            numbgener
        } = this.state;


        return (
            <main className="container">
                <h1 className="covalence-blue">Hello Admin</h1>
                <div className="function">
                    <div className="sentsql">
                        <input type="text" className="command" value={command} onChange={this.handleChange} />
                        <button className="gener-but" onClick={this.sentclick}>Sent SQL command</button>
                    </div>
                    <div className="generate">
                        <input type="text" className="generate-number" value={numbgener} onChange={this.handleNumber} />
                        <button className="gener-but" onClick={this.generclick}>Generate users</button></div>
                </div>
                <div className="showusers">
                    <button className="command-but" onClick={this.buttonclick}>Show Users</button>
                    <div className="list-group" id="hide">
                        <div className="list-group-tit">
                            <div className="tit1">Code</div>
                            <div className="tit2">Login</div>
                            <div className="tit3">Password</div>
                        </div>
                        <div className="list-group-items">
                            <div className="column1">
                                {this.state.users.map(user => {
                                    return <div className="item">{user.Code}</div>
                                })}
                            </div>
                            <div className="column2">
                                {this.state.users.map(user => {
                                    return <div className="item">{user.Login}</div>
                                })}
                            </div>
                            <div className="column3">
                                {this.state.users.map(user => {
                                    return <div className="item">{user.Password}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

}

interface IAppProps {

}

interface IAppState {
    command: string;
    numbgener: number;
    users: Array<{ Login: string, Password: number, Code: number }>;
}
