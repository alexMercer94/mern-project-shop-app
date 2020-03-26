import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const Continents = [
    {
        key: 1,
        value: 'Africa'
    },
    {
        key: 2,
        value: 'Europa'
    },
    {
        key: 3,
        value: 'Asia'
    },
    {
        key: 4,
        value: 'Norte América'
    },
    {
        key: 5,
        value: 'Sudamérica'
    },
    {
        key: 6,
        value: 'Australia'
    },
    {
        key: 7,
        value: 'Antartida'
    }
];

const { Title } = Typography;
const { TextArea } = Input;

const UploadProductPage = props => {
    const [TitleValue, setTitleValue] = useState('');
    const [DescriptionValue, setDescriptionValue] = useState('');
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1);

    const [Images, setImages] = useState([]);

    /**
     * Get title value from form
     * @param {*} event
     */
    const onTitleChange = event => {
        setTitleValue(event.currentTarget.value);
    };

    /**
     * Get description from form
     * @param {*} event
     */
    const onDescriptionChange = event => {
        setDescriptionValue(event.currentTarget.value);
    };

    /**
     * Get price from form
     * @param {*} event
     */
    const onPriceChange = event => {
        setPriceValue(event.currentTarget.value);
    };

    /**
     * Get continent from form's select
     * @param {*} event
     */
    const onContinentsSelectChange = event => {
        setContinentValue(event.currentTarget.value);
    };

    /**
     * Update images in state
     * @param {*} newImages
     */
    const updateImages = newImages => {
        setImages(newImages);
    };

    const onSubmit = e => {
        e.preventDefault();
        const payload = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue
        };
        Axios.post('/api/product/uploadProduct', payload).then(response => {
            if (response.data.success) {
                alert('El producto se ha publicado correctamente');
                props.history.push('/');
            } else {
                alert('Ha ocurrido un error al publicar el producto');
            }
        });
    };

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Publicar un nuevo produto</Title>
            </div>
            <Form onSubmit={onSubmit}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages}></FileUpload>
                <br />
                <br />
                <label>Titulo</label>
                <Input onChange={onTitleChange} value={TitleValue}></Input>
                <br />
                <br />
                <label>Descripción</label>
                <TextArea onChange={onDescriptionChange} value={DescriptionValue}></TextArea>
                <br />
                <br />
                <label>Precio ($)</label>
                <Input onChange={onPriceChange} value={PriceValue} type="number"></Input>
                <select onChange={onContinentsSelectChange}>
                    {Continents.map(contient => (
                        <option key={contient.key} value={contient.key}>
                            {contient.value}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <Button onClick={onSubmit}>Publicar</Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;
