import React from "react";
import { Button, ListGroup, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import TimeSeriesBalance from "../models/TimeSeriesBalance";
import RecordApi from "../api/recordApi";
import './recordComponent.css';
import {Line} from 'react-chartjs-2';

type RecordComponentProps = {

}

type RecordComponentState = {
  records: TimeSeriesBalance[];
}

class RecordComponent extends React.Component<RecordComponentProps, RecordComponentState> {
  state: RecordComponentState;
  recordApi: RecordApi;
  chartData: any;
  chartOptions: any;

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
    this.chartData = {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'balance',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.records.map(record => { return { t: record.date, y: record.balance }})
        }
      ]
    };
  
    this.chartOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            min: this.state.records.length > 0 && this.state.records[0].date,
            unit: 'day'
        }
        }]
      }
    }  

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
            <div>
            <label>Time series balance (chart)</label>
              <Line data={this.chartData} options={this.chartOptions}/>
            </div>
            <label>Time series balance (table)</label>
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