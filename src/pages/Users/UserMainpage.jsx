import {
  Box,
  Button,
  Card,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { PiStudentBold } from 'react-icons/pi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { RiParentLine } from 'react-icons/ri';
import React from 'react';
import ExpertList from './ExpertList';
import ParentList from './ParentList';
import StudentList from './StudentList';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserMainpage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          {/* <Button variant="contained">New User</Button> */}
        </Stack>

        <Card>
          <Box sx={{ p: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  '& .MuiTab-root': {
                    padding: 0, // You can adjust these values to reduce padding
                    minWidth: 'auto', // Remove the minimum width to adjust width to content
                    marginRight: '5px', // Adjust margin-right as needed
                  },
                }}
              >
                <Tab
                  label={
                    <ListItem>
                      <ListItemIcon sx={{ display: 'inline', marginRight: -3 }}>
                        <FaChalkboardTeacher color={value === 0 ? '#2567D2' : 'inherit'} style={{ fontSize: '22px' }} />
                      </ListItemIcon>
                      <ListItemText primary="Expert" />
                    </ListItem>
                  }
                  value={0}
                />
                <Tab
                  label={
                    <ListItem>
                      <ListItemIcon>
                        <RiParentLine color={value === 1 ? '#2567D2' : 'inherit'} style={{ fontSize: '22px' }} />
                      </ListItemIcon>
                      <ListItemText primary="Parent" />
                    </ListItem>
                  }
                  value={1}
                />
                <Tab
                  label={
                    <ListItem>
                      <ListItemIcon>
                        <PiStudentBold color={value === 2 ? '#2567D2' : 'inherit'} style={{ fontSize: '22px' }} />
                      </ListItemIcon>
                      <ListItemText primary="Student" />
                    </ListItem>
                  }
                  value={2}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ExpertList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ParentList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <StudentList />
            </CustomTabPanel>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default UserMainpage;
