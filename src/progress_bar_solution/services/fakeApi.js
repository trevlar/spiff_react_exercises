import { REQUEST_TIME } from '../constants';

export function fetchMockRequest() {
    let requestPromise = fetchMock();
    return {
        status: wrapPromise(requestPromise)
    };
}

function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

function fetchMock() {
    console.log('fetch data...')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(200)
        }, REQUEST_TIME)
    })
}
