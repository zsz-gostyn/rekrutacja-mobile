export default class PostsDownloader {
  constructor() {
    this.posts = [];
    this.offset = this.total = this.loads = 0;
    this.loading = false;
  }

  loadMore(amount = 5) {
    return new Promise((resolve, reject) => {
      this.loading = true;
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
      }

      fetch(`http://192.168.100.15/posts?limit=${amount}&offset=${this.offset}`, config)
        .then((response) => response.json())
        .then((response) => {
          this.posts = this.posts.concat(response.data);
          this.offset += response.data.length;
          this.total = response.count;
          this.loading = false;

          resolve();
        })
        .catch((error) => {
          this.loading = false;
          reject(error);
        });
    });
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
  
  isLoading() {
    return this.loading;
  }

  gainedAll() {
    if (this.loads === 0) {
      return false;
    }

    return this.offset >= this.total;
  }
}
