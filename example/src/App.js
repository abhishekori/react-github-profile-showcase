import React from 'react'

import { ReactGithubProfileShowcase } from 'react-github-profile-showcase'
import 'react-github-profile-showcase/dist/index.css'

const App = () => {
  return <div className='d-flex justify-content-center'>
    <ReactGithubProfileShowcase userName='fabpot' theme='dark' />
    </div>
}

export default App
