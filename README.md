[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Table of Contents
- [Setup](#setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [Web Application](#web-application)
    - [Database](#database)
- [API](#api)
  - [Headers](#headers)
  - [Data Types](#data-types)
  - [/get_streams](#get_streams)
  - [/getreleases](#getreleases)

# Setup
## Requirements
- [Visual Studio Code](https://code.visualstudio.com/)
- [Atom](https://atom.io/) (Alternative to VSCode)
- [Node.js](https://nodejs.org/en/) v12 recommended
- [Docker](https://www.docker.com/) and Docker Compose

## Installation
### Web Application
1. Install Node >= 12 and Yarn Classic (v1)
2. Run the terminal command `yarn install` in the project directory
3. Then run `yarn start` to bring up the web application
4. Open [localhost:3000](http://localhost:3000) in your favorite browser

### Database
1. First complete the web application setup process
2. Install Docker and Docker Compose (Optional, but recommended)
3. Run `docker-compose up -d` to start a local MySQL database
4. Then run `yarn prisma migrate up --experimental` to create the database tables.  You may have to add the database URL as a variable before the command, depending on your system, like `DATABASE_URL="mysql://admin:admin123@localhost:3306/onepace" yarn prisma migrate up --experimental` if you encounter errors otherwise.
5. Run `yarn seed-db` to populate all records into the database

# API
## Headers
- Content-Type: application/json
- Accept: application/json
- Charset: utf-8
## Data Types
- i: sint32
- b: bool
- s: string
- ut: unix-time
- .*\?$: nullable
## /get_streams
```
{
    "arcs":
    [
      {
        "id": i,
        "title": s,
        "chapters": s,
        "resolution": s,
        "released": b,
        "episodes": s,
        "torrent": {
			"age_days":i,
			"hash":s,
			"trackers":[s,...],
			"magnet":s,
			"torrent_name":s,
			"display_name":s,
			"size_raw":i,
			"size":s,
			"created":s,
			"created_raw":ut
		}
      }
    ],
    "episodes":
    [
      {
        "id": i,
        "crc32": s,
        "resolution": s,
        "title": s,
        "chapters": s,
        "episodes": s,
        "isReleased": b,
        "status": s,
        "part": i?,
        "arcId": i?,
		"torrent": {
			"age_days":i,
			"hash":s,
			"trackers":[s,...],
			"magnet":s,
			"torrent_name":s,
			"display_name":s,
			"size_raw":i,
			"size":s,
			"created":s,
			"created_raw":ut
		}
      }
    ]
}
```
