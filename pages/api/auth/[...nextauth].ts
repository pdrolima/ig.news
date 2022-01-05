import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna';

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
      async signIn(user, account, profile) {
         const { email } = user.profile
        try {
            await fauna.query(
                q.If(
                  q.Not(
                    q.Exists(
                      q.Match(
                        q.Index('user_by_email'),
                        q.Casefold(email)
                      )
                    )
                  ),
                  q.Create(
                    q.Collection('users'),
                    { data: { email } }
                  ),
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(email)
                    )
                  )
                )
              )
            return true;
          } catch {
            return false;
          }
      }
    },
})
