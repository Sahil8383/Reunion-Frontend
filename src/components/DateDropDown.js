import React, { useState, useContext } from 'react';
// import icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
// import headless ui components
import { Menu } from '@headlessui/react';
// import context
import { HouseContext } from './HouseContext';

const DateDropDown = () => {
  const { date,setDate , dates } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Menu as='div' className='dropdown relative'>
    <Menu.Button
      onClick={() => setIsOpen(!isOpen)}
      className='dropdown-btn w-full text-left'
    >
      <RiMapPinLine className='dropdown-icon-primary' />
      <div>
        <div className='text-[15px] font-medium leading-tight'>{date}</div>
        <div className='text-[13px]'>Select Month </div>
      </div>
      {isOpen ? (
        <RiArrowUpSLine className='dropdown-icon-secondary' />
      ) : (
        <RiArrowDownSLine className='dropdown-icon-secondary' />
      )}
    </Menu.Button>

    <Menu.Items className='dropdown-menu'>
      {dates.map((d, index) => {
        return (
          <Menu.Item
            as='li'
            onClick={() => setDate(d)}
            key={index}
            className='cursor-pointer hover:text-violet-700 transition'
          >
            {d}
          </Menu.Item>
        );
      })}
    </Menu.Items>
  </Menu>
  );
};

export default DateDropDown;


































// import React, { useState, useContext } from 'react';

// import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

// import { Menu } from '@headlessui/react';

// import { HouseContext } from './HouseContext';

// const DateDropDown = () => {
//   const [date, setDate] = useState();
//   const handleDate = (e) =>{
//     setDate({date : e.target.value});
//     console.log(date);
//   }
//   return (
//     <Menu as='div' >
//       <Menu.Button
//         className='dropdown-btn w-full text-left'
//       >
//         <RiMapPinLine className='dropdown-icon-primary' />
//         <div>
//             <div className='text-[15px] font-medium leading-tight'>
//                 <input type = 'date' onChange={handleDate}>
//                 </input>
//             </div>
//           <div className='text-[13px]'>Select your Date</div>
//         </div>
//       </Menu.Button>    
//     </Menu>
//   );
// };



// export default DateDropDown;
