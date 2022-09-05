import "./list.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListPage = () => {
	const [list, setList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let { data } = await axios.get("https://pcfy.redberryinternship.ge/api/laptops?token=698ce0db8f2ea3171936833d768ca0d1");
			setList(data.data);
		};

		getData();
	}, []);

	const navigate = useNavigate("/");

	return (
		<div className='listPage'>
			<div className='oneLaptopHeader'>
				<div className='lBackButton'>
					<Link to={"/"}></Link>
				</div>
				<div onClick={() => navigate("/")} className='lBackButton fBackButton onelaptopBackButton'></div>
				<h1>ჩანაწერების სია</h1>
			</div>
			<div className='laptopList'>
				{list.map(info => {
					return (
						<div key={info.laptop.id} className='laptopDiv'>
							<img src={`https://pcfy.redberryinternship.ge${info.laptop.image}`} alt='laptop' />
							<div>
								<p className='listUserName'>{info.user.name}</p>
								<p className='listLaptopName'>{info.laptop.name}</p>
								<Link to={`${info.laptop.id}`}>მეტის ნახვა</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ListPage;
