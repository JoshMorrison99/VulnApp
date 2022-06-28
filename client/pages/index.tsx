import type { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>Wordle</title>
    </Head>
    <NavBar/>
    </>
  )
}

export default Home
