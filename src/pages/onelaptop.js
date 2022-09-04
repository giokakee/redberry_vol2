import "./onelaptop.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OneLaptop = () => {
	const { id } = useParams();
	const [info, setInfo] = useState("");

	useEffect(() => {
		const getData = async () => {
			let { data } = await axios.get(
				`https://pcfy.redberryinternship.ge/api/laptop/${id}?token=698ce0db8f2ea3171936833d768ca0d1`
			);

			setInfo(data.data);
		};

		getData();
	}, [id]);

	return (
		<div className='oneLaptop'>
			<div className='oneLaptopHeader'>
				<div className='fBackButton onelaptopBackButton'>
					<Link to={"/list"}></Link>
				</div>
				<h1>ლეპტოპის ინფო</h1>
			</div>

			{info ? (
				<div className='laptopBox'>
					<div className='laptopBoxDiv paldopBoxDivBorder'>
						<div className='infoDiv'>
							<div className='imageDiv'>
								<img src={`https://pcfy.redberryinternship.ge${info.laptop.image}`} alt='laptop' />
							</div>
						</div>
						<div className='infoDiv'>
							<div>
								<p className='key'>სახელი:</p>
								<p className='value'>{info.user.name}</p>
							</div>
							<div>
								<p className='key'>თიმი:</p>
								<p className='value'>{info.user.team_id}</p>
							</div>
							<div>
								<p className='key'>პოზიცია:</p>
								<p className='value'>{info.user.position_id}</p>
							</div>
							<div>
								<p className='key'>მეილი:</p>
								<p className='value'>{info.user.email}</p>
							</div>
							<div>
								<p className='key'>ტელ.ნომერი:</p>
								<p className='value'>{info.user.phone_number}</p>
							</div>
						</div>
					</div>
					<div className='laptopBoxDiv paldopBoxDivBorder'>
						<div className='infoDiv'>
							<div>
								<p className='key'>ლეპტოპის სახელი:</p>
								<p className='value'>{info.laptop.name}</p>
							</div>
							<div>
								<p className='key'>ლეპტოპის ბრენდი:</p>
								<p className='value'>{info.laptop.brand_id}</p>
							</div>
							<div>
								<p className='key'>RAM:</p>
								<p className='value'>{info.laptop.ram}</p>
							</div>
							<div>
								<p className='key'>მეხსიერების ტიპი:</p>
								<p className='value'>{info.laptop.hard_drive_type}</p>
							</div>
						</div>
						<div className='infoDiv'>
							<div>
								<p className='key'>CPU:</p>
								<p className='value'>{info.laptop.cpu.name}</p>
							</div>
							<div>
								<p className='key'>CPU-ს ბირთვი:</p>
								<p className='value'>{info.laptop.cpu.cores}</p>
							</div>
							<div>
								<p className='key'>CPU-ს ნაკადი:</p>
								<p className='value'>{info.laptop.cpu.threads}</p>
							</div>
						</div>
					</div>
					<div className='laptopBoxDiv'>
						<div className='infoDiv'>
							<div>
								<p className='key'>ლეპტოპის მდგომარეობა:</p>
								<p className='value'>{info.laptop.state === "new" ? "ახალი" : "მეორადი"}</p>
							</div>
							<div>
								<p className='key'>ლეპტოპის ფასი:</p>
								<p className='value'>{info.laptop.price}</p>
							</div>
						</div>
						<div className='infoDiv'>
							<div>
								<p className='key'>შეძენის რიცხვი:</p>
								<p className='value'>{info.laptop.purchase_date && info.laptop.purchase_date}</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default OneLaptop;
