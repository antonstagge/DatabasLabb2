import React, {Component} from "react";

class DoctorForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.patient);
        return (
            <h1>hello world</h1>
            );
    }
}

export default DoctorForm;