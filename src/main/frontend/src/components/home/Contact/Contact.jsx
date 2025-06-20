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
                            src="https://maps.google.com/maps?q=%E4%B8%AD%E5%9B%BD%E6%B7%B1%E5%9C%B3%E5%B9%B3%E5%AE%89%E9%87%91%E8%9E%8D%E4%B8%AD%E5%BF%83&z=15&output=embed"
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
