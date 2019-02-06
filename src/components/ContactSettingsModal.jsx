import React from 'react';

import { Button, Modal, Icon, Form } from 'semantic-ui-react';

export default class ContactSettingsModal extends React.Component {
    state = { open: true, name: '', phone: '', company: '' };

    show = () => this.setState(() => ({ open: true }));
    close = () => this.setState({ open: false });

    handleClickCancel = () => {
        this.close();
    };

    handleClickSave = e => {
        let contactsStorage = JSON.parse(localStorage['contacts']);

        if (this.state.name === '') {
            this.setState({ nameError: true });
            return;
        } else if (this.state.phone === '') {
            this.setState({ nameError: false });
            this.setState({ phoneError: true });
            return;
        } else {
            this.setState({ phoneError: false });
        }

        if (this.props.contact) {
            localStorage['contacts'] = JSON.stringify(
                contactsStorage.map(contact => {
                    if (contact.id === this.props.contact.id) {
                        contact.name = this.state.name;
                        contact.phone = this.state.phone;
                        contact.company = this.state.company;
                    }
                    return contact;
                })
            );
        } else {
            let lastContactId = contactsStorage[contactsStorage.length - 1].id;
            localStorage['contacts'] = JSON.stringify([
                ...contactsStorage,
                {
                    id: lastContactId + 1,
                    name: this.state.name,
                    phone: this.state.phone,
                    company: this.state.company,
                },
            ]);
        }
        this.props.syncContactsWithStorage();
        this.close();
    };

    fillFieldsFromStorageData = id => {
        let contactsStorage = JSON.parse(localStorage['contacts']);
        let contact = contactsStorage.find(contact => contact.id === id);
        this.setState({
            name: contact.name,
            phone: contact.phone,
            company: contact.company,
        });
    };

    componentDidMount() {
        if (this.props.contact) {
            this.fillFieldsFromStorageData(this.props.contact.id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.open === false) {
            this.show();
            if (this.props.contact) {
                this.fillFieldsFromStorageData(this.props.contact.id);
            }
        }
    }

    render() {
        const { open } = this.state;

        return (
            <React.Fragment>
                <Modal open={open} onClose={this.close}>
                    <Modal.Header>
                        {this.props.contact
                            ? this.props.contact.name
                            : 'New contact'}
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    id="contact-settings-form-input-name"
                                    label="Name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={(e, { value }) =>
                                        this.setState({ name: value })
                                    }
                                    error={this.state.nameError}
                                />
                                <Form.Input
                                    fluid
                                    id="contact-settings-form-input-phone"
                                    label="Phone number"
                                    placeholder="Phone"
                                    value={this.state.phone}
                                    onChange={(e, { value }) =>
                                        this.setState({ phone: value })
                                    }
                                    error={this.state.phoneError}
                                />
                                <Form.Input
                                    fluid
                                    id="contact-settings-form-input-company"
                                    label="Company"
                                    placeholder="Company"
                                    value={this.state.company}
                                    onChange={(e, { value }) =>
                                        this.setState({ company: value })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={this.handleClickCancel}>
                            <Icon name="cancel" />
                            Cancel
                        </Button>
                        <Button color="green" onClick={this.handleClickSave}>
                            <Icon name="save" />
                            Save
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}
