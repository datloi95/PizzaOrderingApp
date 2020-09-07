import React from 'react';
import Menu from "./menuComponent";

const Home = () => {
    return (
        <div>
            <h2>Welcome to Pine's Pizza.</h2>
            <h3 style={{textAlign: "center"}}>Menu</h3>
            <Menu />
        </div>
    );
};

export default Home;