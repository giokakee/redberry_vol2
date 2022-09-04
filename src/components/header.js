import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	return (
		<div className='fHeader'>
			<div className='header-element'>
				<p className={`${pathname === "/f" ? "underline" : ""}`}>თანამშრომლის ინფო</p>
				<p className={`${pathname === "/s" ? "underline" : ""}`}>ლეპტოპის მახასიათებლები</p>
			</div>
			<div className='mobileHeader'>
				<div>
					<div className='mobile_back' onClick={() => (pathname === "/f" ? navigate("/") : navigate("/f"))}></div>
					<div className='mobile_header_page_name'>{pathname === "/f" ? "თანამშრომლის ინფო" : "ლეპტოპის მახასიათებლები"}</div>
				</div>
				<div className='mobile_header_page'>{pathname === "/f" ? "1/2" : "2/2"}</div>
			</div>
		</div>
	);
};

export default Header;
