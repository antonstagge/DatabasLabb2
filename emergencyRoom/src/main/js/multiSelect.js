import React, {Component} from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";


class Multiselect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }
    
    handleSelectChange (value) {
        this.props.onUpdate(value, this.props.id);
    }

    render () {
        return (
            <div>
                <Select 
                multi
                simpleValue  
                value={this.state.value} 
                placeholder={"Select " + this.props.id + "(s)"} 
                options={this.props.data} 
                onChange={this.handleSelectChange} />
            </div>
        );
    }
}

export default Multiselect;