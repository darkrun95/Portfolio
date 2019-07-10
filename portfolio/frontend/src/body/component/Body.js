import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import ExperienceContainer from '../../content/container/ExperienceContainer';
import EducationContainer from '../../content/container/EducationContainer';
import ProjectContainer from '../../content/container/ProjectContainer';
import VolunteerContainer from '../../content/container/VolunteerContainer';

import AuthenticationContainer from '../../admin/container/AuthenticationContainer';
import PortfolioAdminContainer from '../../admin/container/PortfolioAdminContainer';
import LogOutContainer from '../../admin/container/LogOutContainer';

export class Body extends Component {
	render() {
		return (
            <Switch>
                <Route exact path="/" 		    component={ Home } />
                <Route path="/experience" 	    component={ ExperienceContainer }/>
                <Route path="/education" 	    component={ EducationContainer }/>
                <Route path="/projects" 	    component={ ProjectContainer }/>
                <Route path="/volunteering"     component={ VolunteerContainer }/>

                <Route path="/manage"           component={ AuthenticationContainer }/>
                <Route path="/adminportfolio"   component={ PortfolioAdminContainer } />

                <Route path="/logout"           component={ LogOutContainer } />
            </Switch>
		);
	}
}
