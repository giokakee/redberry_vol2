import "./second.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

const LaptopInfo = ({ firstPageIsValid }) => {
	const [brands, setBrands] = useState([]);
	const [cpus, setCpus] = useState([]);
	const [img, setImg] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let firstPageISValidFromStorage = localStorage.getItem("firstPageIsValid");
	useEffect(() => {
		firstPageISValidFromStorage ? dispatch({ type: "VALID" }) : dispatch({ type: "NOTVALID" }) && navigate("/f");

		const getData = async () => {
			let brandsData = await axios.get("https://pcfy.redberryinternship.ge/api/brands");
			let cpusData = await axios.get("https://pcfy.redberryinternship.ge/api/cpus");

			setBrands(brandsData.data.data);
			setCpus(cpusData.data.data);
		};
		getData();
	}, [firstPageISValidFromStorage]);

	const submit = e => {
		e.preventDefault();
	};

	const filetesting = async e => {
		let file = e.target.files[0];

		let data = await convertToBase64(file);
		setImg(data);
	};

	const convertToBase64 = file => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = err => {
				reject(err);
			};
		});
	};

	return (
		<div className='s'>
			{!firstPageIsValid ? (
				<div></div>
			) : (
				<div>
					<div className='fBackButton'>
						<Link to={"/f"}></Link>
					</div>
					<Header />

					<form className='sForm' onSubmit={submit}>
						<div className='s1'>
							<div className='fileBox'>
								<p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
								<button>ატვირთე</button>
								{/* <img
									src={img}
									accept='image/x-png,image/gif,image/jpeg'
									style={{ height: "200px", width: "200px", border: "1px solid black" }}
								/> */}
							</div>
							<input type={"file"} onChange={filetesting} />
						</div>
						<div className='s2'>
							<div>
								<label className='name'>ლეპტოპის სახელი</label>
								<input />
								<label className='s2_label'>ლათინური ასოები, ციფრები, {`!@#$%^&*()`}_+= </label>
							</div>
							<select defaultValue={""}>
								<option value={""} disabled>
									ლეპტოპის ბრენდი
								</option>
								{brands.map(brand => {
									return (
										<option value={brand.name} key={brand.id}>
											{brand.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className='s3'>
							<select defaultValue={""}>
								<option value={""} disabled>
									CPU
								</option>
								{cpus.map(cpu => {
									return (
										<option value={cpu.name} key={cpu.id}>
											{cpu.name}
										</option>
									);
								})}
							</select>
							<div>
								<label>CPU-ს ბირთვი</label>
								<input placeholder='14' />
								<label>მხოლოდ ციფრები</label>
							</div>
							<div>
								<label>CPU-ს ნაკადი</label>
								<input placeholder='365' />
								<label>მხოლოდ ციფრები</label>
							</div>
						</div>
						<div className='s4'>
							<div>
								<label>ლეპტოპის RAM (GB)</label>
								<input type={"text"} placeholder='16' />
								<label>მხოლოდ ციფრები</label>
							</div>

							<div>
								<label>მეხსიერების ტიპი</label>
								<div>
									<input type={"radio"} name='memoryType' value={"SSD"} />
									<label>SSD</label>
								</div>
								<div>
									<input type={"radio"} name='memoryType' value={"HDD"} />
									<label>HDD</label>
								</div>
							</div>
						</div>
						<div className='s5'>
							<div>
								<label>შეძენის რიცხვი(არჩევითი)</label>
								<input type={"date"} placeholder='დდ/თთ/წწწწ' />
							</div>
							<div>
								<label>ლეპტოპის ფასი</label>
								<input placeholder='0000' />
								<label>მხოლოდ ციფრები</label>
							</div>
						</div>
						<div className='s6'>
							<label>ლეპტოპის მდგომარეობა</label>
							<div>
								<div>
									<input type={"radio"} name='state' value={"ახალი"} />
									<label>ახალი</label>
								</div>
								<div>
									<input type={"radio"} name='state' value={"მეორადი"} />
									<label>მეორადი</label>
								</div>
							</div>
						</div>
						<div className='s7'>
							<button onClick={() => navigate("/f")}>უკან</button>
							<button className='saveBtn' type='submit'>
								დამახსოვრება
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		firstPageIsValid: state.firstPageIsValid,
	};
};

export default connect(mapStateToProps)(LaptopInfo);
