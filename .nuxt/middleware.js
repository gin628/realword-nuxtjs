const middleware = {}

middleware['hasLogined'] = require('../middleware/hasLogined.js')
middleware['hasLogined'] = middleware['hasLogined'].default || middleware['hasLogined']

middleware['isAuth'] = require('../middleware/isAuth.js')
middleware['isAuth'] = middleware['isAuth'].default || middleware['isAuth']

export default middleware
