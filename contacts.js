const fs = require("fs").promises;
const path = require("path");
const uuid = require("short-uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();

    return data.find(({ id }) => id === contactId) || "Invalid contactId";
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();

    if (!data.find(({ id }) => id === contactId)) {
      return `Sorry, contact with id ${contactId} not found!`;
    }

    const updatedData = data.filter((i) => i.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(updatedData, null, 2));
    return `Contact with id ${contactId} deleted!`;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = uuid.generate();
    const data = await listContacts();

    const newContact = { id, name, email, phone };

    data.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
