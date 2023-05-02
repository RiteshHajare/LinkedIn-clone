import initDB from '@/helpers/InitDB'
import nextConnect from 'next-connect'
import passport from '../lib/passport'
import session from '../lib/session'

const auth = nextConnect()
  .use(
    session({
      name: 'myCookie',
      secret: process.env.TOKEN_SECRET,
      cookie: {
        maxAge: 60 * 60 * 24 * 3, // 3 days,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )
  .use((req, res, next) => {
    // Initialize mocked database
    // Remove this after you add your own database
    initDB();
    next()
  })
  .use(passport.initialize())
  .use(passport.session())

export default auth
