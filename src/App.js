import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


function App() {

  const [list, setList] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [originalList, setOriginalList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cartList, setCartList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [sideBar, setSideBar] = useState(false)


  useEffect(() => {
    const totalPrice = cartList.reduce((total, ele) => total + ele.price, 0);
    setTotalPrice(totalPrice);
  }, [cartList]);


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {

        setList(data)
        setOriginalList(data);
      }
      )
      .catch((error) => console.log(error))
  }, [])


  function handleClick() {
    const filteredList = originalList.filter((ele) =>
      ele.title.toLowerCase().includes(searchItem.toLowerCase())
    )
    setList(filteredList)
    setSearchItem('')
  }



  function handleSelect(event) {
    console.log(event.target.value)

    if (event.target.value === 'All Categories') {
      setList(originalList);
      setSelectedOption('');
      return;
    }
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const newData = originalList.filter((ele) =>
      ele.category.toLowerCase().includes(selectedValue.toLowerCase())
    )

    console.log(newData)
    setList(newData)

  }



  function handleAdd(elem) {

    window.alert('Item Added to the Cart')
    const item = list.find((ele) => ele.id == elem.id)
    if (item) {
      // If the item is found, add it to the cartList
      setCartList((prevCartList) => [...prevCartList, item]);
    } else {
      setCartList([])
    }

  }


  function handleDelete(elem){

    const data=cartList.filter((ele)=>ele.id!=elem.id)
    setCartList(data)

  }


  return (


    <div className='main' >
      <ul className='sidebar' style={{ display: sideBar ? '' : 'none' }} >
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Register</li>
      </ul>



      <div className='top' >
        <h1>Eflyer</h1>
        <div className='navbar' >
          <MenuIcon onClick={() => setSideBar(!sideBar)} sx={{ cursor: 'pointer' }} />

          <select value={selectedOption} onChange={handleSelect}>
            <option value=''  >All Categories</option>
            <option value="jewelery">Jewelery</option>
            <option value="Women">Women's </option>
            <option value="Men">Men's</option>
            <option value="electronics">Electronics</option>
          </select>

          <div className='searchBar' >
            <input value={searchItem} onChange={(event) => setSearchItem(event.target.value)} placeholder='Search...' />
            <SearchIcon onClick={handleClick} sx={{ cursor: 'pointer', borderRadius: '0.5em', padding: '5px', backgroundColor: 'pink' }} />
          </div>

          <Button variant='outlined'  >English <ArrowDropDownIcon /></Button>
          <ShoppingCartIcon onClick={() => setDialogOpen(true)} sx={{ cursor: 'pointer' }} />

          <Dialog open={dialogOpen} className='dialog' onClose={false} >

            <body>

              <div className='dialogTop' >
                <h1>Welcome to the Cart</h1>
                <CloseIcon onClick={() => setDialogOpen(false)} sx={{ cursor: 'pointer' }} />
              </div>

              <div>
                <ol>
                  {
                    cartList.length !== 0 ? cartList.map((ele) =>
                      <div className='list' >
                        <li>{ele.title} = Rs {ele.price} <DeleteIcon onClick={()=>handleDelete(ele)} className='del' sx={{padding:'1rem', cursor:'pointer',  }} />  </li>
                        <hr></hr>
                      </div>
                    ) : <h1>No Item in the Cart</h1>
                  }
                </ol>

                <h2>Total Price: {cartList.length !== 0 ? totalPrice : 0} </h2>
              </div>

            </body>

          </Dialog>

        </div>


        <div className='slidingSection' >
          <div className='sliding' >
            <ArrowLeftIcon className='left' />
            <h1>GET START<br /> YOUR FAVOURITE SHOPING  </h1>
            <ArrowRightIcon className='right' />
          </div>
          <Button variant='outlined' >BUY NOW</Button>
        </div>


      </div>

      <div className='bottom' >
        {/* <h2>MAN AND WOMAN FASHION</h2> */}

        <div className='products' >

          {
            list.length != 0 ?
              list.map((ele) =>
                <div className='product' >

                  <h4>{ele.title}</h4>
                  <span>Price: Rs {ele.price}</span>
                  <img src={ele.image} />
                  <Button onClick={() => handleAdd(ele)} variant='outlined'>add to cart</Button>
                </div>
              )
              : <h1>No Items Found</h1>
          }

        </div>
      </div>

    </div>

  );
}

export default App;
