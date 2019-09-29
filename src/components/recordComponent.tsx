import React from "react";
import { Button } from 'react-bootstrap';
import TimeSeriesBalance from "../models/TimeSeriesBalance";
import RecordApi from "../api/recordApi";

type RecordComponentProps = {
  // recordApi: RecordApi
}

type RecordComponentState = {
  records: TimeSeriesBalance[];
}

class RecordComponent extends React.Component<RecordComponentProps, RecordComponentState> {
  constructor(props: RecordComponentProps) {
    super(props);
    this.state = { records: []};
    const recordApi = new RecordApi();
    recordApi.getTimeSeriesBalanceAll('YEN', 0).then((data) => {
      this.setState( {records: data.data});
    }).catch(e => console.log('recordApi.getTimeSeriesBalanceAll error ' + e));
  }

  render() {
    return (
      <div>
        hello from RecordComponent!
        <Button>Save</Button>
        {this.state.records && this.state.records.map(record => {
          return (
            <div>
              date: {record.date}, balance: {record.balance}
            </div> 
          )
        })};
      </div>
    );
  }
}

export default RecordComponent