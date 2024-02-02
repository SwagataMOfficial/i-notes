// import { useState, createContext } from "react";

// const UserContext = createContext();

// const AllContexts = (props) => {
//     const [alert, setalert] = useState(null);
//     const showAlert = (color, message, type) => {
//         setalert(
//             {
//                 alertColor: color,
//                 alertMessage: message,
//                 alertType: type
//             }
//         );
//         setTimeout(() => {
//             setalert(null);
//         }, 1500);
//     };
// return (
//     <UserContext.Provider value={{ alert, showAlert }}>
//         {props.children}
//     </UserContext.Provider>
// );
// };

// const AllContexts = (props) => {
//     const s1 = {
//         "name": "swagata",
//         "age": 15
//     }
//     const [state, setstate] = useState(s1);
//     const update = () => {
//         setTimeout(() => {
//             setstate({ 'name': 'rohan', 'class': '19' });
//         }, 2000);
//     };
//     return (
//         <UserContext.Provider value={state}>
//             {props.children}
//         </UserContext.Provider>
//     );
// };

// export default AllContexts;