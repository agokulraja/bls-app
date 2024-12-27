
import React, { useEffect, useState } from 'react';
import UserService from '../services/user.service'; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getUsers(); 
                setUsers(response.data); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.userName}- {user.email}</li>
                    
                ))}
            </ul>
        </div>
    );
};

export default UserList;