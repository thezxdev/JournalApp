
export const fileUpload = async( file ) => {

  if ( !file ) throw new Error('No tenemos ningún archivo a subir');

  const cloudUrl = `https://api.cloudinary.com/v1_1/journalimages/upload`;

  // Creación del formData
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    
    // Petición
    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData
    } );

    // console.log( resp );
    if( !resp.ok ) throw new Error('No se pudo subir la imagen');

    // Serializar el cuerpo de la petición
    const cloudResponse = await resp.json();
    // console.log({ cloudResponse });

    return cloudResponse.secure_url;

  } catch ( err ) {
    console.log( err );
    throw new Error( err.message );
  }
}