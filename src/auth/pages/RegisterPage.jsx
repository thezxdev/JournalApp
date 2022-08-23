// Ponerle un alias al Link del react-router-dom para usarlo con el Link de material
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

// Validaciones personalizadas
const formValidations = {
  email: [ ( value ) => value.includes('@'), 'El correo debe de tener una @' ],
  password: [ ( value ) => value.length >= 6, 'El password debe de tener más de 6 letras' ],
  displayName: [ ( value ) => value.length >= 1, 'El nombre es obligatorio' ]
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState( false );

  const { formState, displayName, email, password, onInputChange,
  isFormValid, displayNameValid, emailValid, passwordValid } = useForm( formData, formValidations );

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted( true );

    // Si el formulario es válido usar el thunk startCreatingUserWithEmailPassword 
    if( !isFormValid ) return;
    dispatch( startCreatingUserWithEmailPassword( formState ) );
  }

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={ onSubmit }>
        <Grid container>

        <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted }
              helperText={ ( formSubmitted ) ? displayNameValid : null }
            />
          </Grid> {/* Nombre */}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted }
              helperText={ ( formSubmitted ) ? emailValid : null }
            />
          </Grid> {/* Correo */}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted }
              helperText={ ( formSubmitted ) ? passwordValid : null }
            />
          </Grid> {/* Contraseña */}

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
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