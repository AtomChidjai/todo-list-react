export function sendResponse(req, res) {
    res.send('from controllers');
}

export function updateResponse (req, res) {
    res.send('This is an update');
} 

export function deleteResponse (req, res) {
    res.send('This is a delete');
}

export function postResponse(req, res) {
    if (req.body.task) {
        res.send(`This is a post req with a title: ${req.body.task}`);
    } else {
        res.send('No task posted.');
    }
}
