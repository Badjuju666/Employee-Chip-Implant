const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

require('dotenv').config();

let con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'emp_datab'
});

let speak2ManagerPlz;
let showDepartments;
let showEmployees;
let showRoles;

con.connect(function (err) {
    if(err){
        console.error("error on connection" + err.stack); 
        return;
    }
    con.query("SELECT * from employeetypes", function (error, res) {
        speak2ManagerPlz = res.map(manager => ({ id: manager.manager_id, name: `${manager.first_name} ${manager.last_name}`, value: manager.id }))
    })
    
    con.query("SELECT * from departmenttypes", function (error, res) {
        showDepartments = res.map(depar => ({ name: `${depar.department_name}`, value: depar.id }))
    })
    
    con.query("SELECT * from employeetypes", function (error, res) {
        showEmployees = res.map(employ => ({ name: `${employ.first_name} ${employ.last_name}`, value: employ.manager_id}))
    })

    con.query("SELECT * from roletypes", function (error, res) {
        showRoles = res.map(roler => ({value: roler.id, name : `${roler.title}`}))
    })

})

//start by asking what they want robot
function yourChoices() {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'Main Menu: what do you need done?',
            choices: ["View your Departments.", "View the Roles.", "View your Employees.", 
            "Add an Department.", "Add your Roles.", "Add a Employee.", "Update Info.", "All done!"]
        }
    ]).then(response => {
        if (response.choice === "View your Departments."){
            tableD();
        } else if(response.choice === "View the Roles."){
            tableR();
        } else if(response.choice === "View your Employees." ){
            tableE();
        } else if(response.choice === "Add an Department."){
            addD();
        } else if(response.choice === "Add your Roles."){
            addR();
        } else if(response.choice === "Add a Employee."){
            addE();
        } else if(response.choice === "Update Info."){
            updateEmpInfo();
        } else if(response.choice === "All done!"){
            process.exit();
        }
        // } else if(response.choice === "Update Info."){
        //     updateRole();
        // }
        console.log({response})
    })
}

//Department prompts
function addD(){
    inquirer.prompt([
        {
            name: 'departmenttype',
            type: 'input',
            message: 'Name the Department that you are adding.'
        }
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
            name: 'deparid',
            type: 'list',
            message: 'What Department is this Role for?',
            choices: showDepartments
       }        
    ]).then(response => {
        con.query(`INSERT INTO roletypes (title, salary, department_id) VALUES ('${response.roletype}', '${response.salary}', ${response.deparid})`, (err, res) => {
            if(err) throw err;
            console.log('New Role Made.')
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
            type: 'list',
            message: 'Enter the manager ID for this Employee.',
            choices: showEmployees
        }
    ]).then(response => {
        con.query(`INSERT INTO employeetypes (first_name, last_name, role_id, manager_id) VALUES ('${response.firstname}', '${response.lastname}', '${response.roletype}', '${response.management}')`, (err, res)=>{
            if(err) throw err;
            console.log('New Employee made.')
            yourChoices();
        })
    })
}

//Update the Employees Info prompts
function updateEmpInfo(){
    inquirer.prompt([
        {
            name: 'updatesthis',
            type: 'list',
            message: 'Select the Employee you wish to Update.',
            choices: showEmployees
        },
        {
            name: 'roley',
            type: 'list',
            message: 'What the new Role ID you wish to Update.',
            choices: showRoles
        },
        {
            name: 'manage',
            type: 'list',
            message: 'Who is their new Manager?.',
            choices: speak2ManagerPlz

        }
    ]).then(response =>{
        con.query(`UPDATE employeetypes SET role_id=${response.roley}, manager_id=${response.manage} WHERE id=${response.updatesthis}`, (err, res) => {
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


















