import React, { useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {API_PATH, headers} from "./constans";
import {connect} from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-calendar/dist/Calendar.css';
import {Link} from "react-router-dom";
import logo1 from "./img/logotip1.png";
import logo2 from "./img/logotip2.png";
import Footer from "./Footer";
import Container from 'react-bootstrap/Container';
import 'react-calendar/dist/Calendar.css';
import { faBars,faUserCircle,faMagnifyingGlass,faStar,faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyOrders =  (props) => {

    const [modalin, setModalin] = useState(false);
    const togglein = () => setModalin(!modalin);
    const [isLoading, setIsLoading] = useState(true);
    
    const [countryhouses,setcountryhouses] = useState({})
    useEffect(() => {
        axios.get(API_PATH+"api/CountryHouse/",headers).then((res) => {
            setcountryhouses(res.data)
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            setIsLoading(true);
            
        }
            )
        },[] );

        function removetokenandlogout(){
            localStorage.removeItem("token")
             
        }


    return (
        <>    
        {isLoading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ):
            (<>
                    <div className="nav-box-main">
                        <Container>
                            <div className="navbar_main">
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
                                                    <Link to={"#"} className="align-items-center d-flex">
                                                    <FontAwesomeIcon className='faBarsCss align-items-center' icon={faBars} />
                                                    <FontAwesomeIcon className='faUserCircleTop align-items-center' icon={faUserCircle} />
                                                </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item href="/wishlists">Список желаний</Dropdown.Item>
                                                        <Dropdown.Item href="/myorders">Мои заказы</Dropdown.Item>

                                                        <Dropdown.Item href="#" onClick={removetokenandlogout}>Выйти</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                
                                            </div>
                                            <div className="home-user-part align-items-center">
                                            
                                                <Link to={"/"} className="align-items-center  home-user-part_link">
                                                <FontAwesomeIcon className='align-items-center faMagnifyingGlassCss' icon={faMagnifyingGlass} />
                                                <p>Поиск</p>
                                                </Link>
                                            
                                                <Link to={"/wishlists"} className="align-items-center home-user-part_link">
                                                <FontAwesomeIcon className='text-red align-items-center faHeartCss' icon={faHeart} />
                                                <p>Вишлисты</p>
                                                </Link>
                                                

                                                <Dropdown className='align-items-center home-user-part_link'>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example1" className='align-items-center home-user-part_link'>
                                                        <Link to={"#"} className="align-items-center home-user-part_link">
                                                        <FontAwesomeIcon className='align-items-center faUserCircleBottom' icon={faUserCircle} />
                                                        <p>Войти</p>
                                                        </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                    <Dropdown.Item href="/myorders">Мои заказы</Dropdown.Item>

                                                        <Dropdown.Item href="#" onClick={removetokenandlogout}>Выйти</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                
                                            
                                            </div> 
                                            
                                        </div>
                                    ) : (
                                        <div className="w-100">
                                            <div className="first-part align-items-center">
                                            <Dropdown className='align-items-center '>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example1" className='align-items-center home-user-part_link2'>
                                                    <Link to={"#"} className="align-items-center d-flex">
                                                    <FontAwesomeIcon className='faBarsCss align-items-center' icon={faBars} />
                                                    <FontAwesomeIcon className='faUserCircleTop align-items-center' icon={faUserCircle} />
                                                </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item href="/login">Авторизоваться</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
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
                                                <Dropdown className='align-items-center home-user-part_link'>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example1" className='align-items-center home-user-part_link'>
                                                        <Link to={"#"} className="align-items-center home-user-part_link">
                                                        <FontAwesomeIcon className='align-items-center faUserCircleBottom' icon={faUserCircle} />
                                                        <p>Войти</p>
                                                        </Link>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="white">
                                                        <Dropdown.Item href="/login">Авторизоваться</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                
                                            </div>    
                                        </div>
                                    )}
                                </div>

                                </div>
                            </div>
                        </Container>
                    </div>
                <Container className="tl_article"> 
                    <div className="all_main">
                        <div className="all_main_part">
                            <Link to={"/"} className="d-flex">
                                <FontAwesomeIcon icon={faAngleLeft} />
                                <p className="">Дома</p>
                            </Link>
                        </div>
                    </div> 
                    <div className="main-cart">
                    <Row className='row_css_home_page'>
                        {countryhouses?
                            countryhouses.map(item => (
                                <></>
                                // <Col sm={12} xs={12} md={6} lg={3} ><div className="countryhousemenu ">
                                //             <span className='pink'>
                                //             {
                                //                 localStorage.getItem("token") ? 
                                //                 item.heart?
                                //                 <FontAwesomeIcon className='align-items-center text-danger' onClick={(e) =>addorremovemyfavorite(item.id)} icon={faHeart}  />
                                //                 :
                                //                 <FontAwesomeIcon className='align-items-center' onClick={(e) =>addorremovemyfavorite(item.id)}  icon={faHeart}  />
                                //             :
                                //             <Link to={"/login"}> 
                                //                 <FontAwesomeIcon className='align-items-center text-white' icon={faHeart}  />
                                //             </Link>

                                //                                                 }
                                                
                                //             </span>
                                //             <div className="carousel-main ">
                                //                 {/* autoplay={true}  */}
                                                    
                                //                 <Slider dots={true} autoplaySpeed={3000} >
                                //                     {item.images.map(index => (
                                //                         <div className="ar-16-9">
                                //                             <img  src={index} className="ar-16-9-child" onClick={(e) =>{ setimage(e.target.src)
                                //                             // setimgModalin(!imgmodalin);
                                //                         }}
                                //         data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                //                             alt="asadfadf"/> 
                                //                         </div>
                                //                         ))}
                                //                 </Slider>
                                //             </div>
                                            
                                                        
                                //             <Link to={"/countryhouse/"+`${item.id}`} className="out text-decoration-none p-1 text-black">
                                //             <Row>
                                //                 <Col sm={8} xs={8} md={8} lg={8} >
                                //                     <h3 className='size'>{item.name}</h3>
                                //                     <p className='size'>{item.price} сум </p>
                                //                 </Col>
                                //                 <Col sm={4} xs={4} md={4} lg={4} className="reting_part_css">
                                //                 <FontAwesomeIcon className='align-middle' icon={faStar} />
                                //                 <span>{item.reyting}</span> 
                                                
                                //                 </Col>
                                //             </Row>
                                //             </Link>
                                //         </div>
                                // </Col>

                            ))
                            :
                        ''}
                    </Row>
                    </div>
                    <Footer/>
                </Container>
            </>  
            )}
            </>
            

    );
};




export default MyOrders;

















