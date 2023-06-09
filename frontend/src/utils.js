const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('userId'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` }
    }
    return {};
};
export default getAuthHeader;