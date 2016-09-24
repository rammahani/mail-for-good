import React from 'react';
import { connect } from 'react-redux';

import UploadFileModal from '../components/ImportSubscribers/UploadFileModal';
import SubscribersTable from '../components/ImportSubscribers/SubscribersTable';

import parseSubscriberList from '../utils/subscriberListParsers/parseSubscriberList';
import { addSubscribers } from '../actions/subscribersActions';


@connect(null, { addSubscribers })
export default class ImportSubscribers extends React.Component {
  constructor() {
    super();
    
    this.state = {
      fields: null,
      subscribers: null
    };
  }
  
  handleNewFile(text) {
    const data = parseSubscriberList(text);
    
    this.setState({
      subscribers: data.subscribers,
      fields: data.fields
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newSubscribers = {
      subscribers: this.state.subscribers,
      fields: this.state.fields
    };
    
    this.props.addSubscribers(newSubscribers);
  }

  deleteSubscriber(subscriberId) {
    // Deletes the subscriber at subscriberId then
    // updates state accordingly
    let newSubscribers = this.state.subscribers;

    newSubscribers.splice(subscriberId, 1);

    this.setState({
      subscribers: newSubscribers
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <UploadFileModal handleNewFile={this.handleNewFile.bind(this)} />
        
        <SubscribersTable 
          fields={this.state.fields} 
          subscribers={this.state.subscribers}
          deleteSubscriber={this.deleteSubscriber.bind(this)}
        />
        
        <button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button>
      </div>
    );
  }
}
