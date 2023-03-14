import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import Notification from './Tabs/Notification';
import PhotoUploader from './Tabs/PhotoUploader';
import TextEditor from './Tabs/TextEditor';
import Calculator from './Tabs/Calculator';
import './Tabs.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);




function Tabs() {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <Container>
      <Tab.Container activeKey={selectedTab} onSelect={key => setSelectedTab(Number(key))}>
        <Nav variant="tabs" className="tabs-nav tabs">
          <Nav.Item>
            <Nav.Link eventKey="1" className="tabs-link">
              <div className='tabs-icon'>
              <FontAwesomeIcon icon="bell" />
              </div>
              <span className="tabs-label">Notification</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" className="tabs-link">
            <div className='tabs-icon'>
            <FontAwesomeIcon icon="camera" />
            </div>
              <span className="tabs-label">Gallery</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" className="tabs-link">
            <div className='tabs-icon'>
            <FontAwesomeIcon icon="pencil" /> 
            </div>
              <span className="tabs-label">Text</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="4" className="tabs-link">
            <div className='tabs-icon'>
            <FontAwesomeIcon icon="calculator" />
            </div>
              <span className="tabs-label">Calculator</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="tabs-content tabs-container">
          <Tab.Pane eventKey="1" className="tabs-pane">
            <Notification />
          </Tab.Pane>
          <Tab.Pane eventKey="2" className="tabs-pane">
            <PhotoUploader />
          </Tab.Pane>
          {/* <Tab.Pane eventKey="3" className="tabs-pane">
            <TextEditor />
          </Tab.Pane> */}
          <Tab.Pane eventKey="4" className="tabs-pane">
            <Calculator />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default Tabs;