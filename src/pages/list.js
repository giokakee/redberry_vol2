import "./list.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListPage = () => {
	const [list, setList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let { data } = await axios.get("https://pcfy.redberryinternship.ge/api/laptops?token=698ce0db8f2ea3171936833d768ca0d1");
			setList(data.data);
		};

		getData();
	}, []);

	return (
		<div className='listPage'>
			<div className='oneLaptopHeader'>
				<div className='fBackButton onelaptopBackButton'>
					<Link to={"/"}></Link>
				</div>
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
