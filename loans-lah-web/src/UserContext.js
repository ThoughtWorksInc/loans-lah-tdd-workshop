import React from 'react'
import {GUEST_USER} from "./models/User";

const UserContext = React.createContext(GUEST_USER);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;