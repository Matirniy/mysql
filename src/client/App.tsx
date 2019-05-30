import * as React from 'react';
import './scss/app';
// import { render } from 'react-dom';


export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.key = 1;
        this.state = { users: [] };
        this.req = '';
        this.buttonclick = this.buttonclick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sentclick = this.sentclick.bind(this);
    }

    async componentWillMount() {
        let r = await fetch('/api/users');
        let users = await r.json();
        this.setState({ users })
        $("#hide").fadeOut(0);
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
        // User.comand(this.req);
    }

    handleChange(event) {
        this.req = event.target.value;
    }

    render() {

        return (
            <main className="container">
                <h1 className="covalence-blue">Hello</h1>
                <div className="gener"><input type="text" className="command" onChange={this.handleChange} /><button className="gener-but" onClick={this.sentclick}>sent SQL</button></div>
                <button className="command-but" onClick={this.buttonclick}>Показать Users</button>
                <div className="list-group" id="hide">
                    <div className="list-group-tit">
                        <div className="tit1">Login</div>
                        <div className="tit2">Password</div>
                    </div>
                    <div className="list-group-items">
                        <div className="column1">
                            {this.state.users.map(user => {
                                return <div className="item">{user.Login}</div>
                            })}
                        </div>
                        <div className="column2">
                            {this.state.users.map(user => {
                                return <div className="item">{user.Password}</div>
                            })}
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
    users: Array<{ Login: string, Password: number }>;
}

