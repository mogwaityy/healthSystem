import React from 'react'
import { ServicesData } from '../../../Data/ServicesData'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const Service = () => {
    const history = useHistory();
    const showActinResult = async (val)=>{
            console.log("val",val)
            if(val?.key){
                history.push({
                     "pathname":val.link
                //     //"state":val
                })
            }

    }
    return (
        <>
            <section className='service'>
                <div className="container">
                    <div className="heading">
                        <test>专业可靠的医疗服务</test>
                        <h2>我们的服务</h2>
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