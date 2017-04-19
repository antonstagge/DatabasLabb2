import React, {Component} from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";


class SingleSelect extends Component {
    constructor(props) {
        super(props);

        //TODO: disabled as a prop
        this.state = {
            disabled: false,
            crazy: false,
            options: [],
            value: null
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    
    handleSelectChange (value) {
        this.props.onUpdate(value, this.props.id);
        this.setState({
            value: value
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            options: nextProps.data
        });
    }

    componentDidMount(){
        this.componentWillReceiveProps(this.props);
    }

    render () {
        return (
            <div>
                <Select  
                simpleValue 
                disabled={this.state.disabled} 
                value={this.state.value} 
                placeholder="Select..." 
                options={this.state.options} 
                onChange={this.handleSelectChange} />
            </div>
        );
    }
}

export default SingleSelect;