# HotSoupScript
This library enables programming beginers to make an artistic (especially game) programming easily.  
  
This is inspired by [HSP Language](https://hsp.tv/) which is widely used for kid's coding.

## How To Use
### Set up

[HSS PlayGround](https://github.com/konbraphat51/HSS_Playground) could be your template.  
  
Put this repository in your html-existing directory, and write below.
```html
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
Functions starts with `__` means not intended to be used by you :(  
  
Function starts with `async` requires `await`  
```JavaScript
//if the function written like this:
async function a(){...}

//Call the function like this:
await a();
```
  
#### Graphics
You may look at `HotSoupScript/Graphics.js`. 
  
Setting colors or any other parameter starts with `Set`,  
and drawing textures starts with `Draw`