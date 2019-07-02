import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import ExperienceContainer from '../../content/container/ExperienceContainer';
import EducationContainer from '../../content/container/EducationContainer';
import ProjectContainer from '../../content/container/ProjectContainer';
import SkillContainer from '../../content/container/SkillContainer';
import VolunteerContainer from '../../content/container/VolunteerContainer';

export class Body extends Component {
	render() {
		return (
            <Switch>
                <Route exact path="/" 		component={ Home } />
                <Route path="/experience" 	component={ ExperienceContainer }/>
                <Route path="/education" 	component={ EducationContainer }/>
                <Route path="/projects" 	component={ ProjectContainer }/>
                <Route path="/skills" 		component={ SkillContainer }/>
                <Route path="/volunteering" component={ VolunteerContainer }/>
            </Switch>
		);
	}
}
