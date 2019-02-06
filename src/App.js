import React, { Component } from 'react'

import ContactsPage from './components/ContactsPage'

import 'semantic-ui-css/semantic.min.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <ContactsPage />
            </div>
        )
    }
}

export default App
