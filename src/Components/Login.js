import React, { useState, useEffect } from "react";
import { faBars ,faUserCircle,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faHeart,faXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo1 from "../Components/img/logotip1.png";
import logo2 from "../Components/img/logotip2.png";
import {API_PATH} from "./constans";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {toast} from "react-toastify";
import Footer from "./Footer";
import axios from "axios";

const Login = (props) => {
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


    const postPhone = async (e) => {
        e.preventDefault();
        try {
            const num = await axios.post(
                `${API_PATH}register/`,
                { phone: form.phone ,password:12332435},
                { headers: { "Content-Type": "application/json" } }
            );
            if (num.data.message === "Password yuborildi.") {
                setSms(true);
                counter=120
            } else {
                setSms(false);
            }
            console.log({phone: form.phone});
        } catch (e) {
            console.log(e);
        }
        setSms(true);
    };
    
    
    
    const verifyPhone = async (e) => {
        e.preventDefault();
        try {
            const verify = await axios.post(
                `${API_PATH}customerphonecheck/`,
                { phone: form.phone, password: form.number },
                { headers: { "Content-Type": "application/json" } }
            );

            if(verify.data.token===''){
                toast('Неверный пароль')
            } 
            else{
                toast('Подтверждено')
                localStorage.setItem("token", verify.data.token);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <div className="nav-box">
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
                                    <div className="d-flex">

                                    </div>

                                ) : (
                                    <div className="w-100">
                                        <div className="first-part align-items-center">
                                            <Link to={"/login"} className="align-items-center d-flex">
                                                <FontAwesomeIcon className='faBarsCss align-items-center' icon={faBars} />
                                                <FontAwesomeIcon className='faUserCircleTop align-items-center' icon={faUserCircle} />
                                            </Link>
                                        </div>
                                        <div className="home-user-part align-items-center">
                                        
                                            <Link to={"/"} className="align-items-center  home-user-part_link">
                                            <FontAwesomeIcon className='align-items-center faMagnifyingGlassCss' icon={faMagnifyingGlass} />
                                            <p>Поиск</p>
                                            </Link>
                                        
                                            <Link to={"/login"} className="align-items-center home-user-part_link">
                                            <FontAwesomeIcon className='text-red align-items-center faHeartCss' icon={faHeart} />
                                            <p>Вишлисты</p>
                                            </Link>
                                        
                                            <Link to={"/login"} className="align-items-center home-user-part_link">
                                            <FontAwesomeIcon classNxame='align-items-center faUserCircleBottom' icon={faUserCircle} />
                                            <p>Войти</p>
                                            </Link>
                                        
                                        </div>    
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
            </div>

            <div className="container mt-5">
                <div className="row  justify-content-center align-items-center mt-5">
                    <div className="col-lg-4 col-sm-8 col-md-6 mt-5">
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
                                            placeholder="Телефон номер"
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
                                        {sms ? "Повторить" : "Отправить"}
                                    </button>
                                        :
                                        <button
                                            htmlFor="phone"
                                            className={`btn phone-button-css opacity-50 ms-1 ${
                                                smsVerify ? "d-none" : ""
                                            }`}
                                            style={{ width: "25%" }}
                                        >
                                            {sms ? "Повторить" : "Отправить"}
                                        </button>

                                        }
                                    </div>

                                    <div className={`form-field flex ${sms ? "" : "d-none"}`}>
                                        <input
                                            onChange={(e) => onChange(e)}
                                            type="text"
                                            id="number"
                                            name="number"
                                            placeholder="СМС номер"
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
                                            > Подтвердить </button>
                                            :
                                            <button
                                            htmlFor="phone"
                                            className=" btn verify-phone-css opacity-50"
                                            > Подтвердить </button>
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