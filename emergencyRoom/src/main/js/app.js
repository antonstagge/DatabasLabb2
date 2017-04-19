import React, {Component} from "react";
import PatientForm from "./patientForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            currentPatient: {
                name: "testName"
            }
        }

        this.switchStage = this.switchStage.bind(this);
    }

    switchStage(stage) {
        this.setState({
            stage: stage
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
                console.log(this.state.currentPatient.name);
                return (<h2>Doctor form</h2>);
                break;
            case 3:
                return (<h2>Maybe Log?</h2>);
                break;
            default: return (<h1>Something wrong</h1>);
        }
    }
}

export default App;