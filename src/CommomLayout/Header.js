import React ,{ useEffect, useState }from 'react'
import '../Style/Header.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../Service/Constant';
import redink from "../Asset/redInk.png"
function Header() {
const [dropdownOpen, setDropdownOpen] = useState(false);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

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

  function editprofile() {
    localStorage.setItem("editUserId", user.id);
    localStorage.setItem("profileId", user.id);
    navigate("/createuser");
    
  }

  function changepassword (){
    // const modal = document.getElementById('imagepreview');
  
    // if (modal) {
    //   const bsModal = new window.bootstrap.Modal(modal); // Initialize Bootstrap modal
    //   bsModal.hide(); // Hide the modal after the animation completes
    // }
    
    // // Delay navigation slightly to ensure modal is fully hidden
    // setTimeout(() => {
      
    // }, 300); 
  
    navigate("/changepassword");
   
  }

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
  
      </div>

      {/* Modal for profile image preview */}
      <div className="modal fade" id="imagepreview" tabIndex="-1" role="dialog" aria-labelledby="imagePreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imagePreviewModalLabel">Profile Image</h5>
              <button type="button" style={{ border: "none",cursor:"pointer",backgroundColor:"transparent",color:"red",fontSize:"30px" }} className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={user?.profile || redink} alt="Profile Preview" className="img-fluid" />
             
             
            </div>
            <div className="modal-footer d-flex justify-content-between">
            <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={editprofile} >View Profile</button>
       <button className="btn btn-primary" type='button' data-bs-dismiss="modal" onClick={changepassword} >Change Password</button>    
       
              </div>
          </div>
        </div>
      </div>



    </header>

  );


}

export default Header
