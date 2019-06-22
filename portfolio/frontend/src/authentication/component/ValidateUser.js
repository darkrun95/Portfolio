import React, { Component } from 'react';
import { _ } from 'underscore';
import { Image } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

export class ValidateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expire_flag: props.expire_flag,
            username: props.username,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                expire_flag: this.props.expire_flag,
                username: this.props.username,
            })
        }
    }

    render() {
        const { expire_flag, username } = this.state;
        return (
            <div>
            {   
                expire_flag ? 
                <div className="container inintoku-default-margin">
                    <Image src="/static/inintoku/img/cross.svg" className="inintoku-validation-symbol" />
                    <p><strong>Oops.</strong> Seems like the verification link has expired.</p>
                    <p>Try <strong><Link
                        to = {{
                            pathname: "/sign-up/"
                        }} >creating your account</Link></strong> again to access the best of what Inintoku has to offer.</p>
                </div> :
                <div className="container inintoku-default-margin">
                    <Image src="/static/inintoku/img/tick.svg" className="inintoku-validation-symbol" />
                    <h3 className="h3">Hello, { username }</h3>
                    <p>Welcome to <strong>Inintoku's</strong> growing community</p>
                    <p>Your account has been verified, and is now ready for use.</p>
                </div>
            }
            </div>
        );
    }
}
