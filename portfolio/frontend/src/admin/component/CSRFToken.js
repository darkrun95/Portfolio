import React, { Component } from 'react';

class CSRFToken extends Component {
    constructor(props) {
        super(props);

        this.getCookie = this.getCookie.bind(this);
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    render() {
        const csrftoken = this.getCookie("csrftoken");
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
        )
    }
}

export default CSRFToken;