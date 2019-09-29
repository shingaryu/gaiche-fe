import React from "react";
import { Button, ListGroup, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import TimeSeriesBalance from "../models/TimeSeriesBalance";
import RecordApi from "../api/recordApi";
import './recordComponent.css';

type RecordComponentProps = {

}

type RecordComponentState = {
  records: TimeSeriesBalance[];
}

class RecordComponent extends React.Component<RecordComponentProps, RecordComponentState> {
  state: RecordComponentState;
  recordApi: RecordApi;

  constructor(props: RecordComponentProps) {
    super(props);
    this.state = { records: []};
    this.recordApi = new RecordApi();
    this.recordApi.getTimeSeriesBalanceAll('YEN', 0).then((data) => {
      this.setState( {records: data.data});
    }).catch(e => {
      console.log('recordApi.getTimeSeriesBalanceAll error ' + e)
    });
  }

  render() {
    return (
      <Container fluid>
        <h1>Records</h1>
        <Form className="api-form">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Base currency</Form.Label>
              <Form.Control inline as="select">
              <option>YEN</option>
              <option>EUR</option>
              <option>USD</option>
              </Form.Control>
            </Col>
            <Col md={2}>
              <Form.Label>Initial amount</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Col>
            <Col md={2} className="form-line">
              <Button variant="outline-success">Update</Button>
            </Col>

          </Form.Row>
        </Form>
        <Row>
          <Col>
            <label>Time series balance</label>
            <ListGroup>
              {this.state.records && this.state.records.map(record => {
                return (
                  <ListGroup.Item>
                    <span className="date">{record.date}</span>
                    <span className="balance">{record.balance}</span>
                  </ListGroup.Item> 
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RecordComponent