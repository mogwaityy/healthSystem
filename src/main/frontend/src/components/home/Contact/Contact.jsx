import React from 'react'
import { ContactData } from '../../../Data/ContactData'

const Contact = () => {
    return (
        <>
            <section className='contact'>
                <div className="container">
                    <div className="heading">
                        <test>保持联系</test>
                        <h2>联系方式</h2>
                    </div>


                    <div className="contain grid2">
                        {ContactData.map((val) => {
                            return (<>
                                    <div className="box">
                                        <i>{val.icon}</i>
                                        <h3>{val.method}</h3>
                                        <p>{val.content1}</p>
                                        <p>{val.content2}</p>
                                    </div>
                                </>
                            )
                        })}
                    </div>

                    <div className="footer-map" style={{margin: "0 180px"}}>
                        <h3 style={{textAlign:"center", fontSize:"1.8rem"}}>药店地图</h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.3497096557294!2d-1.3992183875135678!3d50.93574535218484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487473f58304cebf%3A0x50cabc792a027365!2sUniversity%20of%20Southampton%20Highfield%20Campus!5e0!3m2!1szh-CN!2suk!4v1715172476008!5m2!1szh-CN!2suk"
                            width="600"
                            height="450"
                            style={{border: 0}}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
