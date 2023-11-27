import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
// component
import Iconify from '../../../components/iconify';
import { deleteUser } from '../../../Axios/ApiCall';
// import logo from '../src/components/logo';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  setUserData: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectedUser,
  setSlectedUser,
  userData,
  setUserData,
  setAllRecordsOpen,
  allRecordsDeleteOpen,
  deleteuserRole,
}) {
  const takeConfirmation = () => {
    setAllRecordsOpen(true);
  };

  const deleteRecords = () => {};

  const handleClose = () => {
    setAllRecordsOpen(false);
  };

  const delteTheRecord = () => {
    console.log('deleteRecord');
    deleteUser(selectedUser).then((res) => {
      if (res.status === 200) {
        const NewUsserDaata = userData.filter((item) => {
          return !selectedUser.includes(item?._id);
        });
        setSlectedUser([]);
        setAllRecordsOpen(false);
        setUserData(NewUsserDaata);
      }
    });
  };
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 15 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={() => takeConfirmation()}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}

      <Dialog
        open={allRecordsDeleteOpen}
        // onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Confirmation!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this {deleteuserRole} records?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: 'error.main' }} onClick={delteTheRecord}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledRoot>
  );
}
