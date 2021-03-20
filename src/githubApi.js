class GithubApi {

    getUser(username = '') {

        return fetch(`https://api.github.com/users/${username}`).then(res => res.json())
    }

    getFollowers(username = '') {

        return fetch(`https://api.github.com/users/${username}/followers`).then(res => res.json())
    }

    getFollowing(username = '') {

        return fetch(`https://api.github.com/users/${username}/following`).then(res => res.json())
    }
    getOrgs(username = '') {

        return fetch(`https://api.github.com/users/${username}/orgs`).then(res => res.json())
    }

}

export default new GithubApi();