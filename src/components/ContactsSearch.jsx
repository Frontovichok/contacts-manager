import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export default class ContactsSearch extends Component {
    state = { value: '' };

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => this.setState({ value: '' });

    handleSearchChange = (e, { value }) => {
        this.setState({ value: value });
        setTimeout(() => {
            if (this.state.value.length < 1) {
                this.props.filterContacts(false);
                return this.resetComponent();
            }
            this.props.filterContacts(
                true,
                this.props.contacts.filter((contact, i) => {
                    return (
                        contact.name
                            .toUpperCase()
                            .indexOf(value.toUpperCase()) !== -1
                    );
                })
            );
        }, 100);
    };

    render() {
        const { value } = this.state;

        return (
            <Input
                className="search__wrap"
                action={{ icon: 'search' }}
                placeholder="Name..."
                onChange={this.handleSearchChange}
                value={value}
            />
        );
    }
}
