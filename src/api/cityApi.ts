import { City, ListResponse } from 'models';
import axiosClient from "./axiosClient"

const CityApi = {
    getAll():Promise<ListResponse<City>> {
        const url='/cities'
        return axiosClient.get(url,{params : {_page:1}})
    }
}
export default CityApi