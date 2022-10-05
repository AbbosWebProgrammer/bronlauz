import React, { useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Footer from "./Footer";
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {API_PATH,headers} from "./constans";
import {connect} from "react-redux";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import ModalBody from "reactstrap/es/ModalBody";
import logo1 from "./img/logotip1.png";
import alcohollogo from "./img/acohol.png";
import notalcohollogo from "./img/notalcahol.png";
import {Modal} from 'reactstrap';
import logo2 from "./img/logotip2.png";
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faBars,faUserCircle,faMagnifyingGlass,faStar,faXmark} from '@fortawesome/free-solid-svg-icons'
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import Dropdown from 'react-bootstrap/Dropdown';
const Wishlists = (props) => {
        const [isLoading, setIsLoading] = useState(true);
    
        const [countryhouses,setcountryhouses] = useState([])
        const [allcountryhouses,setallcountryhouses] = useState([])
        const [currentIndex,setcurrentIndex] = useState(10)
        const [provinces,setprovinces] = useState([])
        const [companies,setcompanies] = useState([])
        const [filterelements, setfilterelements] = useState({
            province: [],
            countryhousetype: [],
            alcohol: null,
        });
    
        const [modalin, setModalin] = useState(false);
        const [imgmodalin, setimgModalin] = useState(false);
        const togglein = () => setModalin(!modalin);
    
        const [image,setimage] = useState('')
    
        function removetokenandlogout(){
            localStorage.removeItem("token")
        }
    
        useEffect(() => {
            axios.get(API_PATH+"api/Wishlists/",headers).then((res) => {
                setallcountryhouses(res.data)
                setcountryhouses(res.data.slice(0,8))
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
                setIsLoading(true);
                }).catch(function (res) {
                    if(res.message.includes("401")){
                        localStorage.removeItem("token")
        
                    }
                  })
        },[] );
        function nextIndex(){
            setcurrentIndex(currentIndex+8)
            setcountryhouses(allcountryhouses.filter((allcountryhouses,idx) => idx < currentIndex))
          }
        useEffect(() => {
            axios.get(API_PATH+"api/Province/",headers).then((res) => {
                setprovinces(res.data)
                }
            ).catch(function (res) {
                if(res.message.includes("401")){
                    localStorage.removeItem("token")
    
                }
              })
        },[] );
        useEffect(() => {
            axios.get(API_PATH+"api/CountryHouseTypeView/",headers).then((res) => {
                setcompanies(res.data)
                }
            ).catch(function (res) {
                if(res.message.includes("401")){
                    localStorage.removeItem("token")
    
                }
              })
        },[] );
    
        function addorremovemyfavorite(id) { 
            let data={"id":id}
            axios.post(API_PATH+'api/AddOrRemovemyFavorite/', {data}, headers)
            .then((res) => {
                let allprojects = allcountryhouses.map(project => {
                    if (project.id === id) {
                        project.heart=!project.heart
                        return project;
                    } 
                    else {
                        return project;
                    }
                });
                setallcountryhouses(allprojects)
                let projects = countryhouses.map(project => {
                    if (project.id === id) {
                        project.heart=!project.heart
                        return project;
                    } 
                    else {
                        return project;
                    }
                });
                setcountryhouses(projects)
            }).catch(function (res) {
                if(res.message.includes("401")){
                    localStorage.removeItem("token")
                }
              });
            
    
    }
        function arrayRemove() { 
                filterelements.province = []
                filterelements.countryhousetype = []
                filterelements.alcohol = null
    
        }
        function intersect(a, b) {
            return a.filter(Set.prototype.has, new Set(b));
      }
    
        const inputfilterchange=(name,id) =>{
            if (name==='province'){
                if (filterelements.province.includes(id)){
                    const k = filterelements.province
                    for( var j = 0; j < k.length; j++){ 
                        if ( k[j]===id) { 
                            k.splice(j, 1); 
                        }
                    }
                    filterelements.province=k
                    document.getElementById(`${name}_${id}`).classList.remove("select-option-checked-div-css");
                }
                else{
                    filterelements.province.push(id) 
                    document.getElementById(`${name}_${id}`).classList.add("select-option-checked-div-css");
                }
            }
            if (name==='countryhousetype'){
                if (filterelements.countryhousetype.includes(id)){
                    const k = filterelements.countryhousetype
                    for( var j = 0; j < k.length; j++){ 
                        if ( k[j]===id) { 
                            k.splice(j, 1); 
                        }
                    }
                    filterelements.countryhousetype=k
                    document.getElementById(`${name}_${id}`).classList.remove("select-option-checked-div-css");
                }
                else{
                    filterelements.countryhousetype.push(id) 
                    document.getElementById(`${name}_${id}`).classList.add("select-option-checked-div-css");
                }
            }
            if (name==='alcohol'){
                if (filterelements.alcohol!==id){
                    if (id===true){
                        filterelements.alcohol=true
                        document.getElementById(`${name}_${id}`).classList.add("select-option-checked-div-css");
                        document.getElementById(`${name}_false`).classList.remove("select-option-checked-div-css");
                    }
                    else{
                        filterelements.alcohol=false
                        document.getElementById(`${name}_${id}`).classList.add("select-option-checked-div-css");
                        document.getElementById(`${name}_true`).classList.remove("select-option-checked-div-css");
    
                    }
                }
                else{
                    filterelements.alcohol=null
                    document.getElementById(`${name}_${id}`).classList.remove("select-option-checked-div-css");
                }
            }
        }
     
        
        async function getdate() {
            axios.get(API_PATH+"api/Wishlists/",headers).then((res) => {
                console.log(res.data)
                setallcountryhouses(res.data)
                allcountryhouses=res.data
                }
                ).catch(function (res) {
                    if(res.message.includes("401")){
                        localStorage.removeItem("token")
                    }
                  })
         }
        function filtertogglein() { 
            getdate()
            var filtercountryhouses=allcountryhouses
            console.log(filtercountryhouses)
            console.log(filterelements)
            if (filterelements.alcohol!== null){
                filtercountryhouses=filtercountryhouses.filter(function (el) {
                    return el.alcohol === filterelements.alcohol
                    })
            }
    
            if (filterelements.province.length!== 0){
                filtercountryhouses=filtercountryhouses.filter(function (el) {
                    return filterelements.province.includes(el.province)
                })
                }
    
    
            if (filterelements.countryhousetype.length!== 0){
                filtercountryhouses=filtercountryhouses.filter(function (el) {
                        return intersect(el.company, filterelements.countryhousetype).length!==0  
                    })
                }
            setcountryhouses(filtercountryhouses.slice(0,10))
            setallcountryhouses(filtercountryhouses)
            console.log(filtercountryhouses)
            setModalin(!modalin);
        }
    
        function arrayRemove() { 
            for( var j = 0; j < filterelements.province.length; j++){ 
                document.getElementById(`province_${filterelements.province[j]}`).classList.remove("select-option-checked-div-css");   
            }
            filterelements.province = []
            for( var j = 0; j < filterelements.countryhousetype.length; j++){ 
                document.getElementById(`countryhousetype_${filterelements.countryhousetype[j]}`).classList.remove("select-option-checked-div-css");   
            }
            filterelements.countryhousetype = []
            if (filterelements.alcohol===true){
                document.getElementById(`alcohol_true`).classList.remove("select-option-checked-div-css");   
            }
            else if(filterelements.alcohol===false){
                document.getElementById(`alcohol_false`).classList.remove("select-option-checked-div-css");   
            }
            filterelements.alcohol = null
    }
    
        return (<>
                        {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ):
                (<>
                <div className="nav-box">
                    <Container>
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
                                        <h2>Поиск</h2>
                                    </div>
                                    <div className='align-items-center bkgvjh'>
                                        <FontAwesomeIcon className='align-items-center faMagnifyingGlassCssTop' icon={faMagnifyingGlass} />
                                    </div>
                                    <Modal  isOpen={modalin}  fade={false} backdrop="static">
                                        <ModalBody className="for-inputt">
                                            <FontAwesomeIcon icon={faXmark} className="faXmarkcss" onClick={togglein} />
                                            <hr/>
                                            <div className='biod118 mt-2'>
                                                <h3>Куда?</h3>
                                                <div class="cont-main">
                                                    <div name="province" id="province" className="select-div-css">
                                                        {/* //  select-option-checked-div-css   */}
                                                        {provinces.map(item => {  return  <div   className={`me-1 select-option-div-css ${filterelements.province.includes(item.id)?'select-option-checked-div-css':''}`} onClick={(e) =>inputfilterchange('province',item.id)}  id={`province_${item.id}`} value={item.name}  > 
                                                            <img src={item.image} className='filterimagelogocss' alt={item.name}/>
                                                            
                                                            <p>{item.nameru}</p>
    
                                                        </div>
                                                    })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='biod118 mt-2'>
                                                <h3>Выберите вашу компанию: </h3>
                                                <div class="cont-main">
                                                    <div name="countryhousetype" id="countryhousetype" className="select-div-css">
                                                        {/* //  select-option-checked-div-css   */}
                                                        {companies.map(item => {  return  <div   className={`me-1 select-option-div-css ${filterelements.countryhousetype.includes(item.id)?'select-option-checked-div-css':''}`} onClick={(e) =>inputfilterchange('countryhousetype',item.id)}  id={`countryhousetype_${item.id}`} value={item.typenameru}  > 
                                                            <img src={item.image} className="filterimagelogocss" alt={item.typenameru}/>
                                                            <p className='ps-2 pe-2'>{item.typenameru}</p>
                                                        </div>
                                                    })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="biod118 mt-2">
                                                <h3>Разрешение на алкогольные напитки? </h3>
                                                <div class="cont-main">
                                                    <div name="alcohol" id="alcohol" className="select-div-css">
                                                        <div  onClick={(e) =>inputfilterchange('alcohol',true)} className={`me-1 select-option-div-css ${filterelements.alcohol===true?'select-option-checked-div-css':''}`}  id='alcohol_true' value='alcohol' >
                                                                <img src={alcohollogo} className="filterimagelogocss" alt='alcohol'/>
                                                                <p className='ps-2 pe-2'>Разрешить</p>
                                                        </div>
                                                        <div  onClick={(e) =>inputfilterchange('alcohol',false)} className={`me-1 select-option-div-css ${filterelements.alcohol===false?'select-option-checked-div-css':''}`}  id='alcohol_false' value='alcohol' >
                                                                <img src={notalcohollogo } className="filterimagelogocss" alt='alcohol'/>
                                                                <p className='ps-2 pe-2'>Не Разрешить</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                                            
                                            <div className="f1d8juxi p1oks84c">
                                            
                                                <Link to='#' className="d-flex _za4ekfm">
                                                    <div onClick={arrayRemove}>Очистить всё</div>
                                                </Link>
                                                <Link to='#' onClick={filtertogglein} className="d-flex searchbuttoncss p1oks84c" >
                                                <FontAwesomeIcon icon={faMagnifyingGlass}  className='' />
                                                <div  className='ms-2'>Искать</div>
                                            </Link>
                                            </div>
                                        </ModalBody>
                                    </Modal>
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
                <Container>   
                    <ReactScrollWheelHandler downHandler={nextIndex}  >
                        <Row className='row_css_home_page'>
                        {countryhouses?
                            countryhouses.map(item => (
                                    <Col sm={12} xs={12} md={6} lg={3} >
                                        <div className="countryhousemenu ">
                                            <div className="carousel-main ">                           
                                                <span className='pink'>
                                                {
                                                    localStorage.getItem("token") ? 
                                                    item.heart?
                                                    <FontAwesomeIcon className='align-items-center text-danger' onClick={(e) =>addorremovemyfavorite(item.id)} icon={faHeart}  />
                                                    :
                                                    <FontAwesomeIcon className='align-items-center' onClick={(e) =>addorremovemyfavorite(item.id)}  icon={faHeart}  />
                                                :
                                                <Link to={"/login"}> 
                                                    <FontAwesomeIcon className='align-items-center text-white' icon={faHeart}  />
                                                </Link>
                                                }
                                                    
                                                </span>
                                                <span className='countryhousename'> {item.name} </span>
                                                <span className='reting_part_css'>
                                                        <FontAwesomeIcon className='align-middle me-1' icon={faStar} />
                                                        <span>{item.reyting}</span> 
                                                </span>                         
                                                <Slider dots={true} autoplaySpeed={3000} >
                                                    {item.images.map(index => (
                                                        <Link to={"/countryhouse/"+`${item.id}`} className="text-decoration-none">
                                                        <div className="ar-16-9">
                                                            
                                                            <img  src={index} className="ar-16-9-child" onClick={(e) =>{ setimage(e.target.src)
                                                            // setimgModalin(!imgmodalin);
                                                        }}
                                                          data-bs-toggle="modal" data-bs-target="#exampleModal"   alt="asadfadf"/> 
                                                            
                                                        </div>
                                                        </Link>
                                                        ))}
                                                </Slider>
                                            </div>
                                                                    
                                            <Link to={"/countryhouse/"+`${item.id}`} className="p-1 text-decoration-none text-black">
                                                <Row>
                                                    <Col sm={6} xs={6} md={6} lg={6} >
                                                        <h4 className='size'>{item.provincename}</h4>
                                                    </Col>
                                                    <Col sm={6} xs={6} md={6} lg={6}  className="text-end">
                                                    {item.companylist.map(item => {  return <img src={item.image} className="alcohollogocss" alt="img"/>})}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={9} xs={9} md={9} lg={9} >
                                                        <p className='size'>{item.workingdays} / {item.weekends} сум </p>
                                                    </Col>
                                                    <Col sm={3} xs={3} md={3} lg={3} className="text-end">
                                                        {item.alcohol?
                                                                <img src={alcohollogo} className="alcohollogocss" alt="img"/>
                                                                :
                                                                <img src={notalcohollogo} className="alcohollogocss"  alt="img"/>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Link>
                                        </div>
                                    </Col>
    
                                    ))
                        :
                     ''}
                        </Row>
                    </ReactScrollWheelHandler>
                    <Modal  fade={true} className="h_100vh w-100"
                        isOpen={imgmodalin}
                        onClick={(e) =>{ setimgModalin(!imgmodalin)}}  >
                            <ModalBody className="d-flex justify-content-center py-0 mb-0 h_100vh mt-0 ">
                                <img src={image} className="h_100vh" alt="img"/>
                            </ModalBody>
                    </Modal>
    
                    <Footer/>
                </Container>
                </>  
                )}</>
            );
                                
    }
        
 
    
    
    export default Wishlists;
    