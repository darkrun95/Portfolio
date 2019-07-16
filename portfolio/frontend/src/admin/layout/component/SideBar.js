import React, { Component } from 'react';
import { Image, Toast, ListGroup, Button } from 'react-bootstrap';

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.clickEvent = this.clickEvent.bind(this);
		this.state = {
			selectedElement: undefined,
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

	render() {
		return (
			<div className="inintoku-admin-sidebar">
				<div className="inintoku-sidebar-image-container">
					<Image className="inintoku-sidebar-image" 
	                           src="/static/inintoku/img/face.jpg" 
	                           fluid
	                           roundedCircle
	                           thumbnail />
                	<Toast className="inintoku-hidden">
						<Toast.Header className="inintoku-block inintoku-center">
							<strong>Arun Pottekat</strong>
						</Toast.Header>
					</Toast>
                </div>
                <div className="inintoku-admin-sidebar-options">
                	<ListGroup>
                		<ListGroup.Item className="profile" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/profile.svg" className="inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Profile</span>
                        </ListGroup.Item>

	                    <ListGroup.Item className="experience" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/work.svg" className="inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Experience</span>
                        </ListGroup.Item>
	                    
	                    <ListGroup.Item className="qualifications" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/college.svg" className="inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Qualifications</span>
                        </ListGroup.Item>
	                    	                    
	                    <ListGroup.Item className="projects" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/project.svg" className="inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Projects</span>
                        </ListGroup.Item>
	                    
	                    <ListGroup.Item className="skills" onClick={ this.clickEvent }>
	                        <Image src="/static/inintoku/img/skills.svg" className="inintoku-admin-sidebar-icon" />
	                        <span className="inintoku-hidden">Technical Skills</span>
	                    </ListGroup.Item>

	                    <ListGroup.Item className="volunteering" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/activities.svg" className="inintoku-admin-sidebar-icon" />
                            <span className="inintoku-hidden">Volunteering</span>
	                    </ListGroup.Item>
					</ListGroup>      
                </div>
			</div>
		)
	}
}

export default SideBar;