import React, { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../../../Data/SidebarData";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const history = useHistory();
  const hasCurLink = (link,key=null)=>{
      let curHis = window.location.href;
      if(key){
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
                
                 history.push({
                  "pathname":item.link
                 })
                
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
    </div>
    </>
  );
};

export default Sidebar;
