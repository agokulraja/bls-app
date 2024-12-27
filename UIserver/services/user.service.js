
import apiClient from './api.service'; 

const UserService = {
    getUsers: () => {
        return apiClient.get('/users');
    },
    
};

export default UserService;