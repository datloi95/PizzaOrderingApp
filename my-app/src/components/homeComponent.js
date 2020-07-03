import React from 'react';
import EnhancedTable from "./menuComponent";

const Home = () => {
    return (
        <div>
            <h2>Welcome to Pine's Pizza.</h2>
            <h3 style={{textAlign: "center"}}>Menu</h3>
            <EnhancedTable />
        </div>
    );
};

export default Home;