import React from "react";
import { Button, ListGroup, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import TimeSeriesBalance from "../models/TimeSeriesBalance";
import RecordApi from "../api/recordApi";
import './recordComponent.css';
import {Line} from 'react-chartjs-2';
import { useAuth0 } from "../services/react-auth0-spa";
import User from "../models/User";

type RecordComponentProps = {
  user: User
}

type RecordComponentState = {
  user: any;
  initialAmount: string;
  records: TimeSeriesBalance[];
  file: File | null;
}

class RecordComponent extends React.Component<RecordComponentProps, RecordComponentState> {
  state: RecordComponentState;
  recordApi: RecordApi;
  chartData: any;
  chartOptions: any;

  constructor(props: RecordComponentProps) {
    super(props);
    // const { user } = useAuth0();
    const user = null;
    this.state = { user: user, initialAmount: '1127098', records: [], file: null };
    console.log(user);
    this.recordApi = new RecordApi();
    this.updateTimeSeries();
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
              <Line data={this.chartData} options={this.chartOptions}/>
            </div>
            <label className="mt-5">Time series balance (table)</label>
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
}

export default RecordComponent