# Typi 

[ ![Codeship Status for zellwk/typi](https://codeship.com/projects/4d0e1e40-9b6c-0133-8b7e-7a41677d4861/status?branch=master)](https://codeship.com/projects/126777)

Typi makes responsive typography easier by helping you write `font-size` and `line-height` properties at different breakpoints. 

Here's an example: 

```scss
$h1-map: (
  null: (3.129em, 1.2),
  large: (2.3353em, 1.3)
  );

h1 {
  @include typi($h1-map)
}
```

Resultant CSS: 

```css
h1 {
  font-size: 3.129em;
  line-height: 1.2;
}

@media (min-width: 1200px) {
  h1 {
    font-size: 2.3353em;
    line-height: 1.3;
  }
}
```

Read [this blog post](http://www.zell-weekeat.com/responsive-typography) to find out why I highly recommend using Typi.

## Installation 

Install Typi via one of the methods below:

**bower**

```
bower install typi --save
```

**npm**
```
npm install typi --save
```

## Usage 

First, you need to setup a `$typi` map. It looks like this:

```scss
$typi: (
  null: 16px,
  small: 18px,
  large: 20px
);
```

`null`, `small` and `large` are breakpoints.

Typi automatically looks for a `$breakpoints` map to create your media queries (which means it can integrate perfectly with [mappy-breakpoints](https://github.com/zellwk/mappy-breakpoints), a library I created to help with media queries).

```scss
$breakpoints: (
  small: 800px,
  large: 1200px
);
```

Once the `$typi` map is set up, call the `typi-base()` mixin within the `html` selector.

```scss
html {
  @include typi-base();  
}
```

This `typi-base()` mixin creates the following styles: 

```css
html {
  font-size: 100%; /* This means 16px */
}

@media all and (min-width: 800px) {
  html {
    font-size: 112.5%; /* This means 18px */
  }
}

@media all and (min-width: 1200px) {
  html {
    font-size: 125%; /* This means 20px */
  }
}
```

Sometimes you might need to change the `line-height` property of your body copy. To do so, you can provide a second value to each breakpoint that requires it:

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

Then, call each of these font-maps using the `typi` mixin:

```scss
h1 { @include typi($h1-map) }
h2 { @include typi($h2-map) }
h3 { @include typi($h3-map) }
// ...
```

The resultant CSS would be:

```css
h1 {
  font-size: 3.129em;
  line-height: 1.2;
}

@media (min-width: 1200px) {
  h1 {
    font-size: 2.3353em;
    line-height: 1.3;
  }
}

h2 {
  font-size: 2.3353em;
}

@media (min-width: 1200px) {
  h2 {
    font-size: 1.769em;
  }
}

h3 {
  font-size: 1.769em;
}

@media (min-width: 1200px) {
  h3 {
    font-size: 1.333em;
  }
}
```

That's it! Pretty neat huh? :)

**PROTIP**: You can use the modular scale Sass mixin if you don't want to write exact em values (like `1.769em`) across different font maps.

To do so, you have to [download the library](https://github.com/modularscale/modularscale-sass) and import it into your Sass file. Then, change the font maps such that it uses the `ms()` function.

```scss
$h1-map: (
  null: (ms(4) 1.2),
  large: (ms(3), 1.3)
  );

$h2-map: (
  null: ms(3),
  large: ms(2)
  );

$h3-map: (
  null: ms(2),
  large: ms(1)
  );
// ...
```

So, in a nutshell, **[Typi](https://github.com/zellwk/typi)** makes responsive typography easier by helping you **write `font-size` and `line-height` properties at different breakpoints`**.

## Contributing Guidelines

Just one for now: Make sure the tests before you submit a pull request. 

**Steps:**

1. Clone the repo
2. Install dependencies with `bower install && npm install`
3. Run `gulp` to start tests

:)
