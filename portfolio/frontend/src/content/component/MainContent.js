import React, { Component } from 'react';
import { Image, Link } from 'react-bootstrap';

class MainContent extends Component {
    render() {
        return (
            <div>
                <h2>Hello, </h2>
                <p>
                    I'm <strong>Arun Pottekat</strong>, a Melbourne-based Developer <br/>
                    devloping clean and modern code for the World Wide Web.
                </p>
                <div className="inintoku-footer">
                    <div className="inintoku-social">
                        <a href="https://github.com/darkrun95/">
                            <Image src="/static/inintoku/img/github.png" thumbnail roundedCircle />
                        </a>
                    </div>
                    <div className="inintoku-social">
                        <a href="https://www.linkedin.com/in/arunpottekat/">
                            <Image src="/static/inintoku/img/linkedin.png" thumbnail roundedCircle />
                        </a>
                    </div>
                    <div className="inintoku-social">
                        <a href="mailto: contact@arunpottekat.me">
                            <Image src="/static/inintoku/img/google.png" thumbnail roundedCircle />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;
