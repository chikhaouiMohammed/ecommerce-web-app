import React, { useContext, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Slider } from '@mui/material';
import { IoIosArrowForward } from 'react-icons/io';
import { FilterContext } from '../../context/FilterContext';

const priceSection = (value, handleChange, valuetext) => (
    <>
        <Box sx={{ width: '100%' }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                style={{color:'#8A33FD'}}
            />
        </Box>
        <Box className='w-full flex justify-around items-center'>
            <Box className='border-solid border-[#BEBCBD] border-[1px] rounded-lg text-center py-2 px-7 text-darkGrey text-base font-medium'>$ {value[0]}</Box>
            <Box className='border-solid border-[#BEBCBD] border-[1px] rounded-lg text-center py-2 px-7 text-darkGrey text-base font-medium'>$ {value[1]}</Box>
        </Box>
    </>
);

const colorOptions = [
    { color: '#8434E1', label: 'Purple' },
    { color: 'black', label: 'Black' },
    { color: '#F35528', label: 'Red' },
    { color: '#F16F2B', label: 'Orange' },
    { color: '#345EFF', label: 'Navy' },
    { color: 'white', label: 'White' },
    { color: '#D67E3B', label: 'Broom' },
    { color: '#48BC4E', label: 'Green' },
    { color: '#FDC761', label: 'Yellow' },
    { color: '#E4E5E8', label: 'Grey' },
    { color: '#E08D9D', label: 'Pink' },
    { color: '#3FDEFF', label: 'Blue' },
];

const sizeOptions = ['xxs', 'xl', 'xs', 's', 'm', 'l', 'xxl', '3xl', '4xl'];

const dressStyles = ['Tops', 'Printed T-shirts', 'Plain T-shirts', 'Kurti', 'Boxers', 'Full sleeve T-shirts', 'Joggers', 'Payjamas', 'Jeans'];

const According = () => {
    const [value, setValue] = useState([0, 100]);
    const { priceRange , setPriceRange } = useContext(FilterContext)
    

    const valuetext = (value) => `${value}$`;

    const handleChange = (event, newValue) => {
        setPriceRange(newValue)
        setValue(newValue);
    };
    

    const renderColorOptions = () => colorOptions.map(({ color, label }, index) => (
        <Box key={index} className=' flex flex-col cursor-pointer justify-center items-center gap-[18px]'>
            <Box className='w-10 h-10 rounded-xl' sx={{ backgroundColor: color }}></Box>
            <Box>{label}</Box>
        </Box>
    ));

    const renderSizeOptions = () => sizeOptions.map((size, index) => (
        <Box key={index} className='w-[60px] text-center text-darkGrey font-semibold text-base py-2 px-5 rounded-lg transition-all duration-200 hover:bg-darkGrey cursor-pointer hover:text-white uppercase border-solid border-[#BEBCBD] border-[1px]'>
            {size}
        </Box>
    ));

    const renderDressStyles = () => dressStyles.map((item, index) => (
        <Box key={index} sx={{ cursor: 'pointer', transition: 'all 0.2s', '&:hover': { color: '#3C4242' }, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography component="h3" style={{fontWeight:600, fontSize:'16px', color: '#807d7e'}}>{item}</Typography>
            <Box>
                <IoIosArrowForward />
            </Box>
        </Box>
    ));

    return (
        <Box className='px-3 w-full font-open'>
            <Accordion defaultExpanded style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography className='font-open' style={{ fontWeight: 600, fontSize: '22px', color: '#807D7E' }}>Price</Typography>
                </AccordionSummary>
                <AccordionDetails className='text-darkGrey'>
                    {priceSection(value, handleChange, valuetext)}
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography className='font-open' style={{ fontWeight: 600, fontSize: '22px', color: '#807D7E' }}>Colors</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className='py-10 text-mediumGrey text-sm font-semibold flex flex-col justify-center items-center gap-5'>
                        <Box className='w-full flex justify-between items-center'>{renderColorOptions().slice(0, 4)}</Box>
                        <Box className='w-full flex justify-between items-center'>{renderColorOptions().slice(4, 8)}</Box>
                        <Box className='w-full flex justify-between items-center'>{renderColorOptions().slice(8, 12)}</Box>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <Typography className='font-open' style={{ fontWeight: 600, fontSize: '22px', color: '#807D7E' }}>Size</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className='py-10 text-mediumGrey text-sm font-semibold flex flex-col justify-center items-center gap-5'>
                        <Box className='w-full flex justify-between items-center'>{renderSizeOptions().slice(0, 3)}</Box>
                        <Box className='w-full flex justify-between items-center'>{renderSizeOptions().slice(3, 6)}</Box>
                        <Box className='w-full flex justify-between items-center'>{renderSizeOptions().slice(6, 9)}</Box>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded style={{ boxShadow: 'none', width: '100%' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                >
                    <Typography className='font-open' style={{ fontWeight: 600, fontSize: '22px', color: '#807D7E' }}>Dress Style</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ width: '100%' }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', color: '#807d7e', fontSize: '16px', fontWeight: 600, py: 5 }}>
                        {renderDressStyles()}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default According;
