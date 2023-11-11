# HotSoupScript

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6e17437582b641c39a8f76a619731dab)](https://app.codacy.com/gh/konbraphat51/HotSoupScript/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
<a href="https://codeclimate.com/github/konbraphat51/HotSoupScript/maintainability"><img src="https://api.codeclimate.com/v1/badges/129a32ee61aed12df9eb/maintainability" /></a><br>
This library enables programming beginers to make an artistic (especially game) programming easily.

This is inspired by [HSP Language](https://hsp.tv/) which is widely used for kid's coding.

## Examples used HSS

- [Simulation of Newton's Cradle](https://github.com/konbraphat51/NewtonsCradle)
- [HotSoupScripts Examples](https://konbraphat51.github.io/HSS_examples/)

## How To Use

### Set up

[HSS Template](https://github.com/konbraphat51/HSS_Template) could be your help to setup HTML.

Put this repository in your html-existing directory, and write below.

```html
<!--Prepare canvas-->
<canvas id="canvas" width="800" height="600"></canvas>

<!--Call modules-->
<script src="HotSoupScript/ModulesLoader.js"></script>
```

If you want to use `async` function, write your main code as this:

```JavaScript
async function main(){...}
```

and, put this **under your main code `src` tag**:

```html
<script src="HotSoupScript/MainCaller.js"></script>
```

This tag call your `main()` async function. (The name should be `main()`)

### Coding

Usable function is in `Public` folder. Check it out!

This could be your tutorial:  
[HotSoupScripts Examples](https://konbraphat51.github.io/HSS_examples/)

Functions starts with `__` means not intended to be used by you :(

Function starts with `async` requires `await`

```JavaScript
//if the function written like this:
async function a(){...}

//Call the function like this:
await a();
```

#### Settings

If you want to change your HTML canvas id (default is `canvas`), modify `HotSoupScript/Public/Settings.js`

#### Graphics

This section may be the essence of this library.  
You may look at `HotSoupScript/Public/Graphics.js`.

Setting colors or any other parameter starts with `Set`,  
and drawing textures starts with `Draw`

#### HTML

This section puts HTML element **below the canvas**. You also can get value.  
If you want to notice if the value changed, use `IsHTMLUpdated()` or `GetUpdatedHTML()`. You may can use onChanged, but it makes multi-thread which is confusing for beginners.

#### Math / Geometry

A lot of mathmatics. This would be very useful if you can understand. If not, try doing things by your own.

#### Utils

General and helpful functions. Especially these are important:

- `Sleep()`
  Stop the program for miliseconds (1000ms = 1 second). **You will need this when you want a constant loop, or your browser will CRASHES!!!**  
   Usage as cool time:

  ```Javascript
  var x = 0
  while(true){
      //clear canvas
      SetColor("white")
      DrawRect(0, 0, GetCanvasSize()[0], GetCanvasSize()[1])

      //write "a"
      SetColor("black")
      DrawText("a", x, 100)

      //move
      x += 1

      //COOL TIME; FPS=60
      await sleep(1000/60)
  }
  ```

  In short words, write as `await sleep(...)`

  Technically, all the HTML/Browser events will operated within `sleep()`, so if you don't do this and keep busy, your page crashes.

- `Log()`
  Print your value to "console log" (chrome/edge: press F12 and see "console")

  Isn't it same as `console.log()`? This is for beginners!!!

- `ImportScript()`
  If you want to divide your scripts to multiple file, use this.

- `CopyArray()`
  Do you know "pass by reference"?

  ```Javascript
  var a = [1, 2]
  var b = a
  a[1] = 3
  DrawText(a, 100, 100) //<-This shows [1, 3]
  ```

  To prevent this, this function is helpful.

#### For geeks wondering about the coding style.

This library is focusing on **for beginners**, not for geeks.  
For beginners, I want to

- hide class, not like `HSS.DrawText()`, make it as global function. (No problem for users to use class for their own)
- Complete-single-thread, not using HTML events. For no confusion, and for flame-based comprehensive program experience.
