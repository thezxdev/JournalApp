import { useMemo } from 'react';
// Ponerle un alias al Link del react-router-dom para usarlo con el Link de material
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

// Poner los valores del formulario fuera del componente para que no se infinitamente
const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {


  const { status, errorMessage } = useSelector( state => state.auth );
  // console.log( status );
  // Creación del dispatch del redux
  const dispatch = useDispatch();

  const isCheckingAuthentication = useMemo( () => {status === 'checking'}, [ status ]);

  const { email, password, onInputChange } = useForm( formData );

  const isAuthenticating = useMemo( () => {
    return status === 'checking';
  }, [ status ] );
  
  const onGoogleSigIn = () => {
    // console.log('onGoogleSignIn');

    dispatch( startGoogleSignIn() );

    // console.log( isAuthenticating );
  }

  const onSubmit = ( e ) => {
    e.preventDefault();

    // Llamado al thunk de auth
    // dispatch( checkingAuthentication( email, password ) );

    dispatch( startLoginWithEmailPassword( { email, password } ) );

    // console.log( email, password );
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid> {/* Correo */}          

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={ password }
              onChange={ onInputChange }
              fullWidth
            />
          </Grid> {/* Contraseña */}

          {/* Mostrar mensaje del error */}
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
            display={ !!errorMessage ? '' : 'none' }
          >
            <Alert severity='error'>{ errorMessage }</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={ isAuthenticating }
                fullWidth
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Grid> {/* Login */}

            <Grid item xs={12} sm={6}>
              <Button
                disabled={ isAuthenticating }
                fullWidth
                onClick={ onGoogleSigIn }
                variant="contained"
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid> {/* Google */}

            <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
              {/* Link de material y componentt de react-router-dom */}
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid> {/* Crear cuenta */}

          </Grid> {/* Login | Google | Crear cuenta */}

        </Grid> {/* Formulario */}
      </form>
    </AuthLayout>
  )
}

// Sin Layout
    // <Grid
    //   container
    //   spacing={ 0 }
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="center"
    //   sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    // >

    //   <Grid item
    //     className="box-shadow"
    //     xs={ 3 }
    //     sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
    //   >
    //     <Typography variant='h5' sx={{ mb: 1 }}>Login</Typography>

    //     <form>
    //       <Grid container>
    //         <Grid item xs={ 12 } sx={{ mt: 2 }}>
    //           <TextField
    //             label="Correo"
    //             type="email"
    //             placeholder="correo@google.com"
    //             fullWidth
    //           />
    //         </Grid> {/* Correo */}

    //         <Grid item xs={ 12 } sx={{ mt: 2 }}>
    //           <TextField
    //             label="Contraseña"
    //             type="password"
    //             placeholder="Contraseña"
    //             fullWidth
    //           />
    //         </Grid> {/* Contraseña */}

    //         <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
    //           <Grid item xs={ 12 } sm={ 6 }>
    //             <Button variant="contained" fullWidth>
    //               Login
    //             </Button>
    //           </Grid> {/* Login */}

    //           <Grid item xs={ 12 } sm={ 6 }>
    //             <Button variant="contained" fullWidth>
    //               <Google />
    //               <Typography sx={{ ml: 1 }}>Google</Typography>
    //             </Button>
    //           </Grid> {/* Google */}

    //           <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
    //             {/* Link de material y componentt de react-router-dom */}
    //             <Link component={ RouterLink } color="inherit" to="/auth/register">
    //               Crear una cuenta
    //             </Link>
    //           </Grid> {/* Crear cuenta */} 

    //         </Grid> {/* Login | Google | Crear cuenta */}

    //       </Grid> {/* Formulario */}
    //     </form>
    //   </Grid> {/* Contenedor */}

    // </Grid>