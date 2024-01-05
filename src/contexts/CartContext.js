import React, {createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal]  = useState(0);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }

    const t = cart.reduce((ac, ct) => {
      return ac + ct.price * ct.amount
    },0);
    setTotal(t);
  }, [cart, total]);

  const addToCart = (product, id) => {
    const newItem = {...product, amount: 1}
    const cartItem = cart.find(item => {
      return item.id === id 
    });
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount + 1}
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem])
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id
    })
    setCart(newCart);
  }

  const clearCart = () => {
    setCart([]);
  }

  const increseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id)
    //console.log(item);
    addToCart(cartItem, id);
    
  }


  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      if (cartItem.amount == 1) {
        removeFromCart(id)
      } else {
        const newCart = cart.map(item => {
          if(item.id === id) {
            return {...item, amount: cartItem.amount - 1}
          } else {
            return item;
          }
        });
        setCart(newCart)
      }
    }
  }
  
  return <CartContext.Provider value={{ addToCart, removeFromCart, clearCart, increseAmount, decreaseAmount, cart, itemAmount , total}}>{children}</CartContext.Provider>
};

export default CartProvider;
