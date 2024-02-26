// proxy.js

// exports.handler = async (event, context) => {
//     const url = "http://api.quotable.io/random";
    
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log("data", data);
        
//         return {
//             statusCode: 200,
//             body: JSON.stringify(data)
//         };
//     } catch (error) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Internal Server Error" })
//         };
//     }
// };
