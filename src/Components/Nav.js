import React, {Component, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {UncontrolledCollapse, Button, CardBody, Card, Modal} from 'reactstrap';
import axios from "axios";
import {API_PATH} from "./constans";
import {connect} from "react-redux";
import ModalBody from "reactstrap/es/ModalBody";
import logo1 from "./img/logotip1.png";
import logo2 from "./img/logotip2.png";
import { faHeart,faBars ,faUserCircle,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Navbar = (props) => {

    useEffect(() => {
        props.getBurger();
        props.onSubmit(window.location.pathname.split('/')[2]);

    }, [])


    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [inputValue, setInputValue] = useState('')
    useEffect(() => {
        axios.get(API_PATH + "api/ProductInfo/")
            .then((response) => {
                setAPIData(response.data.data);
            })
    }, [])
    useEffect(() => {
        axios.get(API_PATH + "api/ProductInfo/")
            .then((response) => {
                setAPIData(response.data.data);
            })
    }, [])


    const searchItems = (e) => {
        setInputValue(e.target.value)
        const allBrands = APIData.filter(item => e.target.value.toLowerCase() === item.brand.toLowerCase())
        console.log(allBrands)
        setFilteredResults(allBrands)
    }

    const [formdata, setFormdata] = useState({
        name: '',
    })

    const [modalin, setModalin] = useState(false);
    const togglein = () => setModalin(!modalin);

    const [input, setInput] = useState('')

    const inputHandler = e => {
        setInput(e.target.value)
    }


    return (
        <div className="nav-box">
            <FontAwesomeIcon icon={['fab', 'twitter']} />
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
                    <div onClick={togglein} className="allinp align-items-center">
                        <div>
                            <h2>Куда?</h2>
                        </div>
                        <div className='align-items-center bkgvjh'>
                            <FontAwesomeIcon className='align-items-center faMagnifyingGlassCssTop' icon={faMagnifyingGlass} />
                        </div>
                        <Modal isOpen={modalin} toggle={togglein}>

                            <ModalBody className="for-inputt">
                                <div className="for-input">

                                    <input value={input} onChange={e => inputHandler(e)} type=""  placeholder="Я ищу..."/>
                                    <Link to={"/filter/"+(input)} onClick={(e) => props.onSubmit(input)}>
                                        <div onClick={togglein}></div>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </Link>
                                </div>
                            </ModalBody>
                        </Modal>
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
    );

}


export default Navbar;