import React from "react";
import { Button, ListGroup, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import TimeSeriesBalance from "../models/TimeSeriesBalance";
import RecordApi from "../api/recordApi";
import './recordComponent.css';
import { ChartComponent } from "./chartComponent";
import moment from "moment";

type RecordComponentProps = {

}

type RecordComponentState = {
  initialAmount: string;
  records: TimeSeriesBalance[];
  file: File | null;
}

class RecordComponent extends React.Component<RecordComponentProps, RecordComponentState> {
  state: RecordComponentState;
  recordApi: RecordApi;

  constructor(props: RecordComponentProps) {
    super(props);
    this.state = { initialAmount: '1127098', records: [], file: null };
    this.recordApi = new RecordApi();
    this.updateTimeSeries();
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
              <Form.Control type="number" value={this.state.initialAmount} onChange={this.onInitialAmountChange} />
            </Col>
            <Col md={2} className="form-line">
              <Button variant="outline-success" onClick={this.onCurrencyAndInitialUpdate}>Update</Button>
            </Col>

          </Form.Row>
        </Form>
        <Form className="file-upload">
          <Form.Row>
            <Col md={12}>
              <div>
                <Form.Label>Record File Upload</Form.Label>
              </div>
              <div className="input-box">
                <Form.Control type="file" onChange={this.onFileChange}/>
              </div>
              <Button variant="outline-success" onClick={this.onFileUpload}>Upload</Button>
            </Col>
          </Form.Row>
        </Form>
        <Row className="mt-5">
          <Col>
            <div>
            <label>Time series balance (chart)</label>
              <ChartComponent records={this.filterTimeSeries()} />
            </div>
            <label className="mt-5">Time series balance (table)</label>
            <div className="table-area">
              <ListGroup>
                {this.state.records && this.state.records.concat().reverse().map((record, i) => {
                  return (
                    <ListGroup.Item key={"t-i-" + i.toString()}>
                      <span className="date">{record.date}</span>
                      <span className="balance">{record.balance.toFixed(0)}</span>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  updateTimeSeries() {
    this.recordApi.getTimeSeriesBalanceAll('YEN', parseFloat(this.state.initialAmount)).then((data) => {
      this.setState( {records: data.data});
    }).catch(e => {
      console.log('recordApi.getTimeSeriesBalanceAll error ' + e)
    });
  }

  onInitialAmountChange = (event: any) => {
    this.setState({ initialAmount: event.target.value });
  }

  onCurrencyAndInitialUpdate = (event: any) => {
    this.updateTimeSeries();
  }

  onFileChange = (event: any) => {
    this.setState({ file: event.target.files[0] });
  }

  onFileUpload = (event: any) => {
    if (!this.state.file) {
      return;
    }
    console.log(this.state.file.name);
    if (this.state.file.name.endsWith('.csv')) {
      this.recordApi.postRecordsFromCsv('ZAIM', this.state.file).then(
        res => {
          console.log(res.data);
        }, 
        error => {
          console.log(error);
        }
      );
    } else if (this.state.file.name.endsWith('.xlsx')) {
      this.recordApi.postRecordsFromXlsx(this.state.file).then(
        res => {
          console.log(res.data);
        }, 
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('unsupported file type');
      return;
    }
  }

  filterTimeSeries() {
    const threeMonthsAgo = moment().subtract(12, 'months');
    return this.state.records.filter(({date}) => moment(date).isAfter(threeMonthsAgo))
      .map(record => { return { t: record.date, y: record.balance }})
  }
}

export default RecordComponent