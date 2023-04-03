import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"

const SignIn = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
export default SignIn