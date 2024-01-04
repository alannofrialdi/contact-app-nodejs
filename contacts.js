import fs from "fs";
import validator from "validator";
import chalk from "chalk";
import path from "path";

const dataDir = path.resolve(path.join("data"));
const dirFile = path.join(dataDir, "contact.json");

const ensureDirectoryAndFileExistence = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (!fs.existsSync(dirFile)) {
    fs.writeFileSync(dirFile, "[]", "utf-8");
  }
};

const loadContact = () => {
  const fileBuffer = fs.readFileSync(dirFile, "utf-8");
  return JSON.parse(fileBuffer);
};

const saveContactsToFile = (contacts) => {
  try {
    fs.writeFileSync(dirFile, JSON.stringify(contacts, null, 4));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const displayErrorMessage = (message) => {
  console.log(chalk.bold.redBright(message));
};

const displaySuccessMessage = (message) => {
  console.log(chalk.greenBright.bold(message));
};

export const saveContact = (name, email, phoneNumber, age) => {
  ensureDirectoryAndFileExistence();
  const contacts = loadContact();

  const duplicate = contacts.find((c) => c.name === name);
  if (duplicate) {
    displayErrorMessage(
      "The name you entered is already taken. Please enter another name."
    );
    return false;
  }

  if (email && !validator.isEmail(email)) {
    displayErrorMessage("Please use the correct email format.");
    return false;
  }

  if (!validator.isMobilePhone(phoneNumber, "id-ID")) {
    displayErrorMessage("Please use the correct phone number format.");
    return false;
  }

  contacts.push({ name, email, phoneNumber, age });

  if (saveContactsToFile(contacts)) {
    displaySuccessMessage(
      `Thank you ${chalk.yellowBright(name)}, for entering the data.`
    );
    return true;
  } else {
    return false;
  }
};

export const removeContact = (name) => {
  ensureDirectoryAndFileExistence();
  const contacts = loadContact();

  const indexToRemove = contacts.findIndex(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (indexToRemove === -1) {
    displayErrorMessage(`${name} isn't found!`);
    return false;
  } else {
    contacts.splice(indexToRemove, 1);
    if (saveContactsToFile(contacts)) {
      displaySuccessMessage(
        `Contact ${chalk.yellowBright(name)}, successfully removed.`
      );
      return true;
    } else {
      return false;
    }
  }
};

export const detailContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.bold.redBright(`${name} isn't found!`));
    return false;
  } else {
    console.log(`${chalk.bold.yellowBright("name:")} ${contact.name}`);
    console.log(`${chalk.bold.yellowBright("email:")} ${contact.email}`);
    console.log(`${chalk.bold.yellowBright("phone:")} ${contact.phoneNumber}`);
    console.log(`${chalk.bold.yellowBright("age:")} ${contact.age}`);
  }
};

export const listContact = () => {
  const contacts = loadContact();
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. Name: ${contact.name} - No: ${contact.phoneNumber}`);
  });
};
