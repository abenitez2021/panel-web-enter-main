import SearchIcon from '@material-ui/icons/Search';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import React from 'react';

export function Detalle() {
  return <SearchIcon style={{ color: '#43a047' }} />;
}

export function Editar() {
  return <Edit style={{ color: '#43a047' }} />;
}

export function Eliminar() {
  return <Delete style={{ color: '#EE273E' }} />;
}

export function Desactivar() {
  return <ThumbDownIcon style={{ color: '#455a64' }} />;
}
export function Activar() {
  return <ThumbUp style={{ color: '#2e7d32' }} />;
}