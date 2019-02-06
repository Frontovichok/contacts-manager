import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import ContactsTable from './ContactsTable';
import ContactsSearch from './ContactsSearch';
import NewContactButton from './NewContactButton';

const contacts = [
    {
        id: 0,
        name: 'Ivan',
        phone: '+7 (916) 111-11-11',
        company: 'A',
    },
    {
        id: 1,
        name: 'Sergey',
        phone: '+7 (916) 111-11-11',
        company: 'B',
    },
    {
        id: 2,
        name: 'Vasiliy',
        phone: '+7 (916) 111-11-11',
        company: 'C',
    },
    {
        id: 3,
        name: 'Pasha',
        phone: '+7 (916) 111-11-11',
        company: 'D',
    },
    {
        id: 4,
        name: 'Kostya',
        phone: '+7 (916) 111-11-11',
        company: 'E',
    },
];

class ContactsPage extends Component {
    state = { contacts: [], contactsStorage: [] };

    componentWillMount() {
        if (!localStorage['init_contacts']) {
            localStorage['contacts'] = JSON.stringify(contacts);
        }
        localStorage['init_contacts'] = 'true';
        this.syncContactsWithStorage();
    }

    syncContactsWithStorage = () => {
        let contactsStorage = JSON.parse(localStorage['contacts']);
        this.setState({
            contacts: contactsStorage,
            contactsStorage: contactsStorage,
        });
    };

    filterContacts = (isValue, newContacts) => {
        if (!isValue) {
            this.setState({ contacts: this.state.contactsStorage });
            return;
        }
        this.setState({ contacts: newContacts });
    };

    render() {
        return (
            <Container>
                <header className="contacts-header">
                    <NewContactButton
                        syncContactsWithStorage={this.syncContactsWithStorage}
                    />
                    <ContactsSearch
                        contacts={this.state.contactsStorage}
                        filterContacts={this.filterContacts}
                    />
                </header>
                <ContactsTable
                    contacts={this.state.contacts}
                    syncContactsWithStorage={this.syncContactsWithStorage}
                />
            </Container>
        );
    }
}

export default ContactsPage;
