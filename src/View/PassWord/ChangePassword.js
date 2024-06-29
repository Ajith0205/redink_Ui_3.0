import React, { useState } from 'react'
import { Base_Url } from '../../Service/Constant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangePassword() {
    const navigate =useNavigate();
    const [inputs, setInputs] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    
      const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    
      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear validation error on input change
      };
    
      const validateInputs = () => {
        let valid = true;
        const { oldPassword, newPassword, confirmPassword } = inputs;
    
        if (!oldPassword) {
          setErrors((prevErrors) => ({ ...prevErrors, oldPassword: 'Old password is required' }));
          valid = false;
        }
    
        if (!newPassword) {
          setErrors((prevErrors) => ({ ...prevErrors, newPassword: 'New password is required' }));
          valid = false;
        }
    
        if (!confirmPassword) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Confirm password is required' }));
          valid = false;
        } else if (newPassword !== confirmPassword) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
          valid = false;
        }
    
        return valid;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateInputs()) {
          axios.post(Base_Url + "user/changePassword", {
            oldPassword: inputs.oldPassword,
            newPassword: inputs.newPassword,
            confirmPassword :inputs.confirmPassword
          }, {
            headers: { Authorization: localStorage.getItem("token") }
          }).then(response => {
            console.log("Password changed successfully");
         console.log(response.data.status);
            // Optionally, redirect or show success message
            if(response.data.status){
                navigate('/');
            }else{
                errors()
            }
            
          }).catch(error => {
            console.error("Password change failed", error);
            // Handle error (show error message, etc.)
          });
        }
      };
    
    //   return (
    //     <div className="container mt-4">
    //       <h2>Change Password</h2>
    //       <form onSubmit={handleSubmit}>
    //         <div className="mb-3">
    //           <label htmlFor="oldPassword" className="form-label">Old Password</label>
    //           <input type="password" id="oldPassword" name="oldPassword" value={inputs.oldPassword} onChange={handleOnChange} className={`form-control ${errors.oldPassword && 'is-invalid'}`} />
    //           {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword}</div>}
    //         </div>
    //         <div className="mb-3">
    //           <label htmlFor="newPassword" className="form-label">New Password</label>
    //           <input type="password" id="newPassword" name="newPassword" value={inputs.newPassword} onChange={handleOnChange} className={`form-control ${errors.newPassword && 'is-invalid'}`} />
    //           {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
    //         </div>
    //         <div className="mb-3">
    //           <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    //           <input type="password" id="confirmPassword" name="confirmPassword" value={inputs.confirmPassword} onChange={handleOnChange} className={`form-control ${errors.confirmPassword && 'is-invalid'}`} />
    //           {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
    //         </div>
    //         <button type="submit" className="btn btn-primary">Submit</button>
    //       </form>
    //     </div>
    //   );

    return (
        <div className="container mt-4 d-flex justify-content-center">
          <div className="card change-password-card">
            <div className="card-body">
              <h4 className="card-title text-center">Change Password</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input type="password" id="oldPassword" name="oldPassword" value={inputs.oldPassword} onChange={handleOnChange} className={`form-control ${errors.oldPassword && 'is-invalid'}`} />
                  {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input type="password" id="newPassword" name="newPassword" value={inputs.newPassword} onChange={handleOnChange} className={`form-control ${errors.newPassword && 'is-invalid'}`} />
                  {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={inputs.confirmPassword} onChange={handleOnChange} className={`form-control ${errors.confirmPassword && 'is-invalid'}`} />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      );
    
      }    

export default ChangePassword
