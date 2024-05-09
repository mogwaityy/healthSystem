import React from 'react'
import coverImage from '../../../assets/cover.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useHistory} from "react-router-dom";

const Home = () => {
    const history = useHistory(); // 获取history对象

    const goBook = () => {
        history.push('/make-appointment'); // 使用history.push()方法导航到主页
    };
    return (
        <>
            <section className='home'>
                <div className="container flex">
                    <div className="img">
                        <img src={coverImage} alt="" />
                        <button onClick={goBook}>Book an Appoinment</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home