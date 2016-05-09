# Typi

[ ![Codeship Status for zellwk/typi](https://codeship.com/projects/4d0e1e40-9b6c-0133-8b7e-7a41677d4861/status?branch=master)](https://codeship.com/projects/126777)

Typi makes Responsive Typography easier by helping you do two things:

1. **Write `font-size` and `line-height` properties at different `breakpoints`** with font maps.
2. **Calculate Vertical Rhythm** easily with the `vr()` function.

Read [this blog post](http://www.zell-weekeat.com/responsive-typography) to find out why I highly recommend using Typi.

## Installation

Install Typi via one of the methods below:

**bower**

```bash
$ bower install typi --save
```

**npm**

```bash
$ npm install typi --save
```

Then, import Typi into your Sass project

```scss
@import "path-to-bower-components-or-node_modules/typi/scss/typi";
```

## Usage

### Creating Font-size and Line-height Properties for HTML

To use Typi, you first need to set up two Sass maps – `$breakpoints` and `$typi`.

`$breakpoints` is a map that holds key value pairs for creating media queries. It looks something like this:

~~~scss
$breakpoints: (
  small: 800px,
  large: 1200px
);
~~~

Next, you have to set up a `$typi` map that looks like this:

~~~scss
$typi: (
  null: 16px,
  small: 18px,
  large: 20px
);
~~~

Next, you'll have to call the `typi-base()` mixin to help create the `html` `font-size`s:

```scss
html {
  @include typi-base();
}
```

The resultant CSS you get is:

```css
html {
  font-size: 100%;
}

@media all and (min-width: 800px) {
  html {
    font-size: 112.5%;
  }
}

@media all and (min-width: 1200px) {
  html {
    font-size: 125%;
  }
}
```

Let me explain what happened here.

First, Typi looks for **the `null` key** within your `$typi` map. In this case, `null` is 16px. It **tells Typi to create a font-size of 16px without any media queries.** This 16px will automatically be converted into a percentage `font-size`:

```scss
html {
  font-size: 100%;
}
```

Then, Typi looks for the next key, `small` in this case. Once it finds `small`, it'll look into the `$breakpoints` map to find out what media query to create. In this case, we see that `small` is 800px.

Typi then creates a `min-width` query at 800px:

```scss
@media all and (min-width: 800px) {
  html {
    font-size: 112.5%;
  }
}
```

Following which, Typi repeats the processes and creates media queries for all breakpoints you've listed in the `$typi` map.

#### Changing Line Height Properties

Sometimes you might need to change the `line-height` property of your body copy. You can do so by adding a second parameter for each `$typi` key.

```scss
$typi: (
  null: (16px, 1.3), // Sets line-height to 1.3
  small: 18px,
  large: (20px, 1.4) // Sets line-height to 1.4
);
```

The resultant CSS from the updated `$typi` map is:

```css
html {
  font-size: 100%; /* This means 16px */
  line-height: 1.3;
}

@media all and (min-width: 800px) {
  html {
    font-size: 112.5%; /* This means 18px */
  }
}

@media all and (min-width: 1200px) {
  html {
    font-size: 125%; /* This means 20px */
    line-height: 1.4;
  }
}
```

### Creating Font-size and Line Height for other elements

After creating the `$typi` map, create other font-maps using the same format. Here's an example:

```scss
$h1-map: (
  null: (3.129em, 1.2),
  large: (2.3353em, 1.3)
  );

$h2-map: (
  null: 2.3353em,
  large: 1.769em
  );

$h3-map: (
  null: 1.769em,
  large: 1.333em
  );
// ...
```

Each font-map can be called with the `$typi` mixin:

~~~scss
h1 { @include typi($h1-map) }
h2 { @include typi($h2-map) }
h3 { @include typi($h3-map) }
// ...
~~~

Typi then converts the em or pixel value given to the font maps into the `rem` unit (You can change this behavior by setting `$rem` to false when calling `typi()`):

```css
h1 {
  font-size: 3.157rem;
  line-height: 1.2;
}

@media all and (min-width: 1200px) {
  h1 {
    font-size: 2.369rem;
    line-height: 1.3;
  }
}

```

That's it! Pretty neat huh? :)

Here's a **protip**: You can use the modular scale Sass mixin if you don't want to write exact em values (like `1.777em`) across different font maps.

To do so, you have to [download the library](https://github.com/modularscale/modularscale-sass) and import it into your Sass file. Then, change the font maps such that it uses the `ms()` function.

~~~scss
$h1-map: (
  null: (ms(4) 1.2),
  large: (ms(3), 1.3)
  );
// ...
~~~

## Vertical Rhythm with Typi

Typi provides you with a `vr()` function that helps you calculate line heights in `em` and `rem` units.

To use the `vr()` function, you need to modify your `$typi` map slightly such that the `null` key contains a `line-height` value.

```scss
$typi: (
  null: (16px, 1.5),
);
```

The `vr()` function then uses your `line-height` property to help you calculate Vertical Rhythm:

```
margin: vr(1) 0; // margin: 1.5rem 0
margin: vr(2) 0; // margin: 3rem 0
margin: vr(2.5) 0; // margin: 3.75rem 0
```

**Typi also supports you with calculating Vertical Rhythm in `em` if you need it to**. You just have to add a second argument to the `vr()` function:

```scss
margin: vr(2, 3em); // margin-top: 1em;
```

Ideally, Typi would generate a Vertical Rhythm with CSS Variables so you have the freedom to change the base `line-height` property. Unfortunately this will have to wait till CSS Variables are widely supported.

## Contributing Guidelines

Just one for now: Make sure the tests before you submit a pull request.

**Steps:**

1. Clone the repo
2. Install dependencies with `bower install && npm install`
3. Run `gulp` to start tests

## Changelog

#### v2.2.0

- Added the ability to change Modular Scale within media queries easily

#### v2.1.1

- Added `typi-ms()` function
- Bugfix for integration with `mappy-bp`

#### v2.0.0

- Changed `typi()` output to `rem` by default

#### v1.1.0

- Added ability to calculate vertical rhythms in `em` and `rem`.

:)
