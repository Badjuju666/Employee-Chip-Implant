const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
require('dotenv').config();

let con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'process.env.PASSWORD',
    database: 'emp_datab'
});

//start by asking what they want robot
function yourChoices() {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'Main Menu: what do you need done?',
            choices: ["View your departments", "View your roles", "View your employees", "Add your departments", "Add your roles", "Add your employee", "Update Employee Info", "All done!"]
        }
    ]).then(response => {
        if (response.choice === "View your Departments"){
            tableD();
        } else if(response.choice === "View the Roles"){
            tableR();
        } else if(response.choice === "View your Employees" ){
            tableE();
        } else if(response.choice === "Add an Department"){
            addD();
        } else if(response.choice === "Add a Role"){
            addR();
        } else if(response.choice === "Add a Employee"){
            addE();
        } else if(response.choice === "Update Employee Info"){
            updateInfo();
        } else if(response.choice === "All done!"){
            process.exit();
        }
    })
}

//Department prompts
function addD(){
    inquirer.prompt([
        {
            name: 'departmenttype',
            type: 'input',
            message: 'Name the Department that you are adding.'
        },
    ]).then(response => {
        sqlQuery = `INSERT INTO departmenttypes (department_name) VALUES ('${response.departmenttype}');`
        con.query(sqlQuery, (err, res)=>{
            if(err) throw err;
            console.log('New Department Made.')
            yourChoices();
        })
    })
} 

//Role prompts
function addR(){
    inquirer.prompt([
       {
            name: 'roletype',
            type: 'input',
            message: 'Name the Role you are adding.'
       },
       {
            name: 'salary',
            type: 'input',
            message: 'What is thier Salary for this Role?'
       },
       {
            name: 'departmenttpye',
            type: 'input',
            message: 'Provide a ID for this Roles Department.'
       }        
    ]).then(response => {
        con.query(`INSERT INTO roletypes (title, salary, department_id) VALUES ('${response.roletype}', '${response.salary}', ${response.departmenttype})`, (err, res) => {
            if(err) throw err;
            console.log('New Department Made.')
            yourChoices();
        })
    })
}

//Employee prompts
function addE(){
    inquirer.prompt([
        {
            name: 'firstname',
            type: 'input',
            message: 'Enter their First Name.'
        },
        {
            name: 'lastname',
            input: 'input',
            message: 'Enter their Last Name.'
        },
        {
            name: 'roletype',
            type: 'input',
            message: 'Enter the Employees Role ID.'
        },
        {
            name: 'management',
            type: 'input',
            message: 'Enter the manager ID for this Employee.'
        }
    ]),then(response => {
        con.query(`INSERT INTO employeetypes (first_name, last_name, role_id, manager_id) VALUES ('${response.firstname}', '${response.lastname}', '${response.roletype}', '${response.management}')`, (err, res)=>{
            if(err) throw err;
            console.log('added employee name')
            yourChoices();
        })
    })
}

//Update the Employees Info prompts
function updateInfo(){
    inquirer.prompt([
        {
            name: 'updates',
            type: 'input',
            message: 'Enter the ID of the Employee you wish to Update.'
        },
        {
            name: 'roletype',
            type: 'input',
            message: 'Enter the ID of the Role you wish to Update.'
        },
        {
            name: 'management',
            type: 'input',
            message: 'Enter the ID of the Manager you wish to Update.'
        }
    ]).then(response =>{
        con.query(`UPDATE employeetypes SET role_id=${response.roletype}, manager_id=${response.management} WHERE id=${response.update}`, (err, res) => {
            if(err) throw err;
            console.log('Updated Employee Information.')
            yourChoices();
        })
    })
}

function tableD(){
    con.query("SELECT * FROM departmenttypes;", (err, res)=>{
        if(err) throw err;
        console.table(res);
        yourChoices();
    })
};

function tableR(){
    con.query("SELECT * FROM roletypes;", (err, res) => {
        if(err) throw err;
        console.table(res)
        yourChoices();
    })
};

function tableE(){
    con.query("SELECT * FROM employeetypes;", (err, res) =>{
        if(err) throw err;
        console.table(res)
        yourChoices();
    })
};

yourChoices();


















