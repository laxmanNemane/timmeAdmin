import React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

function TabPanel(props) {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

export default function MyTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Content for Tab 1
      </TabPanel>
      <TabPanel value={value} index={1}>
        Content for Tab 2
      </TabPanel>
      <TabPanel value={value} index={2}>
        Content for Tab 3
      </TabPanel>
    </div>
  );
}
