const sessionIdToUser = new Map();

function setUser(id, user) {
    sessionIdToUser.set(id, user);
}
function getUser(id) {
    return sessionIdToUser.get(id);
}

async function restrictToLoginUsers(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect('/user/login');
    const user = getUser(userUid);

    if (!user) return res.redirect('/user/login');
    req.user = user;
    next();
}

module.exports = { setUser, getUser, restrictToLoginUsers };