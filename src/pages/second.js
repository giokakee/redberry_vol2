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
	const [laptopInfo, setLaptopInfo] = useState({
		name: "",
		brand: "",
		cpu: "",
		core: "",
		threads: "",
		ram: "",
		memoryType: "",
		laptopState: "",
		buyTime: "",
		price: "",
		img: "",
	});

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
		setLaptopInfo({ ...laptopInfo, img: data });
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

	const changeInputs = (key, value) => {
		setLaptopInfo({ ...laptopInfo, [key]: value });
	};
	console.log(laptopInfo);

	return (
		<div>
			{!firstPageIsValid ? (
				<div></div>
			) : (
				<div className='s'>
					<div className='fBackButton'>
						<Link to={"/f"}></Link>
					</div>
					<Header />

					<form className='sForm' onSubmit={submit}>
						<div className='s1'>
							<div className='fileBox'>
								<p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
								<button>ატვირთე</button>
							</div>
							<input type={"file"} onChange={filetesting} />
						</div>
						<div className='s2'>
							<div>
								<label className='label_top'>ლეპტოპის სახელი</label>
								<input value={laptopInfo.name} onChange={({ target }) => changeInputs("name", target.value)} />
								<label className='s2_label'>ლათინური ასოები, ციფრები, {`!@#$%^&*()`}_+= </label>
							</div>
							<select defaultValue={""} onChange={({ target }) => changeInputs("brand", target.value)}>
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
						<div className='forBorder'></div>

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
								<label className='label_top'>CPU-ს ბირთვი</label>
								<input placeholder='14' onChange={({ target }) => changeInputs("core", target.value)} />
								<label>მხოლოდ ციფრები</label>
							</div>
							<div>
								<label className='label_top'>CPU-ს ნაკადი</label>
								<input placeholder='365' onChange={({ target }) => changeInputs("threads", target.value)} />
								<label>მხოლოდ ციფრები</label>
							</div>
						</div>
						<div className='s4'>
							<div>
								<label className='label_top'>ლეპტოპის RAM (GB)</label>
								<input type={"text"} placeholder='16' onChange={({ target }) => changeInputs("ram", target.value)} />
								<label>მხოლოდ ციფრები</label>
							</div>

							<div className='s4_radio'>
								<label className='label_top'>მეხსიერების ტიპი</label>
								<div className='radioInputDiv'>
									<div>
										<input
											type={"radio"}
											name='memoryType'
											value={"SSD"}
											onChange={({ target }) => changeInputs("memoryType", target.value)}
										/>
										<label htmlFor='SSD'>SSD</label>
									</div>
									<div>
										<input
											type={"radio"}
											name='memoryType'
											value={"HDD"}
											onChange={({ target }) => changeInputs("memoryType", target.value)}
										/>
										<label>HDD</label>
									</div>
								</div>
							</div>
						</div>
						<div className='forBorder'></div>
						<div className='s5'>
							<div>
								<label className='label_top'>შეძენის რიცხვი(არჩევითი)</label>
								<input type={"date"} placeholder='დდ/თთ/წწწწ' />
							</div>
							<div>
								<label className='label_top'>ლეპტოპის ფასი</label>
								<input placeholder='0000' onChange={({ target }) => changeInputs("price", target.value)} />
								<label>მხოლოდ ციფრები</label>
							</div>
						</div>
						<div className='forBorder'></div>

						<div className='s6'>
							<label>ლეპტოპის მდგომარეობა</label>
							<div className='s6_radio'>
								<div>
									<input
										type={"radio"}
										name='state'
										value={"ახალი"}
										onChange={({ target }) => changeInputs("laptopState", target.value)}
									/>
									<label>ახალი</label>
								</div>
								<div>
									<input
										type={"radio"}
										name='state'
										value={"მეორადი"}
										onChange={({ target }) => changeInputs("laptopState", target.value)}
									/>
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
					<div className='redberryLogo'>
						<div></div>
					</div>
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
