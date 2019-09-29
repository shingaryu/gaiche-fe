import axios, { AxiosResponse } from 'axios';
import TimeSeriesBalance from '../models/TimeSeriesBalance';

const baseUrl = process.env.REACT_APP_GAICHE_BE_BASEURL;

export default class RecordApi {
  public getTimeSeriesBalance(currency: string, initialAmount: number): Promise<AxiosResponse<TimeSeriesBalance[]>> {
    console.log(baseUrl);
    return axios.get<TimeSeriesBalance[]>(`${baseUrl}/records/analysis/time-series-balance`, {
      params: { currency, initialAmount }
    })
  }

  public getTimeSeriesBalanceAll(baseCurrency: string, initialAmount: number): Promise<AxiosResponse<TimeSeriesBalance[]>> {
    console.log(baseUrl);
    return axios.get<TimeSeriesBalance[]>(`${baseUrl}/records/analysis/time-series-balance-all`, {
      params: { baseCurrency, initialAmount }
    })
  }
}
