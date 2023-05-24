/* eslint-disable no-unused-vars */
import type { Session, User } from 'next-auth'

type UserId = string

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
    }
  }
}

declare module 'next-auth' {
  interface Profile {
    picture : string
  }
}
