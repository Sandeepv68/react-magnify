![reactmagnifier-logo](logo/logo.png)
# ReactMagnifier v0.0.1

ReactMagnifier is a simple and highly configurable react plugin to perform image magnification. ReactMagnifier is a **UMD** module, so it can be used isomorphically.

## Features
* Light weight (18 KB minified)
* Written in Typescript
* Highly customizable
* Supports touch screens as well
* Supports event listeners 
* Supports all kinds of images and image urls, high resolutions as well
* Supports custom css styles
* Supports client-side react apps as well as server-side rendered react apps

## Table of Contents

<!--ts-->
* [About](#reactmagnifier-v001)
* [Features](#features)
* [Installation](#installation)
* [Sample Usage](#sample-usage)
* [Dependency](#dependency)
* [Changelog](#changelog)
    * [v0.0.1](#v001)
* [API Documentation](#api-documentation)
    * [Schema](#schema)
        * [Location](#location)

* [Continuous Integration (CI)](#continuous-integration-ci)
* [Tests](#tests)
* [License](#license)
* [Acknowledgements](#acknowledgements)
<!--te-->

## Installation
Install the package from NPM using:
```sh
npm i @react-ui-lib/react-magnifier
```
## Sample Usage
Add the component to your project using:
```js
import ReactMagnifier from "@react-ui-lib/react-magnifier";
import image from './path/image";

 <ReactMagnifier
      zoomSize={3}
      imageHeight={400}
      imageWidth={600}
      magnifierHeight={200}
      magnifierWidth={200}
      magnifierRadius={50}
      magnifierBorderColor={"white"}
      magnifierBorderStyle={"solid"}
      magnifierBorderWidth={2}
      cursor={"none"}
      imageUrl={image}
      getMagnifier={showEvent}
      customImgStyles={'myClass'}
      customContainerStyles={'aClass'}
   />
```

## Dependency

## Changelog

## API Documentation

## Continuous Integration (CI)

## Tests

## License
MIT License

Copyright (c) 2020 Sandeep Vattapparambil [http://www.sandeepv.in](http://www.sandeepv.in)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements
This project is inspired from [Blowup.js](https://paulkr.github.io/blowup.js/), but not copied or does not include any or part of it in this project.

Made with :heart: by [Sandeep Vattapparambil](https://github.com/SandeepVattapparambil).