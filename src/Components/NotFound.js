import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {API_PATH,headers} from "./constans";
import {Link} from "react-router-dom";
import logo1 from "../images/bronlauz/logo.webp";
import logo2 from "../images/bronlauz/large_logo.webp";
import Dropdown from 'react-bootstrap/Dropdown';
import { faBars,faUserCircle,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { YMInitializer } from 'react-yandex-metrika';
import '../main.scss'


const NotFound = (props) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [modalin, setModalin] = useState(false);
    function removetokenandlogout(){
        localStorage.removeItem("token");
        window.location.reload(false);
    }


    return (<>
      <YMInitializer  accounts={[90594448]} options={{webvisor: true}} version="2"/>

            {isLoading ?
            (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            )
            :                
            <>
                
                
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
                                                        <Dropdown.Item as={Link} href="/wishlists"><Link to={"/wishlists"} className="align-items-center d-flex dropdownbuttoncss">Список желаний</Link></Dropdown.Item>
                                                        <Dropdown.Item as={Link} href="/myorders"><Link to={"/myorders"} className="dropdownbuttoncss">Мои заказы</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">Добавить дачу через телеграм бота</Dropdown.Item>
                                                        
                                                        <Dropdown.Item href="/" onClick={removetokenandlogout}>Выйти</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                
                                            </div>
                                            <div className="home-user-part align-items-center">
                                            
                                                <Link to={"/"} className="align-items-center  home-user-part_link">
                                                <FontAwesomeIcon className='align-items-center faMagnifyingGlassCss' icon={faMagnifyingGlass} />
                                                <p>Фильтр</p>
                                                </Link>
                                            
                                                <Link to={"/wishlists"} className="align-items-center home-user-part_link">
                                                <FontAwesomeIcon className='text-red align-items-center faHeartCss' icon={faHeart} />
                                                <p>Вишлисты</p>
                                                </Link>
                                                

                                                <Dropdown className='align-items-center home-user-part_link'>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example2" className='align-items-center home-user-part_link'>
                                                        <Link to={"#"} className="align-items-center home-user-part_link">
                                                        <FontAwesomeIcon className='align-items-center faUserCircleBottom' icon={faUserCircle} />
                                                        <p>Войти</p>
                                                        </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item as={Link} href="/myorders"><Link to={"/myorders"} className="dropdownbuttoncss">Мои заказы</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">Добавить дачу через телеграм бота</Dropdown.Item>
                                                        
                                                        <Dropdown.Item href="/" onClick={removetokenandlogout}>Выйти</Dropdown.Item>
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
                                                        <Dropdown.Item as={Link} href="/login">Авторизоваться<Link to={"/login"} className="align-items-center d-flex dropdownbuttoncss">Авторизоваться</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">Добавить дачу через телеграм бота</Dropdown.Item>
                                                        
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="home-user-part align-items-center">
                                                <Link to={"/"} className="align-items-center  home-user-part_link">
                                                    <FontAwesomeIcon className='align-items-center faMagnifyingGlassCss' icon={faMagnifyingGlass} />
                                                    <p>Фильтр</p>
                                                </Link>
                                            
                                                <Link to={"/login"} className="align-items-center home-user-part_link">
                                                    <FontAwesomeIcon className='text-red align-items-center faHeartCss' icon={faHeart} />
                                                    <p>Вишлисты</p>
                                                </Link>
                                                <Dropdown className='align-items-center home-user-part_link'>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example4" className='align-items-center home-user-part_link'>
                                                        <Link to={"#"} className="align-items-center home-user-part_link">
                                                        <FontAwesomeIcon className='align-items-center faUserCircleBottom' icon={faUserCircle} />
                                                        <p>Войти</p>
                                                        </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item as={Link} href="/login">Авторизоваться<Link to={"/login"} className="align-items-center d-flex dropdownbuttoncss">Авторизоваться</Link></Dropdown.Item>
                                                        <Dropdown.Item href="https://t.me/bronlabot">Добавить дачу через телеграм бота</Dropdown.Item>
                                                        
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
            
            <div className='webcontainer'>  
                <div className='row_css_home_page  min-vh-75 p-3 mb-5'>
                    <h1>Похоже, мы не можем найти нужную вам страницу.</h1>
                    <hr/>
                    <h4>Код ошибки: 404 </h4>

                    <p>Пора придумать новое путешествие!</p>
                    <Link to={"/"} >Главная</Link>
                </div>
            </div>
            
        
            </>  
            }</>
        );
                            
}
    
export default NotFound;
