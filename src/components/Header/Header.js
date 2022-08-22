import React from 'react';
import CustomLink from '../CustomLink/CustomLink';
import './Header.css'
const Header = () => {
    return (
        <div className='header'>
            <CustomLink to='/home'>Home</CustomLink>
            <CustomLink to='expense'>Expense</CustomLink>
            <CustomLink to='sales'>Sales</CustomLink>
        </div>
    );
};

export default Header;