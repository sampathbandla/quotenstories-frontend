import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import User from "./user";

const UserList = () => {
	const [userL, setUserL] = useState([]);

	
	useEffect(() => {
		const lStorage = JSON.parse(localStorage.getItem("user"));
		axios({
			method: 'post',
			url: 'http://127.0.0.1:5000/user/getcustomerlist',
			data: {
				token: lStorage.token
			}
		}).then(response => {
			const users = response.data.USERS;
			setUserL(users)
		});
	}, []);
	return (
		<Container>
				<Row>
						<Col  className="p-5">
								<h3>Customers</h3>
								{
									userL.map(item => (
										<User key={item._id} user={item} />
									))
								}
						</Col>
				</Row>
		</Container>
	)
}

export default UserList;