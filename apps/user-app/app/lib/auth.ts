import db from '@repo/db/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: {
          label: 'Phone number',
          type: 'text',
          placeholder: '1231231231',
          required: true
        },
        password: { label: 'Password', type: 'password', required: true }
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        // Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone
          }
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number
            };
          }
          return null;
        }

        try {
          console.log('Creating user1', credentials, hashedPassword);
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword
            }
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      }
    })
  ],
  secret: process.env.JWT_SECRET || 'secret',
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: { token: JWT; session: Session }) {
      if (session.user) {
        session.user.image = token.sub;
      }
      return session;
    }
  }
};
