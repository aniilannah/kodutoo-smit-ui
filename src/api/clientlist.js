import axios from "axios";

const apiUrl = "http://localhost:8091/api/contact-list";

export const fetchAllContacts = async () => {
    const response = await axios.get(`${apiUrl}/get-all-contacts`);
    return response.data;
};

export const addContact = async (newContact) => {
    await axios.post(`${apiUrl}/add-contact`, newContact);
};

export const searchAndFilterContacts = async (searchQuery) => {
    const response = await axios.get(`${apiUrl}/search-contact`, {
        params: {
            query: searchQuery,
        },
    });
    return response.data;
};
