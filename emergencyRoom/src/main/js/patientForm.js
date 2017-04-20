import React, {Component} from "react";
import SingleSelect from "./singleSelect";
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
    borderCollapse: "collapse"
}

class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            selectedIssue: "",
            selectedTeam: "",
            teamChoises: [],
            update: false
        }

        this.submit = this.submit.bind(this);
        this.toDoctorForm = this.toDoctorForm.bind(this);
        this.updateIssue = this.updateIssue.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
        this.getTeams = this.getTeams.bind(this);
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

        console.log(patient);
        //var newPatient = patientInputCheck(patient);
    }

    toDoctorForm() {
        this.props.switchStage(1);
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
    }

    getTeams(issue) {
        if (issue == null) {
            this.setState({
                teamChoises: [],
                selectedTeam: "",
                selectedIssue: ""
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

    render() {

        return (
            <div>
                <button onClick={this.toDoctorForm}>Doctor Form</button>
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
                                            <td style={innerTdStyle}><input ref="age" type="text" placeholder="Enter age..."/></td>
                                        </tr>
                                        <tr>
                                            <th>SSN*</th>
                                            <td style={innerTdStyle}><input ref="ssn" type="text" placeholder="Enter 6 didigt ssn..."/></td>
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
                                Enter Issue: 
                                <SingleSelect id="issue" data={this.state.issues} onUpdate={this.updateIssue}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={outerTdStyle}>Priority</th>
                            <th style={outerTdStyle}>Team</th>
                        </tr>
                        <tr>
                            <td style={outerTdStyle}>Enter a Priority (5 is max):
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
                                Enter Team: 
                                <SingleSelect 
                                    id="team"
                                    data={this.state.teamChoises}
                                    onUpdate={this.updateTeam}
                                    noResultsText="Enter issue first"
                                />
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