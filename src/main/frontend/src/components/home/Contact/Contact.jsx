import React from 'react'
import { ContactData } from '../../../Data/ContactData'

const Contact = () => {
    return (
        <>
            <section className='contact'>
                <div className="container">
                    <div className="heading">
                        <test>GET IN TOUCH</test>
                        <h2>CONTACTS</h2>
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
                </div>
            </section>
        </>
    )
}

export default Contact
