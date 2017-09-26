exports.getToken = function(agent, identityUrl, username, password, projectId) {
    var headers = {
        'content-type': 'application/json'
    };
    var content = {
        "auth": {
            "identity": {
                "methods": [
                    "password"
                ],
                "password": {
                    "user": {
                        "name": username,
                        "domain": {
                            "name": "Default"
                        },
                        "password": password
                    }
                }
            },
            "scope": {
                "project": {
                    "id": projectId
                }
            }
        }
    };
    var url = identityUrl + '/auth/tokens';
    content = JSON.stringify(content);
    var response = agent.post(url, {
        headers: headers,
        content: content
    });
    var token = response.headers['x-subject-token'];
    return token;
};