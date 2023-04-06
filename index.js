const yargs = require("yargs");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { argv } = yargs(process.argv.slice(2));

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const contact = await getContactById(id);
      return console.log(contact);

    case "add":
      const addedContact = await addContact(name, email, phone);

      return console.log(addedContact);

    case "remove":
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
