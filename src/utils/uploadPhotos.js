import axios from "./axios";

export const uploadPhotos = async (assets, api) => {
console.log(id, assets, api)
        const formData = new FormData();
        assets.map(asset => {
            formData.append('imgs', {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
                data: asset.uri
            });
        })
        try {
            const respFileUlpoad = await axios.post(`${api}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (respFileUlpoad.status === 201) return true;
        } catch (e) {
            console.error(e);
        }
        return false;
    }