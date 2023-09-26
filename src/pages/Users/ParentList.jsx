import React, { useEffect, useState } from 'react';

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

// mock
// import parentList from '../../_mock/parentList';
import { deleteUser, getParentList } from '../../Axios/ApiCall';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'FirstName', alignRight: false },
  { id: 'lastName', label: 'LastName', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile Number', alignRight: false },

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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    const returnData = array?.filter(
      (_user) =>
        _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.mobileNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    return returnData;
  }
  return stabilizedThis?.map((el) => el[0]);
}

const ParentList = () => {
  const [parenListData, setParentList] = useState([]);
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [deleteSingleElement, setDeleteSingleElement] = useState('');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, id) => {
    setDeleteSingleElement(id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setDeleteSingleElement();
    setOpen(null);
  };

  // const expertlsit Api call
  useEffect(() => {
    getParentList().then((res) => setParentList(res.data));
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = parenListData?.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected?.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected?.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected?.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected?.concat(selected?.slice(0, selectedIndex), selected?.slice(selectedIndex + 1));
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - parenListData?.length) : 0;

  const filteredUsers = applySortFilter(parenListData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers?.length && !!filterName;

  const deleteHanlder = () => {
    if (deleteSingleElement) {
      const Data = [deleteSingleElement];
      deleteUser(Data).then((res) => {
        if (res.status === 200) {
          const NewUsserDaata = parenListData?.filter((item) => {
            return !Data.includes(item?._id);
          });
          setDeleteSingleElement();
          setOpen(null);
          setParentList(NewUsserDaata);
        }
      });
    }
  };

  return (
    <Box style={{ padding: '0 !important' }}>
      <UserListToolbar
        numSelected={selected?.length}
        selectedUser={selected}
        setSlectedUser={setSelected}
        userData={parenListData}
        setUserData={setParentList}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={parenListData?.length}
              numSelected={selected?.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                const { _id, firstName, lastName, email, mobileNumber } = row;
                // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                const selectedUser = selected?.indexOf(_id) !== -1;

                return (
                  <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
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

                    <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row?._id)}>
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
        count={parenListData?.length}
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

        <MenuItem sx={{ color: 'error.main' }} onClick={deleteHanlder}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Box>
  );
};

export default ParentList;
