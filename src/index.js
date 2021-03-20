import React, { useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import GithubApi from './githubApi'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'
import _ from 'lodash';

export const ReactGithubProfileShowcase = props => {

  const [githubProfileObj, setGithubProfileObj] = useState({});
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [orgs, setOrgs] = useState([])
  const infoTextCss = {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
  useEffect(() => {
    GithubApi.getUser(props.userName)
    .then(res => {
      console.log(res)
      setGithubProfileObj(res)
    })

    GithubApi.getOrgs(props.userName)
    .then(res => {
      console.log(res)
      setOrgs(res)
    })
  },[])

  const onShowFollowersCick = () => {
    GithubApi.getFollowers(props.userName)
    .then(res => {
      setFollowers(res)
    })

  }

  const onShowFollowingCick = () => {
    GithubApi.getFollowing(props.userName)
    .then(res => {
      console.log(res)
      setFollowing(res)
    })

  }
  const theme = _.get(props, 'theme', 'light');
  const cardThemeCss = _.isEqual(theme, 'dark')? 'bg-dark text-white' : ''
  const pillThemeCss = _.isEqual(theme, 'dark')? 'light' : 'dark'
  return <div className='d-flex flex-wrap'><Card className={cardThemeCss}>
  <Card.Img fluid roundedCircle variant="top" src={_.get(githubProfileObj, 'avatar_url', '')} />
  <Card.Body>
<Card.Title>{_.get(githubProfileObj, 'name')}</Card.Title>
    <Card.Text>
      {_.get(githubProfileObj, 'bio', '')}
      <div className='d-flex flex-column flex-wrap'>
{_.get(githubProfileObj, 'blog') ? <div style={infoTextCss}><b>blog:</b> <a style={{color: '#58a6ff'}} rel="noopener noreferrer" target='_blank' href={_.get(githubProfileObj, 'blog')}>{_.get(githubProfileObj, 'blog')}</a></div> : null}

{_.get(githubProfileObj, 'company') ? <div style={infoTextCss}><b>company:</b> {_.get(githubProfileObj, 'company')}</div> : null}

{_.get(githubProfileObj, 'twitter_username') ? <div style={infoTextCss}><b>twitter:</b> <a  style={{color: '#58a6ff'}} rel="noopener noreferrer" target='_blank' href={`https://twitter.com/${_.get(githubProfileObj, 'twitter_username')}`}>{_.get(githubProfileObj, 'twitter_username')}</a></div> : null}

{_.get(githubProfileObj, 'email') ? <div style={infoTextCss}><b>email:</b> <a href={`mailto:${_.get(githubProfileObj, 'email')}`}>{_.get(githubProfileObj, 'email')}</a></div> : null}

{_.get(githubProfileObj, 'location') ? <div style={infoTextCss}><b>location:</b> <a style={{color: '#58a6ff'}} rel="noopener noreferrer" target='_blank' href={`https://www.google.com/maps/place/${_.get(githubProfileObj, 'location')}`}>{_.get(githubProfileObj, 'location')}</a></div> : null}

<br />
<div className='d-flex justify-content-around flex-wrap'>

<a className='pr-2' rel="noopener noreferrer" target='_blank' href={`https://github.com/${props.userName}?tab=followers`}><Badge variant={pillThemeCss}>Followers {_.get(githubProfileObj, 'followers') }</Badge>
</a>

<a className='pr-2' rel="noopener noreferrer" target='_blank' href={`https://github.com/${props.userName}?tab=following`}><Badge variant={pillThemeCss}>Following {_.get(githubProfileObj, 'following') }</Badge>
</a>
<a className='pr-2' rel="noopener noreferrer" target='_blank' href={`https://github.com/${props.userName}?tab=repositories`}><Badge variant={pillThemeCss}>Public Repos {_.get(githubProfileObj, 'public_repos') }</Badge>
</a>
<a className='pr-2' rel="noopener noreferrer" target='_blank' href={`https://gist.github.com/${props.userName}`}><Badge variant={pillThemeCss}>Public Gists {_.get(githubProfileObj, 'public_gists') }</Badge>
</a>
</div>
<br/>
<div className='d-flex flex-wrap'>
{orgs.map((org) => {
  return <a rel="noopener noreferrer" target='_blank' href={`https://github.com/${_.get(org, 'login')}`} title={`${_.get(org, 'login')}`}><Image className='pr-1' style={{width: '50px'}} src={_.get(org, 'avatar_url')} fluid roundedCircle /></a>
})}
</div>
<br />


<a rel="noopener noreferrer" target='_blank' className='btn btn-primary' href={_.get(githubProfileObj, 'html_url')}>Visit profle</a>
      </div>
    </Card.Text>
  </Card.Body>
</Card></div>
}