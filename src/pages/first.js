import "./first.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";

const UserInfo = () => {
	const [teams, setTeams] = useState([]);
	const [positions, setPositions] = useState([]);

	const [userInfo, setUserInfo] = useState({
		name: "",
		surname: "",
		team: "",
		position: "",
		mail: "",
		mobile: "",
	});

	useEffect(() => {
		const getData = async () => {
			let teamsData = await axios.get("https://pcfy.redberryinternship.ge/api/teams");
			let positionsData = await axios.get("https://pcfy.redberryinternship.ge/api/positions");

			setTeams(teamsData.data.data);
			setPositions(positionsData.data.data);
		};
		getData();
	}, []);

	const navigate = useNavigate();
	const submit = e => {
		e.preventDefault();
		console.log(userInfo);
		navigate("/s");
	};

	const userChange = (key, value) => {
		setUserInfo({ ...userInfo, [key]: value });
	};

	return (
		<div className='f'>
			<div className='fBackButton'>
				<Link to={"/"}></Link>
			</div>
			<Header />
			<form onSubmit={submit} className='fForm'>
				<div className='f1'>
					<div className='username'>
						<label className='name'>სახელი</label>
						<input
							type={"text"}
							placeholder='გრიშა'
							required
							minLength={2}
							onChange={({ target }) => userChange("name", target.value)}
						/>
						<label>მინიმუმ 2 სიმბოლო, ქართული ასოები</label>
					</div>
					<div className='usersecondname'>
						<label className='surname'>გვარი</label>
						<input
							type={"text"}
							placeholder='ონიანი'
							required
							minLength={2}
							onChange={({ target }) => userChange("surname", target.value)}
						/>
						<label>მინიმუმ 2 სიმბოლო, ქართული ასოები</label>
					</div>
				</div>
				<div className='f2'>
					<select defaultValue={""} onChange={({ target }) => userChange("team", target.value)} required>
						<option value={""} disabled>
							თიმი
						</option>
						{teams.map(team => {
							return (
								<option value={team.name} key={team.id}>
									{team.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className='f3'>
					<select defaultValue={""} required onChange={({ target }) => userChange("position", target.value)}>
						<option value={""} disabled>
							პოზიცია
						</option>
						{positions.map(position => {
							return (
								<option value={position.name} key={position.id}>
									{position.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className='f4'>
					<label>მეილი</label>
					<input placeholder='grishaoniani@redberry.ge' required onChange={({ target }) => userChange("mail", target.value)} />
					<label>უნდა მთავრდებოდეს @redberry.ge-ით</label>
				</div>
				<div className='f5'>
					<label>ტელეფონის ნომერი</label>
					<input placeholder='+995 598 00 07 01' required onChange={({ target }) => userChange("mobile", target.value)} />
					<label>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</label>
				</div>
				<div className='f6'>
					<button type='submit'>შემდეგი</button>
				</div>
			</form>
		</div>
	);
};

export default UserInfo;
