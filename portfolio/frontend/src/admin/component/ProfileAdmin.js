import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Image,
    Col, Row
} from 'react-bootstrap';
import { _ } from 'underscore';

class ProfileAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience_list: props.experience_list,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                experience_list: this.props.experience_list,
            })
        }
    }

    render() {
        const { experience_list } = this.state;
        return (
            <div>
                Profile Admin
            </div>
        );
    }
}

export default ProfileAdmin;