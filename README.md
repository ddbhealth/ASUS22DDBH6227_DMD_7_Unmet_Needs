# ASUS22DDBH6227_DMD_7_Unmet_Needs

# https://app.hive.com/workspace/LesfQJq3QdeFPsc8j?actionId=YSMDgQR2Mui7daxN8

Email boilerplate developed with pug that takes advantage of inheritance, variables and Modularization.

---

### Installation

To prepare this project to run, you'll need to have nodejs 6.4.0 or up installed in your computer. I suggest to use NVM in order to install node and manage diference version easily.

Install dependencies and start the server.

```sh
$ npm install
$ npm start
```

### Steps to create new email

- Enter in CLI : gulp boilerplate --name projectname
- Then create your own components

---

### Handle Email COPY

There is a data.json, here you could handle the copy for your email
Example of the data.JSON

```javascript
{
  "header": {
    "title": "Title",
    "button":"contribute"
  },
  "content":{
    "title": "Tell Us What You Think in 5 Minutes or Less"
  },
  "social_icons": [
      {
        "img": "icon-facebook.png",
        "url": "#",
        "width": "35",
        "height": "29"
      },
      {
        "img": "icon-twitter.png",
        "url": "#",
        "width": "35",
        "height": "29"
      },
      {
        "img": "icon-instagram.png",
        "url": "#",
        "width": "35",
        "height": "29"
      }
    ],
    "comments": [
      "We created this template based on what emails developers needs, it is not an easy task but we bring you help",
      "It is a long trip that never ends if you have any suggestion let us know"
    ]
}

```

Then in your email you could access them, for example the header title:

```
 !{header.title}
```

### Reuse Reset Attributes

Instead of hardcode reusable attributes in each table use Reset Attributes defined in includes/general.pug

**example with border="0" cellspacing="0" cellpadding="0"**
![cdac8d0d4877e407aa989709be2e514b.png](https://pictr.com/images/2017/03/27/cdac8d0d4877e407aa989709be2e514b.png)

Add your own attributes and inherence reset attributes.

table(**ownattributes**)&attributes(tableAtt)  
**Example**
![452bf9c68acd70bc5f00419a9b4baaaa.png](https://pictr.com/images/2017/03/27/452bf9c68acd70bc5f00419a9b4baaaa.png)

**Image Path**
In case of testing, you could use [Netifly](https://app.netlify.com) to deploy the images, and update the imagePath here.
![](http://i.imgur.com/rmVOewV.png)

In case you use googleAnalytics just set a variable

```sh
analytics = { url:"http://https://www.google-analytics.com/"}
```

---

### Mixins

You could use mixins that consider the compatibility of all email clients, mixins are located in includes/mixins.pug

**Spacers**

> +spacer({width:10, height:10})  
>  Width and Height are optional.

> +vSpacer(10)  
>  Send the height value directly.

> +hSpacer(10)  
>  Send the width value directly.

Examples with vSpacer:

    +vSpacer(heightvalue)

![](http://i.imgur.com/h9GQRMt.png)

**Backgrounds for td tag**
This mixin considers the way to render background images, it is based on [campaign monitor](https://backgrounds.cm/) advice.

> **params for background images(Use the ones you need)**
> img, bgcolor, width, height

    +tdbackground({img:'http://lorempixel.com/600/100/', width:600, height:100})&attributes(tdCenter)
        contentblockhere

![](http://i.imgur.com/1ha4ZAd.png)

**Buttons**
This mixin considers the way to render buttons, it is based on [campaign monitor](https://buttons.cm/) advice.

> **params for button(Use the ones you need)**
> img, color, width, height, bgcolor, bordercolor, link, radius, font-family, font-size, font-weight, text.

Example with button:

    +button({width:205, height:35, bgcolor:'#4285f4',bordercolor:'#4285f4', radius:4, text: 'Read More'})

![](http://i.imgur.com/g1N2h5t.png)

**Images**
This mixin takes advantage of alt text, and applies to alt text some styles, this way to handle image blocked is recommended by litmus team in plural-sight course.

    +addImg("http://lorempixel.com/600/200","Img main")(class="w480" width='600')

---

### Modularization

You could develop global modules inside includes/modules.
**Example in emails folder:**
![7d33d1fae0e87bc900ed684011d3dee8.png](https://pictr.com/images/2017/03/27/7d33d1fae0e87bc900ed684011d3dee8.png)

Or you can also create your components in every mail folder and use them to modularize your code

### Gulp tasks

You can modify gulp.config.js with custom locations, and folder
names.
The gulpfile.babel.js file provides different task commands using your commandline tool.

#### Tasks

##### Development Tasks

- **$ gulp** - Runs gulp default task, start server, and scaffold tasks

##### Deploy Tasks

- **$ gulp deploy** - Minify html in 'dist' folder
- **$ gulp zip** - zip every email in dist folder and store
  them under zip folder in dist location

##### FTP Deployment

First create a .ftppass file in project root, after execute **gulp ftp**

```json
{
  "ftp": {
    "host": "domain",
    "user": "user",
    "pass": "password",
    "path": "ftp/folder/path"
  }
}
```

---

### Unit Testing

Run next command

```sh
$ npm test
```

### The final build

Run next instruction and find your build inside dist folder.

```sh
$ npm run build
```
