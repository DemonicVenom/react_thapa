import React, { useEffect, useState } from 'react'
import './style.css'

const getLocalData = ()=>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
};

const Todoo = () => {
  const [inputdata,setInputData] = useState("");
  const [items,setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if(!inputdata){
      alert('plz fill the data')
    }else if(inputdata && toggleButton){
      setItems(
        items.map((curElem)=>{
          if(curElem.id === isEditItem){
            return{...curElem, name:inputdata};
        }
        return curElem;
        })
      )
    }
     else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items,myNewInputData]);
      setInputData("");
    }
  }
  // how to delete items section
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem)=>{
      return curElem.id !== index;
    })
  }
  // remove all the elements
     const removeAll = () => {
      setItems([]);
     }
    // edit the items
    const editItem = (index) =>{
      const item_todo_edited = items.find((curElem)=>{
        return curElem.id === index;
      });
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    }


   // adding localstorage
   useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items));

   },[items]);

  return (
    <>
     <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="todo.png" alt="" />
          <figcaption>Add Your List Here</figcaption>
        </figure>
        <div className="addItems">
          <input type="text"
          placeholder='✍️ Add Item'
          className='form-control'
          value={inputdata}
          onChange={(event)=> setInputData(event.target.value)}
          />
          {toggleButton ? (
            <i className="fa fa-edit add-btn" onClick={addItem}></i>
          ): (
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          )}
          
        </div>
        {/* show our items */}
        <div className="showItems" >
          {items.map ((curElem, index) =>{
                return (
                  <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                  <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                  <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i>
                  </div>
                  </div>
                )
          })}
        </div>
        <div className="showItems">
          <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
            <span>CHECK LIST</span>
          </button>

        </div>
      </div>
     </div>
    </>
  )
}

export default Todoo
