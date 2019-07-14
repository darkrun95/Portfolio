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
                	<Toast>
						<Toast.Header className="inintoku-block inintoku-center">
							<strong>Arun Pottekat</strong>
						</Toast.Header>
					</Toast>
                </div>
                <div className="inintoku-admin-sidebar-options">
                	<ListGroup>
                		<ListGroup.Item className="profile" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/profile.svg" className="inintoku-sidebar-icon" />
                            Profile
                        </ListGroup.Item>

	                    <ListGroup.Item className="experience" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/work.svg" className="inintoku-sidebar-icon" />
                            Experience
                        </ListGroup.Item>
	                    
	                    <ListGroup.Item className="qualifications" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/college.svg" className="inintoku-sidebar-icon" />
                            Qualifications
                        </ListGroup.Item>
	                    	                    
	                    <ListGroup.Item className="projects" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/project.svg" className="inintoku-sidebar-icon" />
                            Projects
                        </ListGroup.Item>
	                    
	                    <ListGroup.Item className="skills" onClick={ this.clickEvent }>
	                        <Image src="/static/inintoku/img/skills.svg" className="inintoku-sidebar-icon" />
	                        Technical Skills
	                    </ListGroup.Item>

	                    <ListGroup.Item className="volunteering" onClick={ this.clickEvent }>
                            <Image src="/static/inintoku/img/activities.svg" className="inintoku-sidebar-icon" />
                            Volunteering
	                    </ListGroup.Item>
					</ListGroup>      
                </div>

                <div className="inintoku-admin-sidebar-footer">
                	<Button 
                		className="inintoku-change-password-button"
	                    variant="outline-warning"
	                    onClick={ this.handleLogOut }>Change Password</Button>
                </div>
			</div>
		)
	}
}

export default SideBar;