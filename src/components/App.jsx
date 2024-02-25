import { Filter } from './Phonebook/Filter/Filter';
import { Section } from './Phonebook/Section/Section';
import { ContactForm } from './Phonebook/ContactForm/ContactForm';
import { ContactList } from './Phonebook/ContactList/ContactList';
import { v1 as uuidv1 } from 'uuid';
import { useEffect, useState } from 'react';

export const App = () => {
  const KEY_WORD = 'contacts';
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(KEY_WORD)) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY_WORD, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name: newName, number }) => {
    if (
      contacts.some(({ name }) => name.toLowerCase() === newName.toLowerCase())
    ) {
      alert(`${newName} is already in contacts`);
      return;
    }

    const newContact = {
      id: uuidv1(),
      name: newName,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const addFilter = newFilter => {
    setFilter(newFilter);
  };

  const filterContacts = () => {
    return contacts.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDelete = deletedId => {
    setContacts(contacts.filter(person => person.id !== deletedId));
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      {contacts.length > 0 && (
        <Section title="Contacts">
          <Filter filter={addFilter} />
          <ContactList contacts={filterContacts()} onDelete={onDelete} />
        </Section>
      )}
    </>
  );
};
