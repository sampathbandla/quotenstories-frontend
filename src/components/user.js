import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label,Container, Row, Col } from 'reactstrap';

const User = props => {
	const [toggleCheckbox, setToggleCheckbox] = useState(false);

	const [prem, setPrem] = useState({
		red: false,
		green: false
	});

	const toggleEmail = () => { 
		setToggleCheckbox(!toggleCheckbox);   
		axios({
						method: 'post',
						url: 'https://quotenstories.herokuapp.com/user/getPermissions',
						data: {
								token: JSON.parse(localStorage.user).token,
								userId: props.user._id
						}
		}).then(response => {
			setPrem({
				red: response.data.USER.redButton,
				green: response.data.USER.greenButton 
			});
		})
	}
	
	const redPremission = e => {
		setPrem({
			...prem,
			red: e.target.checked
		});
		var redPremissionValue = e.target.checked;
		axios({
			method: 'post',
			url: 'https://quotenstories.herokuapp.com/user/updatePermissions',
			data: {
			  userId:e.target.getAttribute("dataid"),
			  redButton: redPremissionValue,
			  greenButton: prem.green
			}
		  }).then(response => {
		})
	}

	const greenPremission = e => {
		setPrem({
			...prem,
			green: e.target.checked
		});
		var greenPremissionValue = e.target.checked;
		axios({
			method: 'post',
			url: 'https://quotenstories.herokuapp.com/user/updatePermissions',
			data: {
			  token: JSON.parse(localStorage.user).token,
			  userId:e.target.getAttribute("dataid"),
			  redButton: prem.red,
			  greenButton: greenPremissionValue
			}
		  }).then(response => {
		})
	}

	return(
		<>
			<Container  className="p-2 customerContainer">
                <Row>
                    <Col onClick={toggleEmail}>
                        <strong className="email">{props.user.email}</strong>
                    </Col>
										{
											toggleCheckbox ? (
											<Col className="inputs">
														
													<Label className="inputDiv" ><input dataid={props.user._id} onChange={redPremission} checked={prem.red} type="checkbox" name="red" />red</Label>

													<Label className="inputDiv" ><input dataid={props.user._id} onChange={greenPremission} checked={prem.green} type="checkbox" name="green" />green</Label>
											</Col>
											) : ""
										}
                </Row>
            </Container>
		</>
	)
}

export default User;