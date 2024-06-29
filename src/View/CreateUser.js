import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Style/CreateUser.css';
import { Base_Url } from '../Service/Constant';
import { toBeChecked } from '@testing-library/jest-dom/matchers';
function CreateUser() {

    var navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const token = localStorage.getItem("token");
  const role=localStorage.getItem("role");
  const editUserId=localStorage.getItem("editUserId");
  const profileId=localStorage.getItem("profileId");
// console.log("role",role);
  const handleOnChnage = (e) => {
    e.preventDefault();
    // console.log("inputs",inputs,e.target.value);
    //form controller name=name assined
    let name = e.target.name;
    if (name != "profile" && name != "uploadAadhar" && name != "uploadPAN") {
      let value = e.target.value;
      console.log(name ," : ",value);
      setInputs(preValue => ({ ...preValue, [name]: value }))
    } else {
      let files = e.target.files;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = (event) => {
        let value = event.target.result;
        // console.log("value", value)
        setInputs(preValue => ({ ...preValue, [name]: value }))
      }

    }



  }
  
  useEffect(() => {
    if (editUserId) {
      axios({
        method: "get",
        headers: { Authorization: token },
        url: Base_Url + "user/userDetails?id=" + editUserId,
      }).then((response) => {
        console.log("user Details ",response.data.user);
        setInputs(response.data.user);
       
      }, error => {
        console.log(error);
      })
    }
  }, [])

  function saveSubmit() {
    // console.log("input",inputs);

    axios({
      method: "post",
      headers: { Authorization: token },
      url: Base_Url + "user/saveuser",
    
      data: inputs
    }).then((response) => {
      // console.log(response);
      if (response.data.status) {
        navigate('/home')
        setInputs({});
      }
     



    }, error => {
      console.log(error);
    })
  }
 
  

  function backUrl (){
    if(profileId){
      navigate("/home")
      localStorage.removeItem("profileId");
    }else{
      localStorage.removeItem("editUserId");
    navigate("/user")
    }
    
  }

    return (
      <div> <span   onClick={backUrl}> <svg style={{ marginLeft: '30px', marginTop: '10px', cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
    </svg></span>
        <div className='container'>
         
      
          <div className='card'>
      
            <div className='card-header'> {editUserId ? "Edit User" : "Create User"}</div>
      
            <div className='card-body'>
      
              <div className='row'>

              <div className='col-lg-6'>
                  <div  className='input-field'>
                    <label className='form-label'>Profile Photo</label>
                    <input className='form-control' type="file" name="profile" onChange={(e) => { handleOnChnage(e) }} />
                    {/* <image src={inputs.profile}></image> */}

                    <img src={inputs?.profile } alt="Profile Preview" className="img-fluid" />
                  </div>
                </div>
      
                <div className='col-lg-6'>
                  <div  className='input-field'>
                    <label className='form-label'>Name</label>
                    <input className='form-control' type='text' placeholder='Enter your name' name='name' value={inputs.name} onChange={(e) => handleOnChnage(e)} required />
                  </div>
                </div>
      
                <div className='col-lg-6'>
                  <div className='input-field'>
                    <label className='form-label'>Email</label>
                    <input  className='form-control' type='text' placeholder='Enter your email' name='email' value={inputs.email} onChange={(e) => handleOnChnage(e)} required />
                  </div>
                </div>
      
                <div className='col-lg-6'>
                  <div className='input-field'>
                    <label className='form-label'>Father's Name</label>
                    <input className='form-control' type='text' placeholder="Enter father's name" name='fatherName' value={inputs.fatherName} onChange={(e) => handleOnChnage(e)} />
                  </div>
                </div>
      
                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Date of Birth</label>
                    <input  className='form-control' type='date'  name='dateofbirth' value={inputs.dateofbirth} onChange={(e) => handleOnChnage(e)} />
                  </div>
                </div>

                {/* new code */}
                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Gender</label>
                    <div className='form-check'>
                    <label><input type="radio" name="gender" value="male"
              checked={inputs.gender === "male"}  onChange={(e) => { handleOnChnage(e) }} />Male</label>
                    <label><input type="radio" name="gender"  value="female"
              checked={inputs.gender === "female"}  onChange={(e) => { handleOnChnage(e) }} />Female</label>
                    </div>
                 </div>
                </div>
                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Place Of Birth</label>
                    <input  className='form-control' type="text" name="placeofBirth" value={inputs.placeofBirth} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Physical Status</label>
                    <select className='form-control' name='physicalStatus' value={inputs.physicalStatus} onChange={(e) => { handleOnChnage(e) }} >
                      <option >---select one---</option>
                      <option value='normal' >normal</option>
                      <option value='ubnormal' >ubnormal</option>
                    </select>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Address</label>
                    <input className='form-control' type="text" name="address" value={inputs.address} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Aadhar Number</label>
                    <input className='form-control' type="Number" name="aadharNo" value={inputs.aadharNo} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Upload Aadhar</label>
                    <input className='form-control'  type="file" name="uploadAadhar" onChange={(e) => { handleOnChnage(e) }} />
                    <img src={inputs?.uploadAadhar } alt="uploadAadhar Preview" className="img-fluid" />
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>PAN Number</label>
                    <input className='form-control' type="text" name="panNo" value={inputs.panNo} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Upload PAN</label>
                    <input className='form-control' type="file" name="uploadPAN" onChange={(e) => { handleOnChnage(e) }} />
                    <img src={inputs?.uploadPAN } alt="uploadPAN Preview" className="img-fluid" />
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>WhatsApp Number</label>
                    <input className='form-control' type="Number" name="whatsappNo" value={inputs.whatsappNo} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='col-lg-6'>
                  {
                    editUserId ? <div   className='input-field'>
                    <label className='form-label'>Select Role</label>

                    {
                      role == "ADMIN" ?  
                      <select className='form-control' value={inputs.selectRole} name="selectRole" onChange={(e) => { handleOnChnage(e) }}>
                      {/* <option   >---select Role---</option> */}
                      {/* <option value='ADMIN' >Admin</option> */}
                      <option value='Trainer' >Trainer</option>
                    <option value='Player' >Player</option> 
                    </select>:
                    <>
                      {
                      role == "Trainer " ?
                      <select className='form-control' value={inputs.selectRole} name="selectRole" onChange={(e) => { handleOnChnage(e) }}>
                      <option value='Trainer' >Trainer</option>
                    </select>

                      :
                      <select className='form-control' value={inputs.selectRole} name="selectRole" onChange={(e) => { handleOnChnage(e) }}>
                      <option value='Player' >Player</option>
                    </select>
                      
                    }
                    </>
                  
                    
                   
                    }
                  </div>

                  :
                  <div   className='input-field'>
                  <label className='form-label'>Select Role</label>

                  {
                    role == "ADMIN" ?  
                    <select className='form-control' value={inputs.selectRole} name="selectRole" onChange={(e) => { handleOnChnage(e) }}>
                    <option   >---select Role---</option>
                    <option value='Trainer' >Trainer</option>
                    <option value='Player' >Player</option>
                  </select>:  <select className='form-control' value={inputs.selectRole} name="selectRole" onChange={(e) => { handleOnChnage(e) }}>
                    <option    >---select Role---</option>
                    <option value='Player' >Player</option>
                  </select>
                  }
                </div>
                  }
                  
                 
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>Select Game</label>
                    <select className='form-control' value={inputs.selectgame} name="selectgame" onChange={(e) => { handleOnChnage(e) }}>
                      <option >---select Game---</option>
                      <option value='Kabaddi' >Kabaddi</option>
                      <option value='volleyBall' >volleyBall</option>
                      <option value='footBall'>footBall</option>
                      <option value='cricket'>cricket</option>
                    </select>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div   className='input-field'>
                    <label className='form-label'>UserName</label>
                    <input className='form-control' type="text" name="username" value={inputs.username || ""} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

              </div>
      
              <div  style={{alignItems:"center"}}>
                {
                    editUserId ? <button className='btn btn-primary' onClick={saveSubmit}>Update</button> :  <button className='btn btn-primary' onClick={saveSubmit}>Save</button>
                }
            
            </div>
      
            </div>
      
           
      
          </div>
          
        </div>

        </div>
      );
      
}

export default CreateUser
