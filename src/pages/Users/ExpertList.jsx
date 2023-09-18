import React, { useState } from 'react';

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';

// components

import Scrollbar from '../../components/scrollbar';

import Iconify from '../../components/iconify';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'FirstName', alignRight: false },
  { id: 'lastName', label: 'LastName', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile Number', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    const returnData = array.filter(
      (_user) =>
        _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.mobileNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    return returnData;
  }
  return stabilizedThis.map((el) => el[0]);
}

const ExpertList = () => {
  const [expertData, setExpertData] = useState([
    {
      id: 1,
      firstName: 'Rip',
      lastName: 'Dobbings',
      email: 'rdobbings0@google.es',
      mobileNumber: 'Male',
    },
    {
      id: 2,
      firstName: 'Fidela',
      lastName: 'Laville',
      email: 'flaville1@utexas.edu',
      mobileNumber: 'Female',
    },
    {
      id: 3,
      firstName: 'Terrence',
      lastName: 'Pinckney',
      email: 'tpinckney2@un.org',
      mobileNumber: 'Male',
    },
    {
      id: 4,
      firstName: 'Tamqrah',
      lastName: 'Aikin',
      email: 'taikin3@hostgator.com',
      mobileNumber: 'Female',
    },
    {
      id: 5,
      firstName: 'Rachelle',
      lastName: 'Collingridge',
      email: 'rcollingridge4@usda.gov',
      mobileNumber: 'Female',
    },
    {
      id: 6,
      firstName: 'Colver',
      lastName: 'Erdes',
      email: 'cerdes5@deliciousdays.com',
      mobileNumber: 'Male',
    },
    {
      id: 7,
      firstName: 'Maryann',
      lastName: 'Milkeham',
      email: 'mmilkeham6@who.int',
      mobileNumber: 'Female',
    },
    {
      id: 8,
      firstName: 'Frasier',
      lastName: 'Werrit',
      email: 'fwerrit7@omniture.com',
      mobileNumber: 'Male',
    },
    {
      id: 9,
      firstName: 'Arv',
      lastName: 'Elies',
      email: 'aelies8@usgs.gov',
      mobileNumber: 'Male',
    },
    {
      id: 10,
      firstName: 'Anabal',
      lastName: 'Christophe',
      email: 'achristophe9@mac.com',
      mobileNumber: 'Female',
    },
    {
      id: 11,
      firstName: 'Flory',
      lastName: 'Gave',
      email: 'fgavea@buzzfeed.com',
      mobileNumber: 'Female',
    },
    {
      id: 12,
      firstName: 'Julienne',
      lastName: 'Stroban',
      email: 'jstrobanb@google.es',
      mobileNumber: 'Female',
    },
    {
      id: 13,
      firstName: 'Terza',
      lastName: 'Codeman',
      email: 'tcodemanc@hostgator.com',
      mobileNumber: 'Female',
    },
    {
      id: 14,
      firstName: 'Seana',
      lastName: 'Eskriett',
      email: 'seskriettd@chicagotribune.com',
      mobileNumber: 'Female',
    },
    {
      id: 15,
      firstName: 'Edith',
      lastName: 'Shawell',
      email: 'eshawelle@slate.com',
      mobileNumber: 'Female',
    },
    {
      id: 16,
      firstName: 'Beitris',
      lastName: 'Le - Count',
      email: 'blecountf@archive.org',
      mobileNumber: 'Genderqueer',
    },
    {
      id: 17,
      firstName: 'Bettina',
      lastName: 'Farey',
      email: 'bfareyg@github.io',
      mobileNumber: 'Female',
    },
    {
      id: 18,
      firstName: 'Georgianna',
      lastName: 'Beade',
      email: 'gbeadeh@illinois.edu',
      mobileNumber: 'Female',
    },
    {
      id: 19,
      firstName: 'Kamilah',
      lastName: 'Tames',
      email: 'ktamesi@smugmug.com',
      mobileNumber: 'Female',
    },
    {
      id: 20,
      firstName: 'Findlay',
      lastName: 'Riddick',
      email: 'friddickj@statcounter.com',
      mobileNumber: 'Male',
    },
    {
      id: 21,
      firstName: 'Troy',
      lastName: 'Rudgerd',
      email: 'trudgerdk@example.com',
      mobileNumber: 'Male',
    },
    {
      id: 22,
      firstName: 'Daffy',
      lastName: 'Silman',
      email: 'dsilmanl@wufoo.com',
      mobileNumber: 'Female',
    },
    {
      id: 23,
      firstName: 'Helene',
      lastName: 'Ianson',
      email: 'hiansonm@google.cn',
      mobileNumber: 'Female',
    },
    {
      id: 24,
      firstName: 'Cary',
      lastName: 'Canfer',
      email: 'ccanfern@hp.com',
      mobileNumber: 'Male',
    },
    {
      id: 25,
      firstName: 'Thalia',
      lastName: 'Oxbie',
      email: 'toxbieo@tiny.cc',
      mobileNumber: 'Female',
    },
  ]);
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = expertData?.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expertData.length) : 0;

  const filteredUsers = applySortFilter(expertData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <Box style={{ padding: '0 !important' }}>
      <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={expertData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, firstName, lastName, email, mobileNumber } = row;
                // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                const selectedUser = selected.indexOf(firstName) !== -1;

                return (
                  <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, firstName)} />
                    </TableCell>

                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {/* <Avatar alt={firstName} src={avatarUrl} /> */}
                        <Typography variant="subtitle2" noWrap>
                          {firstName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{lastName}</TableCell>

                    <TableCell align="left">{email}</TableCell>

                    <TableCell align="left">{mobileNumber}</TableCell>

                    <TableCell align="left">
                      {'helllo'}
                      {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                        <Iconify icon={'eva:more-vertical-fill'} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={expertData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Box>
  );
};

export default ExpertList;
