import { NavLink } from "react-router-dom";
export default function Navbar() {
    return (
        <div className="App">
            <NavLink to="/count" style={{ padding: "20px" }}>
                Home
            </NavLink>
            <NavLink to="/user-profile" style={{ padding: "20px" }}>
                Profile
            </NavLink>
            <NavLink to="/add-new-device" style={{ padding: "20px" }}>
                Add New Device
            </NavLink>
            <NavLink to="/login" style={{ padding: "20px" }}>
                Login
            </NavLink>
        </div>
    );
}
