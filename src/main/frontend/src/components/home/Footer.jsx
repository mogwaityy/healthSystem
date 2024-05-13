import React from 'react'

const Footer = () => {
  return (
    <>
        <footer>
            <div className="container grid1">
                <div className="box">
                    <h1>ECLINIC</h1>
                    <p>Leading the Way in Medical Excellence, Trusted Care.</p>
                    <div className="socialIcon">
                        <i className='fab fa-facebook-f facebook'></i>
                        <i className='fab fa-instagram instagram'></i>
                        <i className='fab fa-twitter twitter'></i>
                        <i className='fab fa-youtube youtube'></i>
                    </div>
                </div>

                <div className="box">
                    <h2>Quick Links</h2>
                    <ul>
                        <li>Home</li>
                        <li>Service</li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="box">
                    <h2>Contact Us</h2>
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
                        <label htmlFor="">Health center Southampton</label>
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
