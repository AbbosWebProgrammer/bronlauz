import React, { useEffect, useState} from 'react';
import { faHeart,faXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {API_ROOT_PATH,API_PATH, headers} from "./constans";
import Dropdown from 'react-bootstrap/Dropdown';
import "slick-carousel/slick/slick-theme.css";
import 'react-calendar/dist/Calendar.css';
import 'react-calendar/dist/Calendar.css';
import logo1 from "../images/bronlauz/logo.webp";
import logo2 from "../images/bronlauz/large_logo.webp";
import {Link} from "react-router-dom";
import Calendar from 'react-calendar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-bootstrap/Modal';
import Footer from "./Footer";
import NotFound from "./NotFound";
import axios from "axios";
import { faBars ,faUserCircle,faMagnifyingGlass,faAngleLeft,faThLarge} from '@fortawesome/free-solid-svg-icons'
import {YMaps,Map,Placemark,TypeSelector} from 'react-yandex-maps';
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { ImSpinner3 } from "react-icons/im";
const Main =  (props) => {
    const [imagesmodalin, setimagesModalin] = useState(false);
    const [imagemodalin, setimageModalin] = useState(false);
    const [errormessage, seterrormessage] = useState(false);
    const [tempimagSrc,settempimagSrc] = useState('');
    const [modalin, setModalin] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentthisandnextmonth,setpaymentthisandnextmonth] = useState([])
    const [payments,setpayments] = useState([])
    const [paydaylists,setpaydaylists] = useState([])
    const [images,setimages] = useState([])
    const [company,setcompany] = useState([])
    const [entertainments,setentertainments] = useState([])
    const [weekends,setweekends] = useState([])
    const [numberofpeople,setnumberofpeople] = useState(0)
    const [tileDisabled,settileDisabled] = useState([])
    const [fullname, setfullname] = useState("");
    const [image, setimage] = useState("");
    const [allsumm,setallsum] = useState(0)
    const [selectdays,setselectdays] = useState([])
    const [countryhouse,setcountryhouse] = useState({})
    const [start_date,setstart_date] = useState('')
    const [finish_date,setfinish_date] = useState('')
    
    const [form, setForm] = useState({
        phone: "+998",
        number: ""
    });
    const [sms, setSms] = useState(false);
    const togglein = () => setModalin(!modalin);
    const [smsVerify, setSmsVerify] = useState(false);
    
    
    const getimgSrc=(imgurl)=>{
        settempimagSrc(imgurl)
        setimageModalin(!imagemodalin)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
        axios.get(API_PATH+"CountryHouse/"+window.location.pathname.split('/')[2],headers).then((res) => {
            if(res.data){
                setcountryhouse(res.data)
                setimages(res.data.images)
                setpayments(res.data.payment)
                setpaydaylists(res.data.paydaylist)
                setentertainments(res.data.entertainment)
                setweekends(res.data.weekday)
                setcompany(res.data.company)
                settileDisabled(res.data.tileDisabled)
                setpaymentthisandnextmonth(res.data.paymentthisandnextmonth)
            } 

            
        }).catch(function (res) {
            if(res.message.includes("401")){
                localStorage.removeItem("token");
                window.location.reload(false);
            }
          })
        },[] );
        
    
const inputHandler = (e) => {
    if (e.target.name === "fullname")
        setfullname(e.target.value)
    if (e.target.name === "phone")
        if (e.target.value.substr(0, 4)==='+998' && !isNaN(e.target.value.substr(1,)) && e.target.value.length<=13){
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });  
        }
    if (e.target.name==="number"){
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        }); 
    }
        
        
    }

function removetokenandlogout(){
    localStorage.removeItem("token")
    window.location.reload(false);
    
        
    }
const inputImageChanged=(e) =>{
    setimage( e.target.files[0])
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
        setimage(e.target.result)
    }
    }


const [[startDate, endDate], onChange] = useState([ ]);

