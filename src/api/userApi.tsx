import axios, { AxiosResponse } from 'axios';
import User from '../models/User';

const baseUrl = process.env.REACT_APP_GAICHE_BE_BASEURL;

export default class UserApi {
  public getUser(userId: string): Promise<AxiosResponse<User>> {
    return axios.get<User>(`${baseUrl}/users/${userId}`);
  }
}
