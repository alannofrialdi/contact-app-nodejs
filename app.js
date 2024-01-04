import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { saveContact, listContact, detailContact, removeContact } from "./contacts.js";
import chalk from "chalk";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add new contact",
    builder: {
      name: {
        describe: "Full name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: true,
        type: "string",
      },
      phoneNumber: {
        describe: "Phone Number",
        demandOption: true,
        type: "string",
      },
      age: {
        describe: "Age",
        demandOption: true,
        type: "number",
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.email, argv.phoneNumber, argv.age);
    },
  })
  .command({
    command: "list",
    describe: "Display list of contact data",
    handler() {
      console.log(chalk.italic.cyanBright("Here the list of contact"));
      listContact();
    },
  })
  .command({
    command: 'detail',
    describe: 'Display detail data of the contact',
    builder: {
      name: {
        describe: "Full name",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.name)
    }
  })
  .command({
    command: 'rm',
    describe: 'remove contact',
    builder: {
      name: {
        describe: "Full name",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      removeContact(argv.name)
    }
  })
  .demandCommand()
  .parse();
