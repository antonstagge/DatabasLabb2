import React, {Component} from "react";
import SingleSelect from "./singleSelect";
import patientInputCheck from "./patientInputCheck";
const client = require("./api/client");

const tableStyle = {
    margin: "auto",
    border: "1px solid black",
    borderCollapse: "collapse"
}
const innerTdStyle = {
    margin: "5px",
    padding: "10px"
}
const outerTdStyle = {
    margin: "5px",
    padding: "10px",
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "300px",
    textAlign: "center"
}

class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            selectedIssue: "",
            selectedTeam: "",
            teamChoises: [],
            update: false,
            queue: []
        }

        this.submit = this.submit.bind(this);
        this.toLog = this.toLog.bind(this);
        this.updateIssue = this.updateIssue.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
        this.getTeams = this.getTeams.bind(this);
        this.getPatientsInQueue = this.getPatientsInQueue.bind(this);
        this.sortQueue = this.sortQueue.bind(this);
        this.makeQueue = this.makeQueue.bind(this);
        this.calculateWaitingTime = this.calculateWaitingTime.bind(this);
    }

    componentDidMount() {
        client({method: "GET", path: "api/issues"}).done(response => {
            var tempIssueArray = [];
            response.entity._embedded.issues.map(oneIssue => {
                tempIssueArray.push({
                    label: oneIssue.name,
                    value: oneIssue._links.self.href
                });
            });
            this.setState({
                issues: tempIssueArray
            });
        });
    }

    submit() {
        var patient = {};
        Object.keys(this.refs).map(oneKey => {
            patient[oneKey] = this.refs[oneKey].value;
        });
        patient["issue"] = this.state.selectedIssue;
        patient["team"] = this.state.selectedTeam;

        var newPatient = patientInputCheck(patient);

        if (newPatient.error) {
            alert(newPatient.error);
            return;
        }
        newPatient["waitingTime"] = this.calculateWaitingTime(newPatient, this.state.queue);
        console.log(newPatient);

        client({
            method: "POST",
            path: "api/patients",
            entity: newPatient,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            this.props.switchStage(1, response.entity);
        }, badResponse => {
            console.log(badResponse);
            alert("Something went wrong. Error code: " + badResponse.status.code);
        });
    }

    toLog() {
        this.props.switchStage(3);
    }

    updateIssue(value) {
        this.setState({
            selectedIssue: value
        });
        this.getTeams(value);
    }

    updateTeam(value) {
        this.setState({
            selectedTeam: value
        });
        this.getPatientsInQueue(value)
    }

    calculateWaitingTime(patient, queue) {
        var waitingTime = 0;
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].priority >= patient.priority) {
                waitingTime += queue[i].priority * 10;
            }
        }
        return waitingTime;
    }

    getTeams(issue) {
        if (issue == null) {
            this.setState({
                teamChoises: [],
                selectedTeam: "",
                selectedIssue: "",
                queue: []
            });
            return;
        }
        var path = issue + "/canBeTreatedBy";
        this.state.teamChoises = [];
        client({method: "GET", path: path}).done(response => {
            response.entity._embedded.canTreats.map(oneCanTreat => {
                client({method: "GET", path: oneCanTreat._links.team.href}).done(response => {
                    this.state.teamChoises.push({
                        label: response.entity.name,
                        value: response.entity._links.self.href
                    });
                    this.setState({update: !this.state.update});
                });
            });
        });
    }

    getPatientsInQueue(teamLink, listOfPatients){
        if(teamLink == null){
            this.setState({queue: [], selectedTeam: ""});
            return;
        }
        var path = teamLink + "/queue";
        this.state.queue = [];
            client({method: "GET", path: path}).done(response => {
                response.entity._embedded.patients.map(onePatient => {
                    this.state.queue.push({
                        name: onePatient.name,
                        priority: onePatient.priority
                    });
                    this.setState({update: !this.state.update});
                });
        }); 
    }

    sortQueue(unsortedQueue){
        return unsortedQueue.sort((a,b) => {
            return b.priority - a.priority;
        });
    }

    makeQueue(sortedQueue){
        var listToReturn =[];
        sortedQueue.map((onePatient,i) => {
            listToReturn.push(
                <li key={i}>
                    Name: {onePatient.name} - Priority: {onePatient.priority}
                </li>
                );
        });
        return listToReturn;
    }

    render() {
        var sortedQueue = this.sortQueue(this.state.queue);
        var queue = this.makeQueue(sortedQueue);
        console.log(sortedQueue);
        return (
            <div>
                <button onClick={this.toLog}>To Log</button>
                <h1>Patient Form</h1>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <th style={outerTdStyle}>Patient Info</th>
                            <th style={outerTdStyle}>Medical Issue</th>
                        </tr>
                        <tr>
                            <td style={outerTdStyle}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td style={innerTdStyle}><input ref="name" type="text" placeholder="Enter name..."/></td>
                                        </tr>
                                        <tr>
                                            <th>Age</th>
                                            <td style={innerTdStyle}><input ref="age" type="number" placeholder="Enter age..."/></td>
                                        </tr>
                                        <tr>
                                            <th>SSN*</th>
                                            <td style={innerTdStyle}><input ref="ssn" type="number" placeholder="YYMMDD"/></td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td style={innerTdStyle}>
                                                <select 
                                                    id="gender"
                                                    ref="female">
                                                    <option value=""></option>
                                                    <option value={true}>female</option>
                                                    <option value={false}>male</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style={outerTdStyle}>
                                Enter Issue*: 
                                <SingleSelect id="issue" data={this.state.issues} onUpdate={this.updateIssue}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={outerTdStyle}>Priority</th>
                            <th style={outerTdStyle}>Team</th>
                        </tr>
                        <tr>
                            <td style={outerTdStyle}>Enter a Priority (5 is max)*:
                                <select 
                                    id="priority"
                                    ref="priority">
                                    <option value=""></option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </td>
                            <td style={outerTdStyle}>
                                Enter Team*: 
                                <SingleSelect 
                                    id="team"
                                    data={this.state.teamChoises}
                                    onUpdate={this.updateTeam}
                                    noResultsText="Enter issue first"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2} style={outerTdStyle}>Queue</th>
                        </tr>
                        <tr>
                            <td colSpan={2} style={outerTdStyle}>
                                <ol>
                                    {queue}
                                </ol>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.submit}>SUBMIT</button>
            </div>
            );
    }
}

export default PatientForm;