import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

import ContactSettingsModal from './ContactSettingsModal';

export default class ContactsTable extends React.Component {
    state = {
        openModal: false,
        editableContactId: '',
        editableContactName: '',
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.openModal) {
            this.setState({ openModal: false });
        }
    }

    handleClickEdit = (e, name, id) => {
        this.setState({
            openModal: true,
            editableContactId: id,
            editableContactName: name,
        });
    };
    handleClickRemove = (e, id) => {
        let contacts = JSON.parse(localStorage['contacts']);
        let removeContactIndex = contacts.findIndex(
            contact => contact.id === id
        );

        contacts.splice(removeContactIndex, 1);
        localStorage['contacts'] = JSON.stringify(contacts);
        this.props.syncContactsWithStorage();
        this.setState({
            openModal: false,
            editableContactId: '',
            editableContactName: '',
        });
    };

    render() {
        return (
            <Table singleLine className="contacts-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={10}>Name</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Company</Table.HeaderCell>
                        <Table.HeaderCell>...</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.contacts.map((contact, i) => (
                        <Table.Row className="contacts-table__row" key={i}>
                            <Table.Cell>{contact.name}</Table.Cell>
                            <Table.Cell>{contact.phone}</Table.Cell>
                            <Table.Cell>{contact.company}</Table.Cell>
                            <Table.Cell>
                                <Icon
                                    className="contacts-table__button"
                                    name="edit"
                                    onClick={e => {
                                        this.handleClickEdit(
                                            e,
                                            contact.name,
                                            contact.id
                                        );
                                    }}
                                />
                                <Icon
                                    className="contacts-table__button"
                                    name="remove"
                                    onClick={e => {
                                        this.handleClickRemove(e, contact.id);
                                    }}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                {this.state.openModal === true ? (
                    <ContactSettingsModal
                        contact={{
                            name: this.state.editableContactName,
                            id: this.state.editableContactId,
                        }}
                        syncContactsWithStorage={
                            this.props.syncContactsWithStorage
                        }
                    />
                ) : null}
            </Table>
        );
    }
}
