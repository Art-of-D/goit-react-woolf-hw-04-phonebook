import { useState } from 'react';
import { PhonebookForm, PhonebookInputButton } from './ContactForm.styled';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <PhonebookForm onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
        pattern="^[a-zA-Zа-яА-Я]+(['\s\-][a-zA-Zа-яА-Я]+)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="phone-number">Number:</label>
      <input
        type="tel"
        name="number"
        id="phone-number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        pattern="^(\+\d{1,3}\s?)?(\(\d{1,4}\)|\d{1,4})[\s\-]?\d{1,18}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <PhonebookInputButton
        type="submit"
        value="Add contact"
      ></PhonebookInputButton>
    </PhonebookForm>
  );
};
