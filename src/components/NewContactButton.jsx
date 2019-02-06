import React from 'react';

import { Button, Icon } from 'semantic-ui-react';

import ContactSettingsModal from './ContactSettingsModal';

export default class NewContactButton extends React.Component {
    state = { openModal: false };
    handleClick = () => {
        this.setState({ openModal: true });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.openModal) {
            this.setState({ openModal: false });
        }
    }
    render() {
        return (
            <React.Fragment>
                <Button basic color="green" onClick={this.handleClick}>
                    <Icon name="plus" />
                    New contact
                </Button>
                {this.state.openModal === true ? (
                    <ContactSettingsModal
                        syncContactsWithStorage={
                            this.props.syncContactsWithStorage
                        }
                    />
                ) : null}
            </React.Fragment>
        );
    }
}
