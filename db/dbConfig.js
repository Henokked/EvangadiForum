const mysql2 = require('mysql2')
const dbconnection = mysql2.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:"localhost",
    password:process.env.PASSWORD,
    connectionLimit: 10,

})
console.log(process.env.USER)

// dbconnection.execute("Select 'test'", (err,result)=>{
//     if(err){
//         console.log(err.message)
//     }else{
//         console.log(result)
//     }
// })

module.exports=dbconnection.promise()