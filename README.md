# Pieces
A curated collection of minimal javascript packages.
## mermaid-render

This package renders [mermaid](https://www.npmjs.com/package/mermaid) diagrams outside of the browser using [puppeteer](https://www.npmjs.com/package/puppeteer). It's a stripped out and improved version of `mermaid-cli`. The typescript types are the best documentation of the API.

```javascript
import { renderMermaid } from 'mermaid-render';
const svg = await renderMermaid(
`pie title NETFLIX
        "Time spent looking for movie" : 90
        "Time spent watching it" : 10` 
);
console.log(svg);
```react-storage-hook
==================

Javascript library for synchronously managing localStorage / sessionStorage. Typescript types included.

Installation
------------
```bash
yarn add react-storage-hook
```

Usage
-----

See also [live example](https://zemnmez.github.io/react-storage-hook) with sourcemaps and the [local copy](./example).

```typescript
import { useStorage } from 'react-storage-hook';

const SavedCheckbox = () => {
  const [checked, setChecked] = useStorage('saved-checkbox-checked', {
    placeholder: false,
    // storageArea: sessionStorage // to use session storage instead
  })

  const onChange = e => setChecked(e.target.checked);

  return <input {...{
    checked,
    onChange,
    type: "checkbox"
  }}>
}
```

The checked state will be stored and synchronized between instances of the page.

The typescript types are authoratative for API scheme. 
## remark-mermaid

[![NPM](https://img.shields.io/npm/v/remark-mermaid.svg)](https://npmjs.org/packages/remark-mermaid/)
[![Travis CI](https://img.shields.io/travis/temando/remark-mermaid.svg)](https://travis-ci.org/temando/remark-mermaid)
[![MIT License](https://img.shields.io/github/license/temando/remark-mermaid.svg)](https://en.wikipedia.org/wiki/MIT_License)

Replaces fenced code blocks in mermaid format with:

- Links to rendered SVG files of the graph (default mode).
- Mermaid-formatted code wrapped in div tags for rendering by mermaidjs (simple mode).

You might also like [`remark-graphviz`](https://www.npmjs.com/package/remark-graphviz).

### Installation

```sh
$ npm install remark-mermaid mermaid.cli
```

### Usage

Graphs defined using `mermaid` can be referenced using a `mermaid:` title which
will generate an SVG image.

```md
[Link to a Graph](test/fixtures/assets/example.mmd "mermaid:")
![Embed image of graph](test/fixtures/assets/example.mdd "mermaid:")
```

Alternatively, graphs can be generated inline, by using `mermaid` as the
language identifier for a fenced code block.

<pre>
```mermaid
graph LR
    Start --> Stop
```
</pre>

See this project's [fixtures](test/fixtures) for more examples.

#### Options

- `simple`: when set to `true`, plugin will wrap mermaid graphs in an `<div class="mermaid">` element instead of generating an SVG. Defaults to `false`.

### Example

#### SVG Generation

Given a file, `example.md`, which contains the following Markdown:

<pre>
## mermaid code block

```mermaid
graph LR
    Start --> Stop
```
</pre>

Using remark like follows:

```js
var vfile = require('to-vfile');
var remark = require('remark');
var mermaid = require('remark-mermaid');

var example = vfile.readSync('example.md');

remark()
  .use(mermaid)
  .process(example, function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Will result in an SVG being written relative to `example.md`, and the Markdown
being transformed to:

```md
## mermaid code block

![](./6b03e143dc2a47a93496133d692c44d5ec012b57.svg "`mermaid` image")
```

To change where the SVG's are written, set `data.destinationDir` on the vFile:

```js
var vfile = require('to-vfile');
var remark = require('remark');
var mermaid = require('remark-mermaid');

var example = vfile.readSync('example.md');
example.data = {
  destinationDir: '~/absolute/path/to/output'
};

remark()
  .use(mermaid)
  .process(example, function (err, file) {
    if (err) throw err;
    vfile.writeSync({ path: example.destinationFilePath });
  });
```

This allows you process files from one directory, and save the results to another.

#### Simple mode

The following code sample enables simple mode:

```js
var vfile = require('to-vfile');
var remark = require('remark');
var mermaid = require('remark-mermaid');

var example = vfile.readSync('example.md');

remark()
  .use(mermaid, { simple: true })
  .process(example, function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

This will result in the following Markdown output:

```md
## mermaid code block

<div class="mermaid">
  graph LR
    Start --> Stop
</div>
```

[mermaidjs](https://mermaidjs.github.io/usage.html)
> **[react-oauth2-hook](README.md)**

[Globals]() / [react-oauth2-hook](README.md) /

**`requires`** immutable

**`requires`** prop-types

**`requires`** react

**`requires`** react-dom

**`requires`** react-storage-hook

**`summary`** Retrieve OAuth2 implicit grant tokens purely on the client without destroying application state.

**`version`** 1.0.11

**`author`** zemnmez

**`copyright`** zemnmez 2019

**`license`** MIT
### Installation

```bash
yarn add react-oauth2-hook
```
### Overview
This package provides an entirely client-side flow to get OAuth2 implicit grant tokens.
It's implemented as a react hook, [useOAuth2Token](README.md#const-useoauth2token), with a fairly simple API
and a react component, [OAuthCallback](README.md#const-oauthcallback) which should be mounted at the
OAuth callback endpoint.

Take a look at the [Example](#example) for usage information.

### Security Considerations
OAuth 2 is a very sensitive protocol. I've done my best to provide good security
guarantees with this package.

I assume that your application follows reasonable best practices like using `X-Frame-Options`
to prevent clickjacking based attacks.

#### State
The State token prevents an attacker from forcing a user to sign in as the attacker's
account using a kind of CSRF. Here, I am cautious against multiple types of attacks.

My state token is not signed, it's a completely static concatenation of some entropy
generated by webcrypto and a key, composed of `JSON.stringify({ authUrl, clientID, scopes })`.
When the callback is recieved by [OAuthCallback](README.md#const-oauthcallback), it is compared strictly
to the stored value, and otherwise rejected.

This prevents both attacks where an attacker would try to submit a token to the user's
browser without their consent, and attacks where a malicious OAuth server would
(re)use the n-once to authenticate a callback from a different server.

#### Timing attacks

The state token is *not* compared using a fixed-time string comparison.
Where typically, this would lead to an attacker being able to use a lot of time
and statistics to side-channel out the state token, this
should be irrelevant in this configuration, this should be extremely difficult
to pull off accurately as any timing information would be inaccessible or heavily
diluted.

### Refresh tokens
This library in-and-of-itself does not acquire long lived refresh tokens. Though
some OAuth servers allow implicit clients to acquire refresh tokens without an
OAuth secret, this isn't part of the OAuth standard. Instead, consider
simply triggering the authorize flow when the token expires -- if the user
is still authorized, the window should almost immediately close. Otherwise,
you can use any special APIs that would let you do this, or skip this library
entirely and try PKCE.
### Example

**`example`** 

```javascript
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useOAuth2Token, OAuthCallback } from 'react-oauth2-hook'

// in this example, we get a Spotify OAuth
// token and use it to show a user's saved
// tracks.

export default () => <Router>
  <Switch>
    <Route path="/callback" component={OAuthCallback}/>
    <Route component={SavedTracks}/>
  </Switch>
</Router>

const SavedTracks = () => {
  const [token, getToken] = useOAuth2Token({
    authorizeUrl: "https://accounts.spotify.com/authorize",
    scope: ["user-library-read"],
    clientID: "bd9844d654f242f782509461bdba068c",
    redirectUri: document.location.href+"/callback"
  })

  const [tracks, setTracks] = React.useState();
  const [error, setError] = React.useState();

  // query spotify when we get a token
  React.useEffect(() => {
    fetch(
      'https://api.spotify.com/v1/me/tracks?limit=50'
    ).then(response => response.json()).then(
      data => setTracks(data)
    ).catch(error => setError(error))
  }, [token])

  return <div>
    {error && `Error occurred: ${error}`}
    {(!token || !savedTracks) && <div
      onClick={getToken}>
        login with Spotify
    </div>}
    {savedTracks && `
      Your Saved Tracks: ${JSON.stringify(savedTracks)}
    `}
  </div>
}
```

#### Index

##### Type aliases

* [OAuthToken](README.md#oauthtoken)
* [getToken](README.md#gettoken)
* [setToken](README.md#settoken)

##### Variables

* [ErrIncorrectStateToken](README.md#const-errincorrectstatetoken)
* [ErrNoAccessToken](README.md#const-errnoaccesstoken)

##### Functions

* [OAuthCallback](README.md#const-oauthcallback)
* [useOAuth2Token](README.md#const-useoauth2token)

### Type aliases

####  OAuthToken

Ƭ **OAuthToken**: *string*

*Defined in [index.tsx:157](https://github.com/Zemnmez/react-oauth2-hook/blob/e142d9b/src/index.tsx#L157)*

OAuthToken represents an OAuth2 implicit grant token.

___

####  getToken

Ƭ **getToken**: *function*

*Defined in [index.tsx:163](https://github.com/Zemnmez/react-oauth2-hook/blob/e142d9b/src/index.tsx#L163)*

getToken is returned by [useOAuth2Token](README.md#const-useoauth2token).
When called, it prompts the user to authorize.

##### Type declaration:

▸ (): *void*

___

####  setToken

Ƭ **setToken**: *function*

*Defined in [index.tsx:171](https://github.com/Zemnmez/react-oauth2-hook/blob/e142d9b/src/index.tsx#L171)*

setToken is returned by [useOAuth2Token](README.md#const-useoauth2token).
When called, it overwrites any stored OAuth token.
`setToken(undefined)` can be used to synchronously
invalidate all instances of this OAuth token.

##### Type declaration:

▸ (`newValue`: *[OAuthToken](README.md#oauthtoken) | undefined*): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | [OAuthToken](README.md#oauthtoken) \| undefined |

### Variables

#### `Const` ErrIncorrectStateToken

• **ErrIncorrectStateToken**: *`Error`* =  new Error('incorrect state token')

*Defined in [index.tsx:210](https://github.com/Zemnmez/react-oauth2-hook/blob/e142d9b/src/index.tsx#L210)*

This error is thrown by the [OAuthCallback](README.md#const-oauthcallback)
when the state token recieved is incorrect or does not exist.

___

#### `Const` ErrNoAccessToken

• **ErrNoAccessToken**: *`Error`* =  new Error('no access_token')

*Defined in [index.tsx:216](https://github.com/Zemnmez/react-oauth2-hook/blob/e142d9b/src/index.tsx#L216)*

This error is thrown by the [OAuthCallback](README.md#const-oauthcallback)
if no access_token is recieved.

### Functions

#### `Const` OAuthCallback

▸ **OAuthCallback**(`__namedParameters`: *object*): *`Element`*

*Defined in [index.tsx:274](https://github.com/Zemnmez/react-oauth2-hook/blob/e142d9b/src/index.tsx#L274)*

OAuthCallback is a React component that handles the callback
step of the OAuth2 protocol.

OAuth2Callback is expected to be rendered on the url corresponding
to your redirect_uri.

By default, this component will deal with errors by closing the window,
via its own React error boundary. Pass `{ errorBoundary: false }`
to handle this functionality yourself.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`errorBoundary` | boolean | true | When set to true, errors are thrown instead of just closing the window. |

**Returns:** *`Element`*

___

#### `Const` useOAuth2Token

▸ **useOAuth2Token**(`__namedParameters`: *object*): *[[OAuthToken](README.md#oauthtoken) | undefined, [getToken](README.md#gettoken), [setToken](README.md#settoken)]*

*Defined in [index.tsx:95](https://github.com/Zemnmez/react-oauth2-hook/blob/e142d9b/src/index.tsx#L95)*

useOAuth2Token is a React hook providing an OAuth2 implicit grant token.

When useToken is called, it will attempt to retrieve an existing
token by the criteria of `{ authorizeUrl, scopes, clientID }`.
If a token by these specifications does not exist, the first
item in the returned array will be `undefined`.

If the user wishes to retrieve a new token, they can call `getToken()`,
a function returned by the second parameter. When called, the function
will open a window for the user to confirm the OAuth grant, and
pass it back as expected via the hook.

The OAuth token must be passed to a static endpoint. As
such, the `callbackUrl` must be passed with this endpoint.
The `callbackUrl` should render the [OAuthCallback](README.md#const-oauthcallback) component,
which will securely verify the token and pass it back,
before closing the window.

All instances of this hook requesting the same token and scopes
from the same place are synchronised. In concrete terms,
if you have many components waiting for a Facebook OAuth token
to make a call, they will all immediately update when any component
gets a token.

Finally, in advanced cases the user can manually overwrite any
stored token by capturing and calling the third item in
the reponse array with the new value.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`authorizeUrl` | string | - | The OAuth authorize URL to retrieve the token from. |
`clientID` | string | - | The OAuth `client_id` corresponding to the requesting client. |
`redirectUri` | string | - | The OAuth `redirect_uri` callback. |
`scope` | string[] |  [] | The OAuth scopes to request. |

**Returns:** *[[OAuthToken](README.md#oauthtoken) | undefined, [getToken](README.md#gettoken), [setToken](README.md#settoken)]*
