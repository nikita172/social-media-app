import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const  INITIAL_STATE = {
    user:{
        "_id": "630cfb5f24b3664252deb4cf",
        "username": "nikita",
        "email": "nikita@test.com",
        "password": "$2b$10$06GcRM0QbzapbjnxBtRh6el8vtoPzU8BJ65bUftrpT8i1ESalFNqy",
        "profilePicture": "person/2.jpeg",
        "coverPicture": "",
        "followers": [],
        "followings": [
          "630daaba1a6faa6f624821b4"
        ],
        "isAdmin": false,
        "createdAt": "2022-08-29T17:46:07.120Z",
        "updatedAt": "2022-08-30T07:16:51.471Z",
        "__v": 0
      },
    isFetching:false,
    error:false
}
export const  AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider =  ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    return (
        <AuthContext.Provider value={{
            user:state.user,
            isFetching: state.isFetching,
            error:state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}