import React, { Component } from 'react';
import { Image, Toast, ListGroup, Button } from 'react-bootstrap';
import { _ } from 'underscore';
import { Link } from "react-router-dom";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.clickEvent = this.clickEvent.bind(this);
		this.state = {
			selectedElement: undefined,
			profile_image: props.profile_image,
		}
	}

	clickEvent(event) {
		const selection = event.target.className.split(" ")[0]
		const { handleChangeSelection } = this.props;
		const { selectedElement } = this.state;
		if (selectedElement === undefined) {
			$(event.target).addClass("selected");
		} else {
			$("."+selectedElement).removeClass("selected");
			$(event.target).addClass("selected");
		}

		this.setState({
			selectedElement: selection
		}, () => {
			handleChangeSelection(selection);
		})
	}

	componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                profile_image: this.props.profile_image,
            })
        }
    }

	render() {
		const { profile_image } = this.state;
		return (
			<div>
				<div className="inintoku-sidebar-image-container">
					<Link
                        to = {{
                            pathname: "/",
                        }} >
						<Image className="inintoku-sidebar-image" 
		                           src={"/" + profile_image}
		                           fluid
		                           roundedCircle
		                           thumbnail />
	                </Link>
                	<Toast className="inintoku-hidden">
						<Toast.Header className="inintoku-block inintoku-center">
							<strong>Arun Pottekat</strong>
						</Toast.Header>
					</Toast>
                </div>
                <div className="inintoku-admin-sidebar-options">
                	<ListGroup>
                		<ListGroup.Item className="profile" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/profile.svg" className="profile inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Profile</span>
                        </ListGroup.Item>

	                    <ListGroup.Item className="experience" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/work.svg" className="experience inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Experience</span>
                        </ListGroup.Item>
	                    
	                    <ListGroup.Item className="qualifications" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/college.svg" className="qualifications inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Qualifications</span>
                        </ListGroup.Item>
	                    	                    
	                    <ListGroup.Item className="projects" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/project.svg" className="projects inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Projects</span>
                        </ListGroup.Item>
	                    
	                    <ListGroup.Item className="skills" onClick={ this.clickEvent }>
	                        <Image src="/static/inintoku/img/skills.svg" className="skills inintoku-admin-sidebar-icon" />
	                        <span className="inintoku-hidden">Technical Skills</span>
	                    </ListGroup.Item>

	                    <ListGroup.Item className="volunteering" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/activities.svg" className="volunteering inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Volunteering</span>
	                    </ListGroup.Item>
					</ListGroup>      
                </div>
            </div>
		)
	}
}

export default SideBar;