const changeDate = (e) => {
    var date = new Date(e),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setselectdays([new Date(date.getFullYear(), mnth, day)]);
    var nextDay=new Date(date)
    setstart_date([day, mnth,date.getFullYear()].join("-"))
    nextDay.setDate(date .getDate() + 1)
    setfinish_date([("0" + nextDay.getDate()).slice(-2), ("0" + (nextDay.getMonth()+1)).slice(-2),nextDay.getFullYear()].join("-"))
    calculatethetotalamount([new Date(date.getFullYear(), mnth, day)],numberofpeople)

    }

const onChangeCalendar = (value) => {
    onChange(value);
    var startdate = new Date(value[0]);
    var startyear = startdate.getFullYear();
    var startmnth = ("0" + (startdate.getMonth())).slice(-2);
    var startday = ("0" + startdate.getDate()).slice(-2);

    var enddate = new Date(value[1]);
    var endyear = enddate.getFullYear();
    var endmnth = ("0" + (enddate.getMonth())).slice(-2);
    var endday = ("0" + enddate.getDate()).slice(-2);
    let dayslist=[]
    if([startday, startmnth,startyear].join("-")===[endday, endmnth, endyear].join("-")){
        setselectdays([new Date(startyear, startmnth, startday)]);
        dayslist=[new Date(startyear, startmnth, startday)]
    } 
    else{
        var nextDay=new Date(startyear, startmnth, startday)
        while(nextDay<=new Date(endyear, endmnth, endday)){
            let checkday = [nextDay.getFullYear(), ("0" + (nextDay.getMonth()+1)).slice(-2), ("0" + nextDay.getDate()).slice(-2)].join("-");
            if (tileDisabled.includes(checkday)){
            }
            else{
                dayslist.push(new Date(nextDay))
            }
            nextDay.setDate(nextDay.getDate() + 1)
        }


        var nextDay=new Date(dayslist[0])
        setstart_date([("0" + nextDay.getDate()).slice(-2), ("0" + (nextDay.getMonth()+1)).slice(-2),nextDay.getFullYear()].join("-"))
        var nextDay=new Date(dayslist[dayslist.length-1])
        nextDay.setDate(nextDay.getDate() + 1)
        setfinish_date([("0" + nextDay.getDate()).slice(-2), ("0" + (nextDay.getMonth()+1)).slice(-2),nextDay.getFullYear()].join("-"))
    
        setselectdays(dayslist)
    }
    calculatethetotalamount(dayslist,numberofpeople)
    }

const inc = () => {
    setnumberofpeople(numberofpeople => numberofpeople+1);
    calculatethetotalamount(selectdays,numberofpeople+1);
    };

const dec = () => {
    if (numberofpeople!==0){
        setnumberofpeople(numberofpeople => numberofpeople-1);
        calculatethetotalamount(selectdays,numberofpeople-1);
    }
    };

