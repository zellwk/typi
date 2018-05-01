# Typi

[ ![Codeship Status for zellwk/typi](https://codeship.com/projects/4d0e1e40-9b6c-0133-8b7e-7a41677d4861/status?branch=master)](https://codeship.com/projects/126777)

## Table of contents

- [Intro](#intro)
- [Installation](#installation)
- [Configuration](#configuration)
- [Using Typi (`base` font-map)](#using-typi-base-font-map)
- [Using Typi (other font-maps)](#using-typi-other-font-maps)
- [Automatically creating classes with Typi](#automatically-creating-classes-with-typi)
- [Sizing in `em`](#sizing-in-em)
- [Em-based media queries](#em-based-media-queries)
- [Vertical Rhythm](#vertical-rhythm)
- [Vertical Rhythm with `em`](#vertical-rhythm-with-em-units)
- [Contributing](#contributing)
- [Changelog](#changelog)

## Intro

Typi does two things for you incredibly well.

1. Typi **helps you write font-size and line-height declarations** at multiple breakpoints without breaking a sweat.
2. Typi **helps you calculate vertical rhythm** without having to do the math yourself.

Here's a quickie example for both points.

For point 1:

```scss
// Sass input
h1 { @include typi('h1'); }
```

```css
/* CSS output */
h1 {
  font-size: 1.5rem;
  line-height: 1.3;
}

@media all and (min-width: 600px) {
  h1 {
    font-size: 2.369rem;
    line-height: 1.2;
  }
}
```

For point 2:

```scss
h1 {
  margin-top: vr(1);
}
```

```css
h1 {
  margin-top: 1.4rem;
}
```

## Installation

You can install Typi in four ways:

1. Bower: `bower install typi --save`
2. npm: `npm install typi --save-dev`
3. diamond: `diamond install typi`
3. manual install (https://github.com/zellwk/typi/archive/master.zip)


**Typi with ruby gems**
If you want to install Typi with Ruby, check out [Pete's repo](https://github.com/Petecass/typi_rails) for installation instructions. (I think you can use v2.3.0. Not sure about v3)

Once you've downloaded Typi, include it in your project with:

```scss
// Change `path-to-typi` with the correct path!
@import 'path-to-typi/scss/typi';
```

If you are using diamond, it can be imported with:
```scss
@import '~typi';
```

## Configuration

You need to configure two Sass maps:

1. `$breakpoints` – holds breakpoint values
2. `$typi` – holds all your typography config

### `$breakpoints` map

The `$breakpoints` map is a series of `key: value` pairs that tell Typi what media queries to create for each font-size and line-height property you intend to write. It looks like this:

```scss
$breakpoints: (
  small: 600px,
  large: 1200px
);
```

Feel free to leave breakpoint values in pixels if you intend to use a breakpoint library that's compatible with Typi (more on that later). Otherwise, I recommend you convert these values into em.

### `$typi` map

The `$typi` map is a **storage of different font maps** that contain information about breakpoints to create and the font-sizes and line-heights that should be written that that breakpoint.

The bare minimum version looks like this:

```scss
$typi: (
  base: (
    null: (16px, 1.4),
    small: (18px),
    large: (20px)
  )
  // Other font maps here
);
```

The first font-map in `$typi` should always be the `base` font-map. This tells Typi to output the correct font-sizes and line-height in the `html` selector. Here's what it reads:

- `null` key: Create font-size of 16px and line-height of 1.4 without breakpoints
- `small` key: At 600px, change font-size to 18px
- `large` key: At 1200px, change font-size to 20px

You can also create other font-maps, but we'll talk about them later to make things easier to understand. Let's see how to use this `base` font-map first.

## Using Typi (`base` font-map)

Typi uses the `base` font-map to create font-size and line-height values for the `html` selector. You tell Typi to create these values by using the `typi-init` mixin.

```scss
@include typi-init;
```

You should get the following CSS. Notice how pixel values get converted into percentage values when you use `typi-init`.

```css
html {
  font-size: 100%; /* this means 16px */
  line-height: 1.4;
}

@media all and (min-width: 600px) {
  html {
    font-size: 112.5%; /* this means 18px */
  }
}

@media all and (min-width: 1200px) {
  html {
    font-size: 125%; /* this means 20px */
  }
}
```

## Using Typi (other font-maps)

Typi allows you to create other font-size and line-height and media query combinations by creating another font-map, like this:

```scss
$typi: (
  // base font-map,
  h1: (
    null: (24px, 1.3),
    small: (2.369em, 1.2),
  )
);
```

In the code above, we created a `h1` font-map with that:

1. Creates a font-size with a value of `24px` (written in rem) and a line-height of 1.3 without breakpoints
2. Changes font-size to a value of `2.369em` (written in rem) and line-height to 1.2 at a minimum width of `600px`.

You can use this `h1` font-map with the `typi` mixin once you've created it, like this:

```scss
h1 {
  @include typi('h1');
}
```

The CSS produced by Typi is (notice how font-sizes gets converted into rem):

```css
h1 {
  font-size: 1.5rem;
  line-height: 1.3;
}

@media all and (min-width: 600px) {
  h1 {
    font-size: 2.369rem;
    line-height: 1.2;
  }
}
```

Since Typi works with em values, you can also use Modular Scale easily with Typi like this:

```scss
$typi: (
  // base font-map,
  h1: (
    null: (24px, 1.3),
    small: (ms(3), 1.2),
  )
);
```

(Note: Make sure to include the [modular-scale sass library](https://github.com/modularscale/modularscale-sass) before doing this. Typi works with Modular Scale Version 2++. DO NOT install version 3 or Typi will fail).

## Automatically creating classes with Typi

Typi can help you create classes automatically if you use the `typi-create-classes` mixin. It extracts the keys present in your `$typi` map and calls `@include typi` on each individual key.

Read [this article](https://zellwk.com/blog/css-architecture-2/) to see why you might love this feature.

```scss
// Input
$typi: (
  base: (null: (16px, 1.4)),
  h1: (null: (24px, 1.3))
);

@include typi-create-classes;
```

```css
/* Output */
.base {
  font-size: 100%;
  line-height: 1.4;
}

.h1 {
  font-size: 1.5rem;
  line-height: 1.3;
}
```

## Sizing in `em`

Although I highly recommend the use of `rem`, there are instances where you want to use `em` over `rem`. If this happens, all you need to do is tell Typi you want to create sizes in `em` by stating `$rem: false`, like this:

```scss
@include typi('h1', $rem: false);
```

And Typi automatically writes sizes in the `em` unit.

```css
h1 {
  font-size: 1.5em;
  line-height: 1.3;
}

@media all and (min-width: 600px) {
  h1 {
    font-size: 2.369em;
    line-height: 1.2;
  }
}
```

## Em-based media queries

You should use [em values for media queries](https://zellwk.com/blog/media-query-units/), unless you decide to use a breakpoint library that's compatible with Typi. Typi will automatically convert all pixel values to em if you use such a library.

At this moment, Typi supports the use of three breakpoint libraries—[Mappy breakpoints](https://github.com/zellwk/mappy-breakpoints),[Breakpoint Sass](http://breakpoint-sass.com) and [Sass MQ](https://github.com/sass-mq/sass-mq) . You tell Typi about the existence of these libraries with:

```scss
// using Mappy Breakpoint
$typi-breakpoint: mappy-bp;

// using Breakpoint Sass
$typi-breakpoint: breakpoint;

// using Sass MQ
$mq-breakpoints: (
  small: 400px,
  med: 600px,
  large: 800px,
);

$typi-breakpoint: mq;


```

Then, Typi will do it's job and convert pixels to em automatically:

```css
h1 {
  font-size: 1.5em;
  line-height: 1.3;
}

@media all and (min-width: 37.5em) {
  h1 {
    font-size: 2.369em;
    line-height: 1.2;
  }
}
```

## Vertical Rhythm

Typi gives you a `vr()` function to count baselines without requiring you to do complicated calculations yourself. It looks like this:

```scss
h1 {
  margin-top: vr(1); // 1 baseline
  margin-bottom: vr(2); // 2 baselines
}
```

Typi uses the `null` key in your base font-map to calculate the Vertical Rhythm. Typi then uses the `line-height` value (1.4) to calculate the Vertical Rhythm.

```scss
$typi: (
  base: (
    null: (16px, 1.4),
    small: (18px),
    large: (20px)
  )
  // Other font maps here
);
```

In this case, `1 baseline = 16px * 1.4` (converted into rem).

```css
h1 {
  margin-top: 1.4rem; /* 1 baseline */
  margin-bottom: 2.8rem; /* 2 baselines */
}

```
## Vertical Rhythm with `em` units

Typi gives you the ability to write Vertical Rhythms in em instead of rem whenever you need to. To do so, you include the font-size as a second parameter and Typi will automatically do the rest. This font-size parameter can either be in pixels or em:

```scss
h1 {
  // This is equivalent to vr(3) if font-size is 1.5em
  margin: vr(3, 1.5em);
}
```

## Additional features

More features are coming to Typi. However, I haven't had the time to work them out (or write about them) yet. I'll let you know when I manage to make Typi even better than it is now!

## Contributing

Just one for now: Make sure the tests before you submit a pull request.

Steps:

1. Clone the repo
2. Install dependencies with bower install && npm install
3. Run `gulp` to start tests

## Changelog

### v3.1

- Added ability to write classes automatically with `typi-create-classes`.

### v3.0

- Changed `$typi` map. NOTE: BREAKING CHANGE.

### v2.2.0

- Added the ability to change Modular Scale within media queries easily

### v2.1.1

- Added typi-ms() function
- Bugfix for integration with mappy-bp

### v2.0.0

- Changed typi() output to rem by default

### v1.1.0

- Added ability to calculate vertical rhythms in em and rem.

:)
