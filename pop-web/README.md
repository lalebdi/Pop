# React App

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/lalebdi/Pop">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Pop 💥</h3>

  <p align="center">
    An Awesome MicoBlogging App
    <br />
    <a href="https://github.com/lalebdi/Pop"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lalebdi/Pop">View Demo</a>
    ·
    <a href="https://github.com/lalebdi/Pop/issues">Report Bug</a>
    ·
    <a href="https://github.com/lalebdi/Pop/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This is a microblogging app I am currently working on with a plan to deploy this using a Raspberry Pi from my home. Features include posting, liking, unliking and retweeting. Future features include local news and build a iOS and and Android apps. Looking forward to add more features.


### Built With

* [Django 2.2](https://www.djangoproject.com)
* [React](https://reactjs.org)
* [BootStrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* yarn
  ```sh
  npm install --global yarn
  ```
* Python
  ```sh
  https://www.python.org
  ```
* pipenv
  ```sh
  pip install pipenv
  ```


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lalebdi/Pop.git
   ```
2. Install node packages
   ```sh
   cd pop-web
   yarn install
   ```
3. Activate the environment
   ```sh
   pipenv shell
   ```
4. Run the server
   ```sh
   ./manage.py runserver
   ```
5. Run the React in development mode
   ```sh
   cd pop-web
   yarn start
   ```




