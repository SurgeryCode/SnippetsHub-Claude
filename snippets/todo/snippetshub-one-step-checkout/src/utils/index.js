export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
};

export const generateUniqueId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

export const parseJson = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error('Invalid JSON string');
    }
};