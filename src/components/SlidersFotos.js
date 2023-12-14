import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        // flexWrap: 'nowrap',
        width: "100%",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        //transform: 'translateZ(0)',
    },
}));

const itemData = [

    {
        img: "https://phantom-telva.unidadeditorial.es/9470df9f003b4395178cd252bed0e300/resize/670/f/webp/assets/multimedia/imagenes/2022/01/24/16429903202918.jpg",
        title: 'Foto 2',
        author: 'author2',
        cols: 2,
    },
    {
        img: "https://phantom-telva.unidadeditorial.es/134dd83292ddb0e8f17cb410c2ee89af/resize/670/f/webp/assets/multimedia/imagenes/2022/01/24/16429903170470.jpg",
        title: 'Foto 3',
        author: 'author3',
        cols: 2,
    },


    {
        img: "https://unifotografia.com/wp-content/uploads/2020/05/MODA2.jpg",
        title: 'Foto 3',
        author: 'author3',
        cols: 2,
    },
    {
        img: "https://img.freepik.com/foto-gratis/hermosa-mujer-rubia-joven-sonriente-apuntando-gafas-sol-sosteniendo-bolsas-compras-tarjeta-credito-pared-rosa_496169-1506.jpg?size=626&ext=jpg&ga=GA1.1.1463765921.1673108892",
        title: 'Foto 3',
        author: 'author3',
        cols: 2,
    },
];
export default function SlidersFotos(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList rowHeight={450} className={classes.imageList} cols={8}>
                {props?.fotos.map((item) => (
                    <ImageListItem key={item} cols={2}>
                        <img src={item} alt={"Servicio"} />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}