import "./second.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { convertToBase64 } from "../components/convertimage";

const token = "698ce0db8f2ea3171936833d768ca0d1";

let notNum = /\D/;
let imgReg = /image/;

const LaptopInfo = ({ firstPageIsValid }) => {
	const [brands, setBrands] = useState([]);
	const [cpus, setCpus] = useState([]);
	const [imgName, setImgName] = useState("");
	const [imageIsValid, setImageISValid] = useState(false);
	const [img, setImg] = useState("");
	const [laptopInfo, setLaptopInfo] = useState({
		laptop_name: "",
		laptop_brand_id: "",
		laptop_cpu: "",
		laptop_cpu_cores: "",
		laptop_cpu_threads: "",
		laptop_ram: "",
		laptop_hard_drive_type: "",
		laptop_state: "",
		laptop_purchase_date: "",
		laptop_price: "",
	});
	const [file, setFile] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let firstPageISValidFromStorage = localStorage.getItem("firstPageIsValid");

	useEffect(() => {
		firstPageISValidFromStorage ? dispatch({ type: "VALID" }) : dispatch({ type: "NOTVALID" }) && navigate("/f");

		const getData = async () => {
			try {
				let brandsData = await axios.get("https://pcfy.redberryinternship.ge/api/brands");
				let cpusData = await axios.get("https://pcfy.redberryinternship.ge/api/cpus");

				setBrands(brandsData.data.data);
				setCpus(cpusData.data.data);

				let dataFromStorage = JSON.parse(localStorage.getItem("laptop"));
				dataFromStorage && setLaptopInfo(dataFromStorage);
			} catch (err) {
				console.log({ message: err.message });
			}
		};
		getData();
	}, [dispatch, firstPageISValidFromStorage, navigate]);

	let {
		laptop_cpu,
		laptop_cpu_cores,
		laptop_cpu_threads,
		laptop_ram,
		laptop_price,
		laptop_name,
		laptop_brand_id,
		laptop_hard_drive_type,
		laptop_purchase_date,
		laptop_state,
	} = laptopInfo;

	let coreIsValid = notNum.test(laptop_cpu_cores);
	let threadsIsValid = notNum.test(laptop_cpu_threads);
	let ramIsValid = notNum.test(laptop_ram);
	let priceIsValid = notNum.test(laptop_price);

	const create = async e => {
		e.preventDefault();

		let userInfo = JSON.parse(localStorage.getItem("user"));
		let inputsAreValid = !coreIsValid && !threadsIsValid && !ramIsValid && !priceIsValid && imageIsValid;
		try {
			if (inputsAreValid) {
				let allData = {
					...userInfo,
					...laptopInfo,
					laptop_brand_id: Number(laptop_brand_id),
					laptop_cpu_cores: Number(laptop_cpu_cores),
					laptop_cpu_threads: Number(laptop_cpu_threads),
					laptop_ram: Number(laptop_ram),
					laptop_price: Number(laptop_price),
					token,
				};

				const fb = new FormData();
				fb.append("laptop_image", file, file.name);

				const setInputs = object => {
					Object.keys(object).forEach(key => fb.append(key, object[key]));
				};
				setInputs(allData);
				await axios.post("https://pcfy.redberryinternship.ge/api/laptop/create", fb);
				window.localStorage.clear();
				navigate("/congrats");
			}
		} catch (err) {
			console.log({ message: err.message });
		}
	};

	const imageUpload = async e => {
		let file = e.target.files[0];
		let data = await convertToBase64(file);

		setImgName(e.target.files[0].name);

		if (imgReg.test(e.target.files[0].type)) {
			setFile(file);
			setImg(data);
			setImageISValid(true);
		} else {
			setImageISValid(false);
		}
	};

	const changeInputs = (key, value) => {
		setLaptopInfo({ ...laptopInfo, [key]: value });
		localStorage.setItem("laptop", JSON.stringify({ ...laptopInfo, [key]: value }));
	};

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

					<form className='sForm' onSubmit={create}>
						<div className='s1'>
							<div className={`fileBox ${imgName.length > 0 && !imageIsValid ? "errorImageBox" : ""}`}>
								{imgName.length > 0 && !imageIsValid ? (
									<div className='errorImageDiv'>
										<div className='errorImgLogo'></div>
										<p> ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
									</div>
								) : (
									<p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
								)}

								<button>ატვირთე</button>
							</div>
							<input type={"file"} onChange={imageUpload} required />

							<div className={`${img ? "imgDiv" : "nonDisplay"}`}>
								<p>{imgName}</p>
								<img className='laptopImage' src={img} alt='laptop' />
							</div>
						</div>
						<div className='s2'>
							<div>
								<label className='label_top'>ლეპტოპის სახელი</label>
								<input value={laptop_name} onChange={({ target }) => changeInputs("laptop_name", target.value)} required />
								<label className='s2_label'>ლათინური ასოები, ციფრები, {`!@#$%^&*()`}_+= </label>
							</div>
							<select defaultValue={""} onChange={({ target }) => changeInputs("laptop_brand_id", target.value)} required>
								<option value={""} disabled>
									ლეპტოპის ბრენდი
								</option>
								{brands.map(brand => {
									return (
										<option value={brand.id} key={brand.id} selected={brand.id === Number(laptop_brand_id)}>
											{brand.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className='forBorder'></div>

						<div className='s3'>
							<select defaultValue={""} onChange={({ target }) => changeInputs("laptop_cpu", target.value)} required>
								<option value={""} disabled>
									CPU
								</option>
								{cpus.map(cpu => {
									return (
										<option value={cpu.name} key={cpu.id} selected={cpu.name === laptop_cpu}>
											{cpu.name}
										</option>
									);
								})}
							</select>
							<div className={` ${laptop_cpu_cores.length > 0 && coreIsValid ? "inputError" : ""}`}>
								<label className='label_top'>CPU-ს ბირთვი</label>
								<input
									placeholder='14'
									value={laptop_cpu_cores}
									onChange={({ target }) => changeInputs("laptop_cpu_cores", target.value)}
									required
								/>
								<label>მხოლოდ ციფრები</label>
							</div>
							<div className={` ${laptop_cpu_threads.length > 0 && threadsIsValid ? "inputError" : ""}`}>
								<label className='label_top'>CPU-ს ნაკადი</label>
								<input
									placeholder='365'
									value={laptop_cpu_threads}
									onChange={({ target }) => changeInputs("laptop_cpu_threads", target.value)}
									required
								/>
								<label>მხოლოდ ციფრები</label>
							</div>
						</div>
						<div className='s4'>
							<div className={` ${laptop_ram.length > 0 && ramIsValid ? "inputError" : ""}`}>
								<label className='label_top'>ლეპტოპის RAM (GB)</label>
								<input
									type={"text"}
									placeholder='16'
									value={laptop_ram}
									onChange={({ target }) => changeInputs("laptop_ram", target.value)}
									required
								/>
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
											onChange={({ target }) => changeInputs("laptop_hard_drive_type", target.value)}
											required
											checked={laptop_hard_drive_type === "SSD"}
										/>
										<label htmlFor='SSD'>SSD</label>
									</div>
									<div>
										<input
											type={"radio"}
											name='memoryType'
											value={"HDD"}
											onChange={({ target }) => changeInputs("memoryType", target.value)}
											required
											checked={"HDD" === laptopInfo.memoryType}
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
								<input
									type={"date"}
									placeholder='დდ/თთ/წწწწ'
									value={laptop_purchase_date}
									onChange={({ target }) => changeInputs("laptop_purchase_date", target.value)}
								/>
							</div>
							<div className={` ${laptop_price.length > 0 && priceIsValid ? "inputError" : ""}`}>
								<label className='label_top'>ლეპტოპის ფასი</label>
								<input
									placeholder='0000'
									value={laptop_price}
									onChange={({ target }) => changeInputs("laptop_price", target.value)}
									required
								/>
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
										value={"new"}
										onChange={({ target }) => changeInputs("laptop_state", target.value)}
										required
										checked={"new" === laptop_state}
									/>
									<label>ახალი</label>
								</div>
								<div>
									<input
										type={"radio"}
										name='state'
										value={"used"}
										onChange={({ target }) => changeInputs("laptop_state", target.value)}
										required
										checked={"used" === laptop_state}
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
