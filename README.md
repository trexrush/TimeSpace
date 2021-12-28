# About TimeSpace

TimeSpace is a web-based replacement for the PB excel sheet that many people use to track their Cubing Personal Bests. It will support both WCA and Non-WCA events.
It will also be able to sync up to your WCA profile.

Since the web app is currently in development, planned features are -
Syncing to Google Drive so you can access and edit your records even when offline
Becoming a PWA (progressive web app)
visually displaying your records (graphs)

TimeSpace is built with react, with NextJS, Typescript, and Sass.

## Setting up in localhost

Clone this repository.

Create a new file in the directory named `.env.local`.
in that file paste the followng env variables:

'''
GOOGLE_ID=
GOOGLE_SECRET=
SECRET=
'''

Setup Google Oauth and put the appropriate variables into `.env.local`

To generate the SECRETS variable, open a terminal,

```bash
openssh rand -base64 32
```

Open a terminal and install npm dependencies,

```bash
npm i
```

Here is where I might or might not go into detail about creating a postgres server and setting up prisma. Maybe.

then run the dev server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
