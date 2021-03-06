export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(request)
      .then((res) => {
        response = res;
        return res.json();
      })
      .then((body) => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const get = async <T>(
  path: string,
  args: RequestInit = {
    method: 'get',
    credentials: 'include',
  },
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  },
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pushArrayWithDelay = async (target: any[], data: any[], pushDelay: number) => {
  for (const d of data) {
    target.push(d);
    await sleep(pushDelay);
  }
};
