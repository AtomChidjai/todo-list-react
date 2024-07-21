export function validateUser (req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    next();
}

export function validateId (req, res, next) {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    next();
}