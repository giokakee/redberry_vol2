import "./first.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import { useDispatch } from "react-redux";
import BackButton from "../components/backbutton";

let geoReg = /ა|ბ|გ|დ|ე|ვ|ზ|თ|ი|კ|ლ|მ|ნ|ო|პ|ჟ|რ|ს|ტ|უ|ფ|ქ|ღ|ყ|შ|ჩ|ც|ძ|წ|ჭ|ხ|ჯ|ჰ| /g;
let redberyReg = /@redberry.ge/;
let whiteSpaceReg = / /;
let numReg = /[\d ]/gm;
let onlyNumReg = /\d/g;

const checkGeoInputs = (reg, value) => {
	return value.match(reg) !== null && value.match(reg).length === value.length && !whiteSpaceReg.test(value) && value.length > 1;
};

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
		let userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
		userFromLocalStorage && setUserInfo(userFromLocalStorage);

		getData();
	}, []);

	useEffect(() => {
		let formIsValid =
			mobileValidation && mailValidation && surnameValidation && nameValidation && team.length > 0 && position.length > 0;

		if (formIsValid) {
			dispatch({ type: "VALID" });
		} else {
			dispatch({ type: "NOTVALID" });
		}
	}, [userInfo]);

	let { mail, team, position, mobile, name, surname } = userInfo;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	let mailValidation = redberyReg.test(mail.slice(mail.length - 12)) && mail.length > 12 && !whiteSpaceReg.test(mail);

	let nameValidation = checkGeoInputs(geoReg, name);
	let surnameValidation = checkGeoInputs(geoReg, surname);

	let mobileValidation =
		mobile.length > 0 &&
		mobile.slice(0, 4) === "+995" &&
		mobile.slice(1).match(numReg).length === mobile.length - 1 &&
		mobile.slice(1).match(onlyNumReg).length === 9 &&
		mobile.length < 14;

	const submit = e => {
		e.preventDefault();
		let formIsValid =
			mobileValidation && mailValidation && surnameValidation && nameValidation && team.length > 0 && position.length > 0;
		formIsValid ? dispatch({ type: "VALID" }) && navigate("/s") : dispatch({ type: "NOTVALID" });
	};

	const userChange = (key, value) => {
		setUserInfo({ ...userInfo, [key]: value });
		localStorage.setItem("user", JSON.stringify({ ...userInfo, [key]: value }));
	};

	// console.log(mobileValidation && mailValidation && surnameValidation && nameValidation && team.length > 0 && position.length > 0);

	return (
		<div className='f'>
			<BackButton />
			<Header />
			<form onSubmit={submit} className='fForm'>
				<div className='f1'>
					<div className={`username ${name.length > 0 && !nameValidation ? "inputError" : ""}`}>
						<label className='name label_top'>სახელი</label>
						<input
							type={"text"}
							placeholder='გრიშა'
							required
							minLength={2}
							onChange={({ target }) => userChange("name", target.value)}
							value={userInfo.name}
						/>
						<label>მინიმუმ 2 სიმბოლო, ქართული ასოები</label>
					</div>
					<div className={`usersecondname ${(userInfo.surname.length > 0) & !surnameValidation ? "inputError" : ""}`}>
						<label className={`surname label_top`}>გვარი</label>
						<input
							type={"text"}
							placeholder='ონიანი'
							required
							minLength={2}
							onChange={({ target }) => userChange("surname", target.value)}
							value={userInfo.surname}
						/>
						<label>მინიმუმ 2 სიმბოლო, ქართული ასოები</label>
					</div>
				</div>
				<div className='f2'>
					<select defaultValue={""} onChange={({ target }) => userChange("team", target.value)} required>
						<option disabled value={""}>
							თიმი
						</option>
						{teams.map(team => {
							return (
								<option value={team.name} selected={userInfo.team === team.name} key={team.id}>
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
								<option value={position.name} selected={userInfo.position === position.name} key={position.id}>
									{position.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className={`f4 ${!mail.length < 1 && !mailValidation ? "inputError" : ""}`}>
					<label className='label_top'>მეილი</label>
					<input
						placeholder='grishaoniani@redberry.ge'
						required
						onChange={({ target }) => userChange("mail", target.value)}
						value={mail}
					/>
					<label>უნდა მთავრდებოდეს @redberry.ge-ით</label>
				</div>
				<div className={`f5 ${!mobileValidation && mobile.length > 0 ? "inputError" : ""}`}>
					<label className='label_top'>ტელეფონის ნომერი</label>
					<input
						placeholder='+995 598 00 07 01'
						required
						onChange={({ target }) => userChange("mobile", target.value)}
						value={mobile}
					/>
					<label>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</label>
				</div>
				<div className='f6'>
					<button type='submit'>შემდეგი</button>
				</div>
			</form>

			<div className='redberryLogo'>
				<div></div>
			</div>
		</div>
	);
};

export default UserInfo;
