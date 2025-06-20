import React, { useState } from "react";
import "./Sidebar.css";
import Model from 'react-modal';
import { SidebarData } from "../../../Data/SidebarData";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { emitter } from "@/api/m/index"
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Login from "../../home/Login/Login";
const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const hasCurLink = (link,key=null)=>{
      let curHis = window.location.href;
      if(key && key == "logout"){
        //处理退出逻辑
         //emitter.emit("userLoginOut")
        return false
      }
      return curHis.includes(link);
  }

  return (
    <>
    <div className='sidebar'>

      <div className="logo">
        <span>
          ECLINIC
        </span>
      </div>
      

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              key={index}
            
              className={hasCurLink(item.link,item?.key) ? "menuItem active" : "menuItem"}              

              
              onClick={() => {
                
                if(item?.key && item.key === "logout"){
                                          setVisible(true)

                                        //emitter.emit("userLoginOut")
                                    }else{
                                        history.push({
                                        "pathname": item.link
                                    })
                                    }
                
              }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        <div className="menuItem">
        </div>
      </div>
      <Model
          style={{ overlay: { background: "none" }, content: { backgroundColor:"#eaf0f7",margin: "auto", width: "250px", height: "150px" } }}
          isOpen={visible} onRequestClose={() => setVisible(false)}>
        <p style={{textAlign:"center",marginTop:"20px"}}>确认退出登录？</p>
        <div className="model-button">
        <button onClick={()=>emitter.emit("userLoginOut")}>确定</button>
        <button  onClick={()=>setVisible(false)}>取消</button>
        </div>
      </Model>
    </div>
    </>
  );
};

export default Sidebar;
