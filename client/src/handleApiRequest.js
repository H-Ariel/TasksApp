async function handleApiRequest(taskId, method, func,  body = null) {
    let obj = { method };
    if (body) {
        obj.headers = { 'Content-Type': 'application/json' };
        obj.body = JSON.stringify(body);
    }

    return fetch(taskId == null ? '/api/tasks' : `/api/tasks/${taskId}`, obj)
        .then((response) => {
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                return response.json().then((data) => func(data));
            } else {
                return func();
            }
        })
        .catch((error) => console.error('Error:', error));
}

export default handleApiRequest;
