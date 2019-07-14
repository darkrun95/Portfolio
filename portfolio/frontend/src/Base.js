import React, { Component } from 'react';
import BodyContainer from './body/container/BodyContainer';
import { Preloader, Placeholder } from 'react-preloading-screen';
import { Image } from 'react-bootstrap';
import { Provider } from 'react-redux'

import store from './store';

class Base extends Component {
    render() {
        return (
            <Provider store={ store }>
                <div className="Base inintoku-app">
                    <Preloader>
                        <BodyContainer />

                        <Placeholder>
                            <span>
                                <Image src="/static/inintoku/img/spinner.svg" fluid />
                            </span>
                        </Placeholder>
                    </Preloader>
                </div>
            </Provider>
        );
    }
}

export default Base;
