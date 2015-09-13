##Bloated

Our project is an interactive map that visualizes the dynamics of global economics by using Bloomberg’s API and open data.

An interactive world map is shown, and the user will be able to see a time lapse of countries’ import vs export values over periods of time that Bloomberg’s database contains.

With Firebase, we were able to not only quickly create a database that could host Bloomberg’s data, but also provide the valuable service of acting as a conflict-free bridge between our back-end devs and our front-end devs.

We used nodejs to scrape data from Bloomberg off AWS, and stored it in Firebase for easy access from our frontend. A sample request asked for a set of years and an index (eg. Chinese Import Trade) and returned information surrounding how often Bloomberg kept track of that index, and the (monetary or %) values at each date. 
We used this information to create a descriptive map that changed colors depending on whether or not that country was turning in a profit based on its net import and net export. 

Tech: <br>
HTML, CSS, Javascript, JQuery, Datamaps, D3 for frontend <br>
NodeJS, Firebase for backend

npm install datamaps, firebase, aws-sdk

MHacksVI, Sept 11-13, 2015 <br>
Made with love by
<ul>
<li><a href="https://github.com/AustinDu">Austin Du</a></li>
<li><a href="https://github.com/MXYMIN">Michael Min</a></li>
<li><a href="https://github.com/thefatbuddha">Howard Wu</a></li>
<li><a href="https://github.com/cspanda">Robbin Xu</a></li>
</ul>
