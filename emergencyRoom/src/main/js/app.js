import React, {Component} from "react";
import PatientForm from "./patientForm";
import DoctorForm from "./doctorForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            currentPatient: {}
        }

        this.switchStage = this.switchStage.bind(this);
    }

    switchStage(stage, patient) {
        if (patient) {
            this.setState({
                stage: stage,
                currentPatient: patient
            });
        } else {
            this.setState({
                stage: stage
            });
        }
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