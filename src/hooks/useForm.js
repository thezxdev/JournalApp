import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {

  const [ formState, setFormState ] = useState( initialForm );
  // Estado para mantener las propiedades validads y redibujar el form
  const [ formValidation, setformValidation ] = useState({});

  useEffect(() => {
    createValidators();
  }, [ formState ]);
  
  // Saber si el formulario es válido
  const isFormValid = useMemo( () => {

    // Iterar sobre el formValidation (valores de validación) y saber si el valor de sus propiedades es diferente de null
    for (const formValue of Object.keys( formValidation ) ) {
      if( formValidation[ formValue ] !== null ) return false;
    }

    return true;
  }, [ formValidation ] );

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [ name ]: value
    });
  }

  const onResetForm = () => {
    setFormState( initialForm );
  }

  // Función para crear las validaciones
  const createValidators = () => {

    // Objeto para guardar el valor de la propiedada evaluar + Valid y su valor | errorMessage o null
    const formCheckedValues = {};

    // Recorrer el objeto de las validaciones que contiene la función y su errorMessage
    for (const formField of Object.keys( formValidations )) {
      // Desestructurar la función y el errorMessage
      const [ fn, errorMessage ] = formValidations[ formField ];

      // Asignar los valores al formCheckedValues con el valor de Valid
      formCheckedValues[`${ formField }Valid`] = fn( formState[ formField ] ) ? null : errorMessage;
    }

    // console.log( formValidation );

    // Asignar las validaciones al state
    setformValidation( formCheckedValues );

  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    // Esparcir validaciones del formulario
    ...formValidation,
    isFormValid
  }
}