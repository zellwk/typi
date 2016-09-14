# Typi

[ ![Codeship Status for zellwk/typi](https://codeship.com/projects/4d0e1e40-9b6c-0133-8b7e-7a41677d4861/status?branch=master)](https://codeship.com/projects/126777)

The Ideal mixins
@include typi($h1, primary)
@include typi($h1, secondary, $baseline: true)

margin: vr(1.5)
margin: vr(1.5, secondary) => Outputs rem with secondary
margin: vr(1.5, 1em) => Outputs em
margin: vr(1.5, _ty-get-ms()) => Outputs em with complex font-size
margin: vr(1.5, 1em, secondary) => Outputs em with secondary
margin: vr(1.5, _ty-get-ms(), secondary)


@include align-to($h2, secondary, $baseline: true)
@include debug-typeface(typeface)
