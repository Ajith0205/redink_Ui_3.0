import React ,{ useEffect, useState }from 'react'
import '../Style/Header.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../Service/Constant';
import redink from "../Asset/redInk.png"
function Header() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
// const id=localStorage.getItem("id");
// const token = localStorage.getItem("token");
//   const [user, setUser] = useState({});

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   useEffect(() => {
//     axios({
//       method: "get",
//       headers: { Authorization: token },
//       url: Base_Url + "user/userDetails?id=" + id,
//       //data:inputs
//     }).then((response) => {
     
// console.log("user",response.data.user);
//    setUser(response.data.user);


//     }, error => {
//       console.log(error);
//     })
//   }, [])

//   return (
//     <header className="header">
//       <div className="logo">RedInk</div>
//       <div className="profile" onClick={toggleDropdown}>
//       {
//               user?.profile != null ? <img src={user?.profile}
                
//                 data-bs-toggle="modal"
//                 data-bs-target="#imagepreview" /> : <img src="/redInk.png" alt="/redInk.png" style={{ height: "50px", width: "100px" }} className="rounded-circle" data-bs-toggle="modal"
//                   data-bs-target="#imagepreview" />
//             }

    
//         {dropdownOpen && (
//           <div className="dropdown-menu">
//             <Link to="/profile">View Profile</Link>
//             <Link to="/change-password">Change Password</Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
const [dropdownOpen, setDropdownOpen] = useState(false);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    axios({
      method: "get",
      headers: { Authorization: token },
      url: Base_Url + "user/userDetails?id=" + id,
    }).then((response) => {
      console.log("user", response.data.user);
      setUser(response.data.user);
    }, error => {
      console.log(error);
    });
  }, [id, token]);

  return (
    <header className="header">
      <div className="logo">RedInk</div>
      <div className="profile">
        {user?.profile ? (
          <img
            src={user.profile}
            alt="Profile"
            className="profile-photo"
            data-bs-toggle="modal"
            data-bs-target="#imagepreview"
          />
        ) : (
          <img
            src={redink}
            alt="Default Profile"
            className="profile-photo"
            data-bs-toggle="modal"
            data-bs-target="#imagepreview"
          />
        )}
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">View Profile</Link>
            <Link to="/change-password">Change Password</Link>
          </div>
        )}
      </div>

      {/* Modal for profile image preview */}
      <div className="modal fade" id="imagepreview" tabIndex="-1" role="dialog" aria-labelledby="imagePreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imagePreviewModalLabel">Profile Image</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={user?.profile || redink} alt="Profile Preview" className="img-fluid" />
             
             
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <Link >View Profile</Link>
              <Link >Change Password</Link>
              </div>
          </div>
        </div>
      </div>
    </header>
  );


}

export default Header
