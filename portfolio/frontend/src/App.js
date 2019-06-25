import React from "react";
import ReactDOM from "react-dom";
import Base from './Base';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const supportsHistory = 'pushState' in window.history;
const colorScheme = createMuiTheme({
    "palette": {
        "common": {
            "black": "#000",
            "white": "#fff"
        },
        "background": {
            "paper": "#fff",
            "default": "#fafafa"
        },
        "primary": {
            "light": "rgba(156, 215, 242, 1)",
            "main": "rgba(8, 146, 208, 1)",
            "dark": "rgba(0, 176, 255, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "rgba(46, 36, 29, 1)",
            "main": "rgba(16, 12, 8, 1)",
            "dark": "rgba(0, 0, 0, 1)",
            "contrastText": "#fff"
        },
        "error": {
            "light": "#e57373",
            "main": "#f44336",
            "dark": "#d32f2f",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(16, 12, 8, 1)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
});

ReactDOM.render(
        (
            <MuiThemeProvider theme={colorScheme}>
                <BrowserRouter forceRefresh={ !supportsHistory }>
                        <Base />
                </BrowserRouter>
            </MuiThemeProvider>
        ), document.getElementById('app'));
