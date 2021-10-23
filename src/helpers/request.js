const isValidHttpMethod = (method) => {
    return ['GET', 'POST', 'PUT', 'DELETE'].includes(method);
};

export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({ data }))
        .catch(err => ({ err }));
}