const calculatethetotalamount = (e,count) =>{
    let summ=0
    for (let i = 0; i < e.length; i++) {
        var date1 = new Date(e[i])
        var newArray = payments.filter(function (el) {
                return el.id === date1.getMonth() + 1
              });
        var weekkend=[0,1,2,3,4,5,6,0]
        var selectweekend=[]
        if (countryhouse.weekday){
            for (let j = 0; j < countryhouse.weekday.length; j++) {
                selectweekend.push(weekkend[countryhouse.weekday[j]])
            }
        }

        if (newArray.length!==0){
            var date = new Date(e[i]);
            var day = [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-")
            
            var dayarray = paydaylists.filter(function (el) {
                return el.days === day 
              });
            if (dayarray.length!== 0 ){ 
                summ+=dayarray[0].workingdays
                if (count>countryhouse.numberofpeople){
                    summ+=(count-countryhouse.numberofpeople)*dayarray[0].foranextraperson
                }
            }
            else if (selectweekend.includes(date.getDay())){ 
                summ+=newArray[0].payment.weekends
                if (count>countryhouse.numberofpeople){
                    summ+=(count-countryhouse.numberofpeople)*newArray[0].payment.foranextraperson
                }

            } 
            else{
                summ+=newArray[0].payment.workingdays
                if (count>countryhouse.numberofpeople){
                    summ+=(count-countryhouse.numberofpeople)*newArray[0].payment.foranextraperson
                }
            }
        }
            
        }
    setallsum(summ)
    };

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
function numbersaddprobels(number){
    var number = number.toString()
    var number1 = ''
    while (number!=='') {
        if(number.length>=3){
            number1=number.slice(number.length-3).concat(' ',number1);
        }
        else{
            number1=number.concat(' ',number1);
        }
        number=number.slice(0, -3)
    }
    return number1
}
const postPhone = async (e) => {
    e.preventDefault();
    try {
        const num = await axios.post(
            `${API_ROOT_PATH}/bronla/uz/register/`,
            { phone: form.phone ,password:12332435},
            { headers: { "Content-Type": "application/json" } }
        );
        if (num.data.message === "Password yuborildi.") {
            setSms(true);
            // setCounter(120)
        } else {
            setSms(false);
        }
    } catch (e) {
        console.log(e);
    }
    setSms(true);
    setCounter(120);
    form.number='';
};

const tileContent = ({ date, view }) => {
        var date1 = new Date(date)
        var newArray = payments.filter(function (el) {
                return el.id === date1.getMonth() + 1
              });
        var weekkend=[0,1,2,3,4,5,6,0]
        var selectweekend=[]
        if (countryhouse.weekday){
            for (let i = 0; i < countryhouse.weekday.length; i++) {
                selectweekend.push(weekkend[countryhouse.weekday[i]])
            }}

        if (newArray.length!==0){
            var date = new Date(date);
            var day = [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-")
            var dayarray = paydaylists.filter(function (el) {
                return el.days === day 
              });

            if (view === 'month' &&  selectweekend.includes(date.getDay())){ 
                if (dayarray.length!== 0 ){ 
                    
                    return <p className="color_only_info" >{numbersaddprobels(dayarray[0].workingdays)}</p> 
                }
                else{
                    return <p className='color_only_danger' > {numbersaddprobels(newArray[0].payment.weekends)}</p>
                 }
            } 
            else{
                if (dayarray.length!== 0 ){ 
                    return <p className="color_only_info" >{numbersaddprobels(dayarray[0].workingdays)}</p> 
                }
                else{
                    return  <p className='color_only_black'>{numbersaddprobels(newArray[0].payment.workingdays)}</p> 
                }
            }
}}

const handleSubmission = (e) => {
    setisButtonLoading(true);
    setTimeout(() => {
        setisButtonLoading(true);
    }, 500);
    if(localStorage.getItem("token") && localStorage.getItem("token")!==''){
        let days=[]
        for (let i = 0; i < selectdays.length; i++) {
            var date = new Date(selectdays[i]);
            var day = [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-");
            days.push(day);
        }
        let data={
            'fullname':fullname,
            'image':image,
            'countryhouse':countryhouse.id,
            'days':days,
            'numberofpeople':numberofpeople
        }
        setIsLoading(false);
        axios.post(API_PATH+'OrderJson/', {"data":data}, headers)
        .then((res) => {
            if (res.data.status==='OK'){
                setselectdays([]);
                setfullname('');
                setimage('');
                togglein();
                setnumberofpeople(0);
                calculatethetotalamount([],0);
                toast('Bаш заказ обрабатывается пожалуйста подождите.\nВы можете отслеживать статус заказа в разделе "Мои заказы"')
            }
            else{
                setselectdays([]);
                setfullname('');
                setimage('');
                togglein();
                setnumberofpeople(0);
                calculatethetotalamount([],0);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                toast('Попробуйте еще раз');
            }
        }).catch(
            function (res) {
                if(res.response.status===401){
                    localStorage.removeItem("token");
                    window.location.reload();
                }
                else if(res.response.status===415){
                    toast('Попробуйте еще раз');
                }
            } );
    }
    else{
        axios.post(
                `${API_ROOT_PATH}/bronla/uz/customerphonecheck/`,
                { phone: form.phone, password: form.number },
                { headers: { "Content-Type": "application/json" } }
            ).then((res) => {
                if(res.data.token===''){
                    toast('Неверный пароль');
                } 
                else{
                    localStorage.setItem("token", res.data.token);
                    let days=[]
                    for (let i = 0; i < selectdays.length; i++) {
                        var date = new Date(selectdays[i]);
                        var day = [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-");
                        days.push(day);
                    }
                    let data={
                        'fullname':fullname,
                        'image':image,
                        'countryhouse':countryhouse.id,
                        'days':days,
                        'numberofpeople':numberofpeople
                    }
                    setIsLoading(false);
                    let headers ={
                        headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Token ${res.data.token}`,
                    }  
                    };
                    axios.post(API_PATH+'OrderJson/', {"data":data}, headers) .then((res) => {
                        if (res.data.status==='OK'){
                            setselectdays([]);
                            setfullname('');
                            setimage('');
                            
                            togglein();
                            setnumberofpeople(0);
                            calculatethetotalamount([],0);
                            toast('Bаш заказ обрабатывается пожалуйста подождите.\nВы можете отслеживать статус заказа в разделе "Мои заказы"')
                        }
                        else{
                            setselectdays([]);
                            setfullname('');
                            setimage('');
                            togglein();
                            setnumberofpeople(0);
                            calculatethetotalamount([],0);
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 1000);
                            toast('Попробуйте еще раз');
                        }
                    }).catch(
                        function (res) {
                            console.log(res)
                            if(res.response.status===401){
                                localStorage.removeItem("token");
                                window.location.reload();
                            }
                            else if(res.response.status===415){
                                toast('Попробуйте еще раз');
                            }
                        } );
                }

            }
            ).catch(
                function (res) {
                    console.log(res);
                }
            );
    }   

    setisButtonLoading(false);
};

function addorremovemyfavorite(id) { 
    let data={"id":id}
    axios.post(API_PATH+'AddOrRemovemyFavorite/', {data}, headers)
    .then((res) => {
        setcountryhouse({
            ...countryhouse,
            heart: !countryhouse.heart 
          });
        console.log('id',id);

    }).catch(function (res) {
        if(res.message.includes("401")){
            localStorage.removeItem("token");
            window.location.reload(false);
        }
      });
    

}
 

    return (
        <>   
        {isLoading ? 
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
            :
            Object.keys(countryhouse).length ?
                <>
                    <div className="nav-box-main">
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
                                                            <Dropdown.Item as={Link} href="/login"><Link to={"/login"} className="align-items-center d-flex dropdownbuttoncss">Авторизоваться</Link></Dropdown.Item>
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
                                                            <Dropdown.Item href="https://t.me/bronlabot">Добавить дачу через телеграм бота</Dropdown.Item>
                                                            <Dropdown.Item as={Link} href="/login"><Link to={"/login"} className="align-items-center d-flex dropdownbuttoncss">Авторизоваться</Link></Dropdown.Item>
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
                    <div className="webcontainer tl_article"> 
                        <div className="all_main">
                            <div className="all_main_part">
                                <Link to={"/"} className="d-flex">
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                    <p className="">Дома</p>
                                </Link>
                            </div>
                        </div> 
                        <div className="main-cart-top">
                            <div className="w-100 main-cart-top-header-first">
                                <h1 className="_fecoyn4 p-1">{countryhouse.name}</h1>
                                <div className='_1qdp1ym'>
                                    <span className="_17p6nbba" aria-hidden="true"><FontAwesomeIcon className='align-middle me-1' icon={faStar} /> {countryhouse.reyting}</span>
                                    {
                                        localStorage.getItem("token") ? 
                                            countryhouse.heart?
                                            <span className="_17p6nbba _17p6nbba2" onClick={(e) =>addorremovemyfavorite(countryhouse.id)} aria-hidden="true"><FontAwesomeIcon className='align-middle me-1 text-danger' icon={faHeart} /> В закладках</span>
                                            :
                                            <span className="_17p6nbba _17p6nbba2"  onClick={(e) =>addorremovemyfavorite(countryhouse.id)} aria-hidden="true"><FontAwesomeIcon className='align-middle me-1' icon={faHeart} /> Сохранить</span>
                                        :
                                        <Link to={"/login"}> 
                                            <span className="_17p6nbba _17p6nbba2"  aria-hidden="true"><FontAwesomeIcon className='align-middle me-1' icon={faHeart} /> Сохранить</span>
                                        </Link>
                                    }
                                   
                                    
                                </div>
                                        
                            </div>
                            <div className="main-gallery-first">
                                    { images.length>=5?
                                        images.slice(0, 5).map((number, index) => (
                                            <figure className={`gallery__item gallery__item-5-${index + 1}`}>
                                                <img src={number} onClick={(e) =>{ setimagesModalin(!imagesmodalin)}}  alt={countryhouse.name} className="gallery__img mymoveanimation"/>
                                            </figure> ))
                                        :
                                        ''
                                        }
                                    { images.length<5 && images.length>=2?
                                            images.slice(0, 2).map((number, index) => (
                                                <figure className={`gallery__item gallery__item-3-${index + 1}`}>
                                                    <img src={number} onClick={(e) =>{ setimagesModalin(!imagesmodalin)}}  alt={countryhouse.name} className="gallery__img mymoveanimation"/>
                                                </figure> ))
                                            :
                                            ''
                                            }
                                    { images.length===1?
                                            images.map((number, index) => (
                                                <figure className={`gallery__item gallery__item-1-${index + 1}`}>
                                                    <img src={number}  onClick={(e) =>{ setimagesModalin(!imagesmodalin)}} alt={countryhouse.name} className="gallery__img mymoveanimation"/>
                                                </figure> ))
                                            :
                                            ''
                                            } 
                                <div onClick={(e) =>{ setimagesModalin(!imagesmodalin)}} className="all_photo_show_button">
                                    <FontAwesomeIcon icon={faThLarge} className="me-1" /> Показать все фото
                                </div>
                            </div>
                        </div>

                        <div className="main-cart">
                            <div className="ql-editor left-side " contenteditable="false">
                                <div className="w-100 main-cart-top-header-second">
                                    <div className="div-ar-16-9">
                                        {images.slice(0, 1).map(index => (
                                            <div className="ar-16-9">
                                                <img  src={index} onClick={(e) =>{ setimagesModalin(!imagesmodalin)}} className="ar-16-9-child mymoveanimation"  alt={countryhouse.name}/> 
                                            
                                                <div className="all_photo_show_button" onClick={(e) =>{ setimagesModalin(!imagesmodalin)}}>
                                                    <FontAwesomeIcon icon={faThLarge} className="me-1" /> Показать все фото
                                                </div>
                                            </div> 
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="w-100 main-cart-top-header-second pt-1">
                                    <h1 className="_fecoyn4">{countryhouse.name}</h1>
                                    <div className='_1qdp1ym'>
                                        <span className="_17p6nbba" aria-hidden="true"><FontAwesomeIcon className='align-middle me-1' icon={faStar} /> {countryhouse.reyting}</span>
                                        <span className="_17p6nbba _17p6nbba2" aria-hidden="true"><FontAwesomeIcon className='align-middle me-1' icon={faHeart} /> Сохранить</span>
                                    </div>   

                                </div>
                                <p dir="auto"><strong>Местность: </strong>{countryhouse.province}</p>
                                <p dir="auto"><strong>Адрес: </strong>{countryhouse.address}</p>
                                <p dir="auto"><strong>📌Ориентир: </strong>{countryhouse.referencepoint}</p>
                                <p dir="auto"><strong>Вместимость: </strong>{countryhouse.numberofpeople} </p>
                                <p dir="auto"><strong>Количество cпальных комнат: </strong>{countryhouse.bedroomsrooms}</p>
                                <p dir="auto"><strong>🛌Количество коек: </strong>{countryhouse.sleeping}</p>
                                <p dir="auto"><strong>🍻Распитие алкогольных напитков: </strong>{countryhouse.alcohol ? 'Разрешено' : 'Запрещено'}</p>
                                <p dir="auto"><strong>👨‍👩‍👦‍👦Условия дачи: </strong>
                                {company.map((index, i, {length, lastIndex = length - 1})=> (
                                                    i === lastIndex ? 
                                                    <>{index.name}</> 
                                                    :
                                                    <>{index.name}, </>                                                    
                                                        ))}
                                </p>
                            
                                <p dir="auto"><strong>📱Телефон: </strong><a href={`https://www.bronla.uz/countryhouse/callpage/${countryhouse.id}/${countryhouse.firstphone}`} target="_blank">{countryhouse.firstphone}</a></p>
                                {countryhouse.secondphone!=='None' ? 
                                <p dir="auto"><strong>📱Телефон: </strong><a href={`https://www.bronla.uz/countryhouse/callpage/${countryhouse.id}/${countryhouse.secondphone}`} target="_blank">{countryhouse.secondphone}</a></p>
                                : ''}
                                
                                <p dir="auto"><strong>❇️Дополнительно: </strong>
                                {entertainments.map((index, i, {length, lastIndex = length - 1})=> (
                                                    i === lastIndex ? 
                                                    <>{index}</> 
                                                    :
                                                    <>{index}, </>                                                    
                                                        ))}
                                
                                </p>
                                <p dir="auto"><strong>⏱Время заезда: </strong>{countryhouse.start_time}</p>
                                <p dir="auto"><strong>⏰Время выезда: </strong>{countryhouse.finish_time}</p>
                                <p dir="auto"><strong>Дни заезда которые считаются выходными:</strong> {countryhouse.weekdays}
                                </p>    
                                
                            </div>
                            <div className="right-side">
                                <div>
                                    <h3>Выберите дни брони</h3>
                                    <Calendar 
                                    selectRange={true}
                                    tileDisabled={({ activeStartDate, date, view }) => {
                                        if (date < new Date()){
                                            return date < new Date()
                                        }
                                        else{
                                            var date = new Date(date);
                                            var day = [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-");
                                            if (tileDisabled.includes(day)){
                                                return true
                                            }
                                    }
                                    }} 
                                    
                                    value={[startDate, endDate]}
                                    onChange = {onChangeCalendar}
                                    onClickDay={changeDate}
                                    tileContent={tileContent}
                                    />
                                    
                                <div className="form-order mt-3">

                                    <div className="total">
                                        <h4 className='m-0' >Введите количество гостей:</h4>
                                        <div className="order-inc-dec">
                                                    <button className="dec" onClick={dec} >-</button>
                                                    <span className="num">{numberofpeople}</span>
                                                    <button className="inc" onClick={inc}>+</button>
                                                </div>
                                    </div>
                                    {selectdays.length>0?
                                        <>
                                            <div className="total">
                                                <h3  className='m-0'>Заезда: </h3>
                                                <div className=""> {start_date} {countryhouse.start_time}</div>
                                            </div>
                                            <div className="total">
                                                <h3  className='m-0'>Выезда: </h3>
                                                <div className="">{finish_date} {countryhouse.finish_time}</div>
                                            </div>
                                        </>
                                        :''
                                        }
                                    
                                    <div className="total">
                                        <h2  className='m-0'>Общая стоимость:</h2>
                                        <p className="money">{numbersaddprobels(allsumm)} сум</p>
                                    </div>
                                    <div className="total">
                                        <h3  className='m-0'>Предоплата:</h3>
                                        <p className="money">{numbersaddprobels(parseInt(0.2*allsumm))} сум</p>
                                    </div>
                                    {errormessage?<>
                                        {numberofpeople===0?<h5 className='text-danger'>Введите количество гостей</h5>:""}
                                        {selectdays.length===0?<h5 className='text-danger'>Выберите дни брони</h5>:""}
                                    </>
                                    :''
                                } 
                                                                
                                    {   modalin?'':
                                        allsumm!==0 && numberofpeople!==0?
                                        <button onClick={togglein} className="button"> Бронирование </button>
                                        :
                                        <button onClick={()=>{seterrormessage(true)}} className="button opacity-50">  Бронирование   </button>
                                    }
                                    {   modalin?
                                        <>
                                            {localStorage.getItem("token") ?
                                                <>
                                                <h1 className="title">Ваши данные</h1>
                                                    <form className="form-data">
                                                            <div className="form-field d-block ">
                                                                <label htmlFor="fullname" className="form-field-name">  ФИО </label>
                                                                <input type="text" id="fullname" name="fullname" onChange={(e) => inputHandler(e)} value={fullname} className="form-field-input border"/>
                                                            </div>
                                                            <div className="form-field  d-block ">
                                                                <label htmlFor="photo" className="form-field-name"> 
                                                                Сделайте предоплату в размере <br/> {numbersaddprobels(parseInt(0.2*allsumm))} сум на банковскую карту <br/>
                                                                {countryhouse.card}  {countryhouse.cardowner}  <br/>
                                                                Отправить скриншот чека 
                                                                </label>
                                                                <input type="file" id="photo" name="photo" onChange={inputImageChanged}  className="form-field-input" accept="image/png, image/jpeg, image/jpg"/>
                                                            </div>
                                                            
                                                    </form>
                                                    {fullname!=='' && image!==''?
                                                        isButtonLoading?
                                                            <button  className="button opacity-50 d-flex justify-content-center align-items-center" disabled> Бронирование <div className="icon-container ms-1"> <ImSpinner3 /> </div> </button>
                                                            :
                                                            <button onClick={(e) => handleSubmission(e)} className="button"> Бронирование  </button>
                                                        :
                                                        <button  className="button opacity-50" disabled> Бронирование </button>
                                                        
                                                }
                                                </>
                                                :
                                                <>
                                                <h1 className="title">Ваши данные</h1>
                                                    <form className="form-data">
                                                            <div className="form-field d-block ">
                                                                <label htmlFor="fullname" className="form-field-name">  ФИО </label>
                                                                <input type="text" id="fullname" name="fullname" onChange={(e) => inputHandler(e)} value={fullname} className="form-field-input border"/>
                                                            </div>
                                                            <div className="form-field  d-block ">
                                                                <label htmlFor="photo" className="form-field-name"> 
                                                                Сделайте предоплату в размере <br/> {numbersaddprobels(parseInt(0.2*allsumm))} сум на банковскую карту <br/>
                                                                {countryhouse.card}  {countryhouse.cardowner}  <br/>
                                                                Отправить скриншот чека </label>
                                                                <input type="file" id="photo" name="photo" onChange={inputImageChanged}  className="form-field-input" accept="image/png, image/jpeg, image/jpg" />
                                                            </div>
                                                            <label htmlFor="phone" className="form-field-name w-100"> Номер телефона</label>
                                                            <div className="form-field flex">
                                                        <input onChange={(e) => inputHandler(e)} type="phone" id="phone" name="phone" pattern="+998[7-9]{2}-[0-9]{3}-[0-9]{4}" placeholder="Телефон номер" className={`form-field-input-login input inputphonecss ${
                                                                smsVerify ? "" : "w-75"
                                                            }`}
                                                            value={form.phone}
                                                            disabled={smsVerify}
                                                        />
                                                        {form.phone.length===13?
                                                            <button htmlFor="phone" className={`btn phone-button-css ms-1 ${    smsVerify ? "d-none" : ""  }`}  onClick={(e) => postPhone(e)} style={{ width: "25%" }}  >
                                                                {sms ? "Повторить" : "Отправить"}
                                                            </button>
                                                            :
                                                            <button htmlFor="phone" className={`btn phone-button-css opacity-50 ms-1 ${     smsVerify ? "d-none" : "" }`} style={{ width: "25%" }}>
                                                                {sms ? "Повторить" : "Отправить"}
                                                            </button>
                                                        }
                                                    </div>
                                                    
                                                    <label htmlFor="number" className={`form-field-name w-100 ${sms ? "" : "d-none"}`}> Введите SMS-код</label>
                                                    <div className={`form-field flex ${sms ? "" : "d-none"}`}>
                                                        <input onChange={(e) => inputHandler(e)} type="text" id="number" name="number" placeholder="СМС номер" className="form-field-input-login  input w-75" value={form.number}
                                                        />
                                                        {counter === 0 ? 
                                                        <div  className=" w-25 counter-css" >00:00</div>: 
                                                        <div  className=" w-25 counter-css" >{format(counter)}</div>}

                                                    </div>

                                                    </form>
                                                    {fullname!=='' && image!=='' && form.number!=='' && form.phone!==''?
                                                        isButtonLoading?
                                                            <button  className="button opacity-50 d-flex justify-content-center align-items-center" disabled> Бронирование <div className="icon-container ms-1"> <ImSpinner3 /> </div> </button>
                                                            :
                                                            <button onClick={(e) => handleSubmission(e)} className="button"> Бронирование  </button>
                                                        :
                                                        ''
                                                    }
                                                </>
                                            }
                                        </>
                                        :
                                        ''
                                    }
                                
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr className="w-100" />
                            <h3>Где вы будете</h3>
                            <div className='countryhouse-yandex-map mymoveanimation'>
                                <YMaps >
                                    <Map  width="100%"
                                    defaultState={{
                                        center: countryhouse.listlocation,
                                        zoom: 10,
                                        controls: ['zoomControl', 'fullscreenControl']
                                        }} modules={['control.ZoomControl', 'control.FullscreenControl']}>
                                        
                                    <Placemark  geometry={countryhouse.listlocation} options={{    preset: 'islands#greenHomeIcon',   }}  />
                                    <TypeSelector options={{float: 'right'}} />
                                    </Map>
                                </YMaps>
                            </div>
                            
                        </div>
                    </div>
                    <Modal show={imagesmodalin} className="p-0 m-0 w-100 tempimagsrc-modal">
                            <Modal.Body className="p-0 m-0 h_100vh w-100 ">
                                <div className='p-1 sticky-top bg-white'>
                                    <FontAwesomeIcon icon={faAngleLeft}  onClick={(e) =>{ setimagesModalin(!imagesmodalin)}}   className='h3 p-2 m-0' />
                                </div>
                                
                                <div className='modal-gallery'>
                                    {images.map((index,number) => (
                                        <div className='modal-gallery-pics' key={number}>
                                            <img  src={index} style={{width: '100%'}} className="ar-16-9-child" onClick={(e) => getimgSrc(index)}  alt={countryhouse.name}/>    
                                        </div>                         
                                    ))}
                                </div>
                            </Modal.Body>
                    </Modal>
                    
                    <Modal  show={imagemodalin} className="p-0 m-0 w-100 tempimagsrc-modal tempimagsrc-modal-second" >
                            <Modal.Body className="p-0 m-0 w-100  tempimagsrc-body">
                                <FontAwesomeIcon icon={faXmark}  onClick={(e) =>{ setimageModalin(!imagemodalin)}}   className='tempimagsrc-faXmark' />
                                <img  src={tempimagSrc} className="tempimagsrc"  alt={countryhouse.name}/>    
                            </Modal.Body>
                    </Modal>
                    <ToastContainer />
                    <Footer/>
                </> 
                :
                <NotFound/>
             
        }
        </>
            

    );
};

export default Main;


