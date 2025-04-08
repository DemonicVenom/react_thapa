import React, { useState } from 'react'
import "./Style.css"
import Menu from './menuApi'
import MenuCard from './MenuCard'
import Navbar from './Navbar'

const uniqueList = [
    ...new Set(
      Menu.map((curElemnet) => {
        return curElemnet.category;
      })
    ),
    "All",
  ];

const Resturants = () => {

   const [menuData, setMenuData] = useState(Menu);
   const [menuList, setMenuList] = useState(uniqueList);
   
      const filterItem = (category) => {
        if(category==="All") {
          setMenuData(Menu);
          return;
        }
    const updatedList = Menu.filter((curElemnet) => {
        return curElemnet.category == category;
    });
     setMenuData(updatedList);
   };

  return (
    <>
    <Navbar filterItem={filterItem} menuList={menuList}/>
     <MenuCard menuData={menuData}/>
    </>
  )
}

export default Resturants
