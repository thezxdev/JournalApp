// Ponerle un alias al Link del react-router-dom para usarlo con el Link de material
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid> {/* Correo */}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid> {/* Contraseña */}

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid> {/* Login */}

            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
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