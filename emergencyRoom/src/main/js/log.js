import React, {Component} from "react";
const client = require("./api/client");

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: []
        }

        this.toPatientForm = this.toPatientForm.bind(this);
        this.createLogElements = this.createLogElements.bind(this);
        this.createInsideLog = this.createInsideLog.bind(this);
    }

    componentDidMount() {
        client({method: "GET", path: "api/logs"}).done(response => {
            this.setState({
                logs: response.entity._embedded.logs
            });
        });
    }

    toPatientForm() {
        this.props.switchStage(0);
    }

    createInsideLog(oneLog) {
        var li = [];
        Object.keys(oneLog).map(oneKey => {
            if (oneKey != "_links") {
                if (oneKey == "home") { 
                    var homeString = "";
                    if (oneLog[oneKey]) {
                        homeString = "Patient was sent home";
                    } else {
                        homeString = "Patient was not sent home";
                    }
                    li.push(
                        <li key={oneKey}>
                            {homeString}
                        </li>
                        );
                } else if (oneKey == "female") {
                    var gender = "";
                    if (oneLog[oneKey]) {
                        gender = "female";
                    } else {
                        gender = "male";
                    }
                    li.push(
                        <li key={oneKey}>
                            gender - {gender}
                        </li>
                        );
                } else {
                    li.push(
                        <li key={oneKey}>
                            {oneKey} - {oneLog[oneKey]}
                        </li>
                        );
                }
            }
        });
        return li;
    }

    createLogElements(logsList) {
        var li = [];
        logsList.map((oneLog, i) => {
            var insideLog = this.createInsideLog(oneLog);
            li.push(
                <li key={"oneLog" + i}>
                    <ul>
                        {insideLog}
                    </ul>
                </li>
                );
        });
        return li;
    }

    render() {
        var logs = this.createLogElements(this.state.logs);
        return (
            <div>
                <button onClick={this.toPatientForm}>To PatientForm</button>
                <ul>
                    {logs}
                </ul>
            </div>
            );
    }
}

export default Log;