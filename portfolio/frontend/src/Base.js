import React, { Component } from 'react';
import NavigationBarContainer from './navigation/container/NavigationBarContainer';
import BodyContainer from './body/container/BodyContainer';
import { Preloader, Placeholder } from 'react-preloading-screen';
import { Image } from 'react-bootstrap';

class Base extends Component {
    render() {
		return (
			<div className="Base inintoku-app">
                <Preloader>
                    <NavigationBarContainer />
    				<BodyContainer />

                    <Placeholder>
                        <span>
                            <Image src="/static/inintoku/img/spinner.svg" fluid />
                        </span>
                    </Placeholder>
                </Preloader>
			</div>
		);
	}
}

export default Base;
