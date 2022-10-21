import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {API_PATH,API_ROOT_PATH,headers} from "./constans";
import {Link} from "react-router-dom";
import logo1 from "../images/bronlauz/logo.webp";
import alcohollogo from "../images/bronlauz/alcohol.webp";
import notalcohollogo from "../images/bronlauz/notalcohol.webp";
import logo2 from "../images/bronlauz/large_logo.webp";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Footer from "./Footer";
import { faBars,faUserCircle,faMagnifyingGlass,faStar,faXmark,faMap,faList} from '@fortawesome/free-solid-svg-icons'
import {YMaps,Map,Placemark,FullscreenControl,Clusterer,TypeSelector} from 'react-yandex-maps';
import { YMInitializer } from 'react-yandex-metrika';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LazyLoadImage } from 'react-lazy-load-image-component';
SwiperCore.use([Navigation, Pagination]);
const Home = (props) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, sethasMore] = useState(true);
    const [beenviewed, setbeenviewed] = useState(true);
    const [isLoaded, setisLoaded] = useState(false);

    const [countryhouses,setcountryhouses] = useState([])
    const [allcountryhouses,setallcountryhouses] = useState([])
    const [currentIndex,setcurrentIndex] = useState(12)
    const [provinces,setprovinces] = useState([])
    const [companies,setcompanies] = useState([])

    const [filterelements, setfilterelements] = useState({
        province: [],
        countryhousetype: [],
        alcohol: null,
    });
    
    
    const [modalin, setModalin] = useState(false);
    const [yandexmap, setYandexmap] = useState(false);
    const [imgmodalin, setimgModalin] = useState(false);
    const togglein = () => setModalin(!modalin);

    const [image,setimage] = useState('')

    function removetokenandlogout(){
        localStorage.removeItem("token");
        window.location.reload(false);

    }

    useEffect(() => {
        axios.get(API_PATH+"Wishlists/",headers).then((res) => {
            setallcountryhouses(res.data)
            setcountryhouses(res.data.slice(0,12))
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
            setIsLoading(true);
            }).catch(function (res) {
                if(res.message.includes("401")){
                    localStorage.removeItem("token");
                    window.location.reload(false);
    
                }
                })
    },[] );
    useEffect(() => {
        axios.get(API_PATH+"Province/",headers).then((res) => {
            setprovinces(res.data)
            }
        ).catch(function (res) {
            if(res.message.includes("401")){
                localStorage.removeItem("token");
                window.location.reload(false);
            }
            })
    },[] );
    useEffect(() => {
        axios.get(API_PATH+"CountryHouseTypeView/",headers).then((res) => {
            setcompanies(res.data)
            }
        ).catch(function (res) {
            if(res.message.includes("401")){
                localStorage.removeItem("token");
                window.location.reload(false);
            }
            })
    },[] );
    function nextIndex(){
        if(hasMore!==false){
            setTimeout(() => {
                setisLoaded(false);
                setcountryhouses(allcountryhouses.filter((ch,idx) => idx < currentIndex+8))
                setcurrentIndex(currentIndex+8)
            }, 1000);
            setisLoaded(true);
            if (countryhouses.length===allcountryhouses.length){
                sethasMore(false);
            } 
        }

    }
    

    function addorremovemyfavorite(id) { 
        let data={"id":id}
        axios.post(API_PATH+'AddOrRemovemyFavorite/', {data}, headers)
        .then((res) => {
            console.log('id',id);
            const newList = allcountryhouses.filter((item) => item.id !== id);
            setallcountryhouses(newList);
            const newList1 = countryhouses.filter((item) => item.id !== id);
            setcountryhouses(newList1);

        }).catch(function (res) {
            if(res.message.includes("401")){
                localStorage.removeItem("token");
                window.location.reload(false);
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
    
    
    function filtertogglein() { 
        axios.get(API_PATH+"CountryHouse/",headers).then((res) => {
            var filtercountryhouses=res.data
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
            setModalin(!modalin);

            }
            ).catch(function (res) {
                if(res.message.includes("401")){
                    localStorage.removeItem("token");
                    window.location.reload(false);
                }
              })
        
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
        filterelements.alcohol = null}

    return (<>
        <YMInitializer  accounts={[90594448]} options={{webvisor: true}} version="2"/>

            {isLoading ?
            (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            )
            :
            (
            <>
                {
                    yandexmap?
                    <button className="_15e9w0f" onClick={(e) =>{ setYandexmap(!yandexmap)}} >
                        <span className="_7u66d2">
                            <span className="_r16tng">Показать список</span>
                            <div className="_hqsu3j"><FontAwesomeIcon icon={faList} /></div>
                        </span>
                    </button>
                    :
                    <button className="_15e9w0f yandex-map-open-button" onClick={(e) =>{ setYandexmap(!yandexmap)}}>
                        <span className="_7u66d2">
                            <span className="_r16tng">Показать карту</span>
                            <div className="_hqsu3j"><FontAwesomeIcon icon={faMap} /></div>
                        </span>
                    </button>    
                }
                
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
                                <div onClick={togglein} className="allinp align-items-center">
                                    <div>
                                        <h2>Фильтр</h2>
                                    </div>
                                    <div className='align-items-center bkgvjh'>
                                        <FontAwesomeIcon className='align-items-center faMagnifyingGlassCssTop' icon={faMagnifyingGlass} />
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
            {yandexmap? 
                <div className='ymaps_css_home_page_map'>
                    <YMaps >
                        <Map  width="100%" height="100vh"
                            defaultState={{
                            center: [41.311158, 69.279737],
                            zoom: 10,
                            controls: ['zoomControl', 'fullscreenControl']
                            }} modules={['control.ZoomControl', 'control.FullscreenControl']}>
                                <Clusterer options={{ preset: 'islands#invertedVioletClusterIcons', groupByCoordinates: false  }}>
                            {allcountryhouses.map(item => (
                                <Placemark geometry={item.listlocation} 
                                options={{  preset: 'islands#greenDotIconWithCaption'}}
                                modules={['geoObject.addon.balloon']}
                                properties={{
                                    iconCaption: `${item.workingdays} сум`,
                                    balloonContentBody:"sdcsldjnsd",
                                    balloonContentBody: `
                                    <a href="/countryhouse/${item.id} " target="_blank" className="text-decoration-none text-black">
                                        <div class="yandex_map_main_page">	
                                                <div class="yandex_map_main_page_label mymoveanimation" for="clubs"><img src=${API_ROOT_PATH}${item.images[0]} alt="image" ></div>
                                            
                                        </div>
                                        <div class='yandex_map_main_page_title'>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                                        <h4 class="size">${item.name}</h4>
                                                    </div>
                                                    <div class="text-end col-lg-6 col-md-6 col-sm-6 col-6">
                                                    ${item.companylist.map(item => { return  `<img src=${item.image} class="alcohollogocss" alt="img"/>`}).join('')}
                                                    </div>
                                                </div>    
                                                <div class="row">
                                                    <div class="col-lg-9 col-md-9 col-sm-9 col-9">
                                                        <p class="size ">${item.workingdays} / ${item.weekends} сум </p>
                                                    </div>
                                                    <div class="text-end col-lg-3 col-md-3 col-sm-3 col-3">
                                                    ${item.alcohol?
                                                        '<img src="https://www.bronla.uz/images/bronlauz/alcohol.09ee3463388e4939b4c4.webp" class="alcohollogocss" alt="img"/>'
                                                        :
                                                        '<img src="https://www.bronla.uz/images/bronlauz/notalcohol.0c6ab5a358f40e8e1be0.webp" class="alcohollogocss"  alt="img"/>'
                                                        }
                                                        </div>
                                                </div>
                                        </div>
                                    </a>
                                    `
                                    
                                    // <iframe  src=${"http://localhost:3000/countryhouse/"+`${item.id}`} title="W3Schools Free Online Web Tutorials">`
                                }} /> ))
                            }

                            </Clusterer>  
                            <TypeSelector options={{float: 'right'}} />
                        </Map>
                    </YMaps> 
                </div> 
            :
            <div className='webcontainer'>  
                {
                    isLoaded?<div className='data_add_loaded text-center'>
                        <div className='loadingcss'>
                            <div  className='dot-pulse'>
                            </div>
                        </div>
                    </div>
                    
                    :''
                }  
                {allcountryhouses.length===0?<div className='row_css_home_page  min-vh-75 p-3 mb-5'>
                    <h1 >Вишлисты</h1>
                    <hr/>
                    <h4>Создайте свой первый вишлист</h4>
                    <p>Нажмите на сердечко в объявлении, чтобы сохранить жилье или Впечатление в вишлист.</p>
                </div>
                :
                <>
                    <InfiniteScroll dataLength={countryhouses.length} next={nextIndex} hasMore={hasMore}
                        loader={
                            <div className='d-block text-center'>
                                <h4  style={{ textAlign: "center" }} onClick={() =>nextIndex()}  className='add_list_items_button'>Показать больше</h4>
                            </div>
                        }
            
                        endMessage={  <p style={{ textAlign: 'center' }}><b>Ура! Вы все это видели</b></p>} 
                        >
                        <Row className='row_css_home_page'>
                            {countryhouses?
                                countryhouses.map(item => (
                                        <Col className='mb-4'  xs={12} sm={6} md={4} lg={3} >
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
                                                    <div className="div-ar-16-9">
                                                    <Swiper
                                                        pagination={{
                                                          clickable: true,
                                                          dynamicBullets: true,
                                                          dynamicMainBullets: 1,
                                                        }}
                                                        slidesPerView={1}
                                                        spaceBetween={0}
                                                        navigation={true}
                                                        >
                                                        {item.images.map(index => (
                                                            <SwiperSlide  className='ar-16-9'>
                                                                        <Link to={`/countryhouse/${item.id}`}   className="text-decoration-none">
                                                                            <LazyLoadImage
                                                                                alt={item.name}
                                                                                src={`${API_ROOT_PATH}${index}`}  // use normal <img> attributes as props
                                                                                className="ar-16-9-child mymoveanimation"
                                                                                />
                                                                        </Link>
                                                            </SwiperSlide>
                                                                ))}
                                                        </Swiper>
                                                    </div>
                                                </div>
                                                                        
                                                <Link to={"/countryhouse/"+`${item.id}`} className="countryhouse_title_part">
                                                    <Row>
                                                        <Col sm={6} xs={6} md={6} lg={6} >
                                                            <h4 className='size text-black'>{item.provincename}</h4>
                                                        </Col>
                                                        <Col sm={6} xs={6} md={6} lg={6}  className="text-end">
                                                        {item.companylist.map(item => {  return <img src={item.image} className="alcohollogocss" alt="img"/>})}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={9} xs={9} md={9} lg={9} >
                                                            <p className='size text-black'>{item.workingdays} / {item.weekends} сум </p>
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
                    </InfiniteScroll>
                </>

                }
                
            </div>
            }
            <Footer/>

            <Modal  show={modalin}  >
                <Modal.Body className="for-inputt">
                    <FontAwesomeIcon icon={faXmark} className="faXmarkcss" onClick={togglein} />
                    <hr/>
                    <div className='biod118 mt-2'>
                        <h3>Куда?</h3>
                        <div className="cont-main">
                            <div name="province" id="province" className="select-div-css">
                            
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
                        <div className="cont-main">
                            <div name="countryhousetype" id="countryhousetype" className="select-div-css">
                            
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
                        <div className="cont-main">
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
                </Modal.Body>
            </Modal>
            </>  
            )}</>
        );
                            
}
    



export default Home;
