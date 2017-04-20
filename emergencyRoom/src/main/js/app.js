import React, {Component} from "react";
import PatientForm from "./patientForm";
import DoctorForm from "./doctorForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            currentPatient: {
                name: "Anton Stageg",
                ssn: 950102,
                age: 22,
                female: false,
                priority: 5,
                waitingTime: 40,
                _links: {
                    issue: {
                        href: "http://localhost:8080/api/patients/1/issue"
                    }
                }
            }
        }

        this.switchStage = this.switchStage.bind(this);
    }

    switchStage(stage, patient) {
        console.log(patient);
        this.setState({
            stage: stage,
            currentPatient: patient
        });
    }

    render() {

        switch(this.state.stage) {
            case 0: 
                return (
                    <PatientForm switchStage={this.switchStage} />
                    );
                break;
            case 1: 
                return (
                    <DoctorForm switchStage={this.switchStage}
                        patient={this.state.currentPatient}
                    />
                    );
                break;
            case 3:
                return (<h2>Maybe Log?</h2>);
                break;
            default: return (<h1>Something wrong</h1>);
        }
    }
}

export default App;