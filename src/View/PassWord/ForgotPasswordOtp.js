import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Base_Url } from '../../Service/Constant';
import '../../Style/ForgotPasswordOtp.css'
import axios from 'axios';
import loginimg from '../../Asset/imresizer-1719407171937.jpg'
function ForgotPasswordOtp() {
    const [inputs, setInputs] = useState({});
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const navigate = useNavigate();
  const [errors,setErrors] =useState();

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInputs((prevValues) => ({ ...prevValues, [name]: value }));
    };
  
    const otpsend = (e) => {
      axios({
        method: 'post',
        url: Base_Url + 'user/forgotpasswordOTP',
        data: inputs,
      })
        .then((response) => {
            // console.log("response" ,response);
          if (response.data.status) {
            // setInputs({});
            setErrors({})
            setShowOtpPopup(true);
          }else{
            setErrors({ message: response.data.information.description});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const otpverify = (e) => {
      axios({
        method: 'post',
        url: Base_Url + 'user/checkOtp',
        data: inputs,
      })
        .then((response) => {
            // console.log(response);
          if (response.data.status) {
            navigate('/');
          }else{
            setErrors({ message: response.data.information.description });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const popupBack =()=>{
        setShowOtpPopup(false);
        setErrors();
    }
  
    return (
      <div className="forgot-password-container">
        <div className="image-container">
          <img src={loginimg} alt="Login" className="side-image" />
        </div>
        <div className="form-container">
          {!showOtpPopup && (
            <div className="form-card">
              <h2>Forgot Password</h2>
              {errors?.message && <p className="error-message">{errors?.message}</p>}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email || ''}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={inputs.username || ''}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-buttons">
                <span className="btn btn-warning">
                  <Link to="/">Back</Link>
                </span>
                <button className="btn btn-primary" onClick={otpsend}>
                  Submit
                </button>
              </div>
            </div>
          )}
  
          {showOtpPopup && (
            <div className="form-card">
              <h2>Create Password</h2>
              {errors?.message && <p className="error-message">{errors?.message}</p>}
              {/* <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={inputs.username || ''}
                  onChange={handleOnChange}
                />
                </div> */}
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={inputs.newPassword || ''}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={inputs.confirmPassword || ''}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={inputs.otp || ''}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-buttons">
                <button className="btn btn-warning" onClick={popupBack}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={otpverify}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  
    
}

export default ForgotPasswordOtp
