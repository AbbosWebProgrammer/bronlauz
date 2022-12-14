import React, { useState, useEffect } from "react";
import { faBars ,faUserCircle,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faHeart,faXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo1 from "../images/bronlauz/logo.webp";
import logo2 from "../images/bronlauz/large_logo.webp";
import Dropdown from 'react-bootstrap/Dropdown';
import {API_ROOT_PATH} from "./constans";

import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Footer from "./Footer";
import axios from "axios";

const Login = (props) => {
    function   getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    useEffect(()=>{
        if(localStorage.getItem("token")){
            window.location.href = '/';
        }
        },[]);
    const [counter, setCounter] = useState(120);
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);
      const padTime = time => {
        return String(time).length === 1 ? `0${time}` : `${time}`;
      };
    const format = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${padTime(seconds)}`;
      };
    const [form, setForm] = useState({
        phone: "+998",
        number: ""
    });
    
    function removetokenandlogout(){
        localStorage.removeItem("token");
        window.location.reload(false);
    }

    const [sms, setSms] = useState(false);
    const [smsVerify, setSmsVerify] = useState(false);

    const onChange = (e) => {
        if (e.target.id==='phone'){
            if (e.target.value.substr(0, 4)==='+998' && !isNaN(e.target.value.substr(1,)) && e.target.value.length<=13){
                setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                });  
            }
        }
        else{
          setForm({
            ...form,
            [e.target.name]: e.target.value,
        });  
        }
        
    };


    const postPhone = (e) => {
        e.preventDefault();
        try {
            var csrftoken = getCookie('csrftoken')
            axios.post(
                `${API_ROOT_PATH}/bronla/uz/register/`,
                { phone: form.phone ,password:12332435},
                { headers: { "Content-Type": "application/json",'X-CSRFToken': csrftoken } }
            ).then((res) => {
                console.log(res.data)
                if (res.data.message === "Password yuborildi.") {
                    setSms(true);
                    counter=120
                } else {
                    setSms(false);
                }
                }).catch(function (res) {
                    console.log(res);
                })

        } catch (e) {
            console.log(e);
        }
        setSms(true);
    };
    
    
    
    const verifyPhone = (e) => {
        e.preventDefault();
            var csrftoken = getCookie('csrftoken')
           axios.post(
                `${API_ROOT_PATH}/bronla/uz/customerphonecheck/`,
                { phone: form.phone, password: form.number },
                { headers: { "Content-Type": "application/json" ,'X-CSRFToken': csrftoken} }
            ).then((res) => {
                console.log(res.data)
                if(res.data.token===''){
                    toast('???????????????? ????????????')
                } 
                else{
                    toast('????????????????????????')
                    localStorage.setItem("token", res.data.token);
                    window.location.href = "/";
                }
                }).catch(function (res) {
                    console.log(res);
                  })
    };

    return (
        <div>
                <div className="nav-box">
                    <div className='webcontainer'>
                        <div className="navbar">
                            <div className="second-div">
                                <div className="all">
                                    <div className="logo-img1">
                                        <Link to={"/"}>
                                            <img src={logo1} alt=""/>
                                        </Link>


                                        
                                    </div>
                                    <div className="logo-img2">
                                        <Link to={"/"}>
                                            <img src={logo2} alt=""/>
                                        </Link>
                                    </div>


                                </div>


                                
                                <div className="second-left-side">
                                    {localStorage.getItem("token") ? (
                                        <div className="w-100">
                                            <div className="first-part align-items-center">
                                                <Dropdown className='align-items-center '>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example1" className='align-items-center home-user-part_link2'>
                                                    <Link to={"#"} className="align-items-center d-flex dropdownbuttoncss">
                                                    <FontAwesomeIcon className='faBarsCss align-items-center' icon={faBars} />
                                                    <FontAwesomeIcon className='faUserCircleTop align-items-center' icon={faUserCircle} />
                                                </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item as={Link} href="/wishlists"><Link to={"/wishlists"} className="align-items-center d-flex dropdownbuttoncss">???????????? ??????????????</Link></Dropdown.Item>
                                                        <Dropdown.Item as={Link} href="/myorders"><Link to={"/myorders"} className="dropdownbuttoncss">?????? ????????????</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">???????????????? ???????? ?????????? ???????????????? ????????</Dropdown.Item>
                                                        
                                                        <Dropdown.Item href="/" onClick={removetokenandlogout}>??????????</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                
                                            </div>
                                            <div className="home-user-part align-items-center">
                                            
                                                <Link to={"/"} className="align-items-center  home-user-part_link">
                                                <FontAwesomeIcon className='align-items-center faMagnifyingGlassCss' icon={faMagnifyingGlass} />
                                                <p>????????????</p>
                                                </Link>
                                            
                                                <Link to={"/wishlists"} className="align-items-center home-user-part_link">
                                                <FontAwesomeIcon className='text-red align-items-center faHeartCss' icon={faHeart} />
                                                <p>????????????????</p>
                                                </Link>
                                                

                                                <Dropdown className='align-items-center home-user-part_link'>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example2" className='align-items-center home-user-part_link'>
                                                        <Link to={"#"} className="align-items-center home-user-part_link">
                                                        <FontAwesomeIcon className='align-items-center faUserCircleBottom' icon={faUserCircle} />
                                                        <p>??????????</p>
                                                        </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item as={Link} href="/myorders"><Link to={"/myorders"} className="dropdownbuttoncss">?????? ????????????</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">???????????????? ???????? ?????????? ???????????????? ????????</Dropdown.Item>
                                                        
                                                        <Dropdown.Item href="/" onClick={removetokenandlogout}>??????????</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                
                                            
                                            </div> 
                                            
                                        </div>
                                    ) : (
                                        <div className="w-100">
                                            <div className="first-part align-items-center">
                                            <Dropdown className='align-items-center '>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example3" className='align-items-center home-user-part_link2'>
                                                    <Link to={"#"} className="align-items-center d-flex dropdownbuttoncss">
                                                    <FontAwesomeIcon className='faBarsCss align-items-center' icon={faBars} />
                                                    <FontAwesomeIcon className='faUserCircleTop align-items-center' icon={faUserCircle} />
                                                </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item as={Link} href="/login"><Link to={"/login"} className="align-items-center d-flex dropdownbuttoncss">????????????????????????????</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">???????????????? ???????? ?????????? ???????????????? ????????</Dropdown.Item>
                                                        
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="home-user-part align-items-center">
                                                <Link to={"/"} className="align-items-center  home-user-part_link">
                                                    <FontAwesomeIcon className='align-items-center faMagnifyingGlassCss' icon={faMagnifyingGlass} />
                                                    <p>????????????</p>
                                                </Link>
                                            
                                                <Link to={"/login"} className="align-items-center home-user-part_link">
                                                    <FontAwesomeIcon className='text-red align-items-center faHeartCss' icon={faHeart} />
                                                    <p>????????????????</p>
                                                </Link>
                                                <Dropdown className='align-items-center home-user-part_link'>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example4" className='align-items-center home-user-part_link'>
                                                        <Link to={"#"} className="align-items-center home-user-part_link">
                                                        <FontAwesomeIcon className='align-items-center faUserCircleBottom' icon={faUserCircle} />
                                                        <p>??????????</p>
                                                        </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item as={Link} href="/login"><Link to={"/login"} className="align-items-center d-flex dropdownbuttoncss">????????????????????????????</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">???????????????? ???????? ?????????? ???????????????? ????????</Dropdown.Item>
                                                        
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                
                                            </div>    
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr className='w-100 m-0 classforhr'/>
                </div>

            <div className='webcontainer min-vh-75 '>
                <div className="row  justify-content-center align-items-center mt-5">
                    <div className="col-lg-5 col-sm-8 col-md-6 mt-5">
                        <div className="card form-card">
                            <div className="card-body ">
                                <form className="form-data p-2">
                                    <div className="form-field flex">
                                        <input
                                            onChange={(e) => onChange(e)}
                                            type="phone"
                                            id="phone"
                                            name="phone"
                                            pattern="+998[7-9]{2}-[0-9]{3}-[0-9]{4}"
                                            placeholder="?????????????? ??????????"
                                            className={`form-field-input-login input inputphonecss ${
                                                smsVerify ? "" : "w-75"
                                            }`}
                                            value={form.phone}
                                            disabled={smsVerify}
                                        />
                                        {form.phone.length===13?
                                        <button
                                        htmlFor="phone"
                                        className={`btn phone-button-css ms-1 ${
                                            smsVerify ? "d-none" : ""
                                        }`}
                                        onClick={(e) => postPhone(e)}
                                        style={{ width: "25%" }}
                                    >
                                        {sms ? "??????????????????" : "??????????????????"}
                                    </button>
                                        :
                                        <button
                                            htmlFor="phone"
                                            className={`btn phone-button-css opacity-50 ms-1 ${
                                                smsVerify ? "d-none" : ""
                                            }`}
                                            style={{ width: "25%" }}
                                        >
                                            {sms ? "??????????????????" : "??????????????????"}
                                        </button>

                                        }
                                    </div>

                                    <div className={`form-field flex ${sms ? "" : "d-none"}`}>
                                        <input
                                            onChange={(e) => onChange(e)}
                                            type="text"
                                            id="number"
                                            name="number"
                                            placeholder="?????? ??????????"
                                            className="form-field-input-login  input w-75"
                                            value={form.number}
                                        />
                                        {counter === 0 ? 
                                        <div  className=" w-25 counter-css" >00:00</div>: 
                                        <div  className=" w-25 counter-css" >{format(counter)}</div>}

                                    </div>
                                        
                                </form>
                                {sms ? form.number.length===6?
                                            <button
                                            onClick={(e) => verifyPhone(e)}
                                            htmlFor="phone"
                                            className=" btn verify-phone-css"
                                            > ?????????????????????? </button>
                                            :
                                            <button
                                            htmlFor="phone"
                                            className=" btn verify-phone-css opacity-50"
                                            > ?????????????????????? </button>
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
 
            </div>

            <Footer />
        </div>
    );
};


export default Login;