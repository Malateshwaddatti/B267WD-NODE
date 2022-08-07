const os=require('os');
const fs=require('fs');

console.log("Hello Guvi Welcome to all !!");
const num=[10,5,80,30,46,70];
console.log(Math.max(...num));
console.log(Math.min(...num));

function double(num){
    return num*2;
}
console.log("The double is :",double(num));
console.log(process.argv);
console.log("The Total Free memory is :"+os.totalmem());
console.log("The Total Memory is : "+os.freemem());

fs.readFile("./nice.text","utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data);

    fs.writeFile("./good.text",data,()=>{
        console.log("Write the file!!!");
    })

})

const num1=fs.readFileSync("./nice.text","utf-8");
console.log(num1+"Hello Yashu");

fs.copyFile("./good.text","awsome.text",()=>{
    console.log("Copy the file");
})

fs.rename("./good.text","good1.text",()=>{
    console.log("Rename the file!!!");
})

fs.appendFile("./nice.text","\nHello Yashu!!!",()=>{
    console.log("Append the file !!!");
}
)