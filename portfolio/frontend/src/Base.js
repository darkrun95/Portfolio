import React, { Component } from 'react';
import BodyContainer from './body/container/BodyContainer';
import NavigationBarContainer from './navigation/container/NavigationBarContainer';
import { Preloader, Placeholder } from 'react-preloading-screen';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class Base extends Component {
    constructor(props) {
        super(props);
        this.classes = makeStyles(theme => ({
            progress: {
                margin: theme.spacing(1),
            },
        }));
    }

    render() {
		return (
			<div className="Base inintoku-app">
                <Preloader>
                    <NavigationBarContainer />
    				<BodyContainer />

                    <Placeholder>
                        <span>
                            <CircularProgress className={this.classes.progress} />
                        </span>
                    </Placeholder>
                </Preloader>
			</div>
		);
	}
}

export default Base;
