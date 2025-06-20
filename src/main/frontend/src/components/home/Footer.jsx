import React from 'react'

const Footer = () => {
  return (
    <>
        <footer>
            <div className="container grid1">
                <div className="box">
                    <h1>ECLINIC</h1>
                    <p>引领卓越医疗，值得信赖的护理。</p>
                    <div className="socialIcon">
                        <i className='fab fa-facebook-f facebook'></i>
                        <i className='fab fa-instagram instagram'></i>
                        <i className='fab fa-twitter twitter'></i>
                        <i className='fab fa-youtube youtube'></i>
                    </div>
                </div>

                <div className="box">
                    <h2>快速导航</h2>
                    <ul>
                        <li>主页</li>
                        <li>服务</li>
                        <li>关于我们</li>
                        <li>联系我们</li>
                    </ul>
                </div>

                <div className="box">
                    <h2>联系我们</h2>
                    <div className="icon">
                        <i className='fa fa-phone'></i>
                        <label htmlFor="">+44 1234567</label>
                    </div>
                    <div className="icon">
                        <i className='fa fa-envelope'></i>
                        <label htmlFor="">contact@eclinic.com</label>
                    </div>
                    <div className="icon">
                        <i className='fa fa-location-dot'></i>
                        <label htmlFor="">南安普顿健康中心</label>
                    </div>
                </div>
            </div>

            <div className="legal container">
                <p>Copyright @2024. All rights reserved. Developted by Tian Yi, Lu Li.</p>
            </div>
        </footer>
    </>
  )
}

export default Footer
