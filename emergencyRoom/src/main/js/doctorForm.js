import React, {Component} from "react";
import Multiselect from "./multiselect";
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

class DoctorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            procedures: [
                {label: "hej", value: "hejval"},
                {label: "bajs", value: "bajsbal"},
                {label: "balle", value: "balleval"},
                {label: "bla", value: "bla"}
            ],
            drugs: [
                {label: "hej", value: "hejval"},
                {label: "bla", value: "blaval"}
            ],
            selectedProcedures: [],
            selectedDrugs: [],
            update: false
        }

        this.getPatientInfo = this.getPatientInfo.bind(this);
        this.addProcedure = this.addProcedure.bind(this);
        this.addDrug = this.addDrug.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        client({method: "GET", path: this.props.patient._links.issue.href}).then(response => {
            return client({method: "GET", path: response.entity._links.procedures.href});
        }).done(response => {
            response.entity._embedded.issueProcedures.map(oneProcedure => {
                this.state.procedures.push({
                    label: oneProcedure.name + " " + oneProcedure.cost + "kr",
                    value: oneProcedure.name + "." + oneProcedure.cost
                });
                this.setState({update: !this.state.update});
            });
        });

        client({method: "GET", path: "api/drugs"}).then(response => {
            response.entity._embedded.drugs.map(oneDrug => {
                this.state.drugs.push({
                    label: oneDrug.name + " " + oneDrug.cost + "kr",
                    value: oneDrug.name + "." + oneDrug.cost
                });
                this.setState({update: !this.state.update});
            });    
        });
    }

    addProcedure(value, id) {
        var splitValues = value.split(",");
        if (splitValues.length > 3) {
            console.log("got in");
            this.setState({
                selectedProcedures: this.state.selectedProcedures
            });
        } else {
            this.setState({
                selectedProcedures: value
            });
        }
    }

    addDrug(value, id) {
        var splitValues = value.split(",");
        if (splitValues.length > 3) {
            console.log("got in");
            this.setState({
                selectedDrugs: this.state.selectedDrugs
            });
        } else {
            this.setState({
                selectedDrugs: value
            });
        }
    }

    submit() {
        console.log("submit click");
    }

    getPatientInfo(patient) {
        var info = [];
        if (patient.name) {
            info.push(<tr key={1}>
                <th>Name</th>
                <td>{patient.name}</td>
                </tr>);
        }
        if (patient.age) {
            info.push(<tr key={2}>
                <th>Age</th>
                <td>{patient.age}</td>
                </tr>);
        }
        if (patient.ssn) {
            info.push(<tr key={3}>
                <th>SSN</th>
                <td>{patient.ssn}</td>
                </tr>);
        }
        if (patient.female) {
            var toShow = "";
            if (patient.female) {
                toShow = "Female";
            } else {
                toShow = "Male";
            }
            info.push(<tr key={4}>
                <th>Gender</th>
                <td>{toShow}</td>
                </tr>);
        }
        if (patient.priority) {
            info.push(<tr key={5}>
                <th>Priority</th>
                <td>{patient.priority}</td>
                </tr>);
        }
        if (patient.waitingTime) {
            info.push(<tr key={6}>
                <th>Waiting time</th>
                <td>{patient.waitingTime}</td>
                </tr>);
        }
        return info;
    }

    render() {
        var patientInfo = this.getPatientInfo(this.props.patient); 
        return (
            <table style={outerTdStyle}>
                <tbody>
                    <tr>
                        <th style={outerTdStyle}>Patient</th>
                        <th style={outerTdStyle}>Choose procedure(s)</th>
                        <th style={outerTdStyle}>Choose drugs(s)</th>
                        <th style={outerTdStyle}>Send home?</th>
                    </tr>
                    <tr>
                        <td style={outerTdStyle}>
                            <table>
                                <tbody>
                                    {patientInfo}
                                </tbody>
                            </table>
                        </td>
                        <td style={outerTdStyle}>
                            Choose max 3 procedures:
                            <Multiselect id="procedures" 
                                value={this.state.selectedProcedures}
                                data={this.state.procedures}
                                onUpdate={this.addProcedure}/>
                        </td>
                        <td style={outerTdStyle}>
                            Choose max 3 drugs:
                            <Multiselect id="drugs" 
                                value={this.state.selectedDrugs}
                                data={this.state.drugs}
                                onUpdate={this.addDrug}/>
                        </td>
                        <td style={outerTdStyle}>
                            Patient sent home :
                            <input type="checkbox" ref="home"/>
                        </td>
                        <td style={outerTdStyle}>
                            <button onClick={this.submit}>SUBMIT</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            );
    }
}

export default DoctorForm;