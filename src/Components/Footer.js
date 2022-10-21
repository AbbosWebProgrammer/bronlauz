import React, {Component} from 'react';
import { YMInitializer } from 'react-yandex-metrika';
import '../footer.scss'
import logo1 from "../images/bronlauz/logo.webp";
import logo2 from "../images/bronlauz/large_logo.webp";
import {YMaps,Map,Placemark,FullscreenControl,Clusterer,TypeSelector} from 'react-yandex-maps';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaPhoneAlt,FaTelegram ,FaInstagram, FaYoutube,FaEnvelope,FaMapMarkerAlt,FaCircle} from 'react-icons/fa';
class Footer extends Component {
    render() {
        return (
        <div className='footer-distributed mt-3'>
            <div className='webcontainer'>
                <Row className='m-0'>
                    <Col xs={12} sm={12} md={12} lg={12} >
                        <div className="logo-img1">
                            <img src={logo2}  alt="" className='footer-distributed-image'/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} >
                        <h4 className='p-2 m-0 my-2'>О компании</h4>
                        <p className="mt-2 about-company">
                        <FaCircle className='FaCircleCss'/>  Bronla - подбирает Вам лучшие дачи:<br/>
                        <FaCircle className='FaCircleCss'/>  Безопасно и Надёжно<br/>
                        <FaCircle className='FaCircleCss'/>  Комфортно<br/>
                        <FaCircle className='FaCircleCss'/>  По низким ценам<br/>
                        <FaCircle className='FaCircleCss'/>  Высокого качества<br/>
                        <FaCircle className='FaCircleCss'/>  Моментально и без комиссионных<br/>
                        </p>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}  >
                        <h4 className='p-2 m-0 my-2'>Быстрый контакт</h4>

                        <Row className='w-100 about-company'>
                            <Col className='p-1' xs={1} sm={1} md={1} lg={1} >
                                <FaPhoneAlt/>
                            </Col>
                            <Col className='p-1' xs={11} sm={11} md={11} lg={11} >
                                <a href="tel:+998903166000">+998903166000</a>
                                
                            </Col>
                            <Col className='p-1' xs={1} sm={1} md={1} lg={1} >
                                <FaPhoneAlt/>
                            </Col>
                            <Col className='p-1' xs={11} sm={11} md={11} lg={11} >
                                <a href="tel:+998901773363">+998901773363</a>
                            </Col>
                            <Col className='p-1' xs={1} sm={1} md={1} lg={1} >
                                <FaEnvelope/>
                            </Col>
                            <Col className='p-1' xs={11} sm={11} md={11} lg={11} >
                                    <a href="mailto:bronlauz@gmail.com">bronlauz@gmail.com</a>
                            </Col>
                            <Col className='p-1' xs={1} sm={1} md={1} lg={1} >
                            <FaMapMarkerAlt/>
                            </Col>
                            <Col className='p-1' xs={11} sm={11} md={11} lg={11} >
                                <p>Узбекистан, Ташкент, улица Мухтара Ашрафи, 51</p>
                            </Col>

                        </Row>

                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}  >
                        <h4 className='p-2 m-0 my-2'>Подписывайтесь на нас</h4>
                        <Row className="follow_us_css">
                            <Col xs={6} sm={6} md={6} lg={6}>
                                <a href="https://t.me/bronlabot"><FaTelegram className='w-100 p-1 text-primary'/>
                                    <p>Телеграмм бот</p>   
                                </a>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                                <a href="https://t.me/bronla"><FaTelegram className='w-100 p-1 text-primary'/>
                                    <p>
                                        Телеграмм канал
                                    </p>
                                </a>

                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                                <a href="https://www.instagram.com/bronla_uz/"><FaInstagram className='w-100 p-1 text-danger'/>
                                    <p>
                                        Инстаграм
                                    </p>
                                </a>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                                <a href="https://www.youtube.com/channel/UC9FiCoFz9gzjhkttKdKL6_w"><FaYoutube className='w-100 p-1 text-danger'/>
                                    <p>
                                        YouTube
                                    </p>
                                </a>

                            </Col>
                        
                        </Row>

                    </Col>

                </Row>    
                <div className="footer-footer-commit p-3 text-center  bottom-0">  © 2022 Bronla</div>   
                <YMInitializer  accounts={[90594448]} options={{webvisor: true}} version="2"/>
            </div>
        </div>                    
        );
    }
}

export default Footer;