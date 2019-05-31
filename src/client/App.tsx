import * as React from 'react';
import './scss/app';

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.key = 1;
        this.state = {
            users: [],
            command: 'SELECT * FROM management_rights',
            response: null,
            file: null,
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
        console.log(data);
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
        // console.log(event.target.value);
        this.setState({
            command: event.target.value,
        })
    }

    handleFileUpload = (event) => {
        this.setState({
            file: event.target.files[0],
        });
    }

    generclick() {
        generate(100, 2);
    }

    render() {

        const {
            command,
            file
        } = this.state;

        console.log(this.state);

        return (
            <main className="container">
                <h1 className="covalence-blue">Hello Derban</h1>
                <div className="function">
                    <div className="sentsql">
                        <input type="text" className="command" value={command} onChange={this.handleChange} />
                        <button className="gener-but" onClick={this.sentclick}>Sent SQL command</button>
                    </div>
                    <div className="generate">
                        <input type="file" className="file" onChange={this.handleFileUpload} />
                        <button className="gener-but" onClick={this.generclick}>Generate users</button></div>
                </div>
                <div className="showusers">
                    <button className="command-but" onClick={this.buttonclick}>Показать Users</button>
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
    users: Array<{ Login: string, Password: number, Code: number }>;
}

function generate(x, b) {
    let str = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let first = b;
    let last = first + x;
    for (first; first < last; first++) {
        let leng = Math.round(Math.random() * (10 - 4) + 4);
        let login = '';
        let pass = '';
        for (let i = 0; i < leng; i++) {
            login += characters.charAt(Math.floor(Math.random() * characters.length));
            pass += Math.round(Math.random() * (10 - 1) + 1);
        }
        str += first + ';' + login + ';' + pass + ';' + '4' + '\n';
    }
    console.log(str);
    const fs = require('fs');

    fs.writeFile("./111.txt", str, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}