import  React from 'react';
import BookingPageFlightCard from './BookingPageFlightCard';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BaggageTable from './BaggageTable';
import CancelDetails from './CancelDetails';
import FareDetails from './FareDetails';

const CustomizedTabs=({props,passengersCount,baseFare,taxes})=>{
  const data=props
  console.log("Customized Tabs props",props)
  console.log("Customized Tabs data",taxes)
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return (
    
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Flight" value="1" />
            <Tab label="Baggage" value="2" />
            <Tab label="Fare" value="3" />
            <Tab label="Cancellation" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1" index={0}><BookingPageFlightCard props={props}/></TabPanel>
        <TabPanel value="2" index={1}><BaggageTable/></TabPanel>
        <TabPanel value="3" index={2}><FareDetails passengersCount={passengersCount} baseFare={baseFare} taxes={taxes}/></TabPanel>
        <TabPanel value="4" index={3}><CancelDetails/></TabPanel>
      </TabContext>
    
  );
}

export default CustomizedTabs;