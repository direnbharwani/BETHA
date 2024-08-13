<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<h1 align="center"> BETHA </h1>

<!-- PROJECT SHIELDS -->
<div align="center">
    <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/direnbharwani/BETHA/deploy.yml?style=for-the-badge&label=test">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/direnbharwani/BETHA?style=for-the-badge">
</div>

<br>
<p align="center">
    A simple CRUD web app to store data about songs. <br/>
    The structure of the app has been built with modularity in mind.
</p>

# How to Use

- [How to Use](#how-to-use)
- [Features](#features)
- [Local Setup](#local-setup)
  - [1. Running Locally](#1-running-locally)
  - [2. Running Locally with Docker](#2-running-locally-with-docker)
  - [3. Interfacing the deployed Web App](#3-interfacing-the-deployed-web-app)
- [API Endpoints](#api-endpoints)
  - [GET](#get)
  - [POST](#post)
  - [DELETE](#delete)

<br/><br/>

# Features

<table>
  <tr>
    <th><strong>Feature</strong></th>
    <th><strong>Description</strong></th>
  </tr>
  <tr>
    <td>CRUD</td>
    <td>Create, Read & Delete song entries. (Update omitted by design)</td>
  </tr>
  <tr>
    <td>Detailed Logging</td>
    <td>The application logs request details and general messages to the console and to a log file found in the local <code>logs</code> folder</td>
  </tr>
  <tr>
    <td>Data Dependency Injection</td>
    <td>The routes agnostic through the <code>RouteConfig</code> type, allowing different data sources to be used. Mainly used for testing with mock data.</td>
  </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br/>

# Local Setup

## 1. Running Locally
<p>Navigate to the root directory and run the following command in your CLI</p>

```bash
npm install && npm run local-start
```

## 2. Running Locally with Docker
<p>A Docker Compose file has been provided for convenience. Simply run the following command in your CLI</p>

```bash
docker-compose up --build
```
## 3. Interfacing the deployed Web App
<p>The application has been deployed on Google Cloud Platform (GCP) as a containerized service to the following URL:
    <a href="url">https://betha-3yna5wlrmq-as.a.run.app/api/songs</a>
    <br/><br/>
    Tools like <code>cURL</code>, Insomnia or Postman are suggested for interfacing with the web app.
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br/>

# API Endpoints

<list> URLs
    <li>(Local) <a href="url">http://localhost:3000/api/songs</a></li>
    <li>(Web App) <a href="url">https://betha-3yna5wlrmq-as.a.run.app/api/songs</a></li>
</list>

## GET
<h3><code>/api/songs</code></h3>
<p>Gets all songs</p>

<h3>Responses</h3>
<table>
    <tr>
        <th><strong>Code</strong></th>
        <th>Description</th>
    </tr>
    <tr>
        <td>200</td>
        <td>Successly got all songs</td>
    </tr>
</table>

<br/>

<h3><code>/api/songs/{id}</code></h3>
<p>Gets a song by it's ID</p>

<h3>Parameters</h3>
<table>
    <tr>
        <td><strong>id*</strong></td>
        <td><code>int</code><td>
        <td>The song id</td>
    </tr>
</table>

<h3>Responses</h3>
<table>
    <tr>
        <th><strong>Code</strong></th>
        <th>Description</th>
    </tr>
    <tr>
        <td>200</td>
        <td>Successly retrieved song</td>
    </tr>
    <tr>
        <td>400</td>
        <td>Invalid ID</td>
    </tr>
    <tr>
        <td>404</td>
        <td>Song not found</td>
    </tr>
</table>

## POST

<h3><code>/api/songs/</code></h3>
<p>Creates a new entry of a song.</p>

<h3>Parameters</h3>
<table>
    <tr>
        <td><strong>name*</strong></td>
        <td><code>string</code><td>
        <td>Name of the song</td>
    </tr>
    <tr>
        <td><strong>artist*</strong></td>
        <td><code>string</code><td>
        <td>Artist of the song</td>
    </tr>
    <tr>
        <td><strong>album</strong></td>
        <td><code>string</code><td>
        <td>Album of the song</td>
    </tr>
    <tr>
        <td><strong>duration*</strong></td>
        <td><code>int</code><td>
        <td>Duration of the song (in milliseconds)</td>
    </tr>
    <tr>
        <td><strong>year</strong></td>
        <td><code>int</code><td>
        <td>Year the song was released</td>
    </tr>
</table>

<h3>Responses</h3>
<table>
    <tr>
        <th><strong>Code</strong></th>
        <th>Description</th>
    </tr>
    <tr>
        <td>201</td>
        <td>Song added</td>
    </tr>
    <tr>
        <td>400</td>
        <td>Invalid field</td>
    </tr>
</table>

## DELETE

<h3><code>/api/songs/{id}</code></h3>
<p>Deletes a song by it's ID</p>

<h3>Parameters</h3>
<table>
    <tr>
        <td><strong>id*</strong></td>
        <td><code>int</code><td>
        <td>The song id</td>
    </tr>
</table>

<h3>Responses</h3>
<table>
    <tr>
        <th><strong>Code</strong></th>
        <th>Description</th>
    </tr>
    <tr>
        <td>200</td>
        <td>Successly deleted song</td>
    </tr>
    <tr>
        <td>400</td>
        <td>Invalid ID</td>
    </tr>
    <tr>
        <td>404</td>
        <td>Song not found</td>
    </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
