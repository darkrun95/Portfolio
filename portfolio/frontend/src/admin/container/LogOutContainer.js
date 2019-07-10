import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LogOutContainer extends Component {
    constructor(props) {
        super(props);
    }

    renderRedirect() {
        localStorage.removeItem("acs_token");
        return <Redirect to="/" />
    }

    render() {
        return (
            <div>
            {
                this.renderRedirect()
            }
            </div>
        )
    }
}

export default LogOutContainer;
