import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'; // Import Formik
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (values) => {
    console.log(values, 'values fot login');
    navigate('/dashboard', { replace: true });
  };

  // Define form validation and initial values using Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    // Validation function
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Email is required';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    // Form submission function
    onSubmit: (values) => {
      // You can perform your login logic here with the values.email and values.password
      // Then, you can navigate to the dashboard if login is successful
      handleClick(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Box>
          <Checkbox
            name="remember"
            checked={formik.values.remember}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{' '}
          Remember me
        </Box>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={formik.handleSubmit}>
        Login
      </LoadingButton>
    </form>
  );
}
