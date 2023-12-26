import { BaseService } from ".";


type createPaylaod = {
  title: string
  year: string
  imgUrl: string
}


export class AuthService extends BaseService {

  public async getMovieList(): Promise<any> {
    try {
      const  {data}  = await this.httpClient.get("/movies");
      return data;
    } catch (error: any) {
      return error
    }
  }

  public async getMovieListPagination(type:string, id:number): Promise<any> {
    try {
      const  {data}  = await this.httpClient.get(`/movies?${type}=${id}`);
      return data;
    } catch (error: any) {
      return error
    }
  }

  public async createMovie(payload: createPaylaod): Promise<any> {
    try {
      const data = await this.httpClient.post(`/movies/add`, payload);
      return data;
    } catch (error: any) {
      return error.response.data
    }
  }

  public async updateMovie(movieId: any, payload: createPaylaod): Promise<any> {
    try {
      const data = await this.httpClient.post(`/movies/edit/${movieId}`, payload);
      return data;
    } catch (error: any) {
      return error.response.data
    }
  }

  public async fileUpload(payload: any): Promise<any> {
    try {
      const { data } = await this.httpClient.post(`/file/upload`, payload);
      return data;
    } catch (error: any) {
      return error.response.data
    }
  }
  public async getMovieById(movieId: any): Promise<any> {
    try {
      const { data } = await this.httpClient.get(`/movies/${movieId}`);
      return data;
    } catch (error: any) {
      return error.response.data
    }
  }

}
