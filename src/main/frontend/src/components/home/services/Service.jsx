import React from 'react'
import { ServicesData } from '../../../Data/ServicesData'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const Service = () => {
    const history = useHistory();
    const showActinResult = async (val)=>{
            console.log("val",val)
            if(val?.key){
                history.push({
                     "pathname":'/result'
                //     //"state":val
                })
            }

    }
    return (
        <>
            <section className='service'>
                <div className="container">
                    <div className="heading">
                        <test>CARE YOU CAN BELIVE IN</test>
                        <h2>OUR SERVICES</h2>
                    </div>

                    <div className="contain grid">
                        {ServicesData.map((val) => {
                            return (<>
                                <div className="box">
                                    <div className="img">
                                        <img src={val.cover} alt="" />

                                    </div>
                                    <div className="service-item" onClick={()=>{
                                        showActinResult(val)
                                    }}>
                                        <a>{val.title}</a>
                                    </div>
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

export default Service