import React, { Component } from 'react';
import { Image, Link } from 'react-bootstrap';
import { _ } from 'underscore';
 
class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                profile: this.props.profile,
            })
        }
    }

    render() {
        const { profile } = this.state;
        return (
            <div>
                <h2>Hello, </h2>
                <p>
                    I'm <strong>{ profile.first_name } { profile.last_name }</strong>, { profile.description }
                </p>
                <div className="inintoku-footer">
                    <div className="inintoku-social">
                        <a target="_blank" href={ profile.github_link }>
                            <Image src="/static/inintoku/img/github.svg" thumbnail roundedCircle />
                        </a>
                    </div>
                    <div className="inintoku-social">
                        <a target="_blank" href={ profile.linkedin_link }>
                            <Image src="/static/inintoku/img/linkedin.svg" thumbnail roundedCircle />
                        </a>
                    </div>
                    <div className="inintoku-social">
                        <a href={'mailto:' + profile.email }>
                            <Image src="/static/inintoku/img/google.svg" thumbnail roundedCircle />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;
