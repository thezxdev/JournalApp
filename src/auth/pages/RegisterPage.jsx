// Ponerle un alias al Link del react-router-dom para usarlo con el Link de material
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear Cuenta">
      <form>
        <Grid container>

        <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
            />
          </Grid> {/* Nombre */}

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
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Crear cuenta
              </Button>
            </Grid> {/* Login */}

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
              {/* Link de material y componentt de react-router-dom */}
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Ingresar
              </Link>
            </Grid> {/* Crear cuenta */}

          </Grid> {/* Login | Iniciar sesión */}

        </Grid> {/* Formulario */}
      </form>
    </AuthLayout>
  )
}