import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

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
                        <Image src="/static/inintoku/img/github.png" thumbnail roundedCircle />
                    </div>
                    <div className="inintoku-social">
                        <Image src="/static/inintoku/img/linkedin.png" thumbnail roundedCircle />
                    </div>
                    <div className="inintoku-social">
                        <Image src="/static/inintoku/img/google.png" thumbnail roundedCircle />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;
