import { API_URL } from 'app/config/AppConfig';

export default class PostsDownloader {
  constructor() {
    this.posts = [];
    this.offset = this.total = this.loads = 0;
  }

  async loadMore(amount = 5) {
    this.loads += 1;

    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');

    const config = {
      method: 'GET',
      headers
    };

    try {
      let response = await fetch(`${API_URL}/posts?limit=${amount}&offset=${this.offset}`, config);
      response = await response.json();

      this.posts = this.posts.concat(response.data);
      this.offset += response.data.length;
      this.total = response.count;
    } catch (error) {
      console.error('Błąd w loadMore()', error);
    }
  }

  getAllLoaded() {
    return this.posts;
  }

  getTotalAmount() {
    return this.total;
  }

  getTimesOfLoad() {
    return this.loads;
  }

  gainedAll() {
    if (this.loads === 0) {
      return false;
    }

    return this.offset >= this.total;
  }
}
