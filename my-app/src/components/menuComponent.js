import BootstrapTable from 'react-bootstrap-table-next';
import { Dropdown, Form, Button } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../App";
import axios from 'axios';

const Menu = () =>{

    const columns = [{
        dataField: 'dish_type',
        text: 'Dish Type'
    }, {
        dataField: 'small_price',
        text: 'Small ($)'
    }, {
        dataField: 'large_price',
        text: 'Large ($)'
    }];

    const toppings = ["Pepperoni",
        "Sausage",
        "Mushrooms",
        "Onions",
        "Ham",
        "Canadian Bacon",
        "Pineapple",
        "Eggplant",
        "Tomato & Basil",
        "Green Peppers",
        "Hamburger",
        "Spinach",
        "Artichoke",
        "Buffalo Chicken",
        "Barbecue Chicken",
        "Anchovies",
        "Black Olives",
        "Fresh Garlic",
        "Zucchini"]
    
    //
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            setSelectedDish(row);
          }
    };

    const { state, dispatch } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [selectedDishType, setSelectedDishType] = useState("");
    const [selectedTopping, setSelectedTopping] = useState([]);
    const [selectedDish, setSelectedDish] = useState({});

    const getMenuData = async () => {
        const result = await axios.get(
            'http://127.0.0.1:8000/menu',
          );
        dispatch({
            type: "GET_MENU",
            payload: result.data
        })

    };
    
    useEffect(() => {
        getMenuData();
    },[]);

    useEffect(() =>{

        const menuDisplay = {};
        if (state.menu) {
            state.menu.forEach(product => {
                const dishGenre = product.dish_genre
                if (!(dishGenre in menuDisplay)){
                    menuDisplay[dishGenre] = [];
                }
                menuDisplay[dishGenre].push({
                    dish_type: product.dish_type,
                    small_price: product.small_price,
                    large_price: product.large_price
                });
            })
        }

        setProducts(menuDisplay);
        
    }, state.menu)

    const handleAddCart = () =>{
        const order = {
            username: state.username,
            selectedDishType,
            selectedDish,
            selectedTopping
        }
        axios.post(
            'http://127.0.0.1:8000/order',
            order
          );
    }

    
    return (
        <div style={{textAlign: "center"}}>
            <Dropdown onSelect={(pizzaType) => {setSelectedDishType(pizzaType)}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    {selectedDishType || "Choose you Pizza"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {Object.keys(products).map((pizza) => {
                        return <Dropdown.Item eventKey={pizza}>{pizza}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
            {
                products[selectedDishType] &&
                    <div>
                        <BootstrapTable
                        keyField='dish_type'
                        data={ products[selectedDishType] }
                        columns={ columns }
                        selectRow={ selectRow }
                        />
                        <Form>
                            <div key={`custom-${'checkbox'}`} className="mb-3">
                            {toppings.map((topping) => {
                                return (
                                    <Form.Check 
                                    custom
                                    type={'checkbox'}
                                    id={topping}
                                    label={topping}
                                    value={topping}
                                    onChange={(evt) => {
                                        const newItem = evt.target.value
                                        if (selectedTopping.includes(newItem)){
                                            const newSelectedItems = selectedTopping.filter(item => item !== newItem)
                                            setSelectedTopping(newSelectedItems)
                                            return;
                                        }
                                        setSelectedTopping([...selectedTopping, evt.target.value])
                                    }}
                                    />
                                )
                            })}
                            </div>
                        </Form>
                    </div>
            }
            <Button variant="primary" onClick={handleAddCart}>
                Add To Cart
            </Button>
        </div>
    )
}

export default Menu;
