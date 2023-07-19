class Http {
    constructor(uri) {
      this.uri = uri;
      this.xhr = new XMLHttpRequest();
    }
    static serialize(obj) {
      let qs = [];
      for (let prop in obj) {
        qs = [...qs, `${encodeURIComponent(prop)}=${encodeURIComponent(obj[prop])}`];
      }
      return qs.join('&');
    }
    get(path = '', qs) {
      return new Promise((resolve, reject) => {
        this.xhr.open('GET', `${this.uri}${path}/?${Http.serialize(qs)}`, true);
        this.xhr.addEventListener('load', function () {
          resolve({ status: this.statusText, response: this.response });
        });
        this.xhr.addEventListener('error', (error) => reject(error));
        this.xhr.send();
      });
    }
    post(path = '', data) {
      return new Promise((resolve, reject) => {
        this.xhr.addEventListener('load', function () {
          resolve({ status: this.statusText, response: this.response });
        });
        this.xhr.addEventListener('error', (error) => reject(error));
        this.xhr.open('POST', `${this.uri}${path}`, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.send(data);
      });
    }
    delete(path = '', id) {
      return new Promise((resolve, reject) => {
        this.xhr.addEventListener('load', function () {
          resolve({ status: this.statusText });
        });
        this.xhr.addEventListener('error', (error) => reject(error));
        this.xhr.open('DELETE', `${this.uri}${path}/${id}`, true);
        this.xhr.send();
      });
    }
    upload(path = '', file, onProgress) {
      return new Promise((resolve, reject) => {
        if (!file) return reject();
  
        let xhr = new XMLHttpRequest();
        let formContents = new FormData();
        formContents.append('file', file);
  
        xhr.upload.addEventListener('progress', onProgress);
        xhr.upload.addEventListener('load', function () {
          resolve();
        });
        xhr.upload.addEventListener('error', function () {
          reject();
        });
        xhr.open('POST', `${this.uri}${path}`, true);
        xhr.send(formContents);
      });
    }
  }
  
  export default Http;
  