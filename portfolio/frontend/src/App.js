import React from "react";
import ReactDOM from "react-dom";
import Base from './Base';
import { BrowserRouter } from 'react-router-dom';

const supportsHistory = 'pushState' in window.history;

ReactDOM.render(
        (
            <BrowserRouter forceRefresh={ !supportsHistory }>
                    <Base />
            </BrowserRouter>
        ), document.getElementById('app'));
