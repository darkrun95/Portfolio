import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

export class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
            bigAvatar: {
                margin: 10,
                width: 60,
                height: 60,
            },
        }));
    }

    render() {
        return (
            <div className={this.classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Grid
                            justify="space-between"
                            container 
                            spacing={10} >
                            <Grid item>
                                { /*Placeholder Item*/ }
                            </Grid>

                            <Grid item>
                                <IconButton
                                    aria-label="Account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    className={this.classes.icon}
                                    color="inherit" >
                                    <Avatar src="/static/inintoku/img/face.jpg" className={this.classes.bigAvatar} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div> 
        )
    }
}
