import SweetAlert from 'sweetalert2';

export const handleDelete = (data, deleteFunction) => {
  SweetAlert.fire({
    title: 'Está seguro?',
    text: 'Esta a punto de eliminar el registro ' + data.nombreFormulario,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EE273E',
    cancelButtonColor: '#616161',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.value) {
      deleteFunction(data);
    } else if (result.dismiss === SweetAlert.cancel) {
      SweetAlert.fire('Cancelled', 'Cancelado', 'error');
    }
  });
};

export function handleError(error, event) {
  SweetAlert.fire({
    icon: 'error',
    title: 'Ocurrio un error',
    text: error,
  });
}

export function successfulDelete(reload) {
  SweetAlert.fire({
    title: 'Eliminado!',
    text: 'El registro a sido eliminado.',
    icon: 'success',
    confirmButtonColor: '#43a047',
  }).then((result) => {
    reload();
  });
}

export default handleDelete;
