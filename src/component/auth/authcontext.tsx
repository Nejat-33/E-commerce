import React, { createContext, useContext, useState } from "react";

type Usertype = {
    email: string
    password: string
}

interface authcontexttype {
    user: Usertype | null;
    login: (user: Usertype) => boolean;
    logout: () => void;
    updateUser: (newData: Partial<Usertype>) => boolean; // Add this line
}
const Authcontext = createContext<authcontexttype | null>(null)

const Authcontextprovider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setuser] = useState<Usertype | null>(JSON.parse(localStorage.getItem('user') || '[]'))

    const login = (user: Usertype) => {
        const reguser: Usertype[] = JSON.parse(localStorage.getItem('registered_users') || '[]')

        const foundUser = reguser.find(u => u.email === user.email && u.password === user.password);

        if (!foundUser) {
            console.log('Invalid email or password');
            return false;
        }
        setuser(foundUser)
        localStorage.setItem('user', JSON.stringify(foundUser))
        return true
    }

    const logout = () => {
        setuser(null)
        localStorage.removeItem('user')
    }
    // Put this inside your Authcontextprovider component
    const updateUser = (newData: Partial<Usertype>): boolean => {
        if (!user) return false;

        // 1. Get the latest list of all users from LocalStorage
        const STORAGE_KEY = "registered_users"; // Use the same key as Registration
        const allUsers: Usertype[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        // 2. Find the index of the current user
        const userIndex = allUsers.findIndex(u => u.email === user.email);

        if (userIndex === -1) return false;

        // 3. Merge the new data with the old user data
        // This uses the "Spread Operator" to keep old data while adding new data
        const updatedUser = { ...allUsers[userIndex], ...newData };

        // 4. Update the array
        allUsers[userIndex] = updatedUser;

        // 5. Save the whole array back to LocalStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));

        // 6. Update the Context State so the UI refreshes immediately
        setuser(updatedUser);

        // 7. Also update the 'session' user key
        localStorage.setItem('user', JSON.stringify(updatedUser));

        return true;
    }

    return <Authcontext.Provider value={{ user, login, logout, updateUser }}>
        {children}
    </Authcontext.Provider>
}

export default Authcontextprovider

const useAuth = () => {
    const context = useContext(Authcontext)
    if (!context) {
        throw new Error('the context must be used inside the provider')
    }
    return context
}

export { useAuth }
