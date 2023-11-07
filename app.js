#!usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Currency coverting api link
let apiLink = "https://v6.exchangerate-api.com/v6/a497e9775851ed57d74c5b4d/latest/PKR";
//Fetching data fucntion
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
let data = await fetchData(apiLink);
//object converted into array
let countries = Object.keys(data);
//user input of 1st country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Coverting Currency from",
    choices: countries,
});
// ammount asked from 1st country user tobe converted
let userMoney = await inquirer.prompt({
    type: "number",
    name: "Rupee",
    message: `Please enter the ammount in ${chalk.greenBright.bold(firstCountry.name)}`,
});
//the amount have to be converted into country
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converted Currency to",
    choices: countries,
});
//Conversion rates
let conRate = `https://v6.exchangerate-api.com/v6/a497e9775851ed57d74c5b4d/pair/${firstCountry.name}/${secondCountry.name}`;
//fetching data for conversion rate
let conRateData = async (data) => {
    let conRateData = await fetch(data);
    let response = await conRateData.json();
    return response.conversion_rate;
};
let conversionRate = await conRateData(conRate);
let convertedRate = userMoney.Rupee * conversionRate;
console.log(`Your ${chalk.bold.yellowBright(firstCountry.name)} ${chalk.bold.yellowBright(userMoney.Rupee)} in ${chalk.bold.yellowBright(secondCountry.name)} is ${chalk.bold.yellowBright(convertedRate)}`);